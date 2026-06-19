"use client";

import { useState } from "react";

/* Selection scorecard · Radar (Approach 001).
 *
 * Heptagonal radar with seven selection criteria scored 0–100. Each
 * portfolio prospect is shown as an amber polygon at scaled radii.
 * One prospect at a time via tabs.
 *
 * The seven axis labels and vertex dots are clickable — selecting one
 * updates the side panel with the criterion's description and that
 * prospect's score on the criterion. Center label swaps per tab.
 */

type ClubKey = "ipswich" | "frosinone" | "spain";
type AxisKey =
  | "league"
  | "modernization"
  | "history"
  | "fanbase"
  | "acquisition"
  | "stadium"
  | "location";

type Criterion = { name: string; desc: string };

const CRITERION: Record<AxisKey, Criterion> = {
  league: {
    name: "League / Division",
    desc:
      "Compete in the world's most globally relevant leagues — Premier League, La Liga, Serie A, Bundesliga — where durable IP and broad audience reach support every other revenue line.",
  },
  modernization: {
    name: "Room for Modernization",
    desc:
      "Clubs operating below their potential in operations, technology, commercial sophistication, or governance. The wider the gap, the more trapped value Clara Vista can release post-close.",
  },
  history: {
    name: "History of Success",
    desc:
      "Clubs with historic identities, broad recognition, and international resonance — providing the foundation for commercial expansion, global interest, and diversified revenue growth.",
  },
  fanbase: {
    name: "Fanbase Size",
    desc:
      "Deep, passionate supporter bases with high engagement and significant room for improved fan experience, monetization, and year-round connection.",
  },
  acquisition: {
    name: "Acquisition Price",
    desc:
      "Disciplined entry pricing relative to fundamental club value. Situations where Clara Vista enters at a structural discount, with structural levers we can pull post-close.",
  },
  stadium: {
    name: "Stadium Ownership",
    desc:
      "Clubs that own or control their stadium and surrounding real estate — adding optionality on hospitality, retail, mixed-use development, and matchday revenue capture.",
  },
  location: {
    name: "Location / Real Estate",
    desc:
      "Cities and regions with population density, tourism appeal, or commercial gravity that supports long-term commercial growth, premium hospitality, and global brand reach.",
  },
};

const CLUB_SCORES: Record<ClubKey, Record<AxisKey, number>> = {
  ipswich: { league:  92, modernization:  90, history:  75, fanbase:  70, acquisition:  85, stadium:  80, location:  65 },
  frosinone: { league:  88, modernization:  95, history:  70, fanbase:  60, acquisition:  95, stadium:  95, location:  90 },
  spain:   { league:  90, modernization:  85, history:  80, fanbase:  75, acquisition:  80, stadium:  70, location:  85 },
};

const CENTER_LABEL: Record<ClubKey, [string, string]> = {
  ipswich: ["Prospect", "A"],
  frosinone: ["Prospect", "B"],
  spain:   ["Prospect", "C"],
};

const TABS: { key: ClubKey; label: string }[] = [
  { key: "ipswich", label: "Prospect A" },
  { key: "frosinone", label: "Prospect B" },
  { key: "spain",   label: "Prospect C" },
];

const CLUB_POLY: Record<ClubKey, string> = {
  ipswich: "300,160 440.72,187.77 446.24,333.38 360.75,426.13 226.24,453.15 144.02,335.60 198.37,218.94",
  frosinone: "300,140 448.54,181.54 436.49,331.15 352.07,408.11 221.90,462.16 202.51,322.25 159.28,187.77",
  spain:   "300,120 432.91,194.01 455.98,335.60 365.08,435.13 230.57,444.14 163.51,331.15 167.09,194.01",
};

const AXIS_ORDER: AxisKey[] = [
  "league",
  "modernization",
  "history",
  "fanbase",
  "acquisition",
  "stadium",
  "location",
];

