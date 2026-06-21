"use client";

import { useCallback, useId, useMemo, useState, type ReactNode } from "react";

type YearPoint = {
  fy: string;
  label: string;
  total: number;
  projected?: boolean;
};

type RevenueSeries = {
  id: string;
  label: string;
  color: string;
};

const YEARS: YearPoint[] = [
  { fy: "FY20/21", label: "20/21", total: 8 },
  { fy: "FY21/22", label: "21/22", total: 11 },
  { fy: "FY22/23", label: "22/23", total: 14 },
  { fy: "FY23/24", label: "23/24", total: 18 },
  { fy: "FY24/25", label: "24/25", total: 150 },
  { fy: "FY25/26", label: "25/26", total: 80 },
  { fy: "FY26/27", label: "26/27", total: 175, projected: true },
  { fy: "FY27/28", label: "27/28", total: 215, projected: true },
  { fy: "FY28/29", label: "28/29", total: 245, projected: true },
  { fy: "FY29/30", label: "29/30", total: 270, projected: true },
  { fy: "FY30/31", label: "30/31", total: 303, projected: true },
];

// Bottom → top stack order (matches deck legend).
const SERIES: RevenueSeries[] = [
  { id: "media", label: "Media (EFL & PL)", color: "#6B4E9B" },
  { id: "league", label: "League placement", color: "#C44E52" },
  { id: "sponsorship", label: "Sponsorship", color: "#C9A227" },
  { id: "ticketing", label: "Ticketing", color: "#3D8B5A" },
  { id: "retail", label: "Retail", color: "#D97B32" },
  { id: "fb", label: "F&B", color: "#2A9D8F" },
  { id: "hospitality", label: "Corporate hospitality", color: "#5B9BD5" },
  { id: "social", label: "Social media & LED", color: "#E07A8F" },
  { id: "academy", label: "Academy", color: "#D4B84A" },
];

// Illustrative share of total revenue by year (sums to 1.0 per row).
const SHARES: number[][] = [
  [0.34, 0.16, 0.11, 0.17, 0.08, 0.06, 0.04, 0.02, 0.02],
  [0.34, 0.16, 0.11, 0.17, 0.08, 0.06, 0.04, 0.02, 0.02],
  [0.33, 0.16, 0.12, 0.17, 0.08, 0.06, 0.04, 0.02, 0.02],
  [0.32, 0.15, 0.13, 0.18, 0.08, 0.06, 0.04, 0.02, 0.02],
  [0.48, 0.12, 0.18, 0.09, 0.04, 0.03, 0.03, 0.02, 0.01],
  [0.38, 0.14, 0.16, 0.12, 0.06, 0.05, 0.04, 0.03, 0.02],
  [0.44, 0.11, 0.19, 0.1, 0.05, 0.04, 0.04, 0.02, 0.01],
  [0.43, 0.11, 0.2, 0.1, 0.05, 0.04, 0.04, 0.02, 0.01],
  [0.42, 0.11, 0.2, 0.1, 0.05, 0.04, 0.04, 0.02, 0.01],
  [0.41, 0.11, 0.21, 0.1, 0.05, 0.04, 0.04, 0.02, 0.01],
  [0.4, 0.11, 0.22, 0.1, 0.05, 0.04, 0.04, 0.02, 0.01],
];

const VB_W = 720;
const VB_H = 400;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 48;
const PAD_B = 52;
const Y_MAX = 320;

const innerW = VB_W - PAD_L - PAD_R;
const innerH = VB_H - PAD_T - PAD_B;

function xAt(i: number) {
  return PAD_L + (innerW * i) / (YEARS.length - 1);
}
function yAt(v: number) {
  return PAD_T + (1 - v / Y_MAX) * innerH;
}

function buildStacks() {
  return YEARS.map((year, yi) => {
    const shares = SHARES[yi];
    let cum = 0;
    return SERIES.map((s, si) => {
      const value = year.total * shares[si];
      const bottom = cum;
      cum += value;
      return { seriesId: s.id, value, bottom, top: cum };
    });
  });
}

const STACKS = buildStacks();
const PROJECTED_START = 6; // first projected FY index (FY26/27)
const INVEST_X = xAt(3) + (xAt(4) - xAt(3)) * 0.92;

