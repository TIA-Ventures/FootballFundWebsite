"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

const STORAGE_PRESET = "cv-font-preset";
const STORAGE_BUNDLE = "cv-font-bundle";
const STORAGE_LEGACY = "cv-font-sans";
const FONT_STORE_EVENT = "cv-font-preset-change";

const PRESETS = [
  {
    id: "clara-vista" as const,
    label: "Clara Vista",
    detail: "Onest · Newsreader · JetBrains Mono · original",
  },
  {
    id: "apex" as const,
    label: "Apex",
    detail: "Inter · Spectral · Roboto Mono · LP / fintech clean",
  },
  {
    id: "axis" as const,
    label: "Axis",
    detail: "Work Sans · Literata · IBM Plex Mono · institutional",
  },
  {
    id: "vertex" as const,
    label: "Vertex",
    detail: "Outfit · Libre Baskerville · Red Hat · geometric",
  },
  {
    id: "ion" as const,
    label: "Ion",
    detail: "Sora · Crimson Pro · Fira Mono · high-tech",
  },
  {
    id: "signal" as const,
    label: "Signal",
    detail: "Space Grotesk · Fraunces · IBM Plex Mono",
  },
  {
    id: "meridian" as const,
    label: "Meridian",
    detail: "Plus Jakarta · Source Serif 4 · JetBrains Mono",
  },
  {
    id: "pulse" as const,
    label: "Pulse",
    detail: "Manrope · DM Serif Display · Space Mono",
  },
] as const;

const BUNDLES_AF = [
  {
    id: "a" as const,
    label: "A · Calibrated Modern",
    detail: "Spectral · Onest · JetBrains Mono",
  },
  {
    id: "b" as const,
    label: "B · Editorial Tech",
    detail: "Instrument Serif · Inter · JetBrains Mono",
  },
  {
    id: "c" as const,
    label: "C · Sports Broadcast",
    detail: "Inter Tight · Inter · JetBrains Mono",
  },
  {
    id: "d" as const,
    label: "D · RedBird Direct",
    detail: "Geist · Geist Mono",
  },
  {
    id: "e" as const,
    label: "E · Quant Shop",
    detail: "JetBrains Mono (display) · Inter · JetBrains Mono",
  },
  {
    id: "f" as const,
    label: "F · Stadium Tunnel",
    detail: "Manrope · JetBrains Mono",
  },
] as const;

/** Site default bundle — listed first in the picker; also `readToken` / SSR default. */
const BUNDLE_D6 = {
  id: "d6" as const,
  label: "D6 · Switzer",
  detail: "Switzer · JetBrains Mono",
} as const;

const BUNDLES_D1_D5 = [
  {
    id: "d1" as const,
    label: "D1 · Geist Direct",
    detail: "Geist · Geist Mono",
  },
  {
    id: "d2" as const,
    label: "D2 · Inter Tight Bold",
    detail: "Inter Tight · Inter · JetBrains Mono",
  },
  {
    id: "d3" as const,
    label: "D3 · General Sans",
    detail: "General Sans · JetBrains Mono",
  },
  {
    id: "d4" as const,
    label: "D4 · Bricolage Grotesque",
    detail: "Bricolage Grotesque · Inter · JetBrains Mono",
  },
  {
    id: "d5" as const,
    label: "D5 · Mona Sans",
    detail: "Mona Sans Variable · Hubot Sans Variable",
  },
] as const;

export type FontPresetId = (typeof PRESETS)[number]["id"];
export type FontBundleId =
  | (typeof BUNDLES_AF)[number]["id"]
  | (typeof BUNDLES_D1_D5)[number]["id"]
  | (typeof BUNDLE_D6)["id"];

/** Serialized for useSyncExternalStore — `b:a` or `p:meridian`. */
export type FontCompareToken = `b:${FontBundleId}` | `p:${FontPresetId}`;

const ALLOW_PRESET: Record<FontPresetId, true> = {
  "clara-vista": true,
  apex: true,
  axis: true,
  vertex: true,
  ion: true,
  signal: true,
  meridian: true,
  pulse: true,
};

const ALLOW_BUNDLE: Record<FontBundleId, true> = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  d1: true,
  d2: true,
  d3: true,
  d4: true,
  d5: true,
  d6: true,
};