/** Inset score labels along each spoke so they sit inside the polygon, away from axis titles. */
function scorePositionsForClub(
  poly: string,
  inset = 22,
): Record<AxisKey, { x: number; y: number; anchor: "start" | "middle" | "end" }> {
  const verts = poly.trim().split(/\s+/).map((pt) => {
    const [x, y] = pt.split(",").map(Number);
    return { x, y };
  });

  const out = {} as Record<AxisKey, { x: number; y: number; anchor: "start" | "middle" | "end" }>;
  AXIS_ORDER.forEach((axis, i) => {
    const { x: vx, y: vy } = verts[i];
    const dx = vx - CHART_CX;
    const dy = vy - CHART_CY;
    const len = Math.hypot(dx, dy) || 1;
    const x = vx - (dx / len) * inset;
    const y = vy - (dy / len) * inset;
    const anchor = Math.abs(dx) < 28 ? "middle" : dx > 0 ? "start" : "end";
    out[axis] = { x, y, anchor };
  });
  return out;
}

const HEPTAGON_POINTS = "300,100 456.36,175.30 494.98,344.50 386.78,480.18 213.22,480.18 105.02,344.50 143.64,175.30";

const CHART_CX = 300;
const CHART_CY = 300;
/** Outward offset from each outer vertex along its spoke (px). */
const LABEL_RADIAL = 30;
const LABEL_LINE_EM = 1.15;

type AxisVertex = {
  axis: AxisKey;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  labelAnchor: "start" | "middle" | "end";
  label: string;
  labelLines?: [string, string];
};

/** Place axis titles just outside the outer ring without overlapping spokes or dots. */
function axisLabel(
  axis: AxisKey,
  x: number,
  y: number,
  label: string,
  placement: "top" | "upper-right" | "lower-right" | "bottom-right" | "bottom-left" | "lower-left" | "upper-left",
  labelLines?: [string, string],
): AxisVertex {
  const dx = x - CHART_CX;
  const dy = y - CHART_CY;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const anchorX = x + ux * LABEL_RADIAL;
  const lineStep = 15 * LABEL_LINE_EM;

  if (placement === "top") {
    return {
      axis,
      x,
      y,
      labelX: CHART_CX,
      labelY: y - 24 - (labelLines ? lineStep : 0),
      labelAnchor: "middle",
      label,
      labelLines,
    };
  }

  const below =
    placement === "lower-right" ||
    placement === "lower-left" ||
    placement === "bottom-right" ||
    placement === "bottom-left";
  const right =
    placement === "upper-right" ||
    placement === "lower-right" ||
    placement === "bottom-right";

  let labelY: number;
  if (below) {
    const isBottom = placement === "bottom-right" || placement === "bottom-left";
    labelY = y + (isBottom ? 32 : 18);
  } else {
    labelY = y - 18 - (labelLines ? lineStep : 0);
  }

  return {
    axis,
    x,
    y,
    labelX: right ? anchorX : anchorX,
    labelY,
    labelAnchor: right ? "start" : "end",
    label,
    labelLines,
  };
}

const AXIS_VERTICES: AxisVertex[] = [
  axisLabel("league", 300, 100, "League / Division", "top"),
  axisLabel("modernization", 456.36, 175.30, "Room for Modernization", "upper-right", [
    "Room for",
    "Modernization",
  ]),
  axisLabel("history", 494.98, 344.50, "History of Success", "lower-right", ["History of", "Success"]),
  axisLabel("fanbase", 386.78, 480.18, "Fanbase Size", "bottom-right"),
  axisLabel("acquisition", 213.22, 480.18, "Acquisition Price", "bottom-left"),
  axisLabel("stadium", 105.02, 344.50, "Stadium Ownership", "lower-left", ["Stadium", "Ownership"]),
  axisLabel("location", 143.64, 175.30, "Location / Real Estate", "upper-left", [
    "Location /",
    "Real Estate",
  ]),
];

