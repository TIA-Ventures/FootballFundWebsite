import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Ipswich Town · Portfolio · Clara Vista Investment Partners",
  description:
    "Ipswich Town FC — anchor investment of Fund II, held via the Portman Holdings LLC consortium. A historic English club positioned for transformation under Mark Ashton's leadership.",
};

type GlanceCell = { label: string; value: ReactNode };
type AccompCard = {
  icon: ReactNode;
  title: ReactNode;
  when: string;
  body: ReactNode;
};
type TimelineEvent = {
  year: string;
  label: ReactNode;
  tooltip: string;
  isAnchor?: boolean;
};

const GLANCE: GlanceCell[] = [
  { label: "League", value: "EFL Championship" },
  { label: "Founded", value: "1878" },
  { label: "Stadium", value: "Portman Road" },
  { label: "First close", value: "Mar 2024" },
  { label: "Stake", value: <em>Controlling</em> },
  { label: "Board seat", value: "Bob Gold" },
];

const ACCOMPLISHMENTS: AccompCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
        <path d="M17 5h2a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3" />
        <path d="M7 5H5a2 2 0 0 0-2 2v1a3 3 0 0 0 3 3" />
      </svg>
    ),
    title: (
      <>
        Back-to-back <em>promotions.</em>
      </>
    ),
    when: "2023 → 2024",
    body: (
      <>
        From League One to the Championship, then Championship to the <em>Premier League</em> — the most valuable
        football league in the world. Among the rarest feats in English football.
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline points="3 17 9 11 13 15 21 7" />
        <polyline points="14 7 21 7 21 14" />
      </svg>
    ),
    title: (
      <>
        Outsized <em>enterprise growth.</em>
      </>
    ),
    when: "Since 2023",
    body: (
      <>
        <em>6×+ increase</em> in revenues and valuation since 2023. The 2024/25 season generated the highest player
        value creation in global football — validating the recruitment and development model now being institutionalized
        across the portfolio.
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="8" r="3.2" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M14 19c0-2.5 2-5 5-5" />
      </svg>
    ),
    title: (
      <>
        World-class <em>management.</em>
      </>
    ),
    when: "Ongoing",
    body: (
      <>
        Mark Ashton — Chairman and operating leader — focused on building Ipswich into an{" "}
        <em>entrenched Premier League club</em> over the next 5+ years. Bob Gold joined the Gamechanger 20 board in
        December 2025.
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 13l3 3 7-7" />
        <path d="M21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: (
      <>
        Prominent <em>co-investors.</em>
      </>
    ),
    when: "Mar 2024 → Dec 2025",
    body: (
      <>
        A consortium of institutional capital alongside Clara Vista: <em>Avenue Capital Group</em>, ORG Portfolio
        Management (a US public pension fund), the Three Lions Fund, and ownership of the Florida Panthers — partners
        with long-term horizons matching the club&apos;s generational rebuild.
      </>
    ),
  },
];

const TIMELINE: TimelineEvent[] = [
  {
    year: "1878",
    label: "Club founded",
    tooltip:
      "Ipswich Town Football Club founded in Suffolk, England. One of the oldest clubs in the English football pyramid.",
  },
  {
    year: "1962",
    label: "First Division champions",
    tooltip:
      "Wins the First Division championship under Sir Alf Ramsey — the only English manager ever to win the World Cup.",
  },
  {
    year: "1981",
    label: "UEFA Cup champions",
    tooltip: "Wins the UEFA Cup under Sir Bobby Robson, beating AZ Alkmaar across two legs.",
  },
  {
    year: "2023",
    label: "Promoted to Championship",
    tooltip:
      "Promoted from League One to the EFL Championship — the first step in the back-to-back run.",
  },
  {
    year: "Mar 2024",
    label: <em>Clara Vista invests</em>,
    tooltip: "Clara Vista makes initial investment in Gamechanger 20 Ltd, the parent company of the club.",
    isAnchor: true,
  },
  {
    year: "2024",
    label: <em>Promoted to Premier League</em>,
    tooltip: "Back-to-back promotion to the Premier League — among the rarest feats in English football.",
  },
  {
    year: "2024/25",
    label: "Player value creation #1",
    tooltip:
      "Highest player value creation in global football — validating the recruitment and development model now institutionalized across Clara Vista's portfolio.",
  },
  {
    year: "Dec 2025",
    label: <em>Consortium takes control</em>,
    tooltip:
      "Portman Holdings LLC consortium — Clara Vista, ORG, Three Lions Fund — becomes majority shareholder. Bob Gold joins the Gamechanger 20 board.",
    isAnchor: true,
  },
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

        <div className="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">002 · Accomplishments Since Investment</div>
                <h2 className="sh-h2">
                  Two seasons. <em>Compounding outcomes.</em>
                </h2>
              </div>
              <p className="sh-deck">
                What&apos;s happened at Ipswich since Clara Vista&apos;s initial investment in March 2024 — on the
                pitch, in the boardroom, and on the cap table.
              </p>
            </div>

            <div className="accomp-grid">
              {ACCOMPLISHMENTS.map((a, i) => (
                <div className="accomp-card" key={i}>
                  <div className="accomp-head">
                    <div className="accomp-icon" aria-hidden="true">
                      {a.icon}
                    </div>
                    <div className="accomp-title">{a.title}</div>
                  </div>
                  <div className="accomp-when">{a.when}</div>
                  <p className="accomp-body">{a.body}</p>
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
                  From founding <em>to control.</em>
                </h2>
              </div>
              <p className="sh-deck">
                147 years of Ipswich Town. Hover any milestone for full detail. Filled green markers indicate Clara
                Vista transactions.
              </p>
            </div>

            <div className="h-timeline">
              <div className="h-timeline-rail" aria-hidden="true" />
              <div className="h-timeline-grid">
                {TIMELINE.map((e) => (
                  <div className={`h-event${e.isAnchor ? " is-anchor" : ""}`} key={e.year}>
                    <div className="h-event-year">{e.year}</div>
                    <div className="h-event-dot" />
                    <div className="h-event-label">{e.label}</div>
                    <div className="h-event-tooltip">{e.tooltip}</div>
                  </div>
                ))}
              </div>
            </div>

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
