import type { Metadata } from "next";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";

const FrosinoneTimeline = dynamic(
  () => import("@/components/FrosinoneTimeline").then((m) => ({ default: m.FrosinoneTimeline })),
);

export const metadata: Metadata = {
  title: "Frosinone Calcio · Portfolio · Clara Vista Investment Partners",
  description:
    "Frosinone Calcio — controlling investment via Clara Vista Frosinone SPV I. Promoted to Serie A in 2025/26 with a modern stadium, disciplined wage structure, and three top-flight promotions in the last decade.",
};

type GlanceCell = { label: string; value: ReactNode };

const GLANCE: GlanceCell[] = [
  { label: "League", value: "Serie A" },
  { label: "Founded", value: "1928" },
  { label: "Stadium", value: "Benito Stirpe" },
  { label: "First close", value: "May 2026" },
  { label: "Stake", value: <em>Controlling</em> },
  { label: "Board seat", value: "Bob Gold" },
];

const ROADMAP = [
  {
    num: "01",
    title: "Stabilize & build",
    body:
      "Deploy Clara Vista's data-led recruitment model, upgrade training infrastructure, and launch ticketing, sponsorship, and hospitality optimization — compounding commercial upside in the club's first Serie A season back.",
  },
  {
    num: "02",
    title: "Establish in Serie A",
    body:
      "Consolidate top-flight status with a media revenue step-up to €35M+ and total club revenue above €50M, while maintaining a disciplined ~45% wage-to-revenue ratio after promotion from Serie B.",
  },
  {
    num: "03",
    title: "Entrench & exit",
    body:
      "Sustain mid-table Serie A performance, grow revenue toward €70M+, expand the player-trading engine, and exit at institutional multiples in the ~€225M valuation range.",
  },
];

export default function FrosinonePage() {
  return (
    <>
      <Topbar activeNav="portfolio" />
      <main className="cv-page portfolio-page">
        <div className="deep-hero">
          <div className="deep-hero-inner">
            <div className="breadcrumb">
              <Link href="/portfolio">Portfolio</Link>
              <span className="sep">/</span>
              <span className="current">Frosinone Calcio</span>
            </div>
            <div className="deep-meta">
              <div>
                <h1 className="deep-h1">
                  Frosinone Calcio <em className="deep-h1-accent">.</em>
                </h1>
                <p className="deep-sub">
                  Controlling investment via Clara Vista Frosinone SPV I — a century-old club outside Rome, newly
                  promoted to Serie A in 2025/26, with a modern stadium and three top-flight promotions in the last
                  decade.
                </p>
              </div>
            </div>
            <div className="deep-image has-logo">
              <Image
                src="/frosinone-calcio.png"
                alt="Frosinone Calcio crest"
                width={200}
                height={228}
                priority
                className="deep-image-logo"
              />
            </div>
          </div>
        </div>

        <div className="section flush">
          <div className="section-inner">
            <div className="at-a-glance">
              {GLANCE.map((g) => (
                <div className="glance-cell" key={g.label}>
                  <div className="glance-label">{g.label}</div>
                  <div className="glance-value">{g.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">001 · Investment Thesis</div>
                <h2 className="sh-h2">
                  Newly promoted, <em>institutional upside.</em>
                </h2>
              </div>
            </div>

            <div className="prose-body" style={{ maxWidth: 820, margin: 0 }}>
              <p>
                Clara Vista is acquiring a controlling interest in Frosinone Calcio at approximately{" "}
                <em>1× current revenues</em> — a motivated-seller entry that reflects the search for a quality long-term
                partner, not distress at the club. All primary capital is deployed into the club; the incumbent owner
                retains a minority stake with aligned incentives after 25 years of sustainable stewardship.
              </p>
              <p>
                Frosinone secured promotion to Serie A in 2025/26 after three top-flight promotions in the last decade
                (2015/16, 2018/19, 2022/23), pursuing fiscal discipline rather than overspending. The squad averages ~22
                years of age with one of the division&apos;s lowest wage bills — competitive results driven by academy and
                recruiting strength, not unsustainable payroll.
              </p>
              <p>
                <em>Benito Stirpe</em> opened in 2017 with 16,227 seats and concession through 2061 — Serie
                A-ready infrastructure that eliminates the largest capital expenditure risk in Italian club ownership.
                One hour from Rome, the club sits inside a deep youth pipeline and a 4M+ metro commercial footprint.
              </p>
            </div>
          </div>
        </div>

        <div className="pull-quote">
          <div className="pull-quote-inner">
            <q>
              A modern stadium creates a heightened matchday experience — clearly superior to many Serie A venues — and
              a differentiated selling point for players, sponsors, and supporters.
            </q>
            <div className="pull-quote-attribution">Benito Stirpe · Frosinone Calcio</div>
          </div>
        </div>

        <div className="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">002 · Value Creation Roadmap</div>
                <h2 className="sh-h2">
                  From Serie A promotion <em>to institutional exit.</em>
                </h2>
              </div>
              <p className="sh-deck">
                Phased plan to establish mid-table Serie A performance and realize value at institutional multiples —
                powered by Clara Vista&apos;s data-first operating model.
              </p>
            </div>

            <div className="accomp-grid">
              {ROADMAP.map((step) => (
                <div className="accomp-card" key={step.num}>
                  <div className="accomp-icon">{step.num}</div>
                  <h3 className="accomp-title">{step.title}</h3>
                  <p className="accomp-body">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">003 · History</div>
                <h2 className="sh-h2">
                  From Ciociaria roots <em>to control.</em>
                </h2>
              </div>
              <p className="sh-deck">
                Nearly a century of gradual ascent — four Serie A promotions, a modern stadium, and
                institutional capital. Filled markers indicate Clara Vista milestones.
              </p>
            </div>

            <FrosinoneTimeline />
          </div>
        </div>

        <div className="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">004 · Operating Edge</div>
                <h2 className="sh-h2">
                  Data infrastructure <em>meets Italian football.</em>
                </h2>
              </div>
            </div>

            <div className="prose-body" style={{ maxWidth: 820, margin: 0 }}>
              <p>
                Clara Vista deploys the same proprietary recruitment and performance infrastructure used across the
                portfolio — including leadership with Brentford FC pedigree and proven promotion success in Italy. The
                model bridges quantitative edge with local football culture: disciplined squad building, commercial
                optimization, and player trading designed to compound enterprise value in Serie A.
              </p>
              <p>
                Frosinone generated approximately <em>€50M in revenue</em> in its most recent Serie A season (2022/23).
                Return to the top flight unlocks a step-change in media economics and multiple expansion relative to the
                entry valuation — positioning the club alongside recent Italian transactions that have re-rated sharply
                on institutional ownership and Serie A entrenchment.
              </p>
            </div>

            <div className="cta-row">
              <Link href="/approach" className="cta-link">
                Our approach
              </Link>
              <a
                href="https://www.frosinonecalcio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-link"
              >
                Visit frosinonecalcio.com
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
