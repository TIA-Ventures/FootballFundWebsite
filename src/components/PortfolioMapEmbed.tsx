"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const mount = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout: 1800 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(mount, 500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready) {
    return (
      <div className="portfolio-map-skeleton" aria-hidden="true">
        <div className="portfolio-map-skeleton-shimmer" />
      </div>
    );
  }

  return <ClaraVistaMapLegacy embed locked />;
}
