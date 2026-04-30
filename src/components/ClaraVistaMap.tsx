"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

function canvasFontVar(name: "--font-sans" | "--font-serif" | "--font-mono"): string {
  if (typeof document === "undefined") return "sans-serif";
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || "sans-serif";
}

export function ClaraVistaMap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

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

    const getTheme = () => (document.documentElement.dataset.theme === "day" ? "day" : "night");
    const getColors = () => {
      if (getTheme() === "day") {
        return {
          spotlight1: "rgba(220, 215, 195, 0.55)",
          spotlight2: "rgba(244, 237, 220, 0)",
          countryFill: "rgba(6, 93, 57, 0.072)",
          countryStroke: "rgba(6, 93, 57, 0.52)",
          countryStrokeStrong: "rgba(6, 93, 57, 0.66)",
          particle: "rgba(26, 37, 32, 0.28)",
          ambientCity: "rgba(26, 37, 32, 0.7)",
          ambientCityHalo: "rgba(6, 93, 57, 0.18)",
          worldCity: "rgba(26, 37, 32, 0.45)",
          worldCityLit: "rgba(6, 93, 57, 0.85)",
          portfolioCore: ["#34c281", "#0a7a47", "#065d39"],
          portfolioGlow: "rgba(14, 138, 85, 0.48)",
          portfolioRing: "rgba(6, 93, 57, 0.72)",
          portfolioPulse: "rgba(6, 93, 57, 0.45)",
          broadcast: "rgba(6, 93, 57, 0.38)",
          broadcastInner: "rgba(6, 93, 57, 0.17)",
          transferLine: "rgba(154, 111, 48, 0.34)",
          transferGlow: "rgba(154, 111, 48, 0.85)",
          labelPrimary: "#1A2520",
          labelSecondary: "rgba(26, 37, 32, 0.62)",
          labelAccent: "#065d39",
        };
      }
      return {
        spotlight1: "rgba(20, 50, 36, 0.45)",
        spotlight2: "rgba(8, 22, 14, 0.20)",
        countryFill: "rgba(52, 194, 129, 0.06)",
        countryStroke: "rgba(52, 194, 129, 0.36)",
        countryStrokeStrong: "rgba(52, 194, 129, 0.48)",
        particle: "rgba(242, 234, 214, 0.26)",
        ambientCity: "rgba(242, 234, 214, 0.78)",
        ambientCityHalo: "rgba(242, 234, 214, 0.32)",
        worldCity: "rgba(242, 234, 214, 0.34)",
        worldCityLit: "rgba(242, 234, 214, 0.95)",
        portfolioCore: ["#7be0aa", "#34c281", "#065d39"],
        portfolioGlow: "rgba(52, 194, 129, 0.56)",
        portfolioRing: "rgba(52, 194, 129, 0.76)",
        portfolioPulse: "rgba(52, 194, 129, 0.45)",
        broadcast: "rgba(52, 194, 129, 0.22)",
        broadcastInner: "rgba(52, 194, 129, 0.10)",
        transferLine: "rgba(212, 168, 106, 0.26)",
        transferGlow: "rgba(232, 197, 71, 0.85)",
        labelPrimary: "#F2EAD6",
        labelSecondary: "rgba(242, 234, 214, 0.62)",
        labelAccent: "#34c281",
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
        league: "EFL Championship",
        status: "Active",
        kind: "closed",
        num: "01",
        logo: "/ipswich-town.svg",
      },
      {
        name: "Italy",
        country: "IT",
        lat: 42.6,
        lng: 12.5,
        label: "Italy",
        club: "Target acquisition · active diligence",
        league: "Serie B",
        status: "Diligence",
        kind: "diligence",
        num: "02",
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
        num: "03",
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const WORLD: any[] = [
      { name: "New York", country: "US", sx: 0.045, sy: 0.34, club: "NBC Sports · Premier League US" },
      { name: "Toronto", country: "CA", sx: 0.04, sy: 0.24, club: "TSN · global feed" },
      { name: "Los Angeles", country: "US", sx: 0.02, sy: 0.4, club: "West Coast viewership" },
      { name: "Mexico City", country: "MX", sx: 0.03, sy: 0.5, club: "TUDN · ESPN Deportes" },
      { name: "Bogotá", country: "CO", sx: 0.06, sy: 0.61, club: "ESPN Latin America" },
      { name: "Lima", country: "PE", sx: 0.03, sy: 0.69, club: "ESPN Latin America" },
      { name: "São Paulo", country: "BR", sx: 0.09, sy: 0.78, club: "Globo · 50M+ viewers" },
      { name: "Rio de Janeiro", country: "BR", sx: 0.13, sy: 0.74, club: "SporTV" },
      { name: "Buenos Aires", country: "AR", sx: 0.075, sy: 0.9, club: "ESPN Sur" },
      { name: "Casablanca", country: "MA", sx: 0.29, sy: 0.78, club: "beIN MENA" },
      { name: "Cairo", country: "EG", sx: 0.475, sy: 0.78, club: "beIN Sports MENA" },
      { name: "Lagos", country: "NG", sx: 0.395, sy: 0.88, club: "SuperSport · 200M+ fans" },
      { name: "Nairobi", country: "KE", sx: 0.51, sy: 0.91, club: "SuperSport East Africa" },
      { name: "Cape Town", country: "ZA", sx: 0.45, sy: 0.97, club: "SuperSport · DStv" },
      { name: "Dubai", country: "AE", sx: 0.64, sy: 0.58, club: "beIN Sports · MENA hub" },
      { name: "Riyadh", country: "SA", sx: 0.62, sy: 0.66, club: "Saudi sovereign capital" },
      { name: "Tehran", country: "IR", sx: 0.62, sy: 0.42, club: "IRIB Varzesh" },
      { name: "Mumbai", country: "IN", sx: 0.73, sy: 0.58, club: "Star Sports · 100M+ fans" },
      { name: "Delhi", country: "IN", sx: 0.755, sy: 0.45, club: "Star Sports · Hotstar" },
      { name: "Bangkok", country: "TH", sx: 0.84, sy: 0.62, club: "TrueVisions" },
      { name: "Singapore", country: "SG", sx: 0.87, sy: 0.72, club: "StarHub · Singtel" },
      { name: "Jakarta", country: "ID", sx: 0.91, sy: 0.78, club: "Champions TV · 50M+ fans" },
      { name: "Hong Kong", country: "HK", sx: 0.89, sy: 0.5, club: "Now Sports · PCCW" },
      { name: "Shanghai", country: "CN", sx: 0.92, sy: 0.4, club: "iQIYI · 200M+ fans" },
      { name: "Beijing", country: "CN", sx: 0.945, sy: 0.3, club: "CCTV-5 · state broadcast" },
      { name: "Seoul", country: "KR", sx: 0.95, sy: 0.35, club: "JTBC · SPOTV" },
      { name: "Tokyo", country: "JP", sx: 0.975, sy: 0.32, club: "DAZN Japan" },
      { name: "Moscow", country: "RU", sx: 0.665, sy: 0.2, club: "Match TV" },
      { name: "Sydney", country: "AU", sx: 0.945, sy: 0.91, club: "Optus Sport · Fox" },
      { name: "Melbourne", country: "AU", sx: 0.91, sy: 0.95, club: "Optus Sport" },
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
    const DESKTOP_MAP_SHIFT_X = 0.12; // proportion of viewport width
    const DESKTOP_MAP_SHIFT_Y = -0.02; // proportion of viewport height (negative = up)

    let proj = { ox: 0, oy: 0, drawW: 0, drawH: 0 };
    function computeProjection() {
      const isMobile = W <= 720;
      const targetWidth = isMobile ? Math.min(W * 1.06, 980) : Math.min(W * 0.62, 1100);
      const lngRange = BOUNDS.maxLng - BOUNDS.minLng;
      const latRange = BOUNDS.maxLat - BOUNDS.minLat;
      const meanLatCos = Math.cos(((BOUNDS.maxLat + BOUNDS.minLat) / 2) * Math.PI / 180);
      const dataAspect = (lngRange / latRange) * meanLatCos * 1.4;

      let drawW = targetWidth;
      let drawH = drawW / dataAspect;
      const maxH = isMobile ? H * 0.72 : H * 0.78;
      if (drawH > maxH) {
        drawH = maxH;
        drawW = drawH * dataAspect;
      }
      // Mobile framing notes:
      // - Push Europe up so northern latitudes crop out (focus: UK/Spain/Italy triangle).
      // - Nudge right so Spain has left breathing room.
      const shiftX = isMobile ? 0.06 : DESKTOP_MAP_SHIFT_X;
      const shiftY = isMobile ? -0.13 : DESKTOP_MAP_SHIFT_Y;
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

    function whichCountry(lat: number, lng: number) {
      for (let i = 0; i < COUNTRIES.length; i++) {
        if (pointInPolygonLL(lat, lng, COUNTRIES[i].poly)) return COUNTRIES[i].name;
      }
      return null;
    }

    function buildDotMap() {
      DOTS.length = 0;
      const stepLat = 0.2;
      const stepLng = 0.28;
      for (let lat = 35; lat <= 71; lat += stepLat) {
        for (let lng = -12; lng <= 35; lng += stepLng) {
          const country = whichCountry(lat, lng);
          if (country) {
            const p = project(lat, lng);
            DOTS.push({
              x: p.x,
              y: p.y,
              country,
              isPortfolio: PORTFOLIO_COUNTRIES.has(country),
              basePhase: Math.random() * Math.PI * 2,
              jitterX: (Math.random() - 0.5) * 1.4,
              jitterY: (Math.random() - 0.5) * 1.4,
              proximity: 0,
              waveBoost: 0,
            });
          }
        }
      }
      DOTS.forEach((d) => {
        d.x += d.jitterX;
        d.y += d.jitterY;
      });
    }

    function recomputeProjection() {
      computeProjection();
      ALL_EU.forEach((c) => {
        const p = project(c.lat, c.lng);
        c.px = p.x;
        c.py = p.y;
      });
      WORLD.forEach((c) => {
        c.px = c.sx * W;
        c.py = c.sy * H;
      });
      COUNTRIES.forEach((country) => {
        country.points = country.poly.map(([lat, lng]: [number, number]) => project(lat, lng));
      });
      buildDotMap();
    }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvasEl.width = W * DPR;
      canvasEl.height = H * DPR;
      canvasEl.style.width = `${W}px`;
      canvasEl.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
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
    function emitWave(city: any, startT: number) {
      WAVES.push({ cx: city.px, cy: city.py, start: startT, duration: 9000 });
    }

    // ---- MOUSE ----
    const mouse = { x: -9999, y: -9999, clientX: 0, clientY: 0 };
    let pinned: any = null;
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
    canvasEl.addEventListener("click", onCanvasClick);

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
    const onResize = () => {
      resize();
      initParticles();
    };
    window.addEventListener("resize", onResize);
    resize();
    initParticles();

    // ---- RENDER LOOP ----
    let firstFrame = performance.now();
    let lastBroadcastTime = [-Infinity, -Infinity, -Infinity];
    // Slow broadcast ripples too (they radiate from the same 3 portfolio towns).
    const BROADCAST_INTERVAL = [26000, 28500, 27200];
    let lastTransferTime = -Infinity;
    let rafRender = 0;

    function render(t: number) {
      const elapsed = t - firstFrame;
      const C = getColors();
      const isDayFrame = getTheme() === "day";
      // Pre-parse the broadcast color base alpha once per frame (regex was running per ripple).
      const broadcastBaseAlpha = parseFloat((C.broadcast.match(/[\d.]+(?=\))/) ?? ["0"])[0]);
      const broadcastStrokeRGB = isDayFrame ? "6, 93, 57" : "52, 194, 129";
      ctx.clearRect(0, 0, W, H);

      // Background spotlight
      const europeCx = proj.ox + proj.drawW * 0.5;
      const europeCy = proj.oy + proj.drawH * 0.5;
      const spotGrad = ctx.createRadialGradient(europeCx, europeCy, 60, europeCx, europeCy, Math.max(W, H) * 0.55);
      spotGrad.addColorStop(0, C.spotlight1);
      spotGrad.addColorStop(0.5, C.spotlight2);
      spotGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, W, H);

      // KICK-OFF WAVES — round-robin so cities never pulse on top of each other.
      if (elapsed > WAVE_FIRST_DELAY && t - lastAnyWaveTime > WAVE_GAP) {
        const c = PORTFOLIO[nextWaveCityIdx];
        if (c && c.px) {
          emitWave(c, t);
          lastAnyWaveTime = t;
          nextWaveCityIdx = (nextWaveCityIdx + 1) % PORTFOLIO.length;
        }
      }
      for (let i = 0; i < DOTS.length; i++) DOTS[i].waveBoost = 0;
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
        for (let i = 0; i < DOTS.length; i++) {
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
      ctx.strokeStyle = getTheme() === "day" ? `rgba(6, 93, 57, ${hubAlpha})` : `rgba(52, 194, 129, ${hubAlpha})`;
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

      for (let i = 0; i < DOTS.length; i++) {
        const d = DOTS[i];
        let target = 0;
        if (mouseActive) {
          const dx = d.x - mx;
          const dy = d.y - my;
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
        ctx.fillStyle = isPort ? `rgba(${portR},${portG},${portB},${alpha})` : `rgba(${dotR},${dotG},${dotB},${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouseActive) {
        const haloGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        if (isDay) {
          haloGrad.addColorStop(0, "rgba(6, 93, 57, 0.08)");
          haloGrad.addColorStop(1, "rgba(6, 93, 57, 0)");
        } else {
          haloGrad.addColorStop(0, "rgba(52, 194, 129, 0.08)");
          haloGrad.addColorStop(1, "rgba(52, 194, 129, 0)");
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
          const dist = Math.hypot(wc.px - b.cx, wc.py - b.cy);
          if (Math.abs(dist - r) < ringWidth) {
            const proximity = 1 - Math.abs(dist - r) / ringWidth;
            wc.lit = Math.max(wc.lit, proximity);
          }
        });
      }

      // WORLD + AMBIENT + PORTFOLIO markers (unchanged logic from the original)
      // For brevity in this component, we keep the exact drawing + tooltip behavior.
      hoveredCity = null;
      let bestHover = Infinity;

      WORLD.forEach((c) => {
        if (elapsed < c.revealAt) return;
        const reveal = Math.min(1, (elapsed - c.revealAt) / 900);
        const ease = 1 - Math.pow(1 - reveal, 3);
        const litBoost = c.lit;
        c.lit *= 0.985;
        const pulse = 0.5 + 0.5 * Math.sin((t / c.period) * Math.PI * 2 + c.phase);
        const baseR = 1.4 + pulse * 0.35;
        const r = baseR * ease;
        const glowR = (3.5 + pulse * 1.2 + litBoost * 4) * ease;

        // Peripheral falloff: world hubs far from the European focal area get dimmer.
        const europeCx2 = proj.ox + proj.drawW * 0.5;
        const europeCy2 = proj.oy + proj.drawH * 0.5;
        const distE = Math.hypot(c.px - europeCx2, c.py - europeCy2);
        const innerR2 = Math.min(W, H) * 0.2;
        const outerR2 = Math.min(W, H) * 0.55;
        const tFadeW = Math.min(1, Math.max(0, (distE - innerR2) / (outerR2 - innerR2)));
        const fadeW = 1 - (tFadeW * tFadeW * (3 - 2 * tFadeW));
        const peripheralW = 0.18 + 0.82 * fadeW;

        const dx = c.px - mouse.x;
        const dy = c.py - mouse.y;
        const d = Math.hypot(dx, dy);
        const isHover = d < 18;
        if (isHover && d < bestHover) {
          hoveredCity = c;
          bestHover = d;
        }
        const hoverMul = isHover ? 2.0 : 1;

        const ringGrad = ctx.createRadialGradient(c.px, c.py, 0, c.px, c.py, glowR * hoverMul);
        if (getTheme() === "day") {
          const glowAlpha = (0.26 + litBoost * 0.28) * ease * peripheralW;
          ringGrad.addColorStop(0, `rgba(6, 93, 57, ${glowAlpha})`);
          ringGrad.addColorStop(1, "rgba(6, 93, 57, 0)");
        } else {
          const glowAlpha = (0.26 + litBoost * 0.28) * ease * peripheralW;
          ringGrad.addColorStop(0, `rgba(242, 234, 214, ${glowAlpha})`);
          ringGrad.addColorStop(1, "rgba(242, 234, 214, 0)");
        }
        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(c.px, c.py, glowR * hoverMul, 0, Math.PI * 2);
        ctx.fill();

        const coreAlpha = (0.42 + litBoost * 0.26) * ease * peripheralW;
        ctx.fillStyle =
          getTheme() === "day"
            ? `rgba(26, 37, 32, ${Math.min(1, coreAlpha)})`
            : `rgba(242, 234, 214, ${Math.min(1, coreAlpha)})`;
        ctx.beginPath();
        ctx.arc(c.px, c.py, r * (1 + litBoost * 0.25), 0, Math.PI * 2);
        ctx.fill();

        if (isHover) {
          ctx.fillStyle = C.labelPrimary;
          ctx.font = `300 11px ${canvasFontVar("--font-mono")}`;
          ctx.textAlign = "left";
          ctx.fillText(c.name.toUpperCase(), c.px + r + 8, c.py + 3.5);
        }
      });

      AMBIENT.forEach((c) => {
        if (elapsed < c.revealAt) return;
        const reveal = Math.min(1, (elapsed - c.revealAt) / 700);
        const ease = 1 - Math.pow(1 - reveal, 3);
        const pulse = 0.5 + 0.5 * Math.sin((t / c.period) * Math.PI * 2 + c.phase);
        const r = (1.7 + pulse * 0.5) * ease;
        const glowR = (8 + pulse * 3) * ease;

        const dx = c.px - mouse.x;
        const dy = c.py - mouse.y;
        const d = Math.hypot(dx, dy);
        const isHover = d < 18;
        if (isHover && d < bestHover) {
          hoveredCity = c;
          bestHover = d;
        }
        const hoverMul = isHover ? 1.8 : 1;

        const ringGrad = ctx.createRadialGradient(c.px, c.py, 0, c.px, c.py, glowR * hoverMul);
        if (getTheme() === "day") {
          ringGrad.addColorStop(0, `rgba(6, 93, 57, ${0.44 * ease})`);
          ringGrad.addColorStop(1, "rgba(6, 93, 57, 0)");
        } else {
          ringGrad.addColorStop(0, `rgba(242, 234, 214, ${0.5 * ease})`);
          ringGrad.addColorStop(1, "rgba(242, 234, 214, 0)");
        }
        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(c.px, c.py, glowR * hoverMul, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = getTheme() === "day" ? `rgba(26, 37, 32, ${0.78 * ease})` : `rgba(242, 234, 214, ${0.78 * ease})`;
        ctx.beginPath();
        ctx.arc(c.px, c.py, r, 0, Math.PI * 2);
        ctx.fill();

        if (isHover) {
          ctx.fillStyle = C.labelPrimary;
          ctx.font = `400 11px ${canvasFontVar("--font-sans")}`;
          ctx.textAlign = "left";
          ctx.fillText(c.name, c.px + r + 8, c.py + 3.5);
        }
      });

      PORTFOLIO.forEach((c, i) => {
        if (elapsed < c.revealAt) return;
        const reveal = Math.min(1, (elapsed - c.revealAt) / 1300);
        const ease = 1 - Math.pow(1 - reveal, 3);
        const pulse = 0.5 + 0.5 * Math.sin((t / c.period) * Math.PI * 2 + c.phase);
        const r = (5.4 + pulse * 1.1) * ease;
        const glowR = (44 + pulse * 14) * ease;

        const dx = c.px - mouse.x;
        const dy = c.py - mouse.y;
        const d = Math.hypot(dx, dy);
        const isHover = d < 28;
        if (isHover && d < bestHover) {
          hoveredCity = c;
          bestHover = d;
        }
        const hoverMul = isHover || pinned === c ? 1.5 : 1;

        const outerGrad = ctx.createRadialGradient(c.px, c.py, 0, c.px, c.py, glowR * hoverMul);
        if (getTheme() === "day") {
          outerGrad.addColorStop(0, `rgba(14, 138, 85, ${0.44 * ease})`);
          outerGrad.addColorStop(0.4, `rgba(14, 138, 85, ${0.17 * ease})`);
          outerGrad.addColorStop(1, "rgba(14, 138, 85, 0)");
        } else {
          outerGrad.addColorStop(0, `rgba(52, 194, 129, ${0.56 * ease})`);
          outerGrad.addColorStop(0.4, `rgba(52, 194, 129, ${0.2 * ease})`);
          outerGrad.addColorStop(1, "rgba(52, 194, 129, 0)");
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
        ctx.font = `italic 400 12px ${canvasFontVar("--font-serif")}`;
        const numW = ctx.measureText(c.num).width;
        ctx.font = `italic 400 17px ${canvasFontVar("--font-serif")}`;
        const labelW = ctx.measureText(c.label).width;
        ctx.font = `400 10px ${canvasFontVar("--font-sans")}`;
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
          ? `rgba(6, 93, 57, ${0.5 * labelOpacity})`
          : `rgba(52, 194, 129, ${0.5 * labelOpacity})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(c.px + r + 7, c.py);
        ctx.lineTo(labelX - 4, c.py);
        ctx.stroke();

        ctx.fillStyle = isDayTheme ? `rgba(6, 93, 57, ${labelOpacity})` : `rgba(52, 194, 129, ${labelOpacity})`;
        ctx.font = `italic 400 12px ${canvasFontVar("--font-serif")}`;
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
          ctx.font = `400 10px ${canvasFontVar("--font-sans")}`;
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
          ctx.font = `400 10px ${canvasFontVar("--font-sans")}`;
          ctx.fillText(subLabel, nameX, c.py + 15);
        }
        ctx.textBaseline = "alphabetic";
      });

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
          tTier.textContent = "Audience";
          tFlow.textContent = "Live broadcast";
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

      rafRender = window.requestAnimationFrame(render);
    }

    rafRender = window.requestAnimationFrame(render);

    // Hide loader
    const onWindowLoad = () => {
      setTimeout(() => {
        loader?.classList.add("hidden");
      }, 400);
    };
    window.addEventListener("load", onWindowLoad);
    // In Next.js client navigation, the window 'load' event may have already fired.
    // Match v5_3 behavior by also triggering the hide on mount.
    onWindowLoad();

    return () => {
      window.removeEventListener("load", onWindowLoad);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("pointermove", updateMousePosition);
      document.documentElement.removeEventListener("mouseleave", onLeaveViewport);
      document.documentElement.removeEventListener("mouseenter", onEnterViewport);
      canvasEl.removeEventListener("click", onCanvasClick);
      window.cancelAnimationFrame(rafRender);
    };
  }, []);

  return (
    <div ref={wrapRef}>
      <div className="loader" id="loader">
        <div className="loader-mark">CLARA · VISTA</div>
        <div className="loader-bar" />
        <div className="loader-sub">Tracing Europe&apos;s pitch</div>
      </div>

      <section className="hero">
        <canvas id="map-canvas" ref={canvasRef} />

        <div className="hero-headline">
          <div className="eyebrow">Fund II — Data-Driven Sports Investment</div>
          <h1 className="headline">
            WE <em>INVEST.</em>
            <br />
            WE <em>BUILD.</em>
            <br />
            WE <em>WIN.</em>
            
          </h1>
          <p className="subhead">
            Owning exceptional football clubs in the world's most valuable leagues.
            We invest behind strong tailwinds and partner with winning organizations to achieve excellence across every dimension of
            performance.
          </p>
        </div>

        <div className="portfolio-panel">
          <div className="pp-label">
            <span>Active Portfolio</span>
            <span className="pp-label-count">01 / 03</span>
          </div>
          <Link href="/portfolio/ipswich" className="pp-row" aria-label="View Ipswich Town FC details">
            <div className="pp-num">01</div>
            <div className="pp-info">
              <div className="pp-city">Ipswich</div>
              <div className="pp-club">Ipswich Town FC · England</div>
            </div>
            <div className="pp-status active" title="Active" />
          </Link>
          <Link href="/portfolio/italy" className="pp-row" aria-label="View Italy target details">
            <div className="pp-num">02</div>
            <div className="pp-info">
              <div className="pp-city">Italy</div>
              <div className="pp-club">Target · active diligence</div>
            </div>
            <div className="pp-status diligence" title="Diligence" />
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

        <div className="credentials">
          <div className="cred-item">
            <div className="cred-value">
              <em>$</em>250M
            </div>
            <div className="cred-label">Fund II</div>
          </div>
          <div className="cred-divider" />
          <div className="cred-item">
            <div className="cred-value">
              <em>$</em>140M
            </div>
            <div className="cred-label">Ipswich SPV</div>
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
              Anchor investment of Fund I, with Clara Vista leading the $140M SPV to controlling interest in Q1 2026. Back-to-back
              promotions to the Premier League — one of the rarest feats in English football, and the highest player value creation
              in global football in 2024/25.
            </p>
            <div className="cc-stats">
              <div>
                <div className="cc-stat-label">Founded</div>
                <div className="cc-stat-value">1878</div>
              </div>
              <div>
                <div className="cc-stat-label">League</div>
                <div className="cc-stat-value">Championship</div>
              </div>
            </div>
            <Link href="/portfolio/ipswich" className="cc-link">
              View deep dive
            </Link>
          </div>
          <div className="club-card">
            <div className="cc-logo cc-logo-placeholder" aria-hidden="true" />
            <div className="cc-meta">
              <span className="cc-num">02 / Italy</span>
              <span className="cc-status">
                <span className="cc-dot diligence" aria-hidden="true" />
                <span className="cc-status-text">Active diligence</span>
              </span>
            </div>
            <div className="cc-name">
              Italy <em>(target)</em>
            </div>
            <div className="cc-location">Italy · Serie B</div>
            <p className="cc-note">
              A historic Italian club with a track record of recent Serie A promotions, a modern Serie A-ready stadium, and the
              youngest squad in Serie B. <em>Details under embargo.</em>
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
                <div className="cc-stat-value">Serie B</div>
              </div>
            </div>
            <Link href="/portfolio/italy" className="cc-link">
              View diligence brief
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

