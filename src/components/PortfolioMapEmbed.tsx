"use client";

import dynamic from "next/dynamic";

const ClaraVistaMapLegacy = dynamic(
  () => import("@/components/ClaraVistaMapLegacy").then((m) => ({ default: m.ClaraVistaMapLegacy })),
  {
    ssr: false,
    loading: () => (
      <div className="portfolio-map-skeleton" aria-hidden="true">
        <div className="portfolio-map-skeleton-shimmer" />
      </div>
    ),
  },
);

export function PortfolioMapEmbed() {
  return <ClaraVistaMapLegacy embed />;
}
