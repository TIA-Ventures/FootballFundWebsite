"use client";

/* Selection scorecard · static radar (Approach).
 * Heptagonal radar with seven selection criteria. Prospect A (Ipswich) shown
 * as a fixed polygon — no tabs or axis interaction.
 */

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

const CLUB_SCORES: Record<AxisKey, number> = {
  league: 92,
  modernization: 90,
  history: 75,
  fanbase: 70,
  acquisition: 85,
  stadium: 80,
  location: 65,
};

const CLUB_POLY =
  "300,160 440.72,187.77 446.24,333.38 360.75,426.13 226.24,453.15 144.02,335.60 198.37,218.94";

const HEPTAGON_POINTS = "300,100 456.36,175.30 494.98,344.50 386.78,480.18 213.22,480.18 105.02,344.50 143.64,175.30";

const CHART_CX = 300;
const CHART_CY = 300;
const LABEL_RADIAL = 30;
const LABEL_LINE_EM = 1.15;

const AXIS_ORDER: AxisKey[] = [
  "league",
  "modernization",
  "history",
  "fanbase",
  "acquisition",
  "stadium",
  "location",
];

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
    labelX: anchorX,
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

const positions = scorePositionsForClub(CLUB_POLY);

export function SelectionScorecard() {
  return (
    <div className="scoring-block scoring-block--static" data-active="ipswich">
      <div className="scoring-layout">
        <div className="scoring-text-col">
          <div className="section-head solo" style={{ marginBottom: 28 }}>
            <div>
              <div className="sh-eyebrow">We invest</div>
              <h2 className="sh-h2">Acquire the right clubs.</h2>
            </div>
          </div>

          <p className="scoring-lede">
            We invest in clubs with strong foundations and meaningful room for improvement — situations
            where disciplined ownership, modern operations, and data-driven management can unlock
            substantial trapped value and long-term appreciation. Key criteria we score include:
          </p>

          <ul className="scoring-criteria-list">
            {AXIS_ORDER.map((axis) => (
              <li key={axis}>
                <span className="scoring-criteria-name">{CRITERION[axis].name}</span>
                <span className="scoring-criteria-score">{CLUB_SCORES[axis]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="scoring-chart">
          <svg
            viewBox="0 0 600 600"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Selection scorecard radar chart for Prospect A"
          >
            <circle cx="300" cy="300" r="50" className="sc-grid-ring" />
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

            <g className="sc-club-group" data-club="ipswich">
              <polygon className="sc-club-poly" points={CLUB_POLY} />
              {AXIS_ORDER.map((axis) => {
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
                    {CLUB_SCORES[axis]}
                  </text>
                );
              })}
            </g>

            {AXIS_VERTICES.map((v) => (
              <circle key={`dot-${v.axis}`} cx={v.x} cy={v.y} className="sc-vertex-dot" />
            ))}

            {AXIS_VERTICES.map((v) => (
              <text
                key={`label-${v.axis}`}
                x={v.labelX}
                y={v.labelY}
                className="sc-label"
                textAnchor={v.labelAnchor}
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
            <span>Prospect</span>
            <span>A</span>
          </div>
        </div>
      </div>
    </div>
  );
}
