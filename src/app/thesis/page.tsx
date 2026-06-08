import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ThesisFootballRows } from "@/components/ThesisFootballRows";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Thesis · Clara Vista Investment Partners",
  description:
    "Sports as an asset class — reliable, uncorrelated, and accelerating. Global football offers asymmetric returns, deep cultural scale, and a structural discount to US sports.",
};

type AcBar = { value: string; label: string; left: string; tone?: "sports" | "negative" };
type AcRow = { name: string; meta: string; bars: AcBar[] };

const AC_ROWS: AcRow[] = [
  {
    name: "Long-term outperformance",
    meta: "Annualized return · last 10 yrs",
    bars: [
      { value: "11%", label: "S&P 500", left: "14%" },
      { value: "15%", label: "NASDAQ", left: "42%" },
      { value: "17%", label: "U.S. PE", left: "70%" },
      { value: "18%", label: "Sports", left: "90%", tone: "sports" },
    ],
  },
  {
    name: "Outperformance during downturns",
    meta: "Avg. return during the Great Financial Recession · 2007–2009",
    bars: [
      { value: "-22%", label: "S&P 500", left: "14%", tone: "negative" },
      { value: "-16%", label: "NASDAQ", left: "38%", tone: "negative" },
      { value: "-11%", label: "U.S. PE", left: "60%", tone: "negative" },
      { value: "+4%", label: "Sports", left: "90%", tone: "sports" },
    ],
  },
  {
    name: "Low correlation",
    meta: "Correlation vs S&P 500 · last 10 yrs",
    bars: [
      { value: "4%", label: "Sports", left: "12%", tone: "sports" },
      { value: "81%", label: "U.S. PE", left: "64%", tone: "negative" },
      { value: "91%", label: "NASDAQ", left: "78%", tone: "negative" },
      { value: "100%", label: "S&P 500", left: "92%", tone: "negative" },
    ],
  },
  {
    name: "Low volatility",
    meta: "% volatility · last 10 yrs",
    bars: [
      { value: "9%", label: "Sports", left: "12%", tone: "sports" },
      { value: "13%", label: "S&P 500", left: "44%" },
      { value: "14%", label: "U.S. PE", left: "56%" },
      { value: "19%", label: "NASDAQ", left: "90%" },
    ],
  },
];

const HERO_PROOF = [
  { value: "18", suffix: "%", label: "Sports annualized return · last 10 yrs" },
  { value: "4", suffix: "%", label: "Correlation to the S&P 500 · last 10 yrs" },
  { value: "+4", suffix: "%", label: "Sports return during the 2008 Recession" },
];

function toneClass(tone?: "sports" | "negative") {
  if (tone === "sports") return "ac-bar is-sports";
  if (tone === "negative") return "ac-bar is-negative";
  return "ac-bar";
}

export default function ThesisPage() {
  return (
    <>
      <Topbar activeNav="thesis" />
      <main className="cv-page thesis-page">
        <div className="thesis-asset-banner">
          <div className="page-hero">
            <div className="page-hero-inner">
              <div>
                <div className="ph-eyebrow">Thesis</div>
                <h1 className="ph-h1">
                  Sports <em>work.</em>
                </h1>
              </div>
            </div>
          </div>

          <div className="thesis-hero-proof-wrap">
            <div className="section-inner">
              <div className="thesis-hairline-grid thesis-hairline-grid--hero" aria-label="Sports asset class highlights">
                {HERO_PROOF.map((item) => (
                  <div key={item.label} className="thesis-hairline-cell">
                    <div className="thesis-hairline-num">
                      {item.value}
                      <em>{item.suffix}</em>
                    </div>
                    <div className="thesis-hairline-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 001 · Why sports work */}
        <div className="section bg-deep">
          <div className="section-inner">
            <div className="section-head solo">
              <div>
                <div className="sh-eyebrow">001 · Why sports work</div>
                <h2 className="sh-h2">
                  Reliable. <em>Uncorrelated.</em> Resilient.
                </h2>
                <p className="sh-deck">
                  Relative to public equities and traditional private equity, sports has delivered superior
                  risk-adjusted returns across every dimension measured below.
                </p>
              </div>
            </div>

            <div className="ac-grid">
              {AC_ROWS.map((row) => (
                <div key={row.name} className="ac-row">
                  <div className="ac-row-head">
                    <div className="ac-row-name">{row.name}</div>
                    <div className="ac-row-meta">{row.meta}</div>
                  </div>
                  <div className="ac-bars">
                    <div className="ac-axis" />
                    {row.bars.map((b) => (
                      <div
                        key={`${row.name}-${b.label}`}
                        className={toneClass(b.tone)}
                        style={{ left: b.left }}
                      >
                        <div className="ac-bar-pill">{b.value}</div>
                        <div className="ac-bar-label">{b.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="ac-source">Source · Forbes, Cambridge Associates, S&amp;P CapIQ</p>
          </div>
        </div>

        {/* 002 · Tailwinds */}
        <div className="section">
          <div className="section-inner">
            <div className="section-head solo">
              <div>
                <div className="sh-eyebrow">002 · Tailwinds</div>
                <h2 className="sh-h2">
                  Capital is flowing. <em>Attention is fixed on live sport.</em>
                </h2>
                <p className="sh-deck">
                  Institutional capital and live audience are converging on sport as a durable, monetizable
                  consumption category.
                </p>
              </div>
            </div>

            <div className="thesis-hairline-grid thesis-hairline-grid--tailwinds">
              <div className="thesis-hairline-cell is-lead">
                <div className="thesis-hairline-num">
                  96<em>/100</em>
                </div>
                <div className="thesis-hairline-label">Top US broadcasts in 2024 were live sports</div>
              </div>
              <div className="thesis-hairline-cell">
                <div className="thesis-hairline-num">
                  $60<em>B+</em>
                </div>
                <div className="thesis-hairline-label">Private equity invested in sports since 2020</div>
              </div>
              <div className="thesis-hairline-cell">
                <div className="thesis-hairline-num">
                  $36<em>B+</em>
                </div>
                <div className="thesis-hairline-label">Projected fan engagement market by 2035</div>
              </div>
            </div>
            <p className="ac-source">Sources · Nielsen · PitchBook · industry estimates</p>
          </div>
        </div>

        {/* 003 · Why football */}
        <div className="section thesis-football-section">
          <div className="section-inner">
            <div className="section-head solo">
              <div>
                <div className="sh-eyebrow">003 · Why football</div>
                <h2 className="sh-h2">
                  Global football at scale. <em>Our focus.</em>
                </h2>
              </div>
            </div>

            <ThesisFootballRows />
          </div>
        </div>

        <Link href="/approach" className="chapter-break">
          <div className="chapter-break-inner">
            <div>
              <div className="chapter-break-eyebrow">Next chapter · 02 · Approach</div>
              <h2 className="chapter-break-h2">
                Our <em>approach.</em>
                <span className="chapter-break-arrow">→</span>
              </h2>
            </div>
            <div className="chapter-break-meta">
              We invest · We build · We win
              <br />
              How we turn the thesis into returns.
            </div>
          </div>
        </Link>
      </main>
      <Footer />
    </>
  );
}
