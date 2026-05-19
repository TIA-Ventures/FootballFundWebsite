import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { IpswichTimeline } from "@/components/IpswichTimeline";
import { IpswichRevenueChart } from "@/components/IpswichRevenueChart";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Ipswich Town · Portfolio · Clara Vista Investment Partners",
  description:
    "Ipswich Town FC — anchor investment of Fund II, held via the Portman Holdings LLC consortium. A historic English club positioned for transformation under Mark Ashton's leadership.",
};

type GlanceCell = { label: string; value: ReactNode };

const GLANCE: GlanceCell[] = [
  { label: "League", value: "EFL Championship" },
  { label: "Founded", value: "1878" },
  { label: "Stadium", value: "Portman Road" },
  { label: "First close", value: "Mar 2024" },
  { label: "Stake", value: <em>Controlling</em> },
  { label: "Board seat", value: "Bob Gold" },
];

export default function IpswichPage() {
  return (
    <>
      <Topbar activeNav="portfolio" />
      <main className="cv-page portfolio-page">
        <div className="deep-hero">
          <div className="deep-hero-inner">
            <div className="breadcrumb">
              <Link href="/portfolio">Portfolio</Link>
              <span className="sep">/</span>
              <span className="current">Ipswich Town FC</span>
            </div>
            <div className="deep-meta">
              <div>
                <h1 className="deep-h1">
                  Ipswich Town <em className="deep-h1-accent">.</em>
                </h1>
                <p className="deep-sub">
                  Anchor investment of Fund II. Held via the Portman Holdings LLC consortium — a club with untapped
                  potential, asymmetric upside, and a clear pathway to transformative value.
                </p>
              </div>
            </div>
            <div className="deep-image has-photo">
              <Image
                src="/ipswich-team.webp"
                alt="Ipswich Town first team, 2024/25 season"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
                className="deep-image-photo"
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
                  A historic club, <em>positioned for transformation.</em>
                </h2>
              </div>
            </div>

            <div className="prose-body" style={{ maxWidth: 820, margin: 0 }}>
              <p>
                Ipswich is one of only a small number of English clubs to achieve <em>back-to-back promotions</em> to
                the Premier League — among the rarest feats in English football. Under Chairman Mark Ashton&apos;s
                leadership, the club generated the <em>highest player value creation in global football</em> in the
                2024/25 season.
              </p>
              <p>
                That level of value creation isn&apos;t accidental. It reflects exactly the kind of{" "}
                <em>data-driven culture</em> Clara Vista builds across portfolio clubs — one that systematically
                maximizes competitiveness, performance, bonuses, and transfer profits. Ipswich is both the model and the
                proof point.
              </p>
              <p>
                The investment is structured for long-term ownership rather than financial-sponsor exit pressure. Clara
                Vista capital sits alongside strategic LPs from sports media, US institutional credit, and Middle
                Eastern sovereign capital — partners whose return horizons match the club&apos;s generational rebuild.
              </p>
            </div>
          </div>
        </div>

        <div className="pull-quote">
          <div className="pull-quote-inner">
            <q>
              We continue to ensure the club is in the best place to maintain what has been an exceptional growth curve
              over the last few years.
            </q>
            <div className="pull-quote-attribution">Mark Ashton · Chairman · Ipswich Town FC</div>
          </div>
        </div>

        <div className="section ipswich-accomp-section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">002 · Accomplishments Since Investment</div>
                <h2 className="sh-h2">
                  Two seasons. <em>Compounding outcomes.</em>
                </h2>
              </div>
              <p className="sh-deck">
                Annual revenue trajectory since Clara Vista&apos;s March 2024 investment — and the operating proof
                points driving it.
              </p>
            </div>

            <IpswichRevenueChart />
          </div>
        </div>

        <div className="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">003 · History</div>
                <h2 className="sh-h2">
                  From founding <em>to control.</em>
                </h2>
              </div>
              <p className="sh-deck">
                Three chapters across 147 years — foundations, the Ramsey &amp; Robson golden era, and the modern
                rebuild. Filled markers indicate Clara Vista milestones.
              </p>
            </div>

            <IpswichTimeline />

            <div className="cta-row">
              <Link href="/thesis" className="cta-link">
                Read the thesis
              </Link>
              <a
                href="https://www.itfc.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-link"
              >
                Visit itfc.co.uk
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