function areaPath(seriesIndex: number, segment: "actual" | "projected") {
  const indices: number[] = [];
  YEARS.forEach((year, yi) => {
    if (segment === "actual" && !year.projected) indices.push(yi);
    if (segment === "projected" && (year.projected || yi === PROJECTED_START - 1)) indices.push(yi);
  });
  if (indices.length < 2) return "";
  const tops: string[] = [];
  const bots: string[] = [];
  indices.forEach((yi) => {
    const slice = STACKS[yi][seriesIndex];
    tops.push(`${xAt(yi)},${yAt(slice.top)}`);
    bots.unshift(`${xAt(yi)},${yAt(slice.bottom)}`);
  });
  return `M ${tops.join(" L ")} L ${bots.join(" L ")} Z`;
}

type Stat = {
  eyebrow: string;
  headline: ReactNode;
  body: ReactNode;
};

const STATS: Stat[] = [
  {
    eyebrow: "2023 → 2024",
    headline: (
      <>
        Back-to-back <em>promotions.</em>
      </>
    ),
    body: (
      <>
        League One to Championship to <em>Premier League</em> — among the rarest feats in English football.
      </>
    ),
  },
  {
    eyebrow: "Season 2024/25",
    headline: (
      <>
        <em>#1</em> player value creation.
      </>
    ),
    body: (
      <>
        Highest player value creation in <em>global football</em> — validating the recruitment and development model.
      </>
    ),
  },
  {
    eyebrow: "Ongoing",
    headline: (
      <>
        World-class <em>management.</em>
      </>
    ),
    body: (
      <>
        Chairman <em>Mark Ashton</em> leading the build into an entrenched Premier League club. Bob Gold joined the
        Gamechanger 20 board in Dec 2025.
      </>
    ),
  },
  {
    eyebrow: "Mar 2024 → Dec 2025",
    headline: (
      <>
        Tier-one <em>co-investors.</em>
      </>
    ),
    body: (
      <>
        <em>Avenue Capital</em>, ORG Portfolio Management, the Three Lions Fund — long-horizon partners matching the
        club&apos;s generational rebuild.
      </>
    ),
  },
];

function formatM(v: number) {
  return v >= 100 ? `£${Math.round(v)}M` : `£${v.toFixed(1).replace(/\.0$/, "")}M`;
}

