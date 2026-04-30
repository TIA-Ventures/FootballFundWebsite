import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SelectionScorecard } from "@/components/SelectionScorecard";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Approach · Clara Vista Investment Partners",
  description:
    "Three principles, one playbook. We invest. We build. We win. Selection, then execution, then returns — applied with the same discipline to every club in the portfolio.",
};

/* /approach — Chapter 02 · How we invest.
 *
 * The manifesto "We invest. We build. We win." is both the page hero and
 * the structural spine. Each verb maps to a numbered section below.
 *
 * Per product feedback the alpha-and-beta block (the return engine) is
 * placed between the operating pillars (Excellence everywhere) and the
 * revenue-lines zoom-in. The narrative reads:
 *   001 We invest         → selection criteria (radar)
 *   002 We build          → operating pillars
 *   003 We win            → alpha + beta stacked
 *   004 Operating depth    → nine revenue lines, tabular readout (pages_40.html).
 *
 * Color tokens / typography mirror the rest of the site (no hardcoded
 * hexes); radar/pillars reference clara-vista-pages_36.html; revenue table _40. */

type Pillar = {
  label: string;
  desc: ReactNode;
  kpis: { label: string; pre: string; post: string; fillLeft: string; markerLeft: string }[];
};

const PILLARS: Pillar[] = [
  {
    label: "01 · Data-Driven Sports Operations",
    desc: (
      <>
        Build a data-driven culture that systematically maximizes{" "}
        <em>competitiveness, performance bonuses, and transfer profits</em>.
      </>
    ),
    kpis: [
      { label: "Expected Goals · per game",        pre: "1.6",       post: "2.1",     fillLeft: "60%", markerLeft: "60%" },
      { label: "Expected Goals Allowed · per game", pre: "1.7",       post: "1.2",     fillLeft: "70%", markerLeft: "70%" },
      { label: "Annual transfer profits",          pre: "Breakeven", post: "+$15M",   fillLeft: "35%", markerLeft: "35%" },
    ],
  },
  {
    label: "02 · Commercial Optimization",
    desc: (
      <>
        Deploy <em>best-in-class technology</em> that expands sponsorships,
        merchandising, gameday, and other revenue streams.
      </>
    ),
    kpis: [
      { label: "Gross kit sales · per season", pre: "$2.2M",  post: "$4M",    fillLeft: "55%", markerLeft: "55%" },
      { label: "Food & beverage · per game",   pre: "$0.25M", post: "$0.35M", fillLeft: "70%", markerLeft: "70%" },
      { label: "Social media followers",       pre: "4.9M",   post: "13.8M",  fillLeft: "35%", markerLeft: "35%" },
    ],
  },
  {
    label: "03 · Back Office Efficiency",
    desc: (
      <>
        Modernize <em>governance, analytics, and financial infrastructure</em> to
        improve efficiency, accountability, and ROI from every operating dollar.
      </>
    ),
    kpis: [
      { label: "Data points · per fan",   pre: "4",     post: "25",    fillLeft: "18%", markerLeft: "18%" },
      { label: "Revenue · per employee",  pre: "$0.5M", post: "$0.7M", fillLeft: "65%", markerLeft: "65%" },
      { label: "Spend vs plan",            pre: "125%",  post: "100%",  fillLeft: "80%", markerLeft: "80%" },
    ],
  },
];

type TerminalRevRow = {
  num: string;
  line: string;
  metric: string;
  pre: string;
  post: string;
  liftPct: number;
};

