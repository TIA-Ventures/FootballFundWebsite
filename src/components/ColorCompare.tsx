"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "cv-color-scheme";
const COLOR_STORE_EVENT = "cv-color-scheme-change";

const SCHEMES = [
  {
    id: "clara-vista" as const,
    label: "Clara Vista",
    detail: "Emerald · Amber · Ivory — institutional default",
    swatches: ["#a88648", "#d4a86a", "#F2EAD6"],
  },
  {
    id: "pitch" as const,
    label: "Pitch",
    detail: "Floodlit turf · stadium night-mode",
    swatches: ["#00FF87", "#5EEAD4", "#0A0F0C"],
  },
  {
    id: "volt" as const,
    label: "Volt",
    detail: "Chartreuse · carbon · racing edge",
    swatches: ["#D4FF3A", "#FF4DCB", "#111114"],
  },
  {
    id: "aurora" as const,
    label: "Aurora",
    detail: "Cyan · violet — future / intelligent",
    swatches: ["#22D3EE", "#A78BFA", "#0B1220"],
  },
  {
    id: "ember" as const,
    label: "Ember",
    detail: "Crimson · amber — broadcast sports",
    swatches: ["#FF3D54", "#FFA63D", "#0E0B0B"],
  },
  {
    id: "quartz" as const,
    label: "Quartz",
    detail: "Cobalt · steel — sharp fintech",
    swatches: ["#3D6EFF", "#22D3EE", "#0B0E14"],
  },
  {
    id: "plasma" as const,
    label: "Plasma",
    detail: "Magenta · electric blue — cyberpunk edge",
    swatches: ["#FF2EBD", "#3D8AFF", "#0D0B14"],
  },
  {
    id: "cipher" as const,
    label: "Cipher",
    detail: "Terminal green · jet — quant trading floor",
    swatches: ["#00FF41", "#FFB000", "#040605"],
  },
  {
    id: "nova" as const,
    label: "Nova",
    detail: "Radioactive yellow · coal — defense-tech",
    swatches: ["#FFE600", "#3D8AFF", "#0A0A0C"],
  },
  {
    id: "halo" as const,
    label: "Halo",
    detail: "Pearl chrome · midnight — Vision Pro polish",
    swatches: ["#D4DEEC", "#5EC8FF", "#0A1426"],
  },
  {
    id: "citrine" as const,
    label: "Citrine",
    detail: "Gold · obsidian — luxury new-age PE",
    swatches: ["#FFC233", "#C28A3D", "#0A0907"],
  },
  {
    id: "reactor" as const,
    label: "Reactor",
    detail: "Uranium lime · carbon — Citadel quant",
    swatches: ["#A3FF12", "#22D3EE", "#0B0D0A"],
  },
  {
    id: "vector" as const,
    label: "Vector",
    detail: "Hot orange · arctic — Vercel edge",
    swatches: ["#FF5722", "#06B6D4", "#0B0C0E"],
  },
  {
    id: "solar" as const,
    label: "Solar",
    detail: "Saffron-orange ground · ink — Hermès luxury",
    swatches: ["#FFB800", "#E5005C", "#1A1004"],
  },
  {
    id: "mint" as const,
    label: "Mint",
    detail: "Mint ground · coral — modern fintech",
    swatches: ["#A8F0D4", "#FF6B6B", "#0A2A1A"],
  },
  {
    id: "ultra" as const,
    label: "Ultra",
    detail: "Klein cobalt ground · lime — athletic future-tech",
    swatches: ["#1F4DD6", "#D4FF3A", "#FFFFFF"],
  },
  {
    id: "stadium" as const,
    label: "Stadium",
    detail: "Pitch ground · gold + chalk — football direct",
    swatches: ["#0A6B39", "#FFC233", "#FFFFFF"],
  },
  {
    id: "oxide" as const,
    label: "Oxide",
    detail: "Burnt rust · ink + cream — industrial luxury",
    swatches: ["#A8431A", "#1A0E07", "#FDF7EC"],
  },
  {
    id: "atomic" as const,
    label: "Atomic",
    detail: "Jet · dual neon lime + magenta — cyber peak",
    swatches: ["#CEFF00", "#FF2EBD", "#050505"],
  },
] as const;

export type ColorSchemeId = (typeof SCHEMES)[number]["id"];

const ALLOW: Record<ColorSchemeId, true> = {
  "clara-vista": true,
  pitch: true,
  volt: true,
  aurora: true,
  ember: true,
  quartz: true,
  plasma: true,
  cipher: true,
  nova: true,
  halo: true,
  citrine: true,
  reactor: true,
  vector: true,
  solar: true,
  mint: true,
  ultra: true,
  stadium: true,
  oxide: true,
  atomic: true,
};

function readScheme(): ColorSchemeId {
  if (typeof window === "undefined") return "clara-vista";
  const v = localStorage.getItem(STORAGE_KEY);
  if (v && ALLOW[v as ColorSchemeId]) return v as ColorSchemeId;
  return "clara-vista";
}

function applySchemeToDocument(id: ColorSchemeId) {
  document.documentElement.setAttribute("data-color-scheme", id);
}

function subscribeStore(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => onChange();
  window.addEventListener("storage", handler);
  window.addEventListener(COLOR_STORE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(COLOR_STORE_EVENT, handler);
  };
}

function getServerSnapshot(): ColorSchemeId {
  return "clara-vista";
}

export function ColorCompare() {
  const scheme = useSyncExternalStore(subscribeStore, readScheme, getServerSnapshot);

  useLayoutEffect(() => {
    applySchemeToDocument(scheme);
  }, [scheme]);

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

  const select = (id: ColorSchemeId) => {
    localStorage.setItem(STORAGE_KEY, id);
    applySchemeToDocument(id);
    window.dispatchEvent(new Event(COLOR_STORE_EVENT));
    setOpen(false);
  };

  return (
    <div className="color-compare" ref={wrapRef}>
      <button
        type="button"
        className="color-compare-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="color-compare-list"
        id="color-compare-btn"
        onClick={() => setOpen((o) => !o)}
      >
        Colors
      </button>
      {open ? (
        <div
          className="color-compare-panel"
          id="color-compare-list"
          role="listbox"
          aria-labelledby="color-compare-btn"
        >
          {SCHEMES.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="option"
              aria-selected={scheme === opt.id}
              className={`color-compare-option${scheme === opt.id ? " is-active" : ""}`}
              onClick={() => select(opt.id)}
            >
              <span className="color-compare-swatches" aria-hidden="true">
                {opt.swatches.map((c, i) => (
                  <span
                    key={i}
                    className="color-compare-swatch"
                    style={{ background: c }}
                  />
                ))}
              </span>
              <span className="color-compare-option-text">
                <span className="color-compare-option-label">{opt.label}</span>
                <span className="color-compare-option-detail">{opt.detail}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