export function IpswichRevenueChart() {
  const uid = useId().replace(/:/g, "");
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);
  const [lockedSeries, setLockedSeries] = useState<string | null>(null);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const activeSeries = lockedSeries ?? hoveredSeries;
  const focusYear = hoveredYear ?? 4; // default FY24/25 peak for breakdown panel

  const breakdown = useMemo(() => {
    const year = YEARS[focusYear];
    const slices = STACKS[focusYear];
    return {
      fy: year.fy,
      total: year.total,
      projected: year.projected,
      rows: SERIES.map((s, si) => ({
        ...s,
        value: slices[si].value,
        pct: year.total > 0 ? (slices[si].value / year.total) * 100 : 0,
      })).sort((a, b) => b.value - a.value),
    };
  }, [focusYear]);

  const seriesOpacity = useCallback(
    (id: string) => {
      if (!activeSeries) return 1;
      return activeSeries === id ? 1 : 0.14;
    },
    [activeSeries],
  );

  const toggleLock = (id: string) => {
    setLockedSeries((prev) => (prev === id ? null : id));
  };

  return (
    <div className="rev-chart-wrap">
      <figure className="rev-chart" aria-labelledby={`${uid}-title`} aria-describedby={`${uid}-desc`}>
        <figcaption className="rev-chart-caption">
          <span id={`${uid}-title`} className="rev-chart-title">
            Annual revenue by stream
          </span>
          <span id={`${uid}-desc`} className="rev-chart-desc">
            Stacked revenue (£M), FY20/21–FY30/31. Hover a year on the chart or a stream in the legend. FY26/27 onward
            is illustrative.
          </span>
        </figcaption>

        <div className="rev-chart-body">
          <div className="rev-chart-plot">
            <div className="rev-chart-kpi" aria-live="polite" aria-atomic="true">
              <span className="rev-chart-kpi-fy">
                {breakdown.fy}
                {breakdown.projected ? " · projected" : ""}
              </span>
              <span className="rev-chart-kpi-total">{formatM(breakdown.total)}</span>
              {activeSeries && (
                <span className="rev-chart-kpi-focus">
                  {SERIES.find((s) => s.id === activeSeries)?.label}
                  {lockedSeries ? " · click to clear" : ""}
                </span>
              )}
            </div>

            <svg
              className="rev-chart-svg rev-chart-svg--stacked"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              onMouseLeave={() => setHoveredYear(null)}
            >
            <title>Ipswich Town annual revenue by stream</title>

            <rect
              className="rev-projected-band"
              x={xAt(PROJECTED_START)}
              y={PAD_T - 8}
              width={VB_W - PAD_R - xAt(PROJECTED_START)}
              height={innerH + 8}
            />

            <line className="rev-baseline" x1={PAD_L} y1={yAt(0)} x2={VB_W - PAD_R} y2={yAt(0)} />

            {SERIES.map((s, si) => (
              <g key={`${s.id}-actual`} style={{ opacity: seriesOpacity(s.id) }}>
                <path d={areaPath(si, "actual")} fill={s.color} fillOpacity={0.82} />
              </g>
            ))}
            {SERIES.map((s, si) => (
              <g key={`${s.id}-proj`} style={{ opacity: seriesOpacity(s.id) * 0.72 }}>
                <path d={areaPath(si, "projected")} fill={s.color} fillOpacity={0.55} />
              </g>
            ))}

            {/* Total outline */}
            <path
              className="rev-line rev-line-actual"
              d={YEARS.filter((y) => !y.projected)
                .map((y, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(y.total)}`)
                .join(" ")}
              fill="none"
            />
            <path
              className="rev-line rev-line-projected"
              d={YEARS.slice(PROJECTED_START - 1)
                .map((y, j) => {
                  const i = PROJECTED_START - 1 + j;
                  return `${j === 0 ? "M" : "L"} ${xAt(i)} ${yAt(y.total)}`;
                })
                .join(" ")}
              fill="none"
            />

            {YEARS.map((y, i) => {
              const colW = innerW / (YEARS.length - 1);
              return (
                <rect
                  key={y.fy}
                  className="rev-year-hit"
                  x={xAt(i) - colW / 2}
                  y={PAD_T}
                  width={colW}
                  height={innerH}
                  fill="transparent"
                  onMouseEnter={() => setHoveredYear(i)}
                  onFocus={() => setHoveredYear(i)}
                  tabIndex={0}
                  aria-label={`${y.fy}, total ${formatM(y.total)}`}
                />
              );
            })}

            <g className="rev-annot">
              <line className="rev-annot-line" x1={INVEST_X} y1={PAD_T - 6} x2={INVEST_X} y2={yAt(0)} />
              <circle className="rev-annot-pin" cx={INVEST_X} cy={PAD_T - 6} r={3.5} />
              <text className="rev-annot-eyebrow" x={INVEST_X + 6} y={PAD_T - 14}>
                MAR 2024
              </text>
            </g>

            <text className="rev-anchor-value" x={xAt(0)} y={yAt(YEARS[0].total) - 10}>
              £8M
            </text>

            <g className="rev-x-axis">
              {YEARS.map((p, i) => (
                <text key={p.fy} x={xAt(i)} y={VB_H - PAD_B + 22} className="rev-x-tick">
                  {p.label}
                </text>
              ))}
            </g>
            </svg>
          </div>

          <aside className="rev-series-panel" aria-label="Revenue streams">
            <p className="rev-series-panel-title">Revenue streams</p>
            <ul className="rev-series-legend">
              {SERIES.map((s) => {
                const isActive = activeSeries === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      className={`rev-series-btn${isActive ? " is-active" : ""}${lockedSeries === s.id ? " is-locked" : ""}`}
                      onMouseEnter={() => setHoveredSeries(s.id)}
                      onMouseLeave={() => setHoveredSeries(null)}
                      onClick={() => toggleLock(s.id)}
                      aria-pressed={lockedSeries === s.id}
                    >
                      <span className="rev-series-swatch" style={{ background: s.color }} aria-hidden="true" />
                      <span className="rev-series-label">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>

        <table className="sr-only">
          <caption>Ipswich Town annual revenue breakdown, £ millions</caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              {SERIES.map((s) => (
                <th key={s.id} scope="col">
                  {s.label}
                </th>
              ))}
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {YEARS.map((year, yi) => (
              <tr key={year.fy}>
                <th scope="row">{year.fy}</th>
                {STACKS[yi].map((slice, si) => (
                  <td key={SERIES[si].id}>{slice.value.toFixed(1)}</td>
                ))}
                <td>{year.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>

      <ul className="rev-stats" aria-label="Accomplishments since Clara Vista's investment">
        {STATS.map((s, i) => (
          <li className="rev-stat" key={i}>
            <div className="rev-stat-eyebrow">{s.eyebrow}</div>
            <div className="rev-stat-headline">{s.headline}</div>
            <p className="rev-stat-body">{s.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
