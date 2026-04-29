import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { ManifestoSlab } from "@/components/ManifestoSlab";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Thesis · Clara Vista Investment Partners",
  description:
    "Clara Vista is a data-driven sports investment platform built to generate asymmetric outcomes. We invest behind strong tailwinds and partner with winning organizations to achieve excellence across every dimension of performance.",
};

const EXPERIENCE_PILLARS = [
  {
    num: "01",
    title: "Experience",
    body:
      "Our team has managed over $10B across global private equity, real estate, and venture funds — consistently delivering top-quartile returns with zero principal losses. We bring governance, discipline, and judgment earned through decades of investing and operating.",
  },
  {
    num: "02",
    title: "Access",
    body:
      "Decades of trusted relationships unlock unique, off-market opportunities few investors can access. We pair this access with deep structuring expertise to ensure alignment, transparency, and durability across every investment.",
  },
  {
    num: "03",
    title: "Action",
    body:
      "We've built and scaled companies worth billions, including category-defining businesses like Netflix and Google. This operator DNA gives us the ability to turn complexity into execution — and execution into lasting value.",
  },
  {
    num: "04",
    title: "Returns",
    body:
      "We manage every investment with the focus of owners and the discipline of fiduciaries — driving performance at every level of the organization and always optimizing for the best path to exit.",
  },
];

const OPERATING_SYSTEM = [
  {
    num: "01",
    title: "Team Selection",
    body:
      "Identifying and investing in clubs with untapped potential, asymmetric upside, and clear pathways to transformative value.",
  },
  {
    num: "02",
    title: "World-Class Management",
    body:
      "Implementing best-in-class management structures that accelerate progress and strengthen every layer of the club.",
  },
  {
    num: "03",
    title: "Data-Driven Sports Operations",
    body:
      "We build a data-driven culture that systematically maximizes competitiveness, performance bonuses, and transfer profits.",
  },
  {
    num: "04",
    title: "Commercial Optimization",
    body:
      "We deploy best-in-class technology that expands sponsorships, merchandising, gameday, and other revenue streams.",
  },
  {
    num: "05",
    title: "Back Office Efficiency",
    body:
      "We modernize governance, analytics, and financial infrastructure to improve efficiency, accountability, and ROI from every operating dollar.",
  },
];

type RailItem = { num: string; title: string; body: string };

function PillarRail({ items }: { items: RailItem[] }) {
  return (
    <ol className="pillar-rail" role="list">
      {items.map((it) => (
        <li key={it.num} className="pillar-rail-row">
          <div className="pillar-rail-num">{it.num}</div>
          <h3 className="pillar-rail-title">{it.title}</h3>
          <p className="pillar-rail-body">{it.body}</p>
        </li>
      ))}
    </ol>
  );
}

export default function ThesisPage() {
  return (
    <>
      <Topbar activeNav="thesis" />
      <main className="thesis-page">
        <ManifestoSlab eyebrowNumber="001" showPlatformLine />

        <section className="thesis-section" aria-labelledby="experience-heading">
          <div className="thesis-section-head">
            <div>
              <div className="thesis-eyebrow">
                <span className="thesis-eyebrow-num">002</span>
                <span className="thesis-eyebrow-rule" aria-hidden />
                <span>Experience That Wins</span>
              </div>
              <h2 className="thesis-heading" id="experience-heading">
                Operators with <em>a track record</em>
                <br />
                of winning.
              </h2>
            </div>
            <p className="thesis-intro">
              Our team combines decades of financial leadership with deep operating experience across sports, media, technology,
              and data to produce winning results.
            </p>
          </div>
          <PillarRail items={EXPERIENCE_PILLARS} />
        </section>

        <section className="thesis-section" aria-labelledby="operating-heading">
          <div className="thesis-section-head">
            <div>
              <div className="thesis-eyebrow">
                <span className="thesis-eyebrow-num">003</span>
                <span className="thesis-eyebrow-rule" aria-hidden />
                <span>Excellence Everywhere</span>
              </div>
              <h2 className="thesis-heading" id="operating-heading">
                The <em>Operating System.</em>
              </h2>
            </div>
            <p className="thesis-intro">
              We identify exceptional sports teams that carry outsized growth potential, unlocking their trapped value through
              deep focus across every dimension of performance.
            </p>
          </div>
          <PillarRail items={OPERATING_SYSTEM} />
        </section>

        <section className="thesis-cta" aria-label="Continue">
          <a href="/#portfolio" className="thesis-cta-link">
            <span className="thesis-cta-label">See the portfolio</span>
            <span className="thesis-cta-arrow" aria-hidden>
              →
            </span>
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