/** Operating-data terminal — same rows and lift widths as clara-vista-pages_40.html */
const TERMINAL_REV_ROWS: TerminalRevRow[] = [
  { num: "01", line: "Media Deals", metric: "Annual broadcast revenue", pre: "$8M", post: "$14M", liftPct: 75 },
  { num: "02", line: "On-Field", metric: "Points per match", pre: "1.15", post: "1.65", liftPct: 43 },
  { num: "03", line: "Sponsorships", metric: "Active corporate partners", pre: "8", post: "16", liftPct: 100 },
  { num: "04", line: "Ticketing", metric: "Stadium sell-through rate", pre: "75%", post: "98%", liftPct: 31 },
  { num: "05", line: "Merchandising", metric: "Global online orders", pre: "800k", post: "2.2M", liftPct: 100 },
  { num: "06", line: "F&B", metric: "Average transaction time", pre: "2.4 min", post: "0.9 min", liftPct: 63 },
  { num: "07", line: "Hospitality", metric: "Corporate renewal rate", pre: "61%", post: "89%", liftPct: 46 },
  { num: "08", line: "Digital", metric: "Team app daily active users", pre: "21k", post: "142k", liftPct: 100 },
  { num: "09", line: "Social", metric: "Monthly impressions", pre: "18M", post: "42M", liftPct: 70 },
];