export function SelectionScorecard() {
  const [activeClub, setActiveClub] = useState<ClubKey>("ipswich");
  const [activeAxis, setActiveAxis] = useState<AxisKey>("fanbase");

  const detail = CRITERION[activeAxis];
  const score = CLUB_SCORES[activeClub][activeAxis];
  const center = CENTER_LABEL[activeClub];
  const positions = scorePositionsForClub(CLUB_POLY[activeClub]);

  return (
    <div
      className="scoring-block"
      data-active={activeClub}
      data-axis={activeAxis}
    >
      <div className="scoring-layout">
        <div className="scoring-text-col">
          <div className="section-head solo" style={{ marginBottom: 28 }}>
            <div>
              <div className="sh-eyebrow">1 · We invest</div>
              <h2 className="sh-h2">
                Acquire <em>the right clubs.</em>
              </h2>
            </div>
          </div>

          <p className="scoring-lede">
            We invest in clubs with <em>strong foundations</em> and <em>meaningful room for improvement</em> — situations
            where disciplined ownership, modern operations, and data-driven management can unlock
            substantial trapped value and long-term appreciation. Key criteria we score include:
          </p>

          <div className="scoring-tabs" role="tablist" aria-label="Selection scorecard candidate">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeClub === tab.key}
                className={`scoring-tab${activeClub === tab.key ? " is-active" : ""}`}
                onClick={() => setActiveClub(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="scoring-detail">
            <div className="scoring-detail-eyebrow">Selected criterion</div>
            <div className="scoring-detail-name">{detail.name}</div>
            <div className="scoring-detail-score">
              {score}
              <em>/100</em>
            </div>
            <p className="scoring-detail-desc">{detail.desc}</p>
          </div>
        </div>

        <div className="scoring-chart">
          <svg
            viewBox="0 0 600 600"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Selection scorecard radar chart"
          >
            <circle cx="300" cy="300" r="50"  className="sc-grid-ring" />
            <circle cx="300" cy="300" r="100" className="sc-grid-ring" />
            <circle cx="300" cy="300" r="150" className="sc-grid-ring" />

            {AXIS_VERTICES.map((v) => (
              <line
                key={`axis-${v.axis}`}
                x1="300"
                y1="300"
                x2={v.x}
                y2={v.y}
                className="sc-axis-line"
              />
            ))}

            <polygon className="sc-outer-ring" points={HEPTAGON_POINTS} />

            <g className="sc-club-group" data-club={activeClub}>
              <polygon className="sc-club-poly" points={CLUB_POLY[activeClub]} />
              {(Object.keys(positions) as AxisKey[]).map((axis) => {
                const p = positions[axis];
                return (
                  <text
                    key={axis}
                    x={p.x}
                    y={p.y}
                    className="sc-score-num"
                    textAnchor={p.anchor}
                    dominantBaseline="middle"
                  >
                    {CLUB_SCORES[activeClub][axis]}
                  </text>
                );
              })}
            </g>

            {AXIS_VERTICES.map((v) => (
              <circle
                key={`dot-${v.axis}`}
                cx={v.x}
                cy={v.y}
                className={`sc-vertex-dot${activeAxis === v.axis ? " is-selected" : ""}`}
                data-axis={v.axis}
                onClick={() => setActiveAxis(v.axis)}
              />
            ))}

            {AXIS_VERTICES.map((v) => (
              <text
                key={`label-${v.axis}`}
                x={v.labelX}
                y={v.labelY}
                className={`sc-label${activeAxis === v.axis ? " is-selected" : ""}`}
                textAnchor={v.labelAnchor}
                data-axis={v.axis}
                onClick={() => setActiveAxis(v.axis)}
              >
                {v.labelLines ? (
                  <>
                    <tspan x={v.labelX} dy={0}>
                      {v.labelLines[0]}
                    </tspan>
                    <tspan x={v.labelX} dy="1.15em">
                      {v.labelLines[1]}
                    </tspan>
                  </>
                ) : (
                  v.label
                )}
              </text>
            ))}
          </svg>

          <div className="scoring-center" aria-hidden="true">
            <span>{center[0]}</span>
            <span>{center[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
