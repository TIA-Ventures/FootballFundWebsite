import type { ReactNode } from "react";

type FootballRow = {
  id: string;
  label: string;
  claim: ReactNode;
};

const ROWS: FootballRow[] = [
  {
    id: "scale",
    label: "Scale",
    claim: (
      <>
        <em>3.5 billion</em> fans — roughly <em>7×</em> NFL viewership.
      </>
    ),
  },
  {
    id: "valuation",
    label: "Valuation",
    claim: (
      <>
        European clubs at <em>2–6× revenue</em> vs <em>5–15×</em> for comparable US franchises.
      </>
    ),
  },
  {
    id: "league-beta",
    label: "League beta",
    claim: (
      <>
        Media rights and institutional capital lift valuations across{" "}
        <em>Premier League, La Liga, and Serie A.</em>
      </>
    ),
  },
  {
    id: "operational-alpha",
    label: "Operational alpha",
    claim: (
      <>
        Fund II captures the discount through <em>commercial optimization</em> and on-pitch performance.
      </>
    ),
  },
];

export function ThesisFootballRows() {
  return (
    <div className="thesis-fact-rows">
      {ROWS.map((row) => (
        <div key={row.id} className="thesis-fact-row">
          <span className="thesis-fact-label">{row.label}</span>
          <span className="thesis-fact-claim">{row.claim}</span>
        </div>
      ))}
    </div>
  );
}
