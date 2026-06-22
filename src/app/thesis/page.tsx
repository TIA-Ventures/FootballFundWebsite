import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ThesisFootballRows } from "@/components/ThesisFootballRows";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Thesis",
  description:
    "Sports as an asset class — reliable, uncorrelated, and accelerating. Global football offers asymmetric returns, deep cultural scale, and a structural discount to US sports.",
};

type AcTone = "sports" | "neutral" | "negative";
type AcBar = { label: string; value: number; display: string; tone: AcTone };
type AcMetric = {
  name: string;
  meta: string;
  bars: AcBar[];
};

const AC_METRICS: AcMetric[] = [
  {
    name: "Long-term outperformance",
    meta: "Annualized return · last 10 yrs",
    bars: [
      { label: "S&P 500", value: 11, display: "11%", tone: "neutral" },
      { label: "NASDAQ", value: 15, display: "15%", tone: "neutral" },
      { label: "U.S. PE", value: 17, display: "17%", tone: "neutral" },
      { label: "Sports", value: 18, display: "18%", tone: "sports" },
    ],
  },
  {
    name: "Resilience in downturns",
    meta: "Avg. return · 2007–2009 recession",
    bars: [
      { label: "S&P 500", value: -22, display: "−22%", tone: "negative" },
      { label: "NASDAQ", value: -16, display: "−16%", tone: "negative" },
      { label: "U.S. PE", value: -11, display: "−11%", tone: "negative" },
      { label: "Sports", value: 4, display: "+4%", tone: "sports" },
    ],
  },
  {
    name: "Low correlation",
    meta: "Correlation vs S&P 500 · last 10 yrs",
    bars: [
      { label: "Sports", value: 4, display: "4%", tone: "sports" },
      { label: "U.S. PE", value: 81, display: "81%", tone: "neutral" },
      { label: "NASDAQ", value: 91, display: "91%", tone: "neutral" },
      { label: "S&P 500", value: 100, display: "100%", tone: "neutral" },
    ],
  },
  {
    name: "Low volatility",
    meta: "Annualized volatility · last 10 yrs",
    bars: [
      { label: "Sports", value: 9, display: "9%", tone: "sports" },
      { label: "S&P 500", value: 13, display: "13%", tone: "neutral" },
      { label: "U.S. PE", value: 14, display: "14%", tone: "neutral" },
      { label: "NASDAQ", value: 19, display: "19%", tone: "neutral" },
    ],
  },
];

const HERO_PROOF = [
  { value: "18", suffix: "%", label: "Sports annualized return · last 10 yrs" },
  { value: "4", suffix: "%", label: "Correlation to the S&P 500 · last 10 yrs" },
  { value: "+4", suffix: "%", label: "Sports return during the 2008 Recession" },
];

/* Each value chip sits on a horizontal axis at a position encoding its value,
   scaled across the row's own min→max range (inset so edge chips don't clip). */
function pointLeft(metric: AcMetric, value: number): string {
  const values = metric.bars.map((b) => b.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return `${6 + ((value - min) / span) * 88}%`;
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
                <div className="sh-eyebrow">Why sports work</div>
                <h2 className="sh-h2">
                  Reliable. <em>Uncorrelated.</em> Resilient.
                </h2>
                <p className="sh-deck">
                  Across every dimension that matters, sports has outpaced public equities and private equity
                  &mdash; higher returns, near-zero correlation, and lower volatility. It even <em>grew through the
                  2008 crash</em>, a proven hedge against downturns.
                </p>
              </div>
            </div>

            <div className="ac-grid">
              {AC_METRICS.map((metric) => (
                <div key={metric.name} className="ac-metric">
                  <div className="ac-metric-head">
                    <div className="ac-metric-box">{metric.name}</div>
                    <p className="ac-metric-meta">{metric.meta}</p>
                  </div>
                  <div className="ac-plot">
                    <span className="ac-plot-axis" aria-hidden="true" />
                    {metric.bars.map((b) => (
                      <div
                        key={b.label}
                        className={`ac-point is-${b.tone}`}
                        style={{ left: pointLeft(metric, b.value) }}
                      >
                        <span className="ac-chip">{b.display}</span>
                        <span className="ac-point-label">{b.label}</span>
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
                <div className="sh-eyebrow">Tailwinds</div>
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
                <div className="sh-eyebrow">Why football</div>
                <h2 className="sh-h2">
                  Global football at scale.
                </h2>
              </div>
            </div>

            <ThesisFootballRows />
          </div>
        </div>

        <Link href="/approach" className="chapter-break">
          <div className="chapter-break-inner">
            <div>
              <div className="chapter-break-eyebrow">Next · Strategy</div>
              <h2 className="chapter-break-h2">
                Our <em>Strategy.</em>
                <span className="chapter-break-arrow">→</span>
              </h2>
            </div>
          </div>
        </Link>
      </main>
      <Footer />
    </>
  );
}
