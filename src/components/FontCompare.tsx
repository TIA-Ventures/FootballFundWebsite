"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "cv-font-preset";
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

export type FontPresetId = (typeof PRESETS)[number]["id"];

function applyToDocument(id: FontPresetId) {
  if (id === "clara-vista") {
    document.documentElement.removeAttribute("data-font-preset");
  } else {
    document.documentElement.dataset.fontPreset = id;
  }
}

function readStored(): FontPresetId {
  if (typeof window === "undefined") return "clara-vista";
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw && PRESETS.some((p) => p.id === raw)) {
    return raw as FontPresetId;
  }
  const legacy = localStorage.getItem(STORAGE_LEGACY);
  const fromLegacy: Record<string, FontPresetId> = {
    onest: "clara-vista",
    "space-grotesk": "signal",
    "plus-jakarta": "meridian",
    manrope: "pulse",
  };
  if (legacy && fromLegacy[legacy]) {
    return fromLegacy[legacy];
  }
  return "clara-vista";
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

function getServerSnapshot(): FontPresetId {
  return "clara-vista";
}

/** Top bar: coordinated sans + serif + mono (sets html[data-font-preset]). */
export function FontCompare() {
  const active = useSyncExternalStore(subscribeStore, readStored, getServerSnapshot);

  useLayoutEffect(() => {
    applyToDocument(active);
  }, [active]);

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

  const select = (id: FontPresetId) => {
    localStorage.setItem(STORAGE_KEY, id);
    localStorage.removeItem(STORAGE_LEGACY);
    applyToDocument(id);
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
          {PRESETS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="option"
              aria-selected={active === opt.id}
              className={`font-compare-option${active === opt.id ? " is-active" : ""}`}
              onClick={() => select(opt.id)}
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
