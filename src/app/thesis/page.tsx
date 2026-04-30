import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Thesis · Clara Vista Investment Partners",
  description:
    "The most-watched sport on earth — and one of the few global asset classes still structurally underowned by institutional capital. Football is mispriced.",
};

/* Asset-class outperformance · 2×2 floating-bar layout (Variant A from the
   source-of-truth). Each row is one performance dimension; the data sits on a
   horizontal axis with sports highlighted and negative bars tokenized as `is-negative`. */
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
    meta: "Avg. return during Global Financial Crisis · 2007–2009",
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
                  An asset class, <em>mispriced.</em>
                </h1>
              </div>
              <p className="ph-intro">
                The <em>most-watched sport on earth</em> — and one of the few global asset classes still structurally
                underowned by institutional capital.
              </p>
            </div>
          </div>

          <div className="section compact">
            <div className="section-inner">
              <div className="stat-grid">
                <div className="stat-cell is-lead">
                  <div className="stat-eyebrow">The audience</div>
                  <div className="stat-num">
                    3.5<em>B</em>
                  </div>
                  <div className="stat-label">Global football fans · most-watched sport on earth</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">
                    7<em>×</em>
                  </div>
                  <div className="stat-label">Football viewership relative to American football</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">
                    96<em>/100</em>
                  </div>
                  <div className="stat-label">Top US broadcasts in 2024 were live sports</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">
                    $60<em>B+</em>
                  </div>
                  <div className="stat-label">Invested by private equity into sports since 2020</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-num">
                    $36<em>B+</em>
                  </div>
                  <div className="stat-label">Projected fan engagement market by 2035</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section bg-deep" style={{ borderBottom: "none" }}>
          <div className="section-inner">
            <div className="section-head" style={{ marginBottom: 72 }}>
              <div>
                <div className="sh-eyebrow">002 · Asset class outperformance</div>
                <h2 className="sh-h2">
                  Reliable. <em>Uncorrelated.</em> Resilient.
                </h2>
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

        <div className="thesis-takeaway">
          <div className="thesis-takeaway-inner">
            <div className="thesis-takeaway-eyebrow">003 · The takeaway</div>
            <h3 className="thesis-takeaway-lede">
              The most-watched sport on earth, structurally underowned, trading at a{" "}
              <em>fraction of US sports multiples</em>.
            </h3>

            <div className="thesis-takeaway-grid">
              <div className="thesis-takeaway-prop">
                <div className="thesis-takeaway-label">Scale</div>
                <div className="thesis-takeaway-claim">
                  A global asset class with <em>150-year clubs</em> as inventory and 3.5 billion fans as audience.
                </div>
              </div>
              <div className="thesis-takeaway-prop">
                <div className="thesis-takeaway-label">Mispricing</div>
                <div className="thesis-takeaway-claim">
                  Global clubs trade at <em>2–6× revenues</em> versus <em>5–15×</em> for US franchises.
                </div>
              </div>
              <div className="thesis-takeaway-prop">
                <div className="thesis-takeaway-label">Path to value</div>
                <div className="thesis-takeaway-claim">
                  Multiple expansion at the league level, <em>operational alpha</em> at the club level.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter break · routes to /approach (Chapter 02 of the site
            narrative). The approach page details how Clara Vista deploys the
            thesis — selection criteria, operating pillars, and return engine. */}
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
