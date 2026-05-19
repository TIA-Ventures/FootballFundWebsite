import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";
import { TrackRecord } from "@/components/TrackRecord";

export const metadata: Metadata = {
  title: "Track Record · Clara Vista Investment Partners",
  description:
    "Combined investment record of Clara Vista (PE, European football) and TIA Ventures (VC, early-stage technology) — Fund I/II/III holdings, realized investments, and CEOs.",
};

export default function TrackRecordPage() {
  return (
    <>
      <Topbar activeNav="track-record" />
      <main className="cv-page tr-page">
        <div className="page-hero">
          <div className="page-hero-inner">
            <div>
              <div className="ph-eyebrow">Track Record</div>
              <h1 className="ph-h1">
                Two firms, <em>one record.</em>
              </h1>
            </div>
            <p className="ph-intro">
              <em>Clara Vista</em> takes controlling stakes in European football clubs.{" "}
              <em>TIA Ventures</em> backs early-stage technology operators. Combined, a record
              of <em>operator-led, hands-on</em> investing across four funds.
            </p>
          </div>
        </div>

        <div className="section compact">
          <div className="section-inner">
            <div className="experience-stats">
              <div className="exp-stat">
                <div className="exp-stat-num">41</div>
                <div className="exp-stat-label">Portfolio investments</div>
              </div>
              <div className="exp-stat">
                <div className="exp-stat-num">4</div>
                <div className="exp-stat-label">Funds deployed</div>
              </div>
              <div className="exp-stat">
                <div className="exp-stat-num">
                  14<em>+</em>
                </div>
                <div className="exp-stat-label">Realized investments</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section bg-deep">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">001 · Portfolio</div>
                <h2 className="sh-h2">
                  Every investment <em>since 2014.</em>
                </h2>
              </div>
              <p className="sh-deck">
                Filter by firm (VC vs. PE) and sector. Each card links to the company —
                fund vintage, status, and acquirer noted inline.
              </p>
            </div>
            <TrackRecord />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
