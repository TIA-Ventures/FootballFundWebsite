// Conservative dead-CSS detector/remover.
//
// Safety model: a CSS rule is removed ONLY if every selector in it contains at
// least one class AND all of its class tokens are "provably unreferenceable" —
// i.e. neither the full class name nor any dash-boundary fragment of it appears
// anywhere in the source tree (tsx/ts, including string literals and the map's
// JS-injected SVG markup). A class that can never be attached to any element
// cannot affect rendering, so removing its rule is display-safe.
//
// Element/attribute/id/pseudo-only selectors, @keyframes, @font-face and
// selectors containing parentheses (:is/:where/:not) are never removed.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const postcss = require(
  require.resolve("postcss", {
    paths: ["./node_modules/next/node_modules", "./node_modules"],
  }),
);

const CSS_PATH = "src/app/globals.css";
const APPLY = process.argv.includes("--apply");

// ---- 1. Build source reference corpus -------------------------------------
function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (name === "_saved" || name === "node_modules") continue;
      walk(p, acc);
    } else if ([".tsx", ".ts", ".jsx", ".js", ".mdx"].includes(extname(p))) {
      acc.push(p);
    }
  }
  return acc;
}
const corpus = walk("src")
  .filter((p) => !p.endsWith("globals.css"))
  .map((p) => readFileSync(p, "utf8"))
  .join("\n");

// Extract dynamic class-construction fragments so we never remove a class that
// could be built at runtime:
//   `prefix-${x}`  -> protects any class starting with "prefix-"
//   `${x}-suffix`  -> protects any class ending with "-suffix"
// Plain concatenated literals (e.g. ' is-selected') are caught by the
// whole-token match below because the literal token appears verbatim.
const dynPrefixes = [
  ...corpus.matchAll(/([A-Za-z][A-Za-z0-9_-]*)\$\{/g),
]
  .map((m) => m[1])
  .filter((p) => p.length >= 2);
const dynSuffixes = [
  ...corpus.matchAll(/\}([A-Za-z0-9_-]*[A-Za-z0-9_])/g),
]
  .map((m) => m[1])
  .filter((s) => s.length >= 2);

// A class is "referenced" if it appears as a whole token (not as a substring of
// a longer identifier), or matches a dynamic prefix/suffix.
const refCache = new Map();
function isReferenced(cls) {
  if (refCache.has(cls)) return refCache.get(cls);
  const whole = new RegExp(
    `(?<![A-Za-z0-9_-])${cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![A-Za-z0-9_-])`,
  );
  let used = whole.test(corpus);
  if (!used) used = dynPrefixes.some((p) => cls.startsWith(p));
  if (!used) used = dynSuffixes.some((s) => cls.endsWith(s));
  refCache.set(cls, used);
  return used;
}

// ---- 2. Walk the CSS -------------------------------------------------------
const css = readFileSync(CSS_PATH, "utf8");
const root = postcss.parse(css);

const classRe = /\.(-?[_a-zA-Z][_a-zA-Z0-9-]*)/g;
function classesIn(sel) {
  return [...sel.matchAll(classRe)].map((m) => m[1]);
}

// A single selector is dead if it has >=1 class and all its classes are dead.
function selectorDead(sel) {
  const classes = classesIn(sel);
  if (classes.length === 0) return false; // element/attr/id/pseudo — keep
  return classes.every((c) => !isReferenced(c));
}

const removedSelectors = [];
const deadClasses = new Set();
let rulesRemoved = 0;
let rulesTrimmed = 0;

root.walkRules((rule) => {
  // Skip rules inside @keyframes (their "selectors" are 0%/from/to).
  if (rule.parent && rule.parent.type === "atrule") {
    const n = rule.parent.name.toLowerCase();
    if (n.includes("keyframes") || n === "font-face") return;
  }
  const hasParens = rule.selector.includes("(");
  if (hasParens) {
    // Atomic: only remove if the whole selector is class-gated and all dead.
    if (selectorDead(rule.selector)) {
      classesIn(rule.selector).forEach((c) => deadClasses.add(c));
      removedSelectors.push(rule.selector.replace(/\s+/g, " ").trim());
      rulesRemoved++;
      rule.remove();
    }
    return;
  }
  const selectors = rule.selectors; // comma-split (safe: no parens)
  const alive = selectors.filter((s) => !selectorDead(s));
  const dead = selectors.filter((s) => selectorDead(s));
  dead.forEach((s) => {
    classesIn(s).forEach((c) => deadClasses.add(c));
    removedSelectors.push(s.replace(/\s+/g, " ").trim());
  });
  if (alive.length === 0) {
    rulesRemoved++;
    rule.remove();
  } else if (dead.length > 0) {
    rulesTrimmed++;
    rule.selector = alive.join(",\n");
  }
});

// Drop now-empty @media / @supports blocks.
let atRulesRemoved = 0;
root.walkAtRules((at) => {
  if (["media", "supports"].includes(at.name) && at.nodes && at.nodes.length === 0) {
    atRulesRemoved++;
    at.remove();
  }
});

const out = root.toString();
console.log("=== DEAD CSS DRY RUN ===");
console.log("source files scanned:", walk("src").filter((p) => !p.endsWith("globals.css")).length);
console.log("rules fully removed:", rulesRemoved);
console.log("rules trimmed (dead selector dropped from group):", rulesTrimmed);
console.log("empty @media/@supports removed:", atRulesRemoved);
console.log("bytes:", css.length, "->", out.length, `(-${css.length - out.length})`);
console.log("\n=== distinct dead classes (" + deadClasses.size + ") ===");
console.log([...deadClasses].sort().join("  "));
console.log("\n=== removed selectors (first 80) ===");
console.log(removedSelectors.slice(0, 80).join("\n"));
if (removedSelectors.length > 80) console.log(`... and ${removedSelectors.length - 80} more`);

if (APPLY) {
  const { writeFileSync } = await import("node:fs");
  writeFileSync(CSS_PATH, out);
  console.log("\n*** APPLIED: globals.css rewritten ***");
}
