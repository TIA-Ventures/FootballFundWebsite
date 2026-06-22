"use client";

import { useCallback, useId, useMemo, useState } from "react";

type YearPoint = {
  fy: string;
  label: string;
  media: number;
  matchday: number;
  commercial: number;
  projected?: boolean;
};

type RevenueSeries = {
  id: "media" | "matchday" | "commercial";
  label: string;
  color: string;
};

// Stream values in €M per season. Total is derived (sum of streams) so the
// total line always sits exactly on top of the stacked area — same guarantee
// as the Ipswich chart, where each stack sums to the year total.
const YEARS: YearPoint[] = [
  { fy: "FY26/27", label: "26/27", media: 6.5, matchday: 3.1, commercial: 5.6 },
  { fy: "FY27/28", label: "27/28", media: 35.7, matchday: 7.3, commercial: 7.4 },
  { fy: "FY28/29", label: "28/29", media: 36.6, matchday: 7.9, commercial: 8.2, projected: true },
  { fy: "FY29/30", label: "29/30", media: 37.5, matchday: 8.6, commercial: 9.2, projected: true },
  { fy: "FY30/31", label: "30/31", media: 47.0, matchday: 9.6, commercial: 10.7, projected: true },
  { fy: "FY31/32", label: "31/32", media: 48.5, matchday: 10.5, commercial: 11.7, projected: true },
  { fy: "FY32/33", label: "32/33", media: 51.5, matchday: 11.6, commercial: 13.7, projected: true },
];

// Bottom → top stack order (matches deck legend).
const SERIES: RevenueSeries[] = [
  { id: "media", label: "Media Rights", color: "#6B4E9B" },
  { id: "matchday", label: "Matchday", color: "#3D8B5A" },
  { id: "commercial", label: "Commercial", color: "#C9A227" },
];

function yearTotal(y: YearPoint) {
  return y.media + y.matchday + y.commercial;
}

const VB_W = 720;
const VB_H = 400;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 48;
const PAD_B = 52;
// ~7% headroom above the peak total (76.8) — mirrors Ipswich's 320/303 ratio.
const Y_MAX = 82;

const innerW = VB_W - PAD_L - PAD_R;
const innerH = VB_H - PAD_T - PAD_B;

function xAt(i: number) {
  return PAD_L + (innerW * i) / (YEARS.length - 1);
}
function yAt(v: number) {
  return PAD_T + (1 - v / Y_MAX) * innerH;
}

function buildStacks() {
  return YEARS.map((year) => {
    let cum = 0;
    return SERIES.map((s) => {
      const value = year[s.id];
      const bottom = cum;
      cum += value;
      return { seriesId: s.id, value, bottom, top: cum };
    });
  });
}

const STACKS = buildStacks();
const PROJECTED_START = 2; // first projected FY index (FY28/29)
// Clara Vista first close (May 2026) sits just before the Serie A step-up year,
// mirroring how the Ipswich chart pins the investment just before its breakout.
const INVEST_X = xAt(0) + (xAt(1) - xAt(0)) * 0.92;

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

function formatM(v: number) {
  return v >= 100 ? `€${Math.round(v)}M` : `€${v.toFixed(1).replace(/\.0$/, "")}M`;
}

export function FrosinoneRevenueChart() {
  const uid = useId().replace(/:/g, "");
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);
  const [lockedSeries, setLockedSeries] = useState<string | null>(null);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const activeSeries = lockedSeries ?? hoveredSeries;
  const focusYear = hoveredYear ?? 1; // default FY27/28 — first Serie A season step-up

  const breakdown = useMemo(() => {
    const year = YEARS[focusYear];
    const slices = STACKS[focusYear];
    const total = yearTotal(year);
    return {
      fy: year.fy,
      total,
      projected: year.projected,
      rows: SERIES.map((s, si) => ({
        ...s,
        value: slices[si].value,
        pct: total > 0 ? (slices[si].value / total) * 100 : 0,
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
            Stacked revenue (€M), FY26/27–FY32/33. Hover a year on the chart or a stream in the legend. First close May
            2026; FY28/29 onward is illustrative.
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
            <title>Frosinone Calcio projected annual revenue by stream</title>

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
                .map((y, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(yearTotal(y))}`)
                .join(" ")}
              fill="none"
            />
            <path
              className="rev-line rev-line-projected"
              d={YEARS.slice(PROJECTED_START - 1)
                .map((y, j) => {
                  const i = PROJECTED_START - 1 + j;
                  return `${j === 0 ? "M" : "L"} ${xAt(i)} ${yAt(yearTotal(y))}`;
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
                  aria-label={`${y.fy}, total ${formatM(yearTotal(y))}`}
                />
              );
            })}

            <g className="rev-annot">
              <line className="rev-annot-line" x1={INVEST_X} y1={PAD_T - 6} x2={INVEST_X} y2={yAt(0)} />
              <circle className="rev-annot-pin" cx={INVEST_X} cy={PAD_T - 6} r={3.5} />
              <text className="rev-annot-eyebrow" x={INVEST_X + 6} y={PAD_T - 14}>
                MAY 2026
              </text>
            </g>

            {/* Revenue jumps immediately after FY26/27, so (unlike Ipswich's flat
                early years) the start value sits centered over the FY26/27 column
                in the open wedge above the rising area. */}
            <text className="rev-anchor-value" x={xAt(0)} y={PAD_T + 193} textAnchor="middle">
              {formatM(yearTotal(YEARS[0]))}
            </text>
            <text
              className="rev-anchor-value rev-anchor-end"
              x={xAt(YEARS.length - 1)}
              y={yAt(yearTotal(YEARS[YEARS.length - 1])) - 12}
            >
              {formatM(yearTotal(YEARS[YEARS.length - 1]))}
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
          <caption>Frosinone Calcio projected annual revenue breakdown, € millions (FY26/27–FY32/33)</caption>
          <thead>
            <tr>
              <th scope="col">Season</th>
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
                <td>{yearTotal(year).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </div>
  );
}
