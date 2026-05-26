"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Metric = {
  name: string;
  sub: string;
  pre: string;
  tgt: string;
  impact: number;
};

type Pillar = {
  n: string;
  label: string;
  desc: ReactNode;
  metrics: Metric[];
};

const TGT = 92;
const LEFT = 15;

function basePos(impact: number) {
  const norm = Math.max(0.22, Math.min(1, impact / 1.6));
  return TGT - norm * (TGT - LEFT);
}

function metricId(pillar: string, name: string) {
  return `${pillar}-${name}`;
}

const PILLARS: Pillar[] = [
  {
    n: "01",
    label: "Data-Driven Sports Operations",
    desc: (
      <>
        A data-driven culture that maximizes{" "}
        <em>competitiveness, performance bonuses, and transfer profits.</em>
      </>
    ),
    metrics: [
      { name: "Transfer profits", sub: "· net annual", pre: "Breakeven", tgt: "+$15M", impact: 6.0 },
      { name: "Expected Goals", sub: "· per game", pre: "1.6", tgt: "2.1", impact: 0.31 },
      { name: "Expected Goals Allowed", sub: "· per game", pre: "1.7", tgt: "1.2", impact: 0.29 },
    ],
  },
  {
    n: "02",
    label: "Commercial Optimization",
    desc: (
      <>
        <em>Best-in-class technology</em> expanding sponsorships, merchandising, gameday and other
        revenue streams.
      </>
    ),
    metrics: [
      { name: "Digital", sub: "· app actives", pre: "21k", tgt: "142k", impact: 5.76 },
      { name: "Merchandising", sub: "· online orders", pre: "800k", tgt: "2.2M", impact: 1.75 },
      { name: "Sponsorships", sub: "· partners", pre: "8", tgt: "16", impact: 1.0 },
      { name: "Media deals", sub: "· broadcast rev", pre: "$8M", tgt: "$14M", impact: 0.75 },
      { name: "Hospitality", sub: "· renewal rate", pre: "61%", tgt: "89%", impact: 0.46 },
      { name: "Ticketing", sub: "· sell-through", pre: "75%", tgt: "98%", impact: 0.31 },
    ],
  },
  {
    n: "03",
    label: "Back Office Efficiency",
    desc: (
      <>
        Modernized <em>governance, analytics and financial infrastructure</em> for efficiency,
        accountability and ROI.
      </>
    ),
    metrics: [
      { name: "Fan intelligence", sub: "· data pts / fan", pre: "4", tgt: "25", impact: 5.25 },
      { name: "Productivity", sub: "· rev / employee", pre: "$0.5M", tgt: "$0.7M", impact: 0.4 },
      { name: "Budget discipline", sub: "· spend vs plan", pre: "125%", tgt: "100%", impact: 0.2 },
    ],
  },
];

function animateSliders(container: HTMLElement, reducedMotion: boolean) {
  const sliders = container.querySelectorAll<HTMLElement>(".ve-slider");

  sliders.forEach((slider, i) => {
    const bp = parseFloat(slider.dataset.base || "0");
    const base = slider.querySelector<HTMLElement>(".ve-slider-base");
    const target = slider.querySelector<HTMLElement>(".ve-slider-target");
    const fill = slider.querySelector<HTMLElement>(".ve-slider-fill");

    if (base) base.style.left = `${bp}%`;
    if (target) target.style.left = `${TGT}%`;

    if (fill) {
      fill.style.left = `${bp}%`;
      fill.style.width = reducedMotion ? `${TGT - bp}%` : "0";
    }

    if (reducedMotion || !fill) return;

    window.setTimeout(() => {
      fill.style.left = `${bp}%`;
      fill.style.width = `${TGT - bp}%`;
    }, 90 + i * 45);
  });
}

export function ValueEngine() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [inView, setInView] = useState(false);

  const runSliderAnimation = useCallback(() => {
    const root = rootRef.current;
    if (!root || !inView) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    animateSliders(root, reducedMotion);
  }, [inView]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    runSliderAnimation();
  }, [runSliderAnimation]);

  const onMetricClick = (id: string) => {
    setActiveMetric((current) => (current === id ? null : id));
  };

  let metricIndex = 0;

  return (
    <div
      className="value-engine"
      ref={rootRef}
      data-metric-focus={activeMetric ? "true" : "false"}
      data-in-view={inView ? "true" : "false"}
    >
      <p className="ve-lede">
        Three operating pillars. Every revenue line treated as <em>its own business</em>, moving
        from a pre-investment baseline to a Clara Vista target.
      </p>

      <div className="ve-legend" aria-label="Chart legend">
        <span className="ve-legend-item">
          <span className="ve-dot ve-dot-hollow" aria-hidden="true" />
          Pre-Investment Baseline
        </span>
        <span className="ve-legend-item">
          <span className="ve-dot ve-dot-fill" aria-hidden="true" />
          Clara Vista Target
        </span>
      </div>

      <div className="ve-bands">
        {PILLARS.map((pillar) => {
          const sortedMetrics = [...pillar.metrics].sort((a, b) => b.impact - a.impact);

          return (
            <section key={pillar.n} className="ve-band" aria-labelledby={`ve-band-${pillar.n}`}>
              <div className="ve-band-label">
                <h3 className="ve-band-title" id={`ve-band-${pillar.n}`}>
                  {pillar.n} · {pillar.label}
                </h3>
                <p className="ve-band-desc">{pillar.desc}</p>
              </div>

              <div className="ve-metrics-col">
                <div className="ve-metrics">
                  {sortedMetrics.map((metric) => {
                    const id = metricId(pillar.n, metric.name);
                    const bp = basePos(metric.impact);
                    const isActive = activeMetric === id;
                    const delay = metricIndex * 50;
                    metricIndex += 1;

                    return (
                      <button
                        key={id}
                        type="button"
                        className={`ve-cell${isActive ? " is-active" : ""}`}
                        style={{ animationDelay: `${delay}ms` }}
                        aria-pressed={isActive}
                        onClick={() => onMetricClick(id)}
                      >
                        <div className="ve-m-name">
                          {metric.name} <span className="ve-m-sub">{metric.sub}</span>
                        </div>
                        <div className="ve-slider" data-base={String(bp)} aria-hidden="true">
                          <div className="ve-slider-line" />
                          <div className="ve-slider-fill" />
                          <div className="ve-slider-base" />
                          <div className="ve-slider-target" />
                        </div>
                        <div className="ve-vals">
                          <span className="ve-pre">{metric.pre}</span>
                          <span className="ve-arrow" aria-hidden="true">
                            →
                          </span>
                          <span className="ve-tgt">{metric.tgt}</span>
                        </div>
                        <span className="ve-cell-hint">{isActive ? "Selected" : "Compare lift"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <p className="ve-disclaimer">
        Solely for illustrative purposes. Figures shown are not investment performance and do not
        reflect the actual results of any Clara Vista portfolio club.
      </p>
    </div>
  );
}
