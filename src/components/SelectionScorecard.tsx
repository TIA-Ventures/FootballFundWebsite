"use client";

import { useState } from "react";

/* Selection scorecard · Radar (Approach 001).
 *
 * Heptagonal radar with seven selection criteria scored 0–100. The Ideal
 * Target is rendered as a green-filled heptagon at radius 100; each
 * portfolio club (Ipswich / Italy / Spain) is shown as an amber polygon at
 * scaled radii. One club at a time via tabs.
 *
 * The seven axis labels and vertex dots are clickable — selecting one
 * updates the side panel with the criterion's description and (if a club
 * tab is active) that club's score on the criterion. Center label also
 * swaps per club so the chart always names what is being evaluated.
 */

type ClubKey = "ideal" | "ipswich" | "italy" | "spain";
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
  ideal:   { league: 100, modernization: 100, history: 100, fanbase: 100, acquisition: 100, stadium: 100, location: 100 },
  ipswich: { league:  70, modernization:  90, history:  75, fanbase:  70, acquisition:  85, stadium:  80, location:  65 },
  italy:   { league:  80, modernization:  95, history:  70, fanbase:  60, acquisition:  90, stadium:  50, location:  90 },
  spain:   { league:  90, modernization:  85, history:  80, fanbase:  75, acquisition:  80, stadium:  70, location:  85 },
};

const CENTER_LABEL: Record<ClubKey, [string, string]> = {
  ideal:   ["Ideal", "Target"],
  ipswich: ["Ipswich", "Town"],
  italy:   ["Italian", "Club"],
  spain:   ["Spanish", "Club"],
};

const TABS: { key: ClubKey; label: string }[] = [
  { key: "ideal",   label: "Ideal Target" },
  { key: "ipswich", label: "Ipswich" },
  { key: "italy",   label: "Italy" },
  { key: "spain",   label: "Spain" },
];

/* Pre-computed polygon points for each club at the published score values.
   Mirrors the source-of-truth SVG so the chart renders identical proportions
   without re-deriving the trig in the client. */
const CLUB_POLY: Record<Exclude<ClubKey, "ideal">, string> = {
  ipswich: "300,160 440.72,187.77 446.24,333.38 360.75,426.13 226.24,453.15 144.02,335.60 198.37,218.94",
  italy:   "300,140 448.54,181.54 436.49,331.15 352.07,408.11 221.90,462.16 202.51,322.25 159.28,187.77",
  spain:   "300,120 432.91,194.01 455.98,335.60 365.08,435.13 230.57,444.14 163.51,331.15 167.09,194.01",
};

/* Score-number positions per axis, per club. Coordinates are in SVG units
   and copied 1:1 from the reference so labels sit just outside the polygon
   vertices regardless of which club is selected. */
const SCORE_POS: Record<Exclude<ClubKey, "ideal">, Record<AxisKey, { x: number; y: number; anchor: "start" | "middle" | "end" }>> = {
  ipswich: {
    league:        { x: 300, y: 148, anchor: "middle" },
    modernization: { x: 448, y: 178, anchor: "start" },
    history:       { x: 454, y: 334, anchor: "start" },
    fanbase:       { x: 368, y: 442, anchor: "start" },
    acquisition:   { x: 218, y: 468, anchor: "end" },
    stadium:       { x: 136, y: 335, anchor: "end" },
    location:      { x: 190, y: 208, anchor: "end" },
  },
  italy: {
    league:        { x: 300, y: 128, anchor: "middle" },
    modernization: { x: 456, y: 172, anchor: "start" },
    history:       { x: 444, y: 332, anchor: "start" },
    fanbase:       { x: 360, y: 424, anchor: "start" },
    acquisition:   { x: 214, y: 478, anchor: "end" },
    stadium:       { x: 194, y: 322, anchor: "end" },
    location:      { x: 151, y: 178, anchor: "end" },
  },
  spain: {
    league:        { x: 300, y: 108, anchor: "middle" },
    modernization: { x: 440, y: 184, anchor: "start" },
    history:       { x: 464, y: 335, anchor: "start" },
    fanbase:       { x: 372, y: 450, anchor: "start" },
    acquisition:   { x: 223, y: 460, anchor: "end" },
    stadium:       { x: 155, y: 331, anchor: "end" },
    location:      { x: 159, y: 184, anchor: "end" },
  },
};

