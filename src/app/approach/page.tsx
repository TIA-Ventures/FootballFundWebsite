import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";

const SelectionScorecard = dynamic(
  () => import("@/components/SelectionScorecard").then((m) => ({ default: m.SelectionScorecard })),
);

const ValueEngine = dynamic(
  () => import("@/components/ValueEngine").then((m) => ({ default: m.ValueEngine })),
);

export const metadata: Metadata = {
  title: "Approach · Clara Vista Investment Partners",
  description:
    "We invest. We build. We win. How Clara Vista selects clubs, executes on operations, and drives returns across the portfolio.",
};

export default function ApproachPage() {
  return (
    <>
      <Topbar activeNav="approach" />
      <main className="cv-page approach-page">
        <div className="approach-invest-banner">
          <div className="page-hero">
            <div className="page-hero-inner approach-hero-inner">
              <div>
                <div className="ph-eyebrow">Approach</div>
                <h1 className="ph-h1 approach-manifesto" aria-label="We invest. We build. We win.">
                  <span className="headline-we">We</span> invest.{" "}
                  <span className="headline-we">We</span> build.{" "}
                  <span className="headline-we">We</span> win.
                </h1>
              </div>
            </div>
          </div>

          <div className="section approach-invest-section">
            <div className="section-inner">
              <SelectionScorecard />
            </div>
          </div>
        </div>

        <div className="section bg-card">
          <div className="section-inner">
            <div className="section-head solo" style={{ marginBottom: 40 }}>
              <div>
                <div className="sh-eyebrow">The Value Engine</div>
                <h2 className="sh-h2">Three pillars. One operating system.</h2>
              </div>
            </div>

            <ValueEngine />
          </div>
        </div>

        <div className="section return-engine-section">
          <div className="section-inner">
            <div className="section-head solo" style={{ marginBottom: 56 }}>
              <div>
                <div className="sh-eyebrow">We win</div>
                <h2 className="sh-h2">Alpha and beta, stacked.</h2>
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
                  Trapped value unlocked through investments in people, processes, and technology.
                  Most football clubs are run with the operating discipline of a small business,
                  leaving 30&ndash;50% of commercial value on the table. Clara Vista closes that gap.
                </p>
              </div>
              <div className="re-card">
                <div className="re-label">Source 02 · Structural</div>
                <div className="re-multiplier">
                  2<span className="re-x">×</span>
                </div>
                <div className="re-name">Beta</div>
                <p className="re-desc">
                  Significant expected league growth and tailwinds in the sports asset class. Media
                  rights expansion, regulatory restructuring, and the global institutionalization of
                  club ownership lift all valuations across the portfolio.
                </p>
              </div>
              <div className="re-card is-result">
                <div className="re-label">Result · Fund II target</div>
                <div className="re-multiplier">30%+</div>
                <div className="re-name re-name--result">Gross IRR · 3&ndash;5× MOIC</div>
                <p className="re-desc">
                  A weighted-average return profile produced by stacking operational alpha on top of
                  asset-class beta. Targeting $915M in gross proceeds from a $250M fund — and a 3.05×
                  net MOIC, 24.65% net IRR for limited partners.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/portfolio" className="chapter-break">
          <div className="chapter-break-inner">
            <div>
              <div className="chapter-break-eyebrow">Next · Portfolio</div>
              <h2 className="chapter-break-h2">
                The proof.
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
