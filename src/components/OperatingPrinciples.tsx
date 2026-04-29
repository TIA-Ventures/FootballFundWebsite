"use client";

import { useState, type ReactNode } from "react";

type Principle = {
  label: string;
  teaser: ReactNode;
  body: string;
  icon: ReactNode;
};

const PRINCIPLES: Principle[] = [
  {
    label: "Experience",
    teaser: (
      <>
        Decades of investing and operating, with <em>top-quartile returns</em> and zero principal losses.
      </>
    ),
    body:
      "Our team has managed over $10B across global private equity, real estate, and venture funds — consistently delivering top-quartile returns with zero principal losses. We bring governance, discipline, and judgment earned through decades of investing and operating.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline points="3 17 9 11 13 15 21 7" />
        <polyline points="14 7 21 7 21 14" />
      </svg>
    ),
  },
  {
    label: "Access",
    teaser: (
      <>
        Trusted relationships unlock <em>off-market opportunities</em> few investors can reach.
      </>
    ),
    body:
      "Decades of trusted relationships unlock unique, off-market opportunities few investors can access. We pair this access with deep structuring expertise to ensure alignment, transparency, and durability across every investment.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="8" r="3.2" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M14 19c0-2.5 2-5 5-5" />
      </svg>
    ),
  },
  {
    label: "Action",
    teaser: (
      <>
        Built and scaled category-defining businesses — <em>from Netflix to Google.</em>
      </>
    ),
    body:
      "We've built and scaled companies worth billions, including category-defining businesses like Netflix and Google. This operator DNA gives us the ability to turn complexity into execution — and execution into lasting value.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Returns",
    teaser: (
      <>
        Owners and fiduciaries — driving performance at <em>every level</em> of the organization.
      </>
    ),
    body:
      "We manage every investment with the focus of owners and the discipline of fiduciaries — driving performance at every level of the organization and always optimizing for the best path to exit.",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-4 10.5c1 1 1.5 2 1.5 3.5h5c0-1.5 0.5-2.5 1.5-3.5A6 6 0 0 0 12 3z" />
      </svg>
    ),
  },
];

export function OperatingPrinciples() {
  const [openMap, setOpenMap] = useState<boolean[]>(() =>
    Array(PRINCIPLES.length).fill(false)
  );

  const toggle = (i: number) =>
    setOpenMap((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="pillar-rows" data-grid="why">
      {PRINCIPLES.map((p, i) => (
        <div
          key={p.label}
          className={`pillar-row${openMap[i] ? " open" : ""}`}
          data-pillar
          role="button"
          tabIndex={0}
          aria-expanded={openMap[i]}
          onClick={() => toggle(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle(i);
            }
          }}
        >
          <div className="pillar-row-head">
            <div className="pillar-row-icon" aria-hidden="true">
              {p.icon}
            </div>
            <div className="pillar-row-label">{p.label}</div>
            <div className="pillar-row-teaser">{p.teaser}</div>
            <div className="pillar-row-chevron" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
          <div className="pillar-row-body-wrap">
            <div className="pillar-row-body">{p.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