export default function ApproachPage() {
  return (
    <>
      <Topbar activeNav="approach" />
      <main className="cv-page approach-page">
        {/* Page hero · the italic verbs (invest / build / win) provide the
            manifesto voice; sizing matches every other page hero on the site
            for consistency. */}
        <div className="page-hero">
          <div className="page-hero-inner">
            <div>
              <div className="ph-eyebrow">Approach · Chapter 02</div>
              <h1 className="ph-h1">
                We <em>invest.</em> We <em>build.</em> We <em>win.</em>
              </h1>
            </div>
            <p className="ph-intro">
              Three principles, one playbook. Selection, then execution, then
              returns — applied with the <em>same discipline</em> to every club
              in the portfolio.
            </p>
          </div>
        </div>

        {/* 001 · We invest — Acquire the right clubs (selection radar) */}
        <div className="section">
          <div className="section-inner">
            <SelectionScorecard />
          </div>
        </div>

        {/* 002 · We build — Excellence everywhere (operating pillars).
            Three categorical columns separated by typography and whitespace,
            with KPIs as the visual hero (no card chrome). */}
        <div className="section bg-deep">
          <div className="section-inner">
            <div className="section-head solo" style={{ marginBottom: 40 }}>
              <div>
                <div className="sh-eyebrow">002 · We build</div>
                <h2 className="sh-h2">
                  Excellence <em>everywhere.</em>
                </h2>
              </div>
            </div>

            <div className="kpi-legend">
              <div className="kpi-legend-item">
                <span className="kpi-legend-dot pre" />
                Pre-investment baseline
              </div>
              <div className="kpi-legend-item">
                <span className="kpi-legend-dot post" />
                Clara Vista target
              </div>
            </div>

            <div className="pillar-cols">
              {PILLARS.map((p) => (
                <div key={p.label} className="pillar-col">
                  <div className="pillar-col-label">{p.label}</div>
                  <p className="pillar-col-desc">{p.desc}</p>
                  {p.kpis.map((k) => (
                    <div key={k.label} className="pillar-kpi">
                      <div className="pillar-kpi-label">{k.label}</div>
                      <div className="pillar-kpi-slider">
                        <div className="pillar-kpi-track" />
                        <div
                          className="pillar-kpi-fill"
                          style={{ left: k.fillLeft, right: 0 }}
                        />
                        <div
                          className="pillar-kpi-marker pre"
                          style={{ left: k.markerLeft }}
                        />
                        <div
                          className="pillar-kpi-marker post"
                          style={{ left: "100%" }}
                        />
                      </div>
                      <div className="pillar-kpi-values">
                        <span className="pre">{k.pre}</span>
                        <span className="post">{k.post}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 003 · We win — Alpha and beta, stacked.
            Per product feedback this section sits between the pillars (above)
            and the revenue-lines zoom-in (below) — the return engine is the
            bridge that explains *why* the operating work matters. */}
        <div className="section return-engine-section">
          <div className="section-inner">
            <div className="section-head solo" style={{ marginBottom: 56 }}>
              <div>
                <div className="sh-eyebrow">003 · We win</div>
                <h2 className="sh-h2">
                  Alpha <em>and beta,</em> stacked.
                </h2>
              </div>
            </div>

            <div className="return-engine">
              <div className="re-card">
                <div className="re-label">Source 01 · Operational</div>
                <div className="re-multiplier">
                  2&ndash;3<span className="re-x">×</span>
                </div>
                <div className="re-name">Alpha</div>
                <p className="re-desc">
                  Trapped value unlocked through investments in{" "}
                  <em>people, processes, and technology.</em> Most football clubs
                  are run with the operating discipline of a small business,
                  leaving 30&ndash;50% of commercial value on the table. Clara
                  Vista closes that gap.
                </p>
              </div>
              <div className="re-card">
                <div className="re-label">Source 02 · Structural</div>
                <div className="re-multiplier">
                  2<span className="re-x">×</span>
                </div>
                <div className="re-name">Beta</div>
                <p className="re-desc">
                  Significant expected league growth and tailwinds in the{" "}
                  <em>sports asset class.</em> Media rights expansion, regulatory
                  restructuring, and the global institutionalization of club
                  ownership lift all valuations across the portfolio.
                </p>
              </div>
              <div className="re-card is-result">
                <div className="re-label">Result · Fund II target</div>
                <div className="re-multiplier">
                  <em>30%+</em>
                </div>
                <div className="re-name re-name--result">Gross IRR · 3&ndash;5× MOIC</div>
                <p className="re-desc">
                  A weighted-average return profile produced by stacking{" "}
                  <em>operational alpha</em> on top of <em>asset-class beta</em>.
                  Targeting <em>$915M in gross proceeds</em> from a $250M fund —
                  and a 3.05× net MOIC, 24.65% net IRR for limited partners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 004 · Operating depth — tabular terminal (nine revenue lines). */}
        <div className="section bg-card">
          <div className="section-inner">
            <div className="section-head solo" style={{ marginBottom: 40 }}>
              <div>
                <div className="sh-eyebrow">004 · Operating depth</div>
                <h2 className="sh-h2">
                  How alpha maps to <em>the business.</em>
                </h2>
              </div>
            </div>

            <div className="terminal-divider">
              <div className="terminal-head">
                <div className="terminal-eyebrow">Operating data · 9 revenue lines</div>
                <p className="terminal-desc">
                  Every revenue line treated as <em>its own business</em>, with
                  distinct performance levers that compound aggregate club value.
                </p>
              </div>

              <table
                className="terminal-table"
                aria-label="Operating data by revenue line"
              >
                <thead>
                  <tr>
                    <th />
                    <th>Revenue line</th>
                    <th>Metric</th>
                    <th className="right">Pre</th>
                    <th className="right">Target</th>
                    <th>Lift</th>
                  </tr>
                </thead>
                <tbody>
                  {TERMINAL_REV_ROWS.map((r) => (
                    <tr key={r.num}>
                      <td className="col-num">{r.num}</td>
                      <td className="col-line">{r.line}</td>
                      <td className="col-metric">{r.metric}</td>
                      <td className="col-pre">{r.pre}</td>
                      <td className="col-post">{r.post}</td>
                      <td className="col-bar">
                        <div className="terminal-bar">
                          <div
                            className="terminal-bar-fill"
                            style={{ width: `${r.liftPct}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="revline-footnote">
                Solely for illustrative purposes. Figures shown are not investment
                performance and do not reflect the actual results of any Clara
                Vista portfolio club.
              </p>
            </div>
          </div>
        </div>

        {/* Chapter break · routes to /portfolio (the proof). */}
        <Link href="/portfolio" className="chapter-break">
          <div className="chapter-break-inner">
            <div>
              <div className="chapter-break-eyebrow">Next chapter · 03 · Portfolio</div>
              <h2 className="chapter-break-h2">
                The <em>proof.</em>
                <span className="chapter-break-arrow">→</span>
              </h2>
            </div>
            <div className="chapter-break-meta">
              Three clubs · three leagues
              <br />
              One operating system, deployed
            </div>
          </div>
        </Link>
      </main>
      <Footer />
    </>
  );
}