function readToken(): FontCompareToken {
  if (typeof window === "undefined") return "b:d6";
  const b = localStorage.getItem(STORAGE_BUNDLE);
  if (b && ALLOW_BUNDLE[b as FontBundleId]) {
    return `b:${b as FontBundleId}`;
  }
  const raw = localStorage.getItem(STORAGE_PRESET);
  if (raw && ALLOW_PRESET[raw as FontPresetId]) {
    return `p:${raw as FontPresetId}`;
  }
  const legacy = localStorage.getItem(STORAGE_LEGACY);
  const fromLegacy: Record<string, FontPresetId> = {
    onest: "clara-vista",
    "space-grotesk": "signal",
    "plus-jakarta": "meridian",
    manrope: "pulse",
  };
  if (legacy && fromLegacy[legacy]) {
    return `p:${fromLegacy[legacy]}`;
  }
  return "b:d6";
}

function applyTokenToDocument(token: FontCompareToken) {
  const [kind, id] = token.split(":") as ["b" | "p", string];
  if (kind === "b") {
    document.documentElement.removeAttribute("data-font-preset");
    document.documentElement.setAttribute("data-fonts", id);
    return;
  }
  document.documentElement.removeAttribute("data-fonts");
  document.documentElement.setAttribute("data-font-preset", id);
}

function subscribeStore(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => onChange();
  window.addEventListener("storage", handler);
  window.addEventListener(FONT_STORE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(FONT_STORE_EVENT, handler);
  };
}

function getServerSnapshot(): FontCompareToken {
  return "b:d6";
}

/** Top bar: presets (data-font-preset) or font bundles (data-fonts). */
export function FontCompare() {
  const token = useSyncExternalStore(subscribeStore, readToken, getServerSnapshot);

  useLayoutEffect(() => {
    applyTokenToDocument(token);
  }, [token]);

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [open]);

  const selectPreset = (id: FontPresetId) => {
    localStorage.removeItem(STORAGE_BUNDLE);
    localStorage.setItem(STORAGE_PRESET, id);
    localStorage.removeItem(STORAGE_LEGACY);
    applyTokenToDocument(`p:${id}`);
    window.dispatchEvent(new Event(FONT_STORE_EVENT));
    setOpen(false);
  };

  const selectBundle = (id: FontBundleId) => {
    localStorage.setItem(STORAGE_BUNDLE, id);
    localStorage.removeItem(STORAGE_PRESET);
    localStorage.removeItem(STORAGE_LEGACY);
    applyTokenToDocument(`b:${id}`);
    window.dispatchEvent(new Event(FONT_STORE_EVENT));
    setOpen(false);
  };

  return (
    <div className="font-compare" ref={wrapRef}>
      <button
        type="button"
        className="font-compare-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="font-compare-list"
        id="font-compare-btn"
        onClick={() => setOpen((o) => !o)}
      >
        Fonts
      </button>
      {open ? (
        <div
          className="font-compare-panel"
          id="font-compare-list"
          role="listbox"
          aria-labelledby="font-compare-btn"
        >
          <button
            type="button"
            role="option"
            aria-selected={token === `b:${BUNDLE_D6.id}`}
            className={`font-compare-option${token === `b:${BUNDLE_D6.id}` ? " is-active" : ""}`}
            onClick={() => selectBundle(BUNDLE_D6.id)}
          >
            <span className="font-compare-option-label">{BUNDLE_D6.label}</span>
            <span className="font-compare-option-detail">{BUNDLE_D6.detail}</span>
          </button>
          <div className="font-compare-panel-divider" aria-hidden="true" />
          {PRESETS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="option"
              aria-selected={token === `p:${opt.id}`}
              className={`font-compare-option${token === `p:${opt.id}` ? " is-active" : ""}`}
              onClick={() => selectPreset(opt.id)}
            >
              <span className="font-compare-option-label">{opt.label}</span>
              <span className="font-compare-option-detail">{opt.detail}</span>
            </button>
          ))}
          <div className="font-compare-panel-divider" aria-hidden="true" />
          {BUNDLES_AF.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="option"
              aria-selected={token === `b:${opt.id}`}
              className={`font-compare-option${token === `b:${opt.id}` ? " is-active" : ""}`}
              onClick={() => selectBundle(opt.id)}
            >
              <span className="font-compare-option-label">{opt.label}</span>
              <span className="font-compare-option-detail">{opt.detail}</span>
            </button>
          ))}
          <div className="font-compare-panel-divider" aria-hidden="true" />
          {BUNDLES_D1_D5.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="option"
              aria-selected={token === `b:${opt.id}`}
              className={`font-compare-option${token === `b:${opt.id}` ? " is-active" : ""}`}
              onClick={() => selectBundle(opt.id)}
            >
              <span className="font-compare-option-label">{opt.label}</span>
              <span className="font-compare-option-detail">{opt.detail}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
