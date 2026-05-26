import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { SelectionScorecard } from "@/components/SelectionScorecard";
import { ValueEngine } from "@/components/ValueEngine";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Approach · Clara Vista Investment Partners",
  description:
    "Chapter 02 — We invest. We build. We win. How Clara Vista selects clubs, executes on operations, and drives returns across the portfolio.",
};

/* /approach — Chapter 02 · How we invest.
 *
 * The manifesto "We invest. We build. We win." is both the page hero and
 * the structural spine. Each verb maps to a numbered section below.
 *
 * Per product feedback the alpha-and-beta block (the return engine) is
 * placed between the Value Engine and the chapter break. The narrative reads:
 *   001 We invest         → selection criteria (radar)
 *   004 The Value Engine   → pillar bands + metric sliders
 *   003 We win            → alpha + beta stacked
 *
 * Color tokens / typography mirror the rest of the site (no hardcoded
 * hexes); radar/pillars reference clara-vista-pages_36.html. */

export default function ApproachPage() {
  return (
    <>
      <Topbar activeNav="approach" />
      <main className="cv-page approach-page">
        {/* Hero + 001 We invest · full-bleed photography + scrim (thesis / portfolio pattern) */}
        <div className="approach-invest-banner">
          <div className="page-hero">
            <div className="page-hero-inner">
              <div>
                <div className="ph-eyebrow">Approach · Chapter 02</div>
                <h1 className="ph-h1">
                  We <em>invest.</em> We <em>build.</em> We <em>win.</em>
                </h1>
              </div>
            </div>
          </div>

          {/* 001 · We invest — Acquire the right clubs (selection radar) */}
          <div className="section approach-invest-section">
            <div className="section-inner">
              <SelectionScorecard />
            </div>
          </div>
        </div>

        {/* 004 · The Value Engine — pillar bands + metric sliders. */}
        <div className="section bg-card">
          <div className="section-inner">
            <div className="section-head solo" style={{ marginBottom: 40 }}>
              <div>
                <div className="sh-eyebrow">004 · The Value Engine</div>
                <h2 className="sh-h2">
                  Awakening the <em>&ldquo;Sleeping Giant&rdquo;</em>
                </h2>
              </div>
            </div>

            <ValueEngine />
          </div>
        </div>

        {/* 003 · We win — Alpha and beta, stacked. */}
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