const AXIS_VERTICES: { axis: AxisKey; x: number; y: number; labelX: number; labelY: number; labelAnchor: "start" | "middle" | "end"; label: string }[] = [
  { axis: "league",        x: 300,    y: 100,    labelX: 300, labelY:  76, labelAnchor: "middle", label: "League / Division" },
  { axis: "modernization", x: 456.36, y: 175.30, labelX: 478, labelY: 146, labelAnchor: "start",  label: "Room for Modernization" },
  { axis: "history",       x: 494.98, y: 344.50, labelX: 516, labelY: 349, labelAnchor: "start",  label: "History of Success" },
  { axis: "fanbase",       x: 386.78, y: 480.18, labelX: 404, labelY: 510, labelAnchor: "start",  label: "Fanbase Size" },
  { axis: "acquisition",   x: 213.22, y: 480.18, labelX: 195, labelY: 510, labelAnchor: "end",    label: "Acquisition Price" },
  { axis: "stadium",       x: 105.02, y: 344.50, labelX:  84, labelY: 349, labelAnchor: "end",    label: "Stadium Ownership" },
  { axis: "location",      x: 143.64, y: 175.30, labelX: 122, labelY: 146, labelAnchor: "end",    label: "Location / Real Estate" },
];

const HEPTAGON_POINTS = "300,100 456.36,175.30 494.98,344.50 386.78,480.18 213.22,480.18 105.02,344.50 143.64,175.30";

export function SelectionScorecard() {
  const [activeClub, setActiveClub] = useState<ClubKey>("ideal");
  const [activeAxis, setActiveAxis] = useState<AxisKey>("fanbase");

  const detail = CRITERION[activeAxis];
  const score = CLUB_SCORES[activeClub][activeAxis];
  const center = CENTER_LABEL[activeClub];

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
              <div className="sh-eyebrow">001 · We invest</div>
              <h2 className="sh-h2">
                Acquire <em>the right clubs.</em>
              </h2>
            </div>
          </div>

          <p className="scoring-lede">
            We score every candidate against <em>seven dimensions</em> of fit. The
            eighth — Clara Vista as <em>buyer of choice</em> — is structural, not
            club-specific: proprietary relationships and a repeatable operating
            playbook get us to the table on terms others can&apos;t.
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
            {/* Keep this node mounted for Ideal too so tab switches don’t change column height (banner + cover). */}
            <div
              className={`scoring-detail-score${activeClub === "ideal" ? " is-ideal-tab" : ""}`}
            >
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
            <polygon className="sc-ideal-poly" points={HEPTAGON_POINTS} />

            {(["ipswich", "italy", "spain"] as const).map((club) => {
              if (activeClub !== club) return null;
              const positions = SCORE_POS[club];
              return (
                <g key={club} className="sc-club-group" data-club={club}>
                  <polygon className="sc-club-poly" points={CLUB_POLY[club]} />
                  {(Object.keys(positions) as AxisKey[]).map((axis) => {
                    const p = positions[axis];
                    return (
                      <text
                        key={axis}
                        x={p.x}
                        y={p.y}
                        className="sc-score-num"
                        textAnchor={p.anchor}
                      >
                        {CLUB_SCORES[club][axis]}
                      </text>
                    );
                  })}
                </g>
              );
            })}

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
                {v.label}
              </text>
            ))}

            {activeClub === "ideal" &&
              AXIS_VERTICES.map((v) => (
                <text
                  key={`ideal-axis-score-${v.axis}`}
                  x={v.labelX}
                  y={v.labelY + 16}
                  className={`sc-ideal-axis-score${activeAxis === v.axis ? " is-selected" : ""}`}
                  textAnchor={v.labelAnchor}
                  data-axis={v.axis}
                  onClick={() => setActiveAxis(v.axis)}
                >
                  100
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
