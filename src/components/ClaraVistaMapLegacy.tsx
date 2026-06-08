"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { TEAM_MOMENTS } from "./TeamMoments";

function canvasFontVar(name: "--font-sans" | "--font-serif" | "--font-mono"): string {
  if (typeof document === "undefined") return "sans-serif";
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || "sans-serif";
}

export function ClaraVistaMapLegacy({ embed = false }: { embed?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const embedWrap = wrap;

    const ctx = canvas.getContext("2d")!;

    const canvasEl: HTMLCanvasElement = canvas;

    const cursor = document.getElementById("cursor");
    const tooltip = document.getElementById("tooltip");
    const tCity = document.getElementById("t-city");
    const tClub = document.getElementById("t-club");
    const tTier = document.getElementById("t-tier");
    const tCountry = document.getElementById("t-country");
    const tFlow = document.getElementById("t-flow");
    const loader = document.getElementById("loader");
    /* The Ipswich hover preview is gated by a class on the hero section.
       We toggle it here (instead of in React state) to avoid re-rendering
       the whole map tree every time the cursor crosses a marker. */
    const heroSection = document.querySelector(".hero") as HTMLElement | null;

    const getTheme = () => (document.documentElement.dataset.theme === "day" ? "day" : "night");
    const getPageBg = (): string => {
      const pick = (el: Element | null) => {
        if (!el) return "";
        const bg = getComputedStyle(el).backgroundColor;
        if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") return bg;
        return "";
      };
      if (embed) {
        const fromBanner = pick(document.querySelector(".portfolio-hero-banner"));
        if (fromBanner) return fromBanner;
      }
      const fromHero = pick(document.querySelector(".hero"));
      if (fromHero) return fromHero;
      const fromRoot = pick(document.documentElement);
      if (fromRoot) return fromRoot;
      return getTheme() === "day" ? "rgb(249, 247, 243)" : "rgb(3, 6, 4)";
    };
    let cachedPageBg = "";
    let pageBgDirty = true;
    function invalidatePageBg() {
      pageBgDirty = true;
    }
    function readPageBg() {
      if (pageBgDirty) {
        cachedPageBg = getPageBg();
        pageBgDirty = false;
      }
      return cachedPageBg;
    }
    const getColors = () => {
      if (getTheme() === "day") {
        return {
          spotlight1: "rgba(220, 215, 195, 0.55)",
          spotlight2: "rgba(244, 237, 220, 0)",
          countryFill: "rgba(115, 90, 52, 0.072)",
          countryStroke: "rgba(115, 90, 52, 0.52)",
          countryStrokeStrong: "rgba(115, 90, 52, 0.66)",
          particle: "rgba(26, 37, 32, 0.28)",
          ambientCity: "rgba(26, 37, 32, 0.7)",
          ambientCityHalo: "rgba(115, 90, 52, 0.18)",
          worldCity: "rgba(26, 37, 32, 0.45)",
          worldCityLit: "rgba(115, 90, 52, 0.85)",
          portfolioCore: ["#a88648", "#7f6335", "#634d2c"],
          portfolioGlow: "rgba(166, 131, 74, 0.48)",
          portfolioRing: "rgba(115, 90, 52, 0.72)",
          portfolioPulse: "rgba(115, 90, 52, 0.45)",
          broadcast: "rgba(115, 90, 52, 0.38)",
          broadcastInner: "rgba(115, 90, 52, 0.17)",
          transferLine: "rgba(154, 111, 48, 0.34)",
          transferGlow: "rgba(154, 111, 48, 0.85)",
          labelPrimary: "#1A2520",
          labelSecondary: "rgba(26, 37, 32, 0.62)",
          labelAccent: "#a88648",
        };
      }
      return {
        spotlight1: "rgba(20, 50, 36, 0.45)",
        spotlight2: "rgba(8, 22, 14, 0.20)",
        countryFill: "rgba(168, 134, 72, 0.06)",
        countryStroke: "rgba(168, 134, 72, 0.36)",
        countryStrokeStrong: "rgba(168, 134, 72, 0.48)",
        particle: "rgba(242, 234, 214, 0.26)",
        ambientCity: "rgba(242, 234, 214, 0.78)",
        ambientCityHalo: "rgba(242, 234, 214, 0.32)",
        worldCity: "rgba(242, 234, 214, 0.34)",
        worldCityLit: "rgba(242, 234, 214, 0.95)",
        portfolioCore: ["#c4a876", "#a88648", "#634d2c"],
        portfolioGlow: "rgba(168, 134, 72, 0.56)",
        portfolioRing: "rgba(168, 134, 72, 0.76)",
        portfolioPulse: "rgba(168, 134, 72, 0.45)",
        broadcast: "rgba(168, 134, 72, 0.22)",
        broadcastInner: "rgba(168, 134, 72, 0.10)",
        transferLine: "rgba(212, 168, 106, 0.26)",
        transferGlow: "rgba(232, 197, 71, 0.85)",
        labelPrimary: "#F2EAD6",
        labelSecondary: "rgba(242, 234, 214, 0.62)",
        labelAccent: "#a88648",
      };
    };

    // ---- COUNTRY POLYGONS — (lat, lng pairs) ----
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const COUNTRIES: any[] = [
      {
        name: "UK",
        poly: [
          [50.07, -5.6],
          [50.7, -4.0],
          [50.6, -3.4],
          [50.7, -2.0],
          [50.85, -1.4],
          [50.95, 0.3],
          [51.4, 1.4],
          [51.9, 1.6],
          [52.6, 1.8],
          [53.0, 0.5],
          [53.6, 0.2],
          [54.5, -0.2],
          [55.2, -1.5],
          [55.9, -2.0],
          [56.5, -2.6],
          [57.5, -1.8],
          [58.5, -3.0],
          [58.7, -4.5],
          [58.4, -5.5],
          [57.5, -6.5],
          [56.5, -6.0],
          [55.5, -5.5],
          [54.7, -4.8],
          [54.0, -3.2],
          [53.5, -3.0],
          [52.9, -4.7],
          [51.7, -5.3],
          [51.3, -3.9],
          [50.07, -5.6],
        ],
      },
      {
        name: "Ireland",
        poly: [
          [55.4, -6.0],
          [55.4, -7.5],
          [54.5, -8.5],
          [54.0, -10.0],
          [53.0, -10.0],
          [52.5, -10.0],
          [51.5, -9.5],
          [51.5, -8.0],
          [52.0, -6.5],
          [52.5, -6.0],
          [53.5, -5.7],
          [54.5, -5.5],
          [55.4, -6.0],
        ],
      },
      {
        name: "Portugal",
        poly: [
          [42.0, -8.2],
          [42.0, -8.7],
          [41.5, -8.85],
          [41.0, -8.85],
          [40.5, -8.85],
          [40.0, -8.85],
          [39.4, -9.4],
          [38.7, -9.5],
          [38.0, -8.8],
          [37.0, -8.9],
          [37.0, -7.4],
          [38.0, -7.0],
          [39.5, -7.5],
          [40.0, -7.0],
          [41.0, -7.0],
          [42.0, -8.2],
        ],
      },
      {
        name: "Spain",
        poly: [
          [43.79, -7.96],
          [43.55, -5.5],
          [43.4, -3.7],
          [43.4, -1.8],
          [42.8, 0.6],
          [42.43, 3.27],
          [41.5, 2.2],
          [40.7, 0.7],
          [39.5, -0.3],
          [38.4, -0.5],
          [37.4, -0.7],
          [36.7, -2.1],
          [36.7, -4.5],
          [36.0, -5.6],
          [36.7, -6.4],
          [37.2, -7.4],
          [38.0, -7.0],
          [39.5, -7.5],
          [40.0, -7.0],
          [41.0, -7.0],
          [42.0, -8.2],
          [43.0, -7.7],
          [43.79, -7.96],
        ],
      },
      {
        name: "France",
        poly: [
          [50.95, 1.6],
          [50.5, 2.4],
          [50.2, 4.0],
          [49.5, 5.6],
          [49.0, 7.0],
          [48.0, 7.6],
          [47.4, 7.5],
          [46.5, 7.0],
          [45.7, 6.8],
          [44.5, 7.5],
          [43.7, 7.5],
          [43.4, 6.0],
          [43.0, 4.0],
          [42.5, 3.0],
          [42.6, 1.5],
          [42.95, -0.3],
          [43.4, -1.8],
          [44.5, -1.2],
          [45.5, -1.2],
          [46.4, -1.5],
          [47.5, -2.5],
          [48.4, -4.7],
          [48.7, -3.5],
          [49.4, -1.5],
          [49.7, 0.0],
          [50.0, 1.4],
          [50.95, 1.6],
        ],
      },
      {
        name: "Belgium",
        poly: [
          [51.5, 2.5],
          [51.5, 4.0],
          [51.4, 5.8],
          [50.8, 6.0],
          [50.2, 6.4],
          [49.5, 5.7],
          [49.5, 5.0],
          [50.3, 4.0],
          [50.7, 2.7],
          [51.2, 2.5],
          [51.5, 2.5],
        ],
      },
      {
        name: "Netherlands",
        poly: [
          [53.4, 5.0],
          [53.4, 7.0],
          [52.7, 7.0],
          [52.0, 7.1],
          [51.5, 6.1],
          [51.4, 5.8],
          [51.2, 4.0],
          [51.5, 3.5],
          [52.0, 4.5],
          [52.7, 4.5],
          [53.4, 5.0],
        ],
      },
      {
        name: "Germany",
        poly: [
          [54.5, 8.5],
          [54.6, 9.5],
          [54.5, 11.0],
          [54.0, 12.5],
          [54.5, 14.0],
          [53.5, 14.5],
          [52.0, 14.7],
          [50.8, 14.9],
          [50.0, 14.5],
          [49.0, 13.5],
          [48.5, 13.0],
          [47.7, 12.0],
          [47.5, 10.5],
          [47.5, 9.5],
          [47.6, 7.5],
          [49.0, 7.0],
          [50.2, 6.4],
          [51.4, 5.8],
          [52.0, 7.0],
          [53.4, 7.0],
          [53.7, 8.0],
          [54.5, 8.5],
        ],
      },
      {
        name: "Switzerland",
        poly: [
          [47.6, 9.5],
          [47.5, 10.5],
          [46.5, 10.5],
          [46.0, 9.0],
          [45.9, 7.0],
          [46.5, 6.0],
          [47.4, 6.5],
          [47.5, 7.5],
          [47.6, 9.5],
        ],
      },
      {
        name: "Austria",
        poly: [
          [48.8, 13.0],
          [48.5, 14.0],
          [49.0, 15.0],
          [48.7, 16.5],
          [47.4, 16.5],
          [46.7, 16.0],
          [46.5, 14.5],
          [46.7, 13.0],
          [46.9, 11.0],
          [47.5, 10.5],
          [47.5, 12.0],
          [47.7, 12.0],
          [48.5, 13.0],
          [48.8, 13.0],
        ],
      },
      {
        name: "Italy",
        poly: [
          [46.5, 7.5],
          [46.6, 9.0],
          [46.7, 11.0],
          [46.5, 12.5],
          [46.0, 13.5],
          [45.7, 13.7],
          [45.5, 13.6],
          [44.5, 12.4],
          [43.5, 13.5],
          [42.4, 14.5],
          [41.5, 15.5],
          [41.0, 16.5],
          [40.5, 17.0],
          [40.5, 18.5],
          [40.0, 18.4],
          [39.8, 17.0],
          [38.9, 16.5],
          [37.9, 16.1],
          [38.0, 15.7],
          [38.5, 15.5],
          [39.4, 15.6],
          [40.0, 14.5],
          [40.5, 14.0],
          [41.2, 13.0],
          [42.0, 11.5],
          [43.0, 10.5],
          [43.8, 10.0],
          [44.4, 9.7],
          [44.0, 8.0],
          [44.0, 7.0],
          [45.5, 6.7],
          [46.5, 7.5],
        ],
      },
      { name: "Sicily", poly: [[38.3, 12.4],[38.2, 13.4],[38.1, 14.5],[38.3, 15.6],[37.4, 15.3],[36.7, 14.5],[36.7, 13.5],[37.5, 12.5],[38.3, 12.4]] },
      { name: "Sardinia", poly: [[41.2, 8.4],[41.0, 9.6],[40.0, 9.7],[39.0, 9.5],[39.1, 8.5],[40.0, 8.4],[41.2, 8.4]] },
      { name: "Corsica", poly: [[43.0, 9.4],[42.5, 9.5],[41.5, 9.4],[41.4, 9.0],[42.5, 8.6],[43.0, 9.4]] },
      { name: "Norway", poly: [[58.0, 5.5],[58.5, 5.0],[60.0, 5.0],[61.5, 5.0],[63.0, 8.0],[65.0, 11.0],[67.0, 14.5],[69.0, 17.0],[70.5, 22.0],[71.0, 28.0],[70.0, 30.0],[69.0, 28.0],[68.0, 24.0],[66.0, 19.0],[64.0, 14.0],[62.0, 12.5],[60.5, 12.5],[59.5, 11.5],[59.0, 10.5],[58.0, 5.5]] },
      { name: "Sweden", poly: [[69.0, 18.0],[68.5, 22.5],[67.0, 23.5],[65.5, 24.0],[63.5, 21.0],[60.5, 18.5],[58.0, 17.0],[56.0, 16.0],[55.4, 13.0],[56.0, 12.5],[57.5, 12.0],[59.0, 11.0],[60.5, 12.5],[62.0, 12.5],[64.0, 14.0],[66.0, 16.0],[67.5, 17.5],[69.0, 18.0]] },
      { name: "Finland", poly: [[70.0, 28.0],[70.0, 30.0],[68.0, 28.5],[65.0, 29.5],[62.0, 31.5],[60.5, 28.0],[60.0, 22.0],[62.0, 21.5],[63.5, 22.0],[65.5, 24.0],[67.0, 23.5],[68.5, 22.5],[70.0, 28.0]] },
      { name: "Denmark", poly: [[57.7, 8.5],[57.5, 10.5],[57.0, 11.0],[56.0, 11.0],[55.0, 11.0],[54.6, 9.5],[54.7, 8.5],[55.0, 8.0],[56.5, 8.0],[57.7, 8.5]] },
      { name: "Poland", poly: [[54.5, 14.0],[54.4, 16.5],[54.4, 19.0],[54.3, 22.5],[54.0, 23.0],[52.0, 24.0],[50.5, 24.0],[49.5, 22.5],[49.0, 19.5],[49.5, 17.5],[50.0, 14.5],[51.0, 14.7],[52.0, 14.7],[53.5, 14.5],[54.5, 14.0]] },
      { name: "Czech", poly: [[51.0, 12.0],[51.0, 14.7],[50.0, 14.5],[49.5, 17.5],[48.6, 17.0],[48.6, 16.5],[48.8, 13.0],[49.5, 12.5],[50.5, 12.0],[51.0, 12.0]] },
      { name: "Slovakia", poly: [[49.5, 17.5],[49.5, 22.5],[48.5, 22.5],[48.0, 21.5],[47.7, 18.5],[48.0, 17.0],[48.6, 17.0],[49.5, 17.5]] },
      { name: "Hungary", poly: [[48.5, 16.5],[48.5, 22.5],[48.0, 22.5],[46.0, 22.5],[45.7, 21.0],[45.7, 17.5],[46.5, 16.5],[47.0, 16.0],[48.0, 17.0],[48.5, 16.5]] },
      { name: "Romania", poly: [[48.0, 22.5],[48.5, 26.5],[47.0, 28.5],[45.5, 29.5],[43.7, 28.5],[44.0, 26.0],[44.0, 22.5],[45.0, 21.5],[46.0, 22.5],[48.0, 22.5]] },
      { name: "Bulgaria", poly: [[44.0, 22.5],[44.0, 27.5],[43.7, 28.5],[42.0, 28.0],[41.4, 26.5],[41.4, 23.0],[42.5, 22.5],[44.0, 22.5]] },
      { name: "Greece", poly: [[41.7, 20.5],[41.4, 23.0],[41.4, 26.5],[40.5, 26.0],[40.5, 22.5],[39.5, 23.5],[38.5, 23.5],[38.0, 22.0],[36.5, 22.5],[36.5, 23.5],[36.5, 25.0],[37.5, 27.0],[38.5, 26.5],[39.5, 25.0],[40.0, 22.0],[40.5, 19.5],[41.0, 19.5],[41.7, 20.5]] },
      { name: "Albania", poly: [[42.5, 19.5],[42.0, 20.5],[41.0, 20.5],[40.0, 20.0],[40.5, 19.5],[41.5, 19.3],[42.5, 19.5]] },
      { name: "Croatia", poly: [[46.5, 16.0],[46.5, 18.5],[45.0, 19.0],[44.0, 17.0],[43.5, 15.5],[42.5, 16.5],[43.0, 17.5],[43.0, 18.5],[42.7, 18.5],[42.5, 18.0],[42.4, 16.5],[43.5, 15.5],[44.0, 14.0],[45.0, 13.5],[45.5, 14.0],[46.5, 16.0]] },
      { name: "Serbia", poly: [[46.0, 19.0],[46.0, 21.0],[45.7, 22.5],[44.0, 22.5],[42.5, 22.5],[42.5, 21.5],[42.7, 19.5],[43.5, 19.0],[44.0, 19.0],[45.0, 19.0],[46.0, 19.0]] },
      { name: "Bosnia", poly: [[45.2, 16.0],[45.0, 19.0],[44.0, 19.0],[43.0, 18.5],[42.7, 18.5],[43.0, 17.5],[43.5, 16.5],[44.5, 16.0],[45.2, 16.0]] },
      { name: "Slovenia", poly: [[46.9, 13.5],[46.7, 16.0],[45.5, 16.0],[45.5, 13.5],[46.5, 13.5],[46.9, 13.5]] },
      { name: "Turkey", poly: [[42.0, 26.5],[41.5, 28.0],[41.0, 30.0],[38.0, 30.0],[36.5, 30.0],[36.0, 28.0],[37.0, 26.5],[38.5, 26.5],[39.5, 26.5],[40.5, 26.0],[41.4, 26.5],[42.0, 26.5]] },
      { name: "Estonia", poly: [[59.5, 22.0],[59.6, 24.0],[59.5, 28.0],[58.0, 28.0],[57.5, 27.5],[57.5, 24.0],[57.5, 22.0],[59.5, 22.0]] },
      { name: "Latvia", poly: [[57.5, 21.0],[57.5, 22.0],[57.5, 24.0],[57.5, 27.5],[56.5, 27.5],[55.7, 26.5],[55.7, 21.0],[57.5, 21.0]] },
      { name: "Lithuania", poly: [[55.7, 21.0],[55.7, 26.5],[55.0, 26.5],[54.0, 25.0],[54.0, 23.5],[54.5, 21.0],[55.7, 21.0]] },
    ];

    // ---- WORLD CONTEXT REGIONS — low-fidelity continent polygons (lat, lng pairs).
    // Same hit-test pipeline as COUNTRIES (whichCountry / pointInPolygonLL), but
    // rendered into DOTS at a coarser step and dimmer alpha so Europe stays the
    // hero and the rest of the world reads as supporting context once the user
    // drags the map. Polygons are intentionally rough — the stipple density
    // does the visual work, not vertex precision. ----
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const WORLD_REGIONS: any[] = [
      {
        name: "North America",
        // Coastline-accurate polygon using real anchor lat/lng for ~40
        // capes and coastal cities. Vs the previous version this fixes
        // the Hudson Bay / James Bay / Labrador stretch — earlier
        // vertices like (55,-82) and (60,-68) sat in open water, which
        // visibly inflated the eastern Canadian silhouette. Mexico's
        // Pacific stretch and the Panama isthmus also get more honest
        // anchors. Vertices trace: Arctic (Pt Barrow → Boothia →
        // Hudson Bay) → Labrador → Atlantic seaboard → Gulf of Mexico
        // → Central America (Caribbean side, then Pacific side) → Baja
        // → Pacific NA → Alaska → close.
        poly: [
          [71.4, -156.5], // Pt Barrow, Alaska
          [69.6, -141.0], // Yukon-AK border (Beaufort coast)
          [69.4, -133.0], // Mackenzie delta (Tuktoyaktuk)
          [68.0, -113.0], // Coronation Gulf
          [68.5, -95.0],  // Boothia Peninsula S
          [66.5, -86.0],  // Repulse Bay
          [61.1, -94.1],  // Arviat / W Hudson Bay
          [58.8, -94.2],  // Churchill (Manitoba)
          [55.0, -85.0],  // Polar Bear Park (Ontario N coast)
          [51.3, -80.6],  // Moosonee (S James Bay)
          [55.0, -78.0],  // E James Bay (Quebec)
          [58.5, -77.5],  // Cap Wolstenholme (Nunavik NW tip)
          [60.0, -65.0],  // Ungava S coast
          [55.0, -60.0],  // Labrador (Goose Bay approach)
          [51.5, -55.7],  // S Labrador (Cartwright)
          [46.7, -53.1],  // Cape Race, Newfoundland
          [44.7, -63.6],  // Halifax
          [40.7, -74.0],  // NYC
          [33.0, -79.4],  // Cape Romain (SC)
          [26.7, -80.0],  // Palm Beach (S Florida E)
          [25.1, -80.4],  // Key Largo
          [29.7, -85.0],  // Apalachicola (FL panhandle)
          [29.3, -94.8],  // Galveston (Texas)
          [22.2, -97.9],  // Tampico (Mexico E)
          [19.2, -96.1],  // Veracruz
          [17.5, -88.2],  // Belize City
          [10.0, -83.0],  // Limón (Costa Rica)
          [8.1, -78.4],   // Punta Garachiné (Panama E)
          [8.0, -82.0],   // Pacific Panama
          [12.0, -86.0],  // San Juan del Sur (Pacific Nicaragua)
          [14.0, -91.0],  // Pacific Guatemala (Champerico)
          [16.9, -99.9],  // Acapulco
          [23.2, -106.4], // Mazatlán
          [27.9, -115.0], // Punta Eugenia (Baja W)
          [36.6, -121.9], // Monterey
          [42.8, -124.6], // Cape Blanco (Oregon)
          [48.4, -124.7], // Cape Flattery (WA)
          [54.3, -130.3], // Prince Rupert (BC)
          [60.5, -145.8], // Cordova (Alaska south-central)
          [58.7, -157.0], // Naknek (Alaska Peninsula)
          [64.5, -165.4], // Nome (Bering Sea)
          [66.9, -162.6], // Kotzebue (NW Alaska)
          [71.4, -156.5], // close at Pt Barrow
        ],
      },
      {
        name: "Greenland",
        poly: [
          [80, -28], [82, -22], [80, -18], [74, -22], [68, -28], [62, -42],
          [60, -50], [66, -52], [72, -55], [78, -45], [80, -28],
        ],
      },
      {
        name: "South America",
        // Coastline-accurate polygon using real anchor lat/lng for major
        // capes and coastal cities. The previous version had a vertex at
        // [12, -60] which sits in open Caribbean ocean east of Venezuela
        // and skipped the entire Guianas coastline; it also overshot the
        // mid-Atlantic Brazil coast and approximated Patagonia. Vertices
        // here trace: N Colombia → Caribbean Venezuela → the Guianas →
        // NE Brazil corner → SE Brazil → Río de la Plata → Argentine
        // Patagonia → Cape Horn → Chilean Pacific → Peru → Ecuador →
        // Colombia Pacific → close at Cartagena.
        poly: [
          [12.0, -72.0],   // Cabo de la Vela (N Colombia / La Guajira)
          [10.6, -66.9],   // Caracas
          [10.7, -61.6],   // Trinidad approach (Paria peninsula)
          [8.6, -58.2],    // Georgetown (Guyana)
          [5.8, -55.2],    // Paramaribo (Suriname)
          [4.9, -52.3],    // Cayenne (French Guiana)
          [2.0, -50.6],    // Amazon delta (Macapá)
          [-2.5, -44.3],   // São Luís (Maranhão)
          [-5.1, -35.2],   // Natal (Brazilian E corner)
          [-8.0, -34.9],   // Recife
          [-12.9, -38.5],  // Salvador
          [-18.0, -39.5],  // Caravelas (E Brazil)
          [-22.9, -43.2],  // Rio de Janeiro
          [-25.4, -48.5],  // Paranaguá
          [-32.0, -52.1],  // Pelotas / Rio Grande do Sul
          [-34.9, -56.2],  // Montevideo
          [-38.0, -57.5],  // Mar del Plata
          [-43.0, -65.0],  // Comodoro Rivadavia approach
          [-50.0, -68.5],  // S Patagonia E
          [-54.8, -68.3],  // Cape Horn / Ushuaia (true S America tip)
          [-53.2, -72.5],  // Punta Arenas (Pacific Patagonia)
          [-46.5, -75.5],  // Pacific Chile (Aysén channels)
          [-41.5, -73.0],  // Puerto Montt
          [-36.8, -73.0],  // Concepción
          [-30.0, -71.4],  // La Serena
          [-23.6, -70.4],  // Antofagasta
          [-18.5, -70.3],  // Arica
          [-12.1, -77.0],  // Lima (Callao)
          [-5.1, -81.1],   // Piura (NW Peru)
          [-2.2, -80.9],   // Ecuador (Salinas / Guayas)
          [1.2, -78.8],    // Tumaco (S Colombia Pacific)
          [3.9, -77.0],    // Buenaventura
          [7.9, -77.0],    // Darién Gap (Panama border)
          [9.5, -75.5],    // Cartagena
          [11.5, -73.0],   // Santa Marta
          [12.0, -72.0],   // close at La Guajira
        ],
      },
      {
        name: "Africa",
        // Coastline-accurate polygon for Africa using REAL anchor lat/lng for
        // ~50 capes, ports, and coastal cities. Earlier iterations carried a
        // 1–2° artistic southward shift on the Mediterranean coast to make
        // the Gibraltar gap more visible at this zoom — that shift visibly
        // chopped off the top of Tunisia (Cap Bon, the real African
        // northernmost mainland point at lat 37.1°N, was rendered at 35.5°N,
        // i.e. ~40px below where it should sit), so it's been removed.
        //
        // Vertices follow the actual coastline: Cap Spartel → Mediterranean
        // coast (Morocco / Algeria / Tunisia / Libya / Egypt) → Suez → Red
        // Sea → Horn of Africa → East Africa → Cape of Good Hope → Atlantic
        // West Africa → back up to Cap Spartel. The Strait of Gibraltar
        // renders as a true ~5px sliver because that is its true geographic
        // proportion at Europe's projection scale (14km in reality).
        poly: [
          [35.8, -5.9],   // Cap Spartel — Tangier (true African NW corner)
          [35.4, -2.4],   // Mediterranean Morocco (Nador)
          [35.5, 0.0],    // Oran (W Algeria)
          [36.5, 2.9],    // Cap Tenès
          [36.8, 5.0],    // Algiers
          [36.9, 7.8],    // Annaba (E Algeria)
          [37.3, 9.9],    // Bizerte (true African northernmost)
          [37.1, 11.0],   // Cap Bon
          [35.9, 11.0],   // Hammamet (Tunisia E)
          [33.9, 11.1],   // Gulf of Gabes
          [32.9, 13.2],   // Tripoli
          [32.4, 15.3],   // Misrata
          [31.2, 16.6],   // Sirte
          [31.8, 19.9],   // Benghazi
          [32.1, 23.9],   // Tobruk
          [31.5, 26.9],   // Marsa Matruh
          [31.2, 29.9],   // Alexandria
          [31.3, 32.3],   // Port Said
          [30.0, 32.6],   // Suez
          [28.0, 34.5],   // Sinai south tip
          [22.0, 36.5],   // Red Sea (Egypt mid)
          [16.0, 39.0],   // Port Sudan
          [12.0, 43.0],   // Djibouti
          [11.8, 51.3],   // Cape Guardafui (Horn)
          [4.0, 47.0],    // Somalia central E coast
          [-1.0, 41.5],   // S Somalia
          [-6.8, 39.3],   // Dar es Salaam
          [-15.0, 40.7],  // N Mozambique
          [-19.0, 36.0],  // Beira
          [-25.9, 32.6],  // Maputo
          [-29.9, 31.0],  // Durban
          [-32.7, 28.0],  // East London
          [-34.4, 22.5],  // Cape Agulhas (true African S tip)
          [-34.4, 18.5],  // Cape Point
          [-32.0, 18.4],  // Saldanha W coast
          [-25.0, 14.5],  // Walvis Bay (Namibia)
          [-18.0, 11.7],  // S Angola
          [-8.8, 13.2],   // Luanda
          [-5.8, 11.7],   // Pointe-Noire
          [-1.0, 9.3],    // Port-Gentil
          [3.7, 8.8],     // Cameroon (Douala area)
          [4.0, 6.0],     // Niger Delta
          [6.5, 3.4],     // Lagos
          [5.6, 0.0],     // Accra (Ghana)
          [5.3, -4.0],    // Abidjan
          [6.5, -8.5],    // Liberia
          [8.5, -13.2],   // Conakry
          [12.6, -16.5],  // Banjul (Gambia)
          [14.7, -17.5],  // Dakar (Cap-Vert peninsula)
          [20.9, -17.0],  // Nouakchott
          [27.1, -13.2],  // Western Sahara coast
          [30.4, -9.6],   // Agadir
          [33.6, -7.6],   // Casablanca
          [35.0, -6.0],   // Asilah
          [35.8, -5.9],   // close at Cap Spartel
        ],
      },
      {
        name: "Middle East",
        poly: [
          [38, 32], [38, 42], [36, 50], [34, 56], [28, 60], [22, 60],
          [16, 56], [13, 48], [14, 42], [20, 36], [28, 33], [34, 32],
          [38, 32],
        ],
      },
      {
        name: "Asia",
        // Western boundary pushed from lng 38 → 28 so the bleed sliver
        // immediately east of Europe (Caucasus / western Russia / Caspian,
        // ~lng 32–38) actually has dots generated for it. Points already
        // covered by an EU country polygon are skipped by the pass-2 loop,
        // so overlapping into the European map is safe — Europe wins.
        poly: [
          [60, 28], [68, 35], [74, 50], [76, 72], [76, 110], [73, 140],
          [68, 170], [62, 175], [56, 165], [50, 150], [44, 142], [40, 140],
          [34, 138], [30, 132], [25, 122], [18, 110], [14, 106],
          [10, 102], [4, 102], [0, 110], [-2, 116], [-6, 120], [-8, 130],
          [-9, 142], [-2, 134], [4, 124], [12, 116], [18, 108], [22, 96],
          [25, 88], [28, 80], [32, 72], [38, 66], [42, 56], [48, 46],
          [54, 38], [60, 28],
        ],
      },
      {
        name: "Oceania",
        poly: [
          [-10, 113], [-12, 130], [-14, 142], [-22, 150], [-30, 154],
          [-38, 150], [-40, 144], [-37, 138], [-34, 128], [-32, 118],
          [-26, 114], [-18, 112], [-12, 112], [-10, 113],
        ],
        // New Zealand approximated as a second loose loop. The polygon
        // hit-test wraps around correctly via its starting point.
      },
      {
        name: "New Zealand",
        poly: [
          [-34, 172], [-36, 174], [-40, 176], [-44, 174], [-46, 168],
          [-44, 166], [-40, 170], [-34, 172],
        ],
      },
    ];

    // ---- AMBER MARKET TAILWINDS — six geographic callouts on context continents.
    // These are intentionally placeholder facts pending Alara's fact-check; keep
    // the data array shape stable so copy edits are a one-line change. ----
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AMBER_TAILWINDS: any[] = [
      { name: "North America", lat: 39.8, lng: -98.6, fact: "$10B+", label: "MLS media rights tier" },
      { name: "Latin America", lat: -15.8, lng: -47.9, fact: "600M", label: "Spanish-speaking audience" },
      { name: "Africa", lat: 6.5, lng: 3.4, fact: "Fastest-growing", label: "football market" },
      { name: "Asia", lat: 30.0, lng: 114.0, fact: "2.4B", label: "Football fans across Asia" },
      { name: "Middle East", lat: 24.7, lng: 46.7, fact: "$220B", label: "Gulf sports infrastructure" },
      { name: "Oceania", lat: -33.9, lng: 151.2, fact: "2M+", label: "Women's WC attendance" },
    ];

    // ---- CITIES ----
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const PORTFOLIO: any[] = [
      {
        name: "Ipswich",
        country: "GB",
        lat: 52.06,
        lng: 1.16,
        label: "Ipswich",
        club: "Ipswich Town FC · founded 1878",
        league: "Premier League",
        status: "Active",
        kind: "closed",
        num: "01",
        logo: "/ipswich-town.svg",
      },
      {
        name: "Spain",
        country: "ES",
        lat: 40.4,
        lng: -3.7,
        label: "Spain",
        club: "Target acquisition · active diligence",
        league: "La Liga",
        status: "Diligence",
        kind: "diligence",
        num: "02",
      },
      {
        name: "Frosinone",
        country: "IT",
        lat: 41.64,
        lng: 13.35,
        label: "Frosinone",
        club: "Frosinone Calcio · founded 1928",
        league: "Serie A",
        status: "Active",
        kind: "closed",
        num: "03",
        logo: "/frosinone-calcio.png",
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AMBIENT: any[] = [
      { name: "London", country: "GB", lat: 51.5, lng: -0.1, club: "Premier League heart" },
      { name: "Manchester", country: "GB", lat: 53.5, lng: -2.2, club: "United · City" },
      { name: "Liverpool", country: "GB", lat: 53.4, lng: -3.0, club: "Liverpool FC · Everton" },
      { name: "Brighton", country: "GB", lat: 50.82, lng: -0.14, club: "The Bloom playbook" },
      { name: "Newcastle", country: "GB", lat: 54.97, lng: -1.6, club: "Newcastle United" },
      { name: "Madrid", country: "ES", lat: 40.42, lng: -3.71, club: "Real · Atlético" },
      { name: "Barcelona", country: "ES", lat: 41.4, lng: 2.2, club: "FC Barcelona" },
      { name: "Seville", country: "ES", lat: 37.4, lng: -5.99, club: "Sevilla · Real Betis" },
      { name: "Bilbao", country: "ES", lat: 43.26, lng: -2.93, club: "Athletic Bilbao" },
      { name: "Lisbon", country: "PT", lat: 38.72, lng: -9.14, club: "Benfica · Sporting" },
      { name: "Porto", country: "PT", lat: 41.16, lng: -8.6, club: "FC Porto" },
      { name: "Paris", country: "FR", lat: 48.85, lng: 2.35, club: "Paris Saint-Germain" },
      { name: "Marseille", country: "FR", lat: 43.3, lng: 5.4, club: "Olympique de Marseille" },
      { name: "Lyon", country: "FR", lat: 45.75, lng: 4.85, club: "Olympique Lyonnais" },
      { name: "Munich", country: "DE", lat: 48.13, lng: 11.58, club: "Bayern München" },
      { name: "Dortmund", country: "DE", lat: 51.51, lng: 7.47, club: "Borussia Dortmund" },
      { name: "Berlin", country: "DE", lat: 52.52, lng: 13.4, club: "Hertha · Union Berlin" },
      { name: "Leverkusen", country: "DE", lat: 51.04, lng: 6.99, club: "Bayer 04" },
      { name: "Amsterdam", country: "NL", lat: 52.37, lng: 4.9, club: "AFC Ajax" },
      { name: "Brussels", country: "BE", lat: 50.85, lng: 4.35, club: "Anderlecht · Union SG" },
      { name: "Milan", country: "IT", lat: 45.46, lng: 9.19, club: "AC Milan · Inter" },
      { name: "Turin", country: "IT", lat: 45.07, lng: 7.69, club: "Juventus · Torino" },
      { name: "Bergamo", country: "IT", lat: 45.7, lng: 9.67, club: "Atalanta BC" },
      { name: "Bologna", country: "IT", lat: 44.49, lng: 11.34, club: "Bologna FC" },
      { name: "Naples", country: "IT", lat: 40.85, lng: 14.27, club: "SSC Napoli" },
      { name: "Glasgow", country: "GB", lat: 55.86, lng: -4.25, club: "Celtic · Rangers" },
      { name: "Vienna", country: "AT", lat: 48.21, lng: 16.37, club: "Rapid · Austria" },
      { name: "Athens", country: "GR", lat: 37.98, lng: 23.73, club: "Olympiacos · AEK" },
      { name: "Istanbul", country: "TR", lat: 41.01, lng: 28.97, club: "Galatasaray · Fenerbahçe" },
      { name: "Copenhagen", country: "DK", lat: 55.68, lng: 12.57, club: "FC København" },
      { name: "Zagreb", country: "HR", lat: 45.81, lng: 15.97, club: "Dinamo Zagreb" },
      { name: "Stockholm", country: "SE", lat: 59.33, lng: 18.07, club: "Allsvenskan" },
      { name: "Oslo", country: "NO", lat: 59.91, lng: 10.75, club: "Eliteserien" },
      { name: "Warsaw", country: "PL", lat: 52.23, lng: 21.01, club: "Ekstraklasa" },
    ];

    // WORLD — global football hotspots outside Europe. All lat/lng are city-
    // centre coordinates (WGS84). Rendered smaller/dimmer than AMBIENT but
    // with globe-wrap tiling so they appear when the user pans to each
    // continent. South America is intentionally dense — it was under-
    // represented vs other regions.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const WORLD: any[] = [
      // ---- North America (8) ----
      { name: "New York", country: "US", lat: 40.7128, lng: -74.006, club: "NYCFC · NY Red Bulls" },
      { name: "Toronto", country: "CA", lat: 43.6532, lng: -79.3832, club: "Toronto FC" },
      { name: "Los Angeles", country: "US", lat: 34.0522, lng: -118.2437, club: "LAFC · LA Galaxy" },
      { name: "Chicago", country: "US", lat: 41.8781, lng: -87.6298, club: "Chicago Fire FC" },
      { name: "Atlanta", country: "US", lat: 33.749, lng: -84.388, club: "Atlanta United FC" },
      { name: "Miami", country: "US", lat: 25.7617, lng: -80.1918, club: "Inter Miami CF" },
      { name: "Mexico City", country: "MX", lat: 19.4326, lng: -99.1332, club: "Club América · Cruz Azul" },
      { name: "Guadalajara", country: "MX", lat: 20.6597, lng: -103.3496, club: "Chivas · Atlas" },

      // ---- South America (17) — dense coverage along the continent ----
      { name: "Bogotá", country: "CO", lat: 4.711, lng: -74.0721, club: "Millonarios · Santa Fe" },
      { name: "Medellín", country: "CO", lat: 6.2476, lng: -75.5658, club: "Atlético Nacional · Independiente" },
      { name: "Caracas", country: "VE", lat: 10.4806, lng: -66.9036, club: "Caracas FC · Deportivo Táchira" },
      { name: "Quito", country: "EC", lat: -0.1807, lng: -78.4678, club: "LDU Quito · Barcelona SC" },
      { name: "Lima", country: "PE", lat: -12.0464, lng: -77.0428, club: "Alianza Lima · Universitario" },
      { name: "Brasília", country: "BR", lat: -15.7939, lng: -47.8828, club: "Brasília FC hub" },
      { name: "Salvador", country: "BR", lat: -12.9714, lng: -38.5014, club: "Bahia · Vitória" },
      { name: "Belo Horizonte", country: "BR", lat: -19.9167, lng: -43.9345, club: "Atlético Mineiro · Cruzeiro" },
      { name: "São Paulo", country: "BR", lat: -23.5505, lng: -46.6333, club: "Corinthians · Palmeiras" },
      { name: "Rio de Janeiro", country: "BR", lat: -22.9068, lng: -43.1729, club: "Flamengo · Fluminense" },
      { name: "Porto Alegre", country: "BR", lat: -30.0346, lng: -51.2177, club: "Grêmio · Internacional" },
      { name: "Buenos Aires", country: "AR", lat: -34.6037, lng: -58.3816, club: "Boca Juniors · River Plate" },
      { name: "Córdoba", country: "AR", lat: -31.4201, lng: -64.1888, club: "Talleres · Belgrano" },
      { name: "Santiago", country: "CL", lat: -33.4489, lng: -70.6693, club: "Colo-Colo · U de Chile" },
      { name: "Montevideo", country: "UY", lat: -34.9011, lng: -56.1645, club: "Nacional · Peñarol" },
      { name: "La Paz", country: "BO", lat: -16.4897, lng: -68.1193, club: "Bolívar · The Strongest" },
      { name: "Asunción", country: "PY", lat: -25.2637, lng: -57.5759, club: "Olimpia · Cerro Porteño" },

      // ---- Africa (10) ----
      { name: "Casablanca", country: "MA", lat: 33.5731, lng: -7.5898, club: "Wydad · Raja Casablanca" },
      { name: "Tunis", country: "TN", lat: 36.8065, lng: 10.1815, club: "Espérance · Club Africain" },
      { name: "Cairo", country: "EG", lat: 30.0444, lng: 31.2357, club: "Al Ahly · Zamalek" },
      { name: "Dakar", country: "SN", lat: 14.7167, lng: -17.4677, club: "Génération Foot" },
      { name: "Accra", country: "GH", lat: 5.6037, lng: -0.187, club: "Hearts of Oak · Asante Kotoko" },
      { name: "Lagos", country: "NG", lat: 6.5244, lng: 3.3792, club: "Enyimba · Rangers Int'l" },
      { name: "Kinshasa", country: "CD", lat: -4.4419, lng: 15.2663, club: "TP Mazembe · Vita Club" },
      { name: "Nairobi", country: "KE", lat: -1.2921, lng: 36.8219, club: "Gor Mahia · AFC Leopards" },
      { name: "Johannesburg", country: "ZA", lat: -26.2041, lng: 28.0473, club: "Kaizer Chiefs · Orlando Pirates" },
      { name: "Cape Town", country: "ZA", lat: -33.9249, lng: 18.4241, club: "Cape Town City FC" },

      // ---- Middle East (3) ----
      { name: "Riyadh", country: "SA", lat: 24.7136, lng: 46.6753, club: "Al-Nassr · Al-Hilal" },
      { name: "Dubai", country: "AE", lat: 25.2048, lng: 55.2708, club: "Al Ain · Shabab Al Ahli" },
      { name: "Tehran", country: "IR", lat: 35.6892, lng: 51.389, club: "Persepolis · Esteghlal" },

      // ---- Asia (15) ----
      { name: "Moscow", country: "RU", lat: 55.7558, lng: 37.6173, club: "Spartak · CSKA Moscow" },
      { name: "Mumbai", country: "IN", lat: 19.076, lng: 72.8777, club: "Mumbai City FC" },
      { name: "Delhi", country: "IN", lat: 28.6139, lng: 77.209, club: "Delhi FC · ISL" },
      { name: "Kolkata", country: "IN", lat: 22.5726, lng: 88.3639, club: "Mohun Bagan · East Bengal" },
      { name: "Beijing", country: "CN", lat: 39.9042, lng: 116.4074, club: "Beijing Guoan" },
      { name: "Shanghai", country: "CN", lat: 31.2304, lng: 121.4737, club: "Shanghai Port" },
      { name: "Guangzhou", country: "CN", lat: 23.1291, lng: 113.2644, club: "Guangzhou FC" },
      { name: "Hong Kong", country: "HK", lat: 22.3193, lng: 114.1694, club: "Eastern · Kitchee" },
      { name: "Bangkok", country: "TH", lat: 13.7563, lng: 100.5018, club: "Buriram United" },
      { name: "Singapore", country: "SG", lat: 1.3521, lng: 103.8198, club: "Lion City Sailors" },
      { name: "Jakarta", country: "ID", lat: -6.2088, lng: 106.8456, club: "Persija · Persib" },
      { name: "Manila", country: "PH", lat: 14.5995, lng: 120.9842, club: "Ceres · Azkals" },
      { name: "Seoul", country: "KR", lat: 37.5665, lng: 126.978, club: "FC Seoul · Jeonbuk" },
      { name: "Tokyo", country: "JP", lat: 35.6762, lng: 139.6503, club: "Urawa Reds · FC Tokyo" },
      { name: "Osaka", country: "JP", lat: 34.6937, lng: 135.5023, club: "Gamba Osaka · Cerezo" },

      // ---- Oceania (3) ----
      { name: "Sydney", country: "AU", lat: -33.8688, lng: 151.2093, club: "Sydney FC" },
      { name: "Melbourne", country: "AU", lat: -37.8136, lng: 144.9631, club: "Melbourne Victory" },
      { name: "Auckland", country: "NZ", lat: -36.8485, lng: 174.7633, club: "Auckland FC" },
    ];

    const ALL_EU = [...PORTFOLIO, ...AMBIENT];
    PORTFOLIO.forEach((c) => {
      c.tier = "P";
    });
    const portfolioLogoImages: Record<string, HTMLImageElement> = {};
    PORTFOLIO.forEach((c) => {
      const src = c.logo as string | undefined;
      if (src && !portfolioLogoImages[src]) {
        const im = new Image();
        im.src = src;
        portfolioLogoImages[src] = im;
      }
    });
    AMBIENT.forEach((c) => {
      c.tier = "A";
    });
    WORLD.forEach((c) => {
      c.tier = "W";
    });

    const BOUNDS = { minLng: -11, maxLng: 32, minLat: 35.5, maxLat: 60 };

    // ---- CANVAS ----
    let W = 0;
    let H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    // Camera framing:
    // - Desktop: slight right/up nudge so Europe doesn't sit under the headline.
    // - Mobile: center + zoom the Europe bounds so portfolio dots don't collapse together.
    const DESKTOP_MAP_SHIFT_X = embed ? 0.14 : 0.12; // proportion of viewport width
    const DESKTOP_MAP_SHIFT_Y = embed ? 0.18 : -0.02; // proportion of viewport height (negative = up)

    let proj = { ox: 0, oy: 0, drawW: 0, drawH: 0 };
    function computeProjection() {
      const isMobile = W <= 720;
      const widthFactor = embed ? (isMobile ? 0.80 : 0.60) : isMobile ? 1.06 : 0.62;
      const targetWidth = isMobile ? Math.min(W * widthFactor, 760) : Math.min(W * widthFactor, embed ? 980 : 1100);
      const lngRange = BOUNDS.maxLng - BOUNDS.minLng;
      const latRange = BOUNDS.maxLat - BOUNDS.minLat;
      const meanLatCos = Math.cos(((BOUNDS.maxLat + BOUNDS.minLat) / 2) * Math.PI / 180);
      const dataAspect = (lngRange / latRange) * meanLatCos * 1.4;

      let drawW = targetWidth;
      let drawH = drawW / dataAspect;
      const maxH = isMobile ? H * (embed ? 0.62 : 0.72) : H * (embed ? 0.68 : 0.78);
      if (drawH > maxH) {
        drawH = maxH;
        drawW = drawH * dataAspect;
      }
      // Mobile framing notes:
      // - Push Europe up so northern latitudes crop out (focus: UK/Spain/Italy triangle).
      // - Lift further so the southern markers (Spain/Italy) clear the bottom-sheet
      //   "DATA-DRIVEN SPORTS INVESTMENT" tagline instead of brushing it.
      // - Nudge right so Spain has left breathing room.
      const shiftX = isMobile ? (embed ? 0.10 : 0.06) : DESKTOP_MAP_SHIFT_X;
      const shiftY = isMobile ? (embed ? 0.34 : -0.19) : DESKTOP_MAP_SHIFT_Y;
      const ox = (W - drawW) / 2 + W * shiftX;
      const oy = (H - drawH) / 2 - H * 0.04 + H * shiftY;
      proj = { ox, oy, drawW, drawH };
    }

    function project(lat: number, lng: number) {
      const { ox, oy, drawW, drawH } = proj;
      const x = ox + ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * drawW;
      const y = oy + ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * drawH;
      return { x, y };
    }

    const PORTFOLIO_COUNTRIES = new Set(["UK", "Italy", "Spain"]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DOTS: any[] = [];

    function pointInPolygonLL(lat: number, lng: number, poly: [number, number][]) {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [latI, lngI] = poly[i];
        const [latJ, lngJ] = poly[j];
        const intersect =
          latI > lat !== latJ > lat && lng < ((lngJ - lngI) * (lat - latI)) / (latJ - latI) + lngI;
        if (intersect) inside = !inside;
      }
      return inside;
    }

    // ---- POLYGON BOUNDING-BOX CACHE ----
    // buildDotMap iterates ~830k (lat, lng) grid points across the world and
    // tests each against every COUNTRIES polygon (~30) and WORLD_REGIONS
    // polygon (~8). Without a cull this is 830k × 38 × ~30 verts ≈ ~950M
    // arithmetic ops on every resize — enough to lock the main thread for
    // several seconds on first paint.
    //
    // The fix: precompute a lat/lng bounding box per polygon and short-
    // circuit the full point-in-polygon test whenever the candidate point
    // sits outside the bbox. In practice fewer than 3 polygons of either
    // set contain any given grid point, so the inner cost collapses from
    // ~38 full poly-checks to ~38 bbox-checks + 2-3 full ones — order-of-
    // magnitude speedup on resize / initial paint without changing visuals.
    type PolyEntry = { name: string; poly: [number, number][];
      bboxMinLat: number; bboxMaxLat: number; bboxMinLng: number; bboxMaxLng: number;
    };
    function computePolyBBox(entry: { poly: [number, number][] } & Record<string, unknown>) {
      let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
      const poly = entry.poly;
      for (let i = 0; i < poly.length; i++) {
        const [la, ln] = poly[i];
        if (la < minLat) minLat = la;
        if (la > maxLat) maxLat = la;
        if (ln < minLng) minLng = ln;
        if (ln > maxLng) maxLng = ln;
      }
      (entry as Record<string, unknown>).bboxMinLat = minLat;
      (entry as Record<string, unknown>).bboxMaxLat = maxLat;
      (entry as Record<string, unknown>).bboxMinLng = minLng;
      (entry as Record<string, unknown>).bboxMaxLng = maxLng;
    }
    COUNTRIES.forEach(computePolyBBox);
    WORLD_REGIONS.forEach(computePolyBBox);

    function whichCountry(lat: number, lng: number) {
      for (let i = 0; i < COUNTRIES.length; i++) {
        const c = COUNTRIES[i] as PolyEntry;
        if (
          lat < c.bboxMinLat || lat > c.bboxMaxLat ||
          lng < c.bboxMinLng || lng > c.bboxMaxLng
        ) continue;
        if (pointInPolygonLL(lat, lng, c.poly)) return c.name;
      }
      return null;
    }

    function whichWorldRegion(lat: number, lng: number) {
      for (let i = 0; i < WORLD_REGIONS.length; i++) {
        const r = WORLD_REGIONS[i] as PolyEntry;
        if (
          lat < r.bboxMinLat || lat > r.bboxMaxLat ||
          lng < r.bboxMinLng || lng > r.bboxMaxLng
        ) continue;
        if (pointInPolygonLL(lat, lng, r.poly)) return r.name;
      }
      return null;
    }

    // Number of Europe (non-context) dots at the start of the DOTS array.
    // buildDotMap pushes Europe-country dots (pass 1) FIRST and context
    // continent dots (pass 2) SECOND, so DOTS[0..euDotCount-1] is the
    // animated Europe layer and DOTS[euDotCount..] is the static context
    // layer. The render loop uses this split to (a) skip context dots in
    // the per-frame wave/proximity work (they're rendered as a static
    // batched Path2D) and (b) iterate only the Europe slice when resetting
    // waveBoost or computing wave ripples — large perf win when the global
    // DOTS array is ~250k+ entries but only ~10k of those animate.
    let euDotCount = 0;

    // Latest stipple metrics — updated on every resize inside buildDotMap so
    // the render loop can size context dots consistently with grid density.
    const stippleMetrics = {
      stepLat: 0.2,
      stepLng: 0.28,
      jitterEu: 1.4,
      jitterCtx: 1.8,
      contextDotPx: 0.96,
    };

    // Stipple grid step in degrees, derived from how many CSS pixels each
    // degree spans at the current projection. Mobile zooms Europe to ~full
    // viewport width (drawW ≈ W) while desktop uses ~62% width — same fixed
    // 0.2°/0.28° step therefore packs ~2× tighter on phones. Industry
    // pattern (Mapbox/Google density scaling): hold target screen spacing
    // constant and widen the lat/lng step as px/degree grows.
    function computeStippleStep() {
      const lngRange = BOUNDS.maxLng - BOUNDS.minLng;
      const latRange = BOUNDS.maxLat - BOUNDS.minLat;
      const pxPerLng = proj.drawW / lngRange;
      const pxPerLat = proj.drawH / latRange;

      const isSmallMobile = W <= 400;
      const isMobile = W <= 720;
      const isTablet = W > 720 && W <= 1024;
      // Center-to-center spacing (CSS px). Mobile stays a touch looser than
      // desktop (fillRects read heavier) but close enough to feel consistent.
      const targetSpacingPx = isSmallMobile
        ? 6.25
        : isMobile
          ? 5.75
          : isTablet
            ? 5.1
            : 4.75;

      // Never denser than the original desktop calibration on large screens.
      const DESKTOP_STEP_LAT = 0.2;
      const DESKTOP_STEP_LNG = 0.28;

      const stepLat = Math.max(DESKTOP_STEP_LAT, targetSpacingPx / pxPerLat);
      const stepLng = Math.max(DESKTOP_STEP_LNG, targetSpacingPx / pxPerLng);

      // When the grid coarsens, shrink jitter so dots don't visually merge.
      const densityRatio = Math.min(1, DESKTOP_STEP_LNG / stepLng);
      const jitterEu = 1.4 * Math.sqrt(densityRatio);
      const jitterCtx = 1.8 * Math.sqrt(densityRatio);
      const contextDotPx = Math.min(0.96, 0.76 + 0.2 * densityRatio);

      return { stepLat, stepLng, jitterEu, jitterCtx, contextDotPx };
    }

    const EU_STIPPLE_LAT_MIN = 35;
    const EU_STIPPLE_LAT_MAX = 71;
    const EU_STIPPLE_LNG_MIN = -12;
    const EU_STIPPLE_LNG_MAX = 35;

    let contextBuildToken = 0;
    let contextBuildIdleId: number | undefined;

    function finalizeDotJitter(fromIndex: number) {
      for (let i = fromIndex; i < DOTS.length; i++) {
        const d = DOTS[i];
        d.x += d.jitterX;
        d.y += d.jitterY;
      }
    }

    function buildEuropeDots(
      stepLat: number,
      stepLng: number,
      jitterEu: number,
    ) {
      for (let lat = EU_STIPPLE_LAT_MIN; lat <= EU_STIPPLE_LAT_MAX; lat += stepLat) {
        for (let lng = EU_STIPPLE_LNG_MIN; lng <= EU_STIPPLE_LNG_MAX; lng += stepLng) {
          const country = whichCountry(lat, lng);
          if (!country) continue;
          const p = project(lat, lng);
          DOTS.push({
            x: p.x,
            y: p.y,
            country,
            isPortfolio: PORTFOLIO_COUNTRIES.has(country),
            isContext: false,
            basePhase: Math.random() * Math.PI * 2,
            jitterX: (Math.random() - 0.5) * jitterEu,
            jitterY: (Math.random() - 0.5) * jitterEu,
            proximity: 0,
            waveBoost: 0,
          });
        }
      }
      euDotCount = DOTS.length;
      finalizeDotJitter(0);
    }

    function buildContextDots(
      stepLat: number,
      stepLng: number,
      jitterCtx: number,
    ) {
      const start = DOTS.length;
      for (let lat = -55; lat <= 78; lat += stepLat) {
        for (let lng = -170; lng <= 180; lng += stepLng) {
          // Europe dots are built in pass 1 — only run the expensive country
          // scan inside the Europe stipple bbox; elsewhere skip straight to
          // world-region lookup (~95% fewer polygon tests on the context pass).
          if (
            lat >= EU_STIPPLE_LAT_MIN &&
            lat <= EU_STIPPLE_LAT_MAX &&
            lng >= EU_STIPPLE_LNG_MIN &&
            lng <= EU_STIPPLE_LNG_MAX &&
            whichCountry(lat, lng)
          ) {
            continue;
          }
          const region = whichWorldRegion(lat, lng);
          if (!region) continue;
          const p = project(lat, lng);
          DOTS.push({
            x: p.x,
            y: p.y,
            country: region,
            isPortfolio: false,
            isContext: true,
            basePhase: Math.random() * Math.PI * 2,
            jitterX: (Math.random() - 0.5) * jitterCtx,
            jitterY: (Math.random() - 0.5) * jitterCtx,
            proximity: 0,
            waveBoost: 0,
          });
        }
      }
      finalizeDotJitter(start);
    }

    function cancelContextBuild() {
      contextBuildToken++;
      if (contextBuildIdleId !== undefined) {
        if (typeof cancelIdleCallback !== "undefined") {
          cancelIdleCallback(contextBuildIdleId);
        } else {
          window.clearTimeout(contextBuildIdleId);
        }
        contextBuildIdleId = undefined;
      }
    }

    function scheduleContextDots(
      stepLat: number,
      stepLng: number,
      jitterCtx: number,
    ) {
      const token = contextBuildToken;
      const run = () => {
        contextBuildIdleId = undefined;
        if (token !== contextBuildToken) return;
        buildContextDots(stepLat, stepLng, jitterCtx);
      };
      if (typeof requestIdleCallback !== "undefined") {
        contextBuildIdleId = requestIdleCallback(run, { timeout: 150 });
      } else {
        contextBuildIdleId = window.setTimeout(run, 0);
      }
    }

    function buildDotMap() {
      cancelContextBuild();
      DOTS.length = 0;
      euDotCount = 0;

      const stipple = computeStippleStep();
      const { stepLat, stepLng, jitterEu, jitterCtx, contextDotPx } = stipple;
      stippleMetrics.stepLat = stepLat;
      stippleMetrics.stepLng = stepLng;
      stippleMetrics.jitterEu = jitterEu;
      stippleMetrics.jitterCtx = jitterCtx;
      stippleMetrics.contextDotPx = contextDotPx;

      buildEuropeDots(stepLat, stepLng, jitterEu);
      scheduleContextDots(stepLat, stepLng, jitterCtx);
    }

    // Globe-wrap horizontal tile width — set by recomputeProjection. This is
    // the on-screen distance in pixels that corresponds to 360° of longitude
    // at Europe's projection scale. Used by the render loop to draw tiled
    // copies of every geographic dot at offsets [-worldPxW, 0, +worldPxW],
    // which makes the map behave like a globe: drag east far enough and
    // Europe re-appears from the right.
    let worldPxW = 0;

    function recomputeProjection() {
      computeProjection();
      worldPxW = (360 * proj.drawW) / (BOUNDS.maxLng - BOUNDS.minLng);
      ALL_EU.forEach((c) => {
        const p = project(c.lat, c.lng);
        c.px = p.x;
        c.py = p.y;
      });
      WORLD.forEach((c) => {
        const p = project(c.lat, c.lng);
        c.px = p.x;
        c.py = p.y;
      });
      COUNTRIES.forEach((country) => {
        country.points = country.poly.map(([lat, lng]: [number, number]) => project(lat, lng));
      });
      AMBER_TAILWINDS.forEach((m) => {
        const p = project(m.lat, m.lng);
        m.px = p.x;
        m.py = p.y;
      });
      buildDotMap();
      recomputePanBounds();
    }

    // ---- PAN STATE ----
    // panX/panY are the currently-drawn offsets; targetPanX/Y are the values
    // the user is dragging toward (or 0 after a Recenter). Each frame eases
    // panX/Y → targetPanX/Y so released drags + Recenter both animate smoothly
    // without React state churn. Direct mutation is intentional: the RAF loop
    // reads these every frame.
    const pan = { x: 0, y: 0, tx: 0, ty: 0 };
    const panBounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    const PAN_EASE = 0.18;
    const PAN_RECENTER_THRESHOLD = 30;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function recomputePanBounds() {
      // Vertical extent — projected world top/bottom in pixels. Vertical
      // pan is HARD-CAPPED at the projected world's natural edges because
      // there's no global wrap top↔bottom (the Earth doesn't loop over the
      // poles in a way that maps to this projection).
      //
      // SOUTH cap is set at lat -54 (Tierra del Fuego, southernmost
      // continental point excluding Antarctica). Once the user has dragged
      // south enough to see Cape Horn at the bottom of the viewport, there
      // is nothing more to discover — empty Antarctic / Southern Ocean
      // beyond that point would just be visual void. The previous cap at
      // lat -55 with a 25% margin let the user scroll past every continent
      // into a sea of nothing, which felt broken.
      //
      // NORTH cap is set at lat 78 (high Arctic, top of Greenland / Russia
      // landmass extent in WORLD_REGIONS). Symmetric reasoning: nothing to
      // discover past this point on this projection.
      const tl = project(78, -170);
      const southCap = project(-54, 0); // Cape Horn / Tierra del Fuego
      const worldTop = tl.y;
      const worldBottom = southCap.y;
      // Stop-margins: 10% of viewport on each side. At max-south pan, the
      // southernmost continent appears at y = 0.9 * H (small breathing
      // room at the bottom). At max-north pan, the northernmost lands at
      // y = 0.1 * H.
      panBounds.minY = -(worldBottom - H * 0.9);
      panBounds.maxY = -worldTop + H * 0.1;

      // Horizontal extent — exactly ±1 world width. At pan.x = ±worldPxW
      // the wrap tile lands the world back in the exact same viewport
      // position as default (rotated 360°), so capping there is "the full
      // circle" the user described: drag east enough and you've come all
      // the way around back to Europe; further drag is redundant. The
      // render loop tiles at [-worldPxW, 0, +worldPxW] which fully covers
      // the viewport for any pan.x in this range, so the cap is invisible
      // (no empty edge ever shows).
      panBounds.minX = -worldPxW;
      panBounds.maxX = worldPxW;
    }

    function clampPan(x: number, y: number) {
      return {
        x: Math.max(panBounds.minX, Math.min(panBounds.maxX, x)),
        y: Math.max(panBounds.minY, Math.min(panBounds.maxY, y)),
      };
    }

    function resize() {
      const rect = embed ? embedWrap.getBoundingClientRect() : null;
      W = embed && rect ? Math.max(1, Math.round(rect.width)) : window.innerWidth;
      H = embed && rect ? Math.max(1, Math.round(rect.height)) : window.innerHeight;
      canvasEl.width = W * DPR;
      canvasEl.height = H * DPR;
      canvasEl.style.width = `${W}px`;
      canvasEl.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      invalidatePageBg();
      recomputeProjection();
    }

    // ---- HUB LINKS ----
    const HUB_LINKS: [string, string][] = [
      ["Ipswich", "London"],
      ["Ipswich", "Manchester"],
      ["Ipswich", "Brighton"],
      ["London", "Manchester"],
      ["London", "Liverpool"],
      ["London", "Brighton"],
      ["London", "Newcastle"],
      ["Manchester", "Liverpool"],
      ["Manchester", "Newcastle"],
      ["Glasgow", "Liverpool"],
      ["Glasgow", "Newcastle"],
      ["Milan", "Turin"],
      ["Milan", "Bergamo"],
      ["Milan", "Bologna"],
      ["Bologna", "Naples"],
      ["Naples", "Milan"],
      ["Bergamo", "Bologna"],
      ["Turin", "Bologna"],
      ["Madrid", "Barcelona"],
      ["Madrid", "Seville"],
      ["Madrid", "Bilbao"],
      ["Barcelona", "Bilbao"],
      ["Madrid", "Lisbon"],
      ["Lisbon", "Porto"],
      ["Madrid", "Porto"],
      ["Bilbao", "Porto"],
      ["Paris", "Lyon"],
      ["Lyon", "Marseille"],
      ["Paris", "Marseille"],
      ["Munich", "Dortmund"],
      ["Munich", "Berlin"],
      ["Berlin", "Dortmund"],
      ["Munich", "Leverkusen"],
      ["Berlin", "Leverkusen"],
      ["London", "Paris"],
      ["London", "Amsterdam"],
      ["Amsterdam", "Brussels"],
      ["Brussels", "Paris"],
      ["Paris", "Madrid"],
      ["Paris", "Milan"],
      ["Munich", "Milan"],
      ["Munich", "Vienna"],
      ["Vienna", "Milan"],
      ["Amsterdam", "Berlin"],
      ["Berlin", "Warsaw"],
      ["Vienna", "Zagreb"],
      ["Athens", "Istanbul"],
      ["Copenhagen", "Stockholm"],
      ["Stockholm", "Oslo"],
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CITY_INDEX: Record<string, any> = {};
    ALL_EU.forEach((c) => {
      CITY_INDEX[c.name] = c;
    });

    // ---- WAVES ----
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const WAVES: any[] = [];
    // Round-robin scheduler: one city pulses at a time, with a fixed minimum
    // gap between any two pulses so the rhythm reads as orderly, not bunched.
    const WAVE_FIRST_DELAY = 3200;
    const WAVE_GAP = 16000; // ms between consecutive city pulses (any city)
    let nextWaveCityIdx = 0;
    let lastAnyWaveTime = -Infinity;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function emitWave(city: any, startT: number) {
      WAVES.push({ cx: city.px, cy: city.py, start: startT, duration: 9000 });
    }

    // ---- MOUSE ----
    const mouse = { x: -9999, y: -9999, clientX: 0, clientY: 0 };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pinned: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let hoveredCity: any = null;

    function updateMousePosition(e: MouseEvent | PointerEvent) {
      mouse.clientX = e.clientX;
      mouse.clientY = e.clientY;
      const rect = canvasEl.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    const onLeaveViewport = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onEnterViewport = (e: MouseEvent) => updateMousePosition(e);
    const onCanvasClick = () => {
      pinned = hoveredCity || null;
    };

    document.addEventListener("mousemove", updateMousePosition, { passive: true });
    document.addEventListener("pointermove", updateMousePosition, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveViewport);
    document.documentElement.addEventListener("mouseenter", onEnterViewport);

    // ---- DRAG / PAN INTERACTION ----
    // Pointer events unify mouse + single-finger touch. Multi-touch (pinch
    // zoom etc.) is intentionally ignored — we don't preventDefault unless we
    // own the gesture, so the browser still owns pinch/scroll on multi-touch.
    const drag = {
      active: false,
      startClientX: 0,
      startClientY: 0,
      startPanX: 0,
      startPanY: 0,
      moved: false,
      pointerId: -1 as number,
    };
    const DRAG_MOVE_THRESHOLD = 5; // px before we treat as drag (suppresses click)
    let hintHidden = false;
    let hintTimer: number | undefined;
    const hintEl = () => document.getElementById("cv-hint");
    const recenterEl = () => document.getElementById("cv-recenter");

    function hideHint(permanent = false) {
      const el = hintEl();
      if (el) el.classList.add("is-hidden");
      if (permanent) hintHidden = true;
      if (hintTimer !== undefined) {
        window.clearTimeout(hintTimer);
        hintTimer = undefined;
      }
    }

    function showHint() {
      if (hintHidden || reducedMotion) return;
      const el = hintEl();
      if (el) el.classList.add("is-visible");
    }

    if (!reducedMotion) {
      hintTimer = window.setTimeout(showHint, 1500);
    }

    function syncRecenterVisibility() {
      const el = recenterEl();
      if (!el) return;
      const panned =
        Math.abs(pan.x) > PAN_RECENTER_THRESHOLD ||
        Math.abs(pan.y) > PAN_RECENTER_THRESHOLD ||
        Math.abs(pan.tx) > PAN_RECENTER_THRESHOLD ||
        Math.abs(pan.ty) > PAN_RECENTER_THRESHOLD;
      el.classList.toggle("is-visible", panned);
    }

    function onPointerDown(e: PointerEvent) {
      // Only react to primary button / first touch. Ignore secondary pointers
      // so two-finger gestures fall through to the browser.
      if (e.button !== undefined && e.button !== 0) return;
      if (drag.active) return;

      drag.active = true;
      drag.startClientX = e.clientX;
      drag.startClientY = e.clientY;
      drag.startPanX = pan.tx;
      drag.startPanY = pan.ty;
      drag.moved = false;
      drag.pointerId = e.pointerId;

      try {
        canvasEl.setPointerCapture(e.pointerId);
      } catch {
        // Capture can fail on some touch devices; degrades gracefully.
      }
      canvasEl.classList.add("is-grabbing");
      hideHint(true);
    }

    function onPointerMove(e: PointerEvent) {
      if (!drag.active || e.pointerId !== drag.pointerId) return;
      const dx = e.clientX - drag.startClientX;
      const dy = e.clientY - drag.startClientY;
      if (!drag.moved && Math.hypot(dx, dy) > DRAG_MOVE_THRESHOLD) {
        drag.moved = true;
      }
      const clamped = clampPan(drag.startPanX + dx, drag.startPanY + dy);
      pan.tx = clamped.x;
      pan.ty = clamped.y;
      // During active drag, sync immediately so the map follows the finger
      // 1:1 with no easing lag. The ease only matters for release + recenter.
      pan.x = clamped.x;
      pan.y = clamped.y;
      syncRecenterVisibility();
    }

    function endDrag(e: PointerEvent) {
      if (!drag.active || e.pointerId !== drag.pointerId) return;
      drag.active = false;
      try {
        canvasEl.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      canvasEl.classList.remove("is-grabbing");
    }

    function onRecenterClick() {
      pan.tx = 0;
      pan.ty = 0;
      // Eased return handled by RAF loop. Force a sync so the button hides as
      // soon as the user clicks (without waiting for the ease to finish).
      const el = recenterEl();
      if (el) el.classList.remove("is-visible");
    }

    canvasEl.addEventListener("pointerdown", onPointerDown);
    canvasEl.addEventListener("pointermove", onPointerMove);
    canvasEl.addEventListener("pointerup", endDrag);
    canvasEl.addEventListener("pointercancel", endDrag);
    canvasEl.addEventListener("pointerleave", endDrag);

    // The existing click-to-pin tooltip behavior must NOT fire after a drag.
    // We swap the bare click listener for one that respects the drag-moved
    // flag set during pointermove.
    const onCanvasClickGuarded = () => {
      if (drag.moved) return;
      onCanvasClick();
    };
    canvasEl.addEventListener("click", onCanvasClickGuarded);

    const recenterButton = document.getElementById("cv-recenter");
    recenterButton?.addEventListener("click", onRecenterClick);

    // ---- PARTICLES ----
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const PARTICLES: any[] = [];
    const PARTICLE_COUNT = 70;
    function initParticles() {
      PARTICLES.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        PARTICLES.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 0.55 + 0.18,
          alpha: Math.random() * 0.18 + 0.04,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // ---- TRANSFERS ----
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TRANSFERS: any[] = [];
    function spawnTransfer(startT: number) {
      const portfolioBias = Math.random() < 0.45;
      const a = portfolioBias
        ? PORTFOLIO[Math.floor(Math.random() * PORTFOLIO.length)]
        : ALL_EU[Math.floor(Math.random() * ALL_EU.length)];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let b: any;
      let tries = 0;
      while (tries < 12) {
        const cand = ALL_EU[Math.floor(Math.random() * ALL_EU.length)];
        const d = Math.hypot(cand.lat - a.lat, cand.lng - a.lng);
        if (cand !== a && d < 22 && d > 2) {
          b = cand;
          break;
        }
        tries++;
      }
      if (!b) return;
      TRANSFERS.push({ a, b, duration: 1700 + Math.random() * 700, start: startT });
    }

    // ---- BROADCASTS ----
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const BROADCASTS: any[] = [];
    const portfolioBroadcastTimers = PORTFOLIO.map((_, i) => 3000 + i * 1700);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function emitBroadcast(city: any, startT: number) {
      BROADCASTS.push({ cx: city.px, cy: city.py, start: startT, duration: 6500 });
    }

    // ---- CITY INIT ----
    ALL_EU.forEach((c) => {
      c.phase = Math.random() * Math.PI * 2;
      c.period = 2600 + Math.random() * 2000;
      c.revealAt = (c.tier === "P" ? 1700 : 400) + Math.random() * 700;
      c.lit = 0;
    });
    WORLD.forEach((c) => {
      c.phase = Math.random() * Math.PI * 2;
      c.period = 3200 + Math.random() * 2500;
      c.revealAt = 1300 + Math.random() * 1400;
      c.lit = 0;
    });

    // ---- RESIZE ----
    let resizeRaf = 0;
    const onResize = () => {
      if (resizeRaf) window.cancelAnimationFrame(resizeRaf);
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = 0;
        resize();
        initParticles();
      });
    };
    window.addEventListener("resize", onResize);
    const embedObserver =
      embed && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => onResize())
        : null;
    embedObserver?.observe(embedWrap);
    const themeObserver =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver(() => invalidatePageBg())
        : null;
    themeObserver?.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    resize();
    initParticles();

    // ---- RENDER LOOP ----
    const firstFrame = performance.now();
    let loaderHidden = false;
    function hideLoader() {
      if (loaderHidden) return;
      loaderHidden = true;
      loader?.classList.add("hidden");
    }
    const lastBroadcastTime = [-Infinity, -Infinity, -Infinity];
    // Slow broadcast ripples too (they radiate from the same 3 portfolio towns).
    const BROADCAST_INTERVAL = [26000, 28500, 27200];
    let lastTransferTime = -Infinity;
    let rafRender = 0;
    let mapVisible = true;

    const pauseMapIfHidden = () => {
      if (!mapVisible && rafRender) {
        window.cancelAnimationFrame(rafRender);
        rafRender = 0;
      }
    };

    const resumeMapIfVisible = () => {
      if (mapVisible && !rafRender) {
        rafRender = window.requestAnimationFrame(render);
      }
    };

    const visibilityObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              mapVisible = entry.isIntersecting;
              if (mapVisible) resumeMapIfVisible();
              else pauseMapIfHidden();
            },
            { root: null, threshold: 0.05 },
          )
        : null;
    visibilityObserver?.observe(embedWrap);

    // Globe-wrap helper for map markers. Dots already tile at
    // [-worldPxW, 0, +worldPxW]; markers must do the same or cities on
    // South America / Asia never appear when the user pans the alternate
    // longitude tile into view.
    type MarkerTile = { px: number; py: number; vx: number; vy: number };
    function visibleMarkerTiles(px: number, py: number, margin = 48): MarkerTile[] {
      const tiles: MarkerTile[] = [];
      for (let tileN = -1; tileN <= 1; tileN++) {
        const mx = px + tileN * worldPxW;
        const vx = mx + pan.x;
        const vy = py + pan.y;
        if (vx >= -margin && vx <= W + margin && vy >= -margin && vy <= H + margin) {
          tiles.push({ px: mx, py, vx, vy });
        }
      }
      return tiles;
    }

    function render(t: number) {
      if (!mapVisible) {
        rafRender = 0;
        return;
      }
      const elapsed = t - firstFrame;
      const C = getColors();
      const isDayFrame = getTheme() === "day";
      // Pre-parse the broadcast color base alpha once per frame (regex was running per ripple).
      const broadcastBaseAlpha = parseFloat((C.broadcast.match(/[\d.]+(?=\))/) ?? ["0"])[0]);
      const broadcastStrokeRGB = isDayFrame ? "99, 77, 44" : "168, 134, 72";
      ctx.clearRect(0, 0, W, H);

      const pageBg = readPageBg();
      ctx.fillStyle = pageBg;
      ctx.fillRect(0, 0, W, H);

      if (euDotCount > 0) hideLoader();

      // Ease pan toward target every frame so released drags + Recenter settle
      // smoothly. Snap immediately for reduced-motion users.
      if (reducedMotion) {
        pan.x = pan.tx;
        pan.y = pan.ty;
      } else {
        pan.x += (pan.tx - pan.x) * PAN_EASE;
        pan.y += (pan.ty - pan.y) * PAN_EASE;
        // Settle exactly so the recenter button reliably hides at 0,0.
        if (Math.abs(pan.x - pan.tx) < 0.05) pan.x = pan.tx;
        if (Math.abs(pan.y - pan.ty) < 0.05) pan.y = pan.ty;
      }

      // Begin GEOGRAPHIC LAYER: all subsequent draws are translated by the
      // current pan offset so the world stipple, hubs, transfers, markers, and
      // amber callouts move together while DOM overlays (headline, portfolio
      // panel, stats, tooltip, recenter button) remain stationary in viewport
      // space. Particles + cursor halo are drawn AFTER ctx.restore() below so
      // they remain in screen space (atmospheric foreground, not map content).
      ctx.save();
      ctx.translate(pan.x, pan.y);

      // Background spotlight — full-bleed map uses a Europe vignette; embed
      // skips it so panning never reveals a moving sepia plate against --bg.
      if (!embed) {
        const europeCx = proj.ox + proj.drawW * 0.5;
        const europeCy = proj.oy + proj.drawH * 0.5;
        const spotGrad = ctx.createRadialGradient(europeCx, europeCy, 60, europeCx, europeCy, Math.max(W, H) * 0.55);
        spotGrad.addColorStop(0, C.spotlight1);
        spotGrad.addColorStop(0.5, C.spotlight2);
        spotGrad.addColorStop(1, pageBg);
        ctx.fillStyle = spotGrad;
        const pad = Math.max(W, H);
        ctx.fillRect(proj.ox - pad, proj.oy - pad, proj.drawW + pad * 2, proj.drawH + pad * 2);
      }

      // KICK-OFF WAVES — round-robin so cities never pulse on top of each other.
      if (elapsed > WAVE_FIRST_DELAY && t - lastAnyWaveTime > WAVE_GAP) {
        const c = PORTFOLIO[nextWaveCityIdx];
        if (c && c.px) {
          emitWave(c, t);
          lastAnyWaveTime = t;
          nextWaveCityIdx = (nextWaveCityIdx + 1) % PORTFOLIO.length;
        }
      }
      // Reset waveBoost ONLY on Europe dots — context dots render as a
      // static batched Path2D in the main loop and intentionally ignore
      // wave ripples (the visual effect of ripples on dim, sparse-feeling
      // context dots is barely perceptible, and skipping them lets us
      // collapse 200k+ context entries into a single fill() per frame).
      for (let i = 0; i < euDotCount; i++) DOTS[i].waveBoost = 0;
      for (let wi = WAVES.length - 1; wi >= 0; wi--) {
        const wave = WAVES[wi];
        const e = (t - wave.start) / wave.duration;
        if (e >= 1) {
          WAVES.splice(wi, 1);
          continue;
        }
        const r = e * Math.max(W, H) * 0.52;
        const ringWidth = 56;
        const decay = 1 - e;
        // Wave hit-test only against Europe dots — see comment above.
        for (let i = 0; i < euDotCount; i++) {
          const d = DOTS[i];
          const dx = d.x - wave.cx;
          const dy = d.y - wave.cy;
          const dist = Math.hypot(dx, dy);
          const delta = Math.abs(dist - r);
          if (delta < ringWidth) {
            const proximity = (1 - delta / ringWidth) * decay;
            if (proximity > d.waveBoost) d.waveBoost = proximity;
          }
        }
      }

      // HUB NETWORK
      const hubReveal = Math.min(1, Math.max(0, (elapsed - 600) / 1800));
      const hubEase = 1 - Math.pow(1 - hubReveal, 3);
      const hubAlpha = (getTheme() === "day" ? 0.27 : 0.11) * hubEase;
      ctx.strokeStyle = getTheme() === "day" ? `rgba(99, 77, 44, ${hubAlpha})` : `rgba(168, 134, 72, ${hubAlpha})`;
      ctx.lineWidth = getTheme() === "day" ? 0.65 : 0.55;
      ctx.beginPath();
      for (let i = 0; i < HUB_LINKS.length; i++) {
        const a = CITY_INDEX[HUB_LINKS[i][0]];
        const b = CITY_INDEX[HUB_LINKS[i][1]];
        if (!a || !b || a.px === undefined || b.px === undefined) continue;
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
      }
      ctx.stroke();

      // DOT MAP
      const dotReveal = Math.min(1, elapsed / 1400);
      const dotEase = 1 - Math.pow(1 - dotReveal, 3);
      const cursorR = 150;
      const cursorR2 = cursorR * cursorR;
      const isDay = getTheme() === "day";
      const dotR = isDay ? 6 : 52;
      const dotG = isDay ? 93 : 194;
      const dotB = isDay ? 57 : 129;
      const portR = isDay ? 4 : 122;
      const portG = isDay ? 70 : 226;
      const portB = isDay ? 42 : 170;
      const baseAlphaPort = isDay ? 0.66 : 0.26;
      const baseAlphaReg = isDay ? 0.42 : 0.15;
      const pulseAmpPort = isDay ? 0.095 : 0.065;
      const pulseAmpReg = isDay ? 0.048 : 0.028;
      const mx = mouse.x;
      const my = mouse.y;
      const mouseActive = mx > -1000;
      const tBreath = t * 0.0007;

      // Context continent stipple — darker than before so outlines read
      // clearly when bleeding at the viewport edge, but still below Europe's
      // animated layer (no breath / wave / cursor boost on context).
      const CONTEXT_DIM = 1.0;
      const CONTEXT_ALPHA_BOOST = isDay ? 1.14 : 1.08;

      // -- PASS A: EUROPE STIPPLE (animated) -----------------------------
      // Per-dot breath, cursor proximity, wave ripples, size scaling. These
      // dots get the full animation budget because there are only ~10k of
      // them and they're the visual hero of the map.
      for (let i = 0; i < euDotCount; i++) {
        const d = DOTS[i];
        const baseVx = d.x + pan.x;
        if (baseVx + worldPxW < -4 || baseVx - worldPxW > W + 4) {
          // All wrap tiles off-viewport — skip entirely.
          continue;
        }
        let target = 0;
        if (mouseActive) {
          // Cursor proximity uses VIEWPORT-space distance, so we subtract
          // pan from the dot's intrinsic position before measuring.
          const dx = d.x + pan.x - mx;
          const dy = d.y + pan.y - my;
          const distSq = dx * dx + dy * dy;
          if (distSq < cursorR2) {
            const dist = Math.sqrt(distSq);
            target = 1 - dist / cursorR;
            target *= target;
          }
        }
        d.proximity += (target - d.proximity) * 0.1;

        const breath = 0.5 + 0.5 * Math.sin(tBreath + d.basePhase);
        const isPort = d.isPortfolio;
        const baseAlpha = isPort ? baseAlphaPort : baseAlphaReg;
        const pulseAmp = isPort ? pulseAmpPort : pulseAmpReg;
        const proxBoost = d.proximity * 0.55;
        const waveBoost = d.waveBoost * 0.45;
        const alpha = (baseAlpha + breath * pulseAmp + proxBoost + waveBoost) * dotEase;

        const baseSize = isPort ? 0.95 : 0.78;
        const size = baseSize + d.proximity * 1.35 + d.waveBoost * 0.85;

        ctx.fillStyle = isPort
          ? `rgba(${portR},${portG},${portB},${alpha})`
          : `rgba(${dotR},${dotG},${dotB},${alpha})`;

        // Globe-wrap tile loop. Each dot is drawn at the candidate horizontal
        // tile offsets {-worldPxW, 0, +worldPxW}. Per-tile viewport cull
        // keeps per-frame work bounded.
        for (let tileN = -1; tileN <= 1; tileN++) {
          const offsetX = tileN * worldPxW;
          const vx = d.x + pan.x + offsetX;
          if (vx < -size || vx > W + size) continue;
          ctx.beginPath();
          ctx.arc(d.x + offsetX, d.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // -- PASS B: CONTEXT CONTINENTS (static fillRect) -------------------
      // The context layer is the biggest expense in the loop — 200k+ dots
      // across the world. Two key optimizations vs. the Europe pass:
      //   1. ONE fillStyle set globally for the whole layer (vs per-dot
      //      string-template alloc + re-parse on every dot).
      //   2. ctx.fillRect instead of ctx.beginPath + ctx.arc + ctx.fill
      //      (3 native calls → 1 native call per dot). At 0.78px size the
      //      visual difference between a circle and a square is sub-pixel
      //      and indistinguishable at the canvas's render resolution.
      // Trade-off: context dots are static (no breath, no cursor proximity,
      // no wave) — visually negligible for a supporting layer at
      // CONTEXT_DIM alpha, perceptually invisible at standard viewing
      // distance. (Tried Path2D batching; native arc/path-building cost
      // ended up dominating, so a flat fillRect loop with a single
      // fillStyle is the fastest path here.)
      const ctxAlpha = Math.min(1, baseAlphaReg * CONTEXT_DIM * CONTEXT_ALPHA_BOOST * dotEase);
      if (ctxAlpha > 0.005 && euDotCount < DOTS.length) {
        const ctxSize = stippleMetrics.contextDotPx;
        const ctxHalfSize = ctxSize * 0.5;
        ctx.fillStyle = `rgba(${dotR},${dotG},${dotB},${ctxAlpha})`;
        for (let i = euDotCount; i < DOTS.length; i++) {
          const d = DOTS[i];
          const baseVx = d.x + pan.x;
          if (baseVx + worldPxW < -4 || baseVx - worldPxW > W + 4) continue;
          for (let tileN = -1; tileN <= 1; tileN++) {
            const offsetX = tileN * worldPxW;
            const vx = d.x + pan.x + offsetX;
            if (vx < -ctxSize || vx > W + ctxSize) continue;
            ctx.fillRect(d.x + offsetX - ctxHalfSize, d.y - ctxHalfSize, ctxSize, ctxSize);
          }
        }
      }

      // ---- LEAVE GEOGRAPHIC LAYER for screen-space chrome ----
      // Cursor halo and particles are atmospheric foreground that should NOT
      // pan with the map (otherwise the cursor halo would lag behind the real
      // cursor whenever the user drags). Restore + re-translate brackets keep
      // the geographic content + viewport content in sync without per-call
      // coordinate math.
      ctx.restore();

      if (mouseActive) {
        const haloGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        if (isDay) {
          haloGrad.addColorStop(0, "rgba(115, 90, 52, 0.08)");
          haloGrad.addColorStop(1, "rgba(115, 90, 52, 0)");
        } else {
          haloGrad.addColorStop(0, "rgba(168, 134, 72, 0.08)");
          haloGrad.addColorStop(1, "rgba(168, 134, 72, 0)");
        }
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // PARTICLES
      PARTICLES.forEach((p) => {
        if (mouse.x > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dd = Math.hypot(dx, dy);
          if (dd < 140 && dd > 0.1) {
            const force = ((140 - dd) / 140) * 0.32;
            p.vx += (dx / dd) * force * 0.05;
            p.vy += (dy / dd) * force * 0.05;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.vx += (Math.random() - 0.5) * 0.018;
        p.vy += (Math.random() - 0.5) * 0.018;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Fade peripheral particles so they don't steal attention from the map.
        // Keep particles near the Europe focal area close to original intensity.
        const europeCx = proj.ox + proj.drawW * 0.5;
        const europeCy = proj.oy + proj.drawH * 0.5;
        const dxE = p.x - europeCx;
        const dyE = p.y - europeCy;
        const dist = Math.hypot(dxE, dyE);
        const innerR = Math.min(W, H) * 0.22;
        const outerR = Math.min(W, H) * 0.46;
        const tFade = Math.min(1, Math.max(0, (dist - innerR) / (outerR - innerR)));
        // Smoothstep
        const fade = 1 - (tFade * tFade * (3 - 2 * tFade)); // 1→0 toward edges
        // Cube the fade so peripheral falloff is much steeper.
        const peripheralMul = 0.015 + 0.985 * (fade * fade * fade);
        const peripheralSizeMul = 0.08 + 0.92 * fade;
        const edgeT = 1 - fade; // 0 center → 1 edges
        const edgeClampMaxR = edgeT > 0.5 ? 0.22 : Infinity; // keep side dots tiny

        // Slow the flicker (~3.3x slower) and shrink amplitude further at edges.
        const flickerAmp = 0.18 * (1 - Math.min(1, edgeT * 1.4));
        const flicker = 0.82 + flickerAmp * Math.sin(t * 0.0003 + p.phase);
        const baseAlpha = parseFloat((C.particle.match(/[\d.]+(?=\))/) ?? ["0"])[0]);
        const alpha = baseAlpha * flicker * p.alpha * 0.8 * peripheralMul * peripheralMul;
        ctx.fillStyle =
          getTheme() === "day"
            ? `rgba(26, 37, 32, ${Math.min(0.22, alpha)})`
            : `rgba(242, 234, 214, ${Math.min(0.28, alpha)})`;
        ctx.beginPath();
        const pr = Math.max(0.08, p.r * peripheralSizeMul);
        ctx.arc(p.x, p.y, Math.min(edgeClampMaxR, pr), 0, Math.PI * 2);
        ctx.fill();
      });

      // ---- RE-ENTER GEOGRAPHIC LAYER ----
      // Everything below is map content again (transfer arcs, broadcast
      // ripples, world / ambient / portfolio markers, amber callouts) so it
      // must translate with pan.
      ctx.save();
      ctx.translate(pan.x, pan.y);

      // TRANSFER ARCS
      if (t - lastTransferTime > 1400 && elapsed > 2200) {
        spawnTransfer(t);
        lastTransferTime = t;
      }
      for (let i = TRANSFERS.length - 1; i >= 0; i--) {
        const arc = TRANSFERS[i];
        const e = (t - arc.start) / arc.duration;
        if (e >= 1) {
          TRANSFERS.splice(i, 1);
          continue;
        }
        const a = arc.a;
        const b = arc.b;
        const midX = (a.px + b.px) / 2;
        const midY = (a.py + b.py) / 2;
        const distance = Math.hypot(b.px - a.px, b.py - a.py);
        const lift = -Math.min(distance * 0.32, 80);

        const trailAlpha = Math.sin(e * Math.PI) * 0.3;
        const trailColor =
          getTheme() === "day" ? `rgba(154, 111, 48, ${trailAlpha})` : `rgba(212, 168, 106, ${trailAlpha})`;
        ctx.strokeStyle = trailColor;
        ctx.lineWidth = getTheme() === "day" ? 0.85 : 0.75;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.quadraticCurveTo(midX, midY + lift, b.px, b.py);
        ctx.stroke();

        const u = 1 - e;
        const px = u * u * a.px + 2 * u * e * midX + e * e * b.px;
        const py = u * u * a.py + 2 * u * e * (midY + lift) + e * e * b.py;
        const dotAlpha = Math.sin(e * Math.PI);
        const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, 7);
        if (getTheme() === "day") {
          glowGrad.addColorStop(0, `rgba(154, 111, 48, ${dotAlpha * 0.55})`);
        } else {
          glowGrad.addColorStop(0, `rgba(232, 197, 71, ${dotAlpha * 0.6})`);
        }
        glowGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(px - 7, py - 7, 14, 14);
        ctx.fillStyle =
          getTheme() === "day"
            ? `rgba(154, 111, 48, ${dotAlpha * 0.78})`
            : `rgba(232, 197, 71, ${dotAlpha * 0.78})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.0, 0, Math.PI * 2);
        ctx.fill();
      }

      // BROADCAST RIPPLES
      PORTFOLIO.forEach((c, i) => {
        if (elapsed > portfolioBroadcastTimers[i] && t - lastBroadcastTime[i] > BROADCAST_INTERVAL[i]) {
          emitBroadcast(c, t);
          lastBroadcastTime[i] = t;
        }
      });
      for (let i = BROADCASTS.length - 1; i >= 0; i--) {
        const b = BROADCASTS[i];
        const e = (t - b.start) / b.duration;
        if (e >= 1) {
          BROADCASTS.splice(i, 1);
          continue;
        }
        const maxR = Math.hypot(W, H) * 0.85;
        const r = e * maxR;
        const alphaMul = Math.sin(e * Math.PI);
        const alpha = alphaMul * broadcastBaseAlpha;
        ctx.strokeStyle = `rgba(${broadcastStrokeRGB}, ${alpha})`;
        ctx.lineWidth = getTheme() === "day" ? 1.05 : 0.95;
        ctx.beginPath();
        ctx.arc(b.cx, b.cy, r, 0, Math.PI * 2);
        ctx.stroke();
        if (r > 30) {
          ctx.strokeStyle = `rgba(${broadcastStrokeRGB}, ${alpha * 0.45})`;
          ctx.lineWidth = getTheme() === "day" ? 0.62 : 0.55;
          ctx.beginPath();
          ctx.arc(b.cx, b.cy, r * 0.92, 0, Math.PI * 2);
          ctx.stroke();
        }

        const ringWidth = 22;
        WORLD.forEach((wc) => {
          if (wc.px === undefined) return;
          for (let tileN = -1; tileN <= 1; tileN++) {
            const dist = Math.hypot(wc.px + tileN * worldPxW - b.cx, wc.py - b.cy);
            if (Math.abs(dist - r) < ringWidth) {
              const proximity = 1 - Math.abs(dist - r) / ringWidth;
              wc.lit = Math.max(wc.lit, proximity);
            }
          }
        });
      }

      // WORLD + AMBIENT + PORTFOLIO markers (unchanged logic from the original)
      // For brevity in this component, we keep the exact drawing + tooltip behavior.
      hoveredCity = null;
      let bestHover = Infinity;

      WORLD.forEach((c) => {
        if (elapsed < c.revealAt || c.px === undefined) return;

        const reveal = Math.min(1, (elapsed - c.revealAt) / 900);
        const ease = 1 - Math.pow(1 - reveal, 3);
        const litBoost = c.lit;
        c.lit *= 0.985;
        const pulse = 0.5 + 0.5 * Math.sin((t / c.period) * Math.PI * 2 + c.phase);
        // Between AMBIENT and the old ultra-faint WORLD — visible on every
        // continent when panned in, but Europe's hubs still dominate.
        const baseR = 1.35 + pulse * 0.32;
        const r = baseR * ease;
        const glowR = (4.2 + pulse * 1.1 + litBoost * 3.5) * ease;

        const tiles = visibleMarkerTiles(c.px, c.py, 52);
        if (tiles.length === 0) return;

        let isHover = false;
        let hoverPx = tiles[0].px;
        let hoverPy = tiles[0].py;
        for (let ti = 0; ti < tiles.length; ti++) {
          const tile = tiles[ti];
          const d = Math.hypot(tile.vx - mouse.x, tile.vy - mouse.y);
          if (d < 18 && d < bestHover) {
            hoveredCity = c;
            bestHover = d;
            isHover = true;
            hoverPx = tile.px;
            hoverPy = tile.py;
          }
        }
        const hoverMul = isHover ? 2.0 : 1;

        for (let ti = 0; ti < tiles.length; ti++) {
          const { px, py } = tiles[ti];
          const ringGrad = ctx.createRadialGradient(px, py, 0, px, py, glowR * hoverMul);
          if (getTheme() === "day") {
            const glowAlpha = (0.28 + litBoost * 0.26) * ease;
            ringGrad.addColorStop(0, `rgba(115, 90, 52, ${glowAlpha})`);
            ringGrad.addColorStop(1, "rgba(115, 90, 52, 0)");
          } else {
            const glowAlpha = (0.28 + litBoost * 0.26) * ease;
            ringGrad.addColorStop(0, `rgba(242, 234, 214, ${glowAlpha})`);
            ringGrad.addColorStop(1, "rgba(242, 234, 214, 0)");
          }
          ctx.fillStyle = ringGrad;
          ctx.beginPath();
          ctx.arc(px, py, glowR * hoverMul, 0, Math.PI * 2);
          ctx.fill();

          const coreAlpha = (0.4 + litBoost * 0.22) * ease;
          ctx.fillStyle =
            getTheme() === "day"
              ? `rgba(26, 37, 32, ${Math.min(1, coreAlpha)})`
              : `rgba(242, 234, 214, ${Math.min(1, coreAlpha)})`;
          ctx.beginPath();
          ctx.arc(px, py, r * (1 + litBoost * 0.2), 0, Math.PI * 2);
          ctx.fill();
        }

        if (isHover) {
          ctx.fillStyle = C.labelPrimary;
          ctx.font = `300 13px ${canvasFontVar("--font-mono")}`;
          ctx.textAlign = "left";
          ctx.fillText(c.name.toUpperCase(), hoverPx + r + 8, hoverPy + 3.5);
        }
      });

      AMBIENT.forEach((c) => {
        if (elapsed < c.revealAt || c.px === undefined) return;

        const reveal = Math.min(1, (elapsed - c.revealAt) / 700);
        const ease = 1 - Math.pow(1 - reveal, 3);
        const pulse = 0.5 + 0.5 * Math.sin((t / c.period) * Math.PI * 2 + c.phase);
        const r = (1.7 + pulse * 0.5) * ease;
        const glowR = (8 + pulse * 3) * ease;

        const tiles = visibleMarkerTiles(c.px, c.py, 56);
        if (tiles.length === 0) return;

        let isHover = false;
        let hoverPx = tiles[0].px;
        let hoverPy = tiles[0].py;
        for (let ti = 0; ti < tiles.length; ti++) {
          const tile = tiles[ti];
          const d = Math.hypot(tile.vx - mouse.x, tile.vy - mouse.y);
          if (d < 18 && d < bestHover) {
            hoveredCity = c;
            bestHover = d;
            isHover = true;
            hoverPx = tile.px;
            hoverPy = tile.py;
          }
        }
        const hoverMul = isHover ? 1.8 : 1;

        for (let ti = 0; ti < tiles.length; ti++) {
          const { px, py } = tiles[ti];
          const ringGrad = ctx.createRadialGradient(px, py, 0, px, py, glowR * hoverMul);
          if (getTheme() === "day") {
            ringGrad.addColorStop(0, `rgba(115, 90, 52, ${0.44 * ease})`);
            ringGrad.addColorStop(1, "rgba(115, 90, 52, 0)");
          } else {
            ringGrad.addColorStop(0, `rgba(242, 234, 214, ${0.5 * ease})`);
            ringGrad.addColorStop(1, "rgba(242, 234, 214, 0)");
          }
          ctx.fillStyle = ringGrad;
          ctx.beginPath();
          ctx.arc(px, py, glowR * hoverMul, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = getTheme() === "day" ? `rgba(26, 37, 32, ${0.78 * ease})` : `rgba(242, 234, 214, ${0.78 * ease})`;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }

        if (isHover) {
          ctx.fillStyle = C.labelPrimary;
          ctx.font = `400 13px ${canvasFontVar("--font-sans")}`;
          ctx.textAlign = "left";
          ctx.fillText(c.name, hoverPx + r + 8, hoverPy + 3.5);
        }
      });

      // ---- AMBER MARKET TAILWINDS ----
      // Six geographic facts plotted on context continents. Visual treatment is
      // intentionally distinct from green portfolio markers (amber accent color,
      // dashed ring for "context, not portfolio", serif italic fact + mono
      // label) so users instantly understand the difference. All draws use
      // intrinsic positions (m.px, m.py) so they translate with pan. We reveal
      // them only after the initial Europe stipple settles in.
      const amberReveal = Math.min(1, Math.max(0, (elapsed - 2200) / 1400));
      const amberEase = 1 - Math.pow(1 - amberReveal, 3);
      if (amberEase > 0.01) {
        const amberFill = isDayFrame
          ? "rgba(139, 99, 36, 0.78)"
          : "rgba(212, 168, 106, 0.85)";
        const amberRing = isDayFrame
          ? "rgba(139, 99, 36, 0.32)"
          : "rgba(212, 168, 106, 0.36)";
        const amberFactColor = isDayFrame
          ? `rgba(26, 37, 32, ${0.92 * amberEase})`
          : `rgba(242, 234, 214, ${0.92 * amberEase})`;
        const amberLabelColor = isDayFrame
          ? `rgba(26, 37, 32, ${0.62 * amberEase})`
          : `rgba(242, 234, 214, ${0.62 * amberEase})`;

        AMBER_TAILWINDS.forEach((m) => {
          const px = m.px;
          const py = m.py;
          if (px === undefined) return;

          // Visibility gate for amber callouts. The dot anchor sits at map-
          // space (px, py); on screen it lands at (px + pan.x, py + pan.y).
          // At default Europe view, callouts for off-Europe continents land
          // outside (or just inside) the viewport — long serif/mono labels
          // were leaking into the manifesto/credentials area.
          //
          // Gate logic: the callout is fully INVISIBLE unless its anchor is
          // a generous distance INSIDE the viewport on every edge (inner
          // padding ≥ `gateInner` px), and fades in over a `gateBand` window
          // between gateInner and gateOuter. This means callouts only show
          // when the user has actively panned that continent toward the
          // center of the viewport, exactly the "discovery as you drag"
          // behavior we want.
          const vx = px + pan.x;
          const vy = py + pan.y;
          const gateInner = Math.min(W, H) * 0.18;
          const gateBand = Math.min(W, H) * 0.18;
          const distEdge = Math.min(vx, W - vx, vy, H - vy);
          let calloutEdge = 0;
          if (distEdge > gateInner) {
            const e = Math.min(1, (distEdge - gateInner) / gateBand);
            calloutEdge = e * e * (3 - 2 * e);
          }
          if (calloutEdge < 0.01) return;
          ctx.globalAlpha = calloutEdge;

          // Dashed amber ring.
          ctx.strokeStyle = amberRing;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.arc(px, py, 14 * amberEase, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Amber dot core.
          ctx.fillStyle = amberFill;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Fact (serif italic). Drawn above the dot.
          ctx.textBaseline = "alphabetic";
          ctx.textAlign = "center";
          ctx.fillStyle = amberFactColor;
          ctx.font = `italic 400 15px ${canvasFontVar("--font-serif")}`;
          ctx.fillText(m.fact, px, py - 22);

          // Label (mono uppercase, wide tracking).
          ctx.fillStyle = amberLabelColor;
          ctx.font = `400 12px ${canvasFontVar("--font-mono")}`;
          ctx.fillText(m.label.toUpperCase(), px, py + 26);

          ctx.globalAlpha = 1;
        });
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
      }

      PORTFOLIO.forEach((c, i) => {
        if (elapsed < c.revealAt) return;
        const reveal = Math.min(1, (elapsed - c.revealAt) / 1300);
        const ease = 1 - Math.pow(1 - reveal, 3);
        const pulse = 0.5 + 0.5 * Math.sin((t / c.period) * Math.PI * 2 + c.phase);
        const r = (5.4 + pulse * 1.1) * ease;
        const glowR = (44 + pulse * 14) * ease;

        const dx = c.px + pan.x - mouse.x;
        const dy = c.py + pan.y - mouse.y;
        const d = Math.hypot(dx, dy);
        const isHover = d < 28;
        if (isHover && d < bestHover) {
          hoveredCity = c;
          bestHover = d;
        }
        const hoverMul = isHover || pinned === c ? 1.5 : 1;

        const outerGrad = ctx.createRadialGradient(c.px, c.py, 0, c.px, c.py, glowR * hoverMul);
        if (getTheme() === "day") {
          outerGrad.addColorStop(0, `rgba(166, 131, 74, ${0.44 * ease})`);
          outerGrad.addColorStop(0.4, `rgba(166, 131, 74, ${0.17 * ease})`);
          outerGrad.addColorStop(1, "rgba(166, 131, 74, 0)");
        } else {
          outerGrad.addColorStop(0, `rgba(168, 134, 72, ${0.56 * ease})`);
          outerGrad.addColorStop(0.4, `rgba(168, 134, 72, ${0.2 * ease})`);
          outerGrad.addColorStop(1, "rgba(168, 134, 72, 0)");
        }
        ctx.fillStyle = outerGrad;
        ctx.beginPath();
        ctx.arc(c.px, c.py, glowR * hoverMul, 0, Math.PI * 2);
        ctx.fill();

        const ringPhase = (t / 9500 + i * 0.33) % 1;
        const ringR = ringPhase * (glowR * 1.2);
        const ringAlpha = (1 - ringPhase) * (getTheme() === "day" ? 0.34 : 0.3) * ease;
        ctx.strokeStyle = `rgba(${broadcastStrokeRGB}, ${ringAlpha})`;
        if (c.kind === "closed") {
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
        } else {
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
        }
        ctx.beginPath();
        ctx.arc(c.px, c.py, ringR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = C.portfolioRing;
        ctx.lineWidth = 1.2;
        if (c.kind !== "closed") ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.arc(c.px, c.py, r + 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        if (c.kind === "closed") {
          const coreGrad = ctx.createRadialGradient(c.px, c.py - r * 0.2, 0, c.px, c.py, r);
          coreGrad.addColorStop(0, C.portfolioCore[0]);
          coreGrad.addColorStop(0.5, C.portfolioCore[1]);
          coreGrad.addColorStop(1, C.portfolioCore[2]);
          ctx.fillStyle = coreGrad;
          ctx.globalAlpha = ease;
          ctx.beginPath();
          ctx.arc(c.px, c.py, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = getTheme() === "day" ? "rgba(245, 242, 235, 1)" : "rgba(6, 10, 8, 1)";
          ctx.globalAlpha = ease;
          ctx.beginPath();
          ctx.arc(c.px, c.py, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;

          ctx.strokeStyle = C.portfolioCore[1];
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(c.px, c.py, r, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = C.portfolioCore[1];
          ctx.beginPath();
          ctx.arc(c.px, c.py, r * 0.32, 0, Math.PI * 2);
          ctx.fill();
        }

        const labelOpacity = ease;
        const labelOffset = 32;
        const labelX = c.px + labelOffset;

        const subLabel = c.kind === "closed" ? c.league : `${c.league} · TBD`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";

        // Measure label text to size a soft backdrop plate (no border).
        ctx.font = `italic 400 14px ${canvasFontVar("--font-serif")}`;
        const numW = ctx.measureText(c.num).width;
        ctx.font = `italic 400 17px ${canvasFontVar("--font-serif")}`;
        const labelW = ctx.measureText(c.label).width;
        ctx.font = `400 12px ${canvasFontVar("--font-sans")}`;
        const subW = ctx.measureText(subLabel).width;

        const logoSrc = c.logo as string | undefined;
        const logoImg = logoSrc ? portfolioLogoImages[logoSrc] : undefined;
        const logoReady = Boolean(logoImg && logoImg.complete && logoImg.naturalWidth > 0);
        /** Stacked crest + wordmark (broadcast / fixture-card pattern); inline row for other markers. */
        const LOGO_STACK_H = 26;
        const logoWStack =
          logoReady && logoImg ? LOGO_STACK_H * (logoImg.naturalWidth / logoImg.naturalHeight) : 0;

        const gapLogoTitle = 5;
        const gapTitleSub = 5;
        const titleLineH = 18;
        const subLineH = 12;

        const isDayTheme = getTheme() === "day";
        let haloCx: number;
        let haloCy: number;
        let haloRx: number;
        let haloRy: number;
        let lockupColumnX = 0;
        let stackTop = 0;
        const stackH =
          LOGO_STACK_H + gapLogoTitle + titleLineH + gapTitleSub + subLineH;

        if (logoReady && logoImg) {
          lockupColumnX = labelX + numW + 10;
          stackTop = c.py - stackH / 2;
          const blockW = Math.max(logoWStack, labelW, subW);
          haloCx = lockupColumnX + blockW / 2;
          haloCy = c.py;
          haloRx = blockW / 2 + 56;
          haloRy = stackH / 2 + 26;
        } else {
          const blockStart = labelX + 22;
          const blockW = Math.max(labelW, subW);
          haloCx = blockStart + blockW / 2;
          haloCy = c.py + 5;
          haloRx = blockW / 2 + 60;
          haloRy = 30;
        }

        // Soft elliptical halo behind the label: looks like a vignette, not a rectangle.
        ctx.save();
        ctx.translate(haloCx, haloCy);
        ctx.scale(haloRx / haloRy, 1);
        const haloGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, haloRy);
        if (isDayTheme) {
          haloGrad.addColorStop(0, `rgba(245, 242, 235, ${0.78 * labelOpacity})`);
          haloGrad.addColorStop(0.55, `rgba(245, 242, 235, ${0.5 * labelOpacity})`);
          haloGrad.addColorStop(1, `rgba(245, 242, 235, 0)`);
        } else {
          haloGrad.addColorStop(0, `rgba(6, 10, 8, ${0.92 * labelOpacity})`);
          haloGrad.addColorStop(0.55, `rgba(6, 10, 8, ${0.58 * labelOpacity})`);
          haloGrad.addColorStop(1, `rgba(6, 10, 8, 0)`);
        }
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(0, 0, haloRy, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.strokeStyle = isDayTheme
          ? `rgba(115, 90, 52, ${0.5 * labelOpacity})`
          : `rgba(168, 134, 72, ${0.5 * labelOpacity})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(c.px + r + 7, c.py);
        ctx.lineTo(labelX - 4, c.py);
        ctx.stroke();

        ctx.fillStyle = isDayTheme ? `rgba(99, 77, 44, ${labelOpacity})` : `rgba(168, 134, 72, ${labelOpacity})`;
        ctx.font = `italic 400 14px ${canvasFontVar("--font-serif")}`;
        ctx.textBaseline = "middle";
        ctx.fillText(c.num, labelX, c.py - 1);

        if (logoReady && logoImg) {
          ctx.globalAlpha = labelOpacity;
          ctx.drawImage(logoImg, lockupColumnX, stackTop, logoWStack, LOGO_STACK_H);
          ctx.globalAlpha = 1;
          ctx.textBaseline = "top";
          ctx.fillStyle = isDayTheme
            ? `rgba(26, 37, 32, ${labelOpacity})`
            : `rgba(242, 234, 214, ${labelOpacity})`;
          ctx.font = `italic 400 17px ${canvasFontVar("--font-serif")}`;
          ctx.fillText(c.label, lockupColumnX, stackTop + LOGO_STACK_H + gapLogoTitle);
          ctx.fillStyle = isDayTheme
            ? `rgba(26, 37, 32, ${0.55 * labelOpacity})`
            : `rgba(242, 234, 214, ${0.55 * labelOpacity})`;
          ctx.font = `400 12px ${canvasFontVar("--font-sans")}`;
          ctx.fillText(
            subLabel,
            lockupColumnX,
            stackTop + LOGO_STACK_H + gapLogoTitle + titleLineH + gapTitleSub,
          );
        } else {
          const nameX = labelX + 22;
          ctx.fillStyle = isDayTheme
            ? `rgba(26, 37, 32, ${labelOpacity})`
            : `rgba(242, 234, 214, ${labelOpacity})`;
          ctx.font = `italic 400 17px ${canvasFontVar("--font-serif")}`;
          ctx.textBaseline = "middle";
          ctx.fillText(c.label, nameX, c.py - 1);
          ctx.fillStyle = isDayTheme
            ? `rgba(26, 37, 32, ${0.55 * labelOpacity})`
            : `rgba(242, 234, 214, ${0.55 * labelOpacity})`;
          ctx.font = `400 12px ${canvasFontVar("--font-sans")}`;
          ctx.fillText(subLabel, nameX, c.py + 15);
        }
        ctx.textBaseline = "alphabetic";
      });

      // ---- LEAVE GEOGRAPHIC LAYER (final) ----
      // Tooltip is positioned via clientX/clientY (DOM), so no transform needed.
      ctx.restore();

      // Sync recenter button visibility once per frame (cheap class-toggle).
      syncRecenterVisibility();

      // TOOLTIP
      const showCity = pinned || hoveredCity;
      if (showCity && tooltip && tCity && tClub && tTier && tFlow && tCountry && cursor) {
        tooltip.classList.add("visible");
        tooltip.style.left = `${mouse.clientX}px`;
        tooltip.style.top = `${mouse.clientY}px`;
        tCity.textContent = showCity.label || showCity.name;
        tClub.textContent = showCity.club;
        if (showCity.tier === "P") {
          tTier.textContent = `Portfolio · ${showCity.num}`;
          tFlow.textContent = showCity.status;
        } else if (showCity.tier === "W") {
          tTier.textContent = "Global hub";
          tFlow.textContent = "Football market";
        } else {
          tTier.textContent = "Watchlist";
          tFlow.textContent = "Monitoring";
        }
        tCountry.textContent = showCity.country;
        cursor.classList.add("hovering-city");
      } else {
        tooltip?.classList.remove("visible");
        cursor?.classList.remove("hovering-city");
      }

      /* Drive the Ipswich preview from the live map hover state. classList
         toggles are no-ops when the class is already in the right state,
         so this is cheap to call every frame. */
      if (heroSection) {
        const onIpswich = showCity?.name === "Ipswich";
        heroSection.classList.toggle("is-ipswich-hovered", !!onIpswich);
      }

      rafRender = window.requestAnimationFrame(render);
    }

    rafRender = window.requestAnimationFrame(render);

    return () => {
      cancelContextBuild();
      if (resizeRaf) window.cancelAnimationFrame(resizeRaf);
      themeObserver?.disconnect();
      window.removeEventListener("resize", onResize);
      embedObserver?.disconnect();
      visibilityObserver?.disconnect();
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("pointermove", updateMousePosition);
      document.documentElement.removeEventListener("mouseleave", onLeaveViewport);
      document.documentElement.removeEventListener("mouseenter", onEnterViewport);
      canvasEl.removeEventListener("click", onCanvasClickGuarded);
      canvasEl.removeEventListener("pointerdown", onPointerDown);
      canvasEl.removeEventListener("pointermove", onPointerMove);
      canvasEl.removeEventListener("pointerup", endDrag);
      canvasEl.removeEventListener("pointercancel", endDrag);
      canvasEl.removeEventListener("pointerleave", endDrag);
      recenterButton?.removeEventListener("click", onRecenterClick);
      if (hintTimer !== undefined) window.clearTimeout(hintTimer);
      window.cancelAnimationFrame(rafRender);
    };
  }, [embed]);

  const recenterButton = (
    <button
      type="button"
      id="cv-recenter"
      className="cv-recenter"
      aria-label="Recenter map on Europe"
    >
      <svg
        className="cv-recenter-icon"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        aria-hidden="true"
      >
        <path
          d="M11 7H4M6 4L3 7l3 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="11" cy="7" r="1.4" fill="currentColor" />
      </svg>
      <span>Recenter Europe</span>
    </button>
  );

  const mapCanvas = (
    <canvas
      id="map-canvas"
      ref={canvasRef}
      role="region"
      aria-label="Global market map, draggable"
    />
  );

  const dragHint = (
    <div className="cv-hint" id="cv-hint" aria-hidden="true">
      <span className="cv-hint-arrow">←</span>
      <span className="cv-hint-text">Drag to explore</span>
      <span className="cv-hint-arrow">→</span>
    </div>
  );

  const loader = (
    <div className="loader" id="loader">
      <div className="loader-mark">CLARA · VISTA</div>
      <div className="loader-bar" />
      <div className="loader-sub">Tracing Europe&apos;s pitch</div>
    </div>
  );

  if (embed) {
    return (
      <div ref={wrapRef}>
        {loader}
        <section className="hero">
          {mapCanvas}
          {dragHint}
          <div className="hero-bottom">{recenterButton}</div>
        </section>
      </div>
    );
  }

  return (
    <div ref={wrapRef}>
      {loader}

      <section className="hero">
        {mapCanvas}
        {dragHint}

        <div className="hero-bottom">
          <div className="hero-headline">
            <div className="eyebrow">Data-Driven Sports Investment</div>
            <h1 className="headline">
              WE <em>INVEST.</em>
              <br />
              WE <em>BUILD.</em>
              <br />
              WE <em>WIN.</em>
            </h1>
            <p className="subhead">
              Owning exceptional football clubs in the world&apos;s most valuable leagues.
              We invest behind strong tailwinds and partner with winning organizations to achieve excellence across every dimension of
              performance.
            </p>
          </div>

          {recenterButton}
        </div>

        <div className="portfolio-panel">
          <div className="pp-label">
            <span>Active Portfolio</span>
            <span className="pp-label-count">01 / 03</span>
          </div>
          <Link
            href="/portfolio/ipswich"
            className="pp-row is-ipswich"
            aria-label="View Ipswich Town FC details"
          >
            <div className="pp-num">01</div>
            <div className="pp-info">
              <div className="pp-city">Ipswich</div>
              <div className="pp-club">Ipswich Town FC · England</div>
            </div>
            <div className="pp-status active" title="Active" />
          </Link>
          <Link href="/portfolio/frosinone" className="pp-row" aria-label="View Frosinone Calcio details">
            <div className="pp-num">02</div>
            <div className="pp-info">
              <div className="pp-city">Frosinone</div>
              <div className="pp-club">Frosinone Calcio · Italy</div>
            </div>
            <div className="pp-status active" title="Active" />
          </Link>
          <Link href="/portfolio/spain" className="pp-row" aria-label="View Spain target details">
            <div className="pp-num">03</div>
            <div className="pp-info">
              <div className="pp-city">Spain</div>
              <div className="pp-club">Target · active diligence</div>
            </div>
            <div className="pp-status diligence" title="Diligence" />
          </Link>
        </div>

        {/* Ipswich hover preview — anchored beneath the Active Portfolio panel.
            Appears when the Ipswich row is hovered/focused, when the preview
            itself is hovered, or when the Ipswich marker on the map is
            hovered (driven by the `.is-ipswich-hovered` class on the hero,
            toggled inside the render loop). Cycles through the same photos
            used by the team page Moments strip. */}
        <aside className="ipswich-preview" aria-hidden="true">
          <div className="ipswich-preview-stack">
            {TEAM_MOMENTS.map((m, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={m.src}
                className={`ipswich-preview-img is-frame-${i + 1}`}
                src={m.src}
                alt=""
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <div className="ipswich-preview-cap">Behind the scenes · Ipswich</div>
        </aside>

        <div className="credentials">
          <div className="cred-item">
            <div className="cred-value">
              <em>$</em>240M
            </div>
            <div className="cred-label">AUM</div>
          </div>
          <div className="cred-divider" />
          <div className="cred-item">
            <div className="cred-value">
              3.5<em>B</em>
            </div>
            <div className="cred-label">Global Fans</div>
          </div>
        </div>

        <div className="tooltip" id="tooltip">
          <div className="tooltip-meta">
            <span id="t-tier">Portfolio</span>
            <span id="t-country">ES</span>
          </div>
          <div className="tooltip-city" id="t-city" />
          <div className="tooltip-club" id="t-club" />
          <div className="tooltip-divider" />
          <div className="tooltip-stat">
            <span>Status</span>
            <strong id="t-flow">Active</strong>
          </div>
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="ps-head">
          <div>
            <div className="ps-eyebrow">001 · Active Portfolio</div>
            <h2>
              Three clubs. Three leagues. <em>One operating system.</em>
            </h2>
          </div>
        </div>
        <div className="ps-grid">
          <div className="club-card">
            <div className="cc-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ipswich-town.svg" alt="Ipswich Town FC crest" />
            </div>
            <div className="cc-meta">
              <span className="cc-num">01 / Ipswich Town FC</span>
              <span className="cc-status">
                <span className="cc-dot active" aria-hidden="true" />
                <span className="cc-status-text">Active</span>
              </span>
            </div>
            <div className="cc-name">Ipswich Town</div>
            <div className="cc-location">Ipswich · England</div>
            <p className="cc-note">
              Controlling shareholder, Ipswich is the anchor investment of Fund II. Held via the <em>Portman Holdings LLC</em> consortium alongside ORG Portfolio
              Management and the Three Lions Fund. Back-to-back promotions to the Premier League — among the highest
              player value creation in global football in 2024/25.
            </p>
            <div className="cc-stats">
              <div>
                <div className="cc-stat-label">Founded</div>
                <div className="cc-stat-value">1878</div>
              </div>
              <div>
                <div className="cc-stat-label">League</div>
                <div className="cc-stat-value">Premier League</div>
              </div>
            </div>
            <Link href="/portfolio/ipswich" className="cc-link">
              View deep dive
            </Link>
          </div>
          <div className="club-card">
            <div className="cc-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/frosinone-calcio.png" alt="Frosinone Calcio crest" className="frosinone-crest" />
            </div>
            <div className="cc-meta">
              <span className="cc-num">02 / Frosinone Calcio</span>
              <span className="cc-status">
                <span className="cc-dot active" aria-hidden="true" />
                <span className="cc-status-text">Active</span>
              </span>
            </div>
            <div className="cc-name">Frosinone Calcio</div>
            <div className="cc-location">Frosinone · Italy · Serie A</div>
            <p className="cc-note">
              Controlling investment via Clara Vista Frosinone SPV I. Promoted to Serie A in 2025/26 — a modern
              16,227-seat stadium and three top-flight promotions in the last decade — located an hour from Rome.
            </p>
            <div className="cc-stats">
              <div>
                <div className="cc-stat-label">Founded</div>
                <div className="cc-stat-value">1928</div>
              </div>
              <div>
                <div className="cc-stat-label">League</div>
                <div className="cc-stat-value">Serie A</div>
              </div>
            </div>
            <Link href="/portfolio/frosinone" className="cc-link">
              View deep dive
            </Link>
          </div>
          <div className="club-card">
            <div className="cc-logo cc-logo-placeholder" aria-hidden="true" />
            <div className="cc-meta">
              <span className="cc-num">03 / Spain</span>
              <span className="cc-status">
                <span className="cc-dot diligence" aria-hidden="true" />
                <span className="cc-status-text">Active diligence</span>
              </span>
            </div>
            <div className="cc-name">
              Spain <em>(target)</em>
            </div>
            <div className="cc-location">Spain · La Liga</div>
            <p className="cc-note">
              A historic Spanish club in active diligence — La Liga is the second most valuable football league in the world, primary
              league for the 600M-strong Spanish-speaking market, with mid-table valuations trading well below European peers.{" "}
              <em>Details under embargo.</em>
            </p>
            <div className="cc-stats">
              <div>
                <div className="cc-stat-label">Founded</div>
                <div className="cc-stat-value">
                  <em>under embargo</em>
                </div>
              </div>
              <div>
                <div className="cc-stat-label">League</div>
                <div className="cc-stat-value">La Liga</div>
              </div>
            </div>
            <Link href="/portfolio/spain" className="cc-link">
              View diligence brief
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

