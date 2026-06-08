import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PortfolioMapEmbed } from "@/components/PortfolioMapEmbed";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Portfolio · Clara Vista Investment Partners",
  description:
    "Three clubs. Three leagues. One operating system. A geographically diversified portfolio of European football clubs unified by a single data-led operating model.",
};

type ClubStatus = "active" | "pending" | "diligence";

type PortfolioCard = {
  num: string;
  href: string;
  status: ClubStatus;
  statusLabel: string;
  /** Club crest asset key; null for embargoed / undisclosed targets. */
  logo: "ipswich" | "frosinone" | null;
  name: ReactNode;
  loc: string;
  note: ReactNode;
  founded: ReactNode;
  leagueLabel: string;
  leagueValue: ReactNode;
  link: string;
};

const CLUBS: PortfolioCard[] = [
  {
    num: "01 / Ipswich Town FC",
    href: "/portfolio/ipswich",
    status: "active",
    statusLabel: "Active",
    logo: "ipswich",
    name: "Ipswich Town",
    loc: "Ipswich · England · Premier League",
    note: (
      <>
        Anchor investment of Fund II. Held via the <em>Portman Holdings LLC</em> consortium alongside ORG Portfolio
        Management and the Three Lions Fund. Bob Gold sits on the board of Gamechanger 20 Ltd, the parent company of the
        club.
      </>
    ),
    founded: "1878",
    leagueLabel: "Investment",
    leagueValue: "Mar 2024",
    link: "View deep dive",
  },
  {
    num: "02 / Spain",
    href: "/portfolio/spain",
    status: "diligence",
    statusLabel: "Active diligence",
    logo: null,
    name: (
      <>
        Spain <em>(target)</em>
      </>
    ),
    loc: "Spain · La Liga",
    note: (
      <>
        A historic Spanish club in active diligence — La Liga is the second most-valuable football league in the world
        and the primary league for the 600M-strong Spanish-speaking market. <em>Details under embargo.</em>
      </>
    ),
    founded: <em>under embargo</em>,
    leagueLabel: "League",
    leagueValue: "La Liga",
    link: "View diligence brief",
  },
  {
    num: "03 / Frosinone Calcio",
    href: "/portfolio/frosinone",
    status: "active",
    statusLabel: "Active",
    logo: "frosinone",
    name: "Frosinone Calcio",
    loc: "Frosinone · Italy · Serie A",
    note: (
      <>
        Controlling investment via Clara Vista Frosinone SPV I. Promoted to Serie A in 2025/26 — a modern 16,227-seat
        stadium with concession through 2061, and three top-flight promotions in the last decade — one hour from Rome.
      </>
    ),
    founded: "1928",
    leagueLabel: "League",
    leagueValue: "Serie A",
    link: "View deep dive",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Topbar activeNav="portfolio" />
      <main className="cv-page portfolio-page portfolio-hub">
        <div className="portfolio-hero-banner">
          <div className="page-hero">
            <div className="page-hero-inner">
              <div>
                <div className="ph-eyebrow">Portfolio</div>
                <h1 className="ph-h1">
                  Three clubs. Three leagues. <em>One operating system.</em>
                </h1>
              </div>
              <p className="ph-intro">
                We invest in clubs with <em>untapped potential, asymmetric upside,</em> and clear pathways to
                transformative value. A geographically diversified portfolio of European clubs, unified by a single
                data-led operating model and disciplined capital deployment.
              </p>
            </div>
          </div>
          <div className="portfolio-map-embed" aria-hidden="true">
            <PortfolioMapEmbed />
          </div>
        </div>

        <div className="section bg-deep portfolio-hub-cards">
          <div className="section-inner">
            <div className="ps-grid">
              {CLUBS.map((c) => (
                <div key={c.num} className="club-card">
                  <div
                    className={`cc-logo${c.logo ? "" : " cc-logo-placeholder"}`}
                    aria-hidden={c.logo ? undefined : true}
                  >
                    {c.logo === "ipswich" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="/ipswich-town.svg" alt="Ipswich Town FC crest" />
                    ) : c.logo === "frosinone" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="/frosinone-calcio.png" alt="Frosinone Calcio crest" className="frosinone-crest" />
                    ) : null}
                  </div>
                  <div className="cc-meta">
                    <span className="cc-num">{c.num}</span>
                    <span className="cc-status">
                      <span className={`cc-dot ${c.status}`} aria-hidden="true" />
                      <span className="cc-status-text">{c.statusLabel}</span>
                    </span>
                  </div>
                  <div className="cc-name">{c.name}</div>
                  <div className="cc-location">{c.loc}</div>
                  <p className="cc-note">{c.note}</p>
                  <div className="cc-stats">
                    <div>
                      <div className="cc-stat-label">Founded</div>
                      <div className="cc-stat-value">{c.founded}</div>
                    </div>
                    <div>
                      <div className="cc-stat-label">{c.leagueLabel}</div>
                      <div className="cc-stat-value">{c.leagueValue}</div>
                    </div>
                  </div>
                  <Link href={c.href} className="cc-link">
                    {c.link}
                  </Link>
                </div>
              ))}
            </div>

            <div className="cta-row">
              <Link href="/thesis" className="cta-link">
                Read the thesis
              </Link>
              <a href="#" className="cta-link">
                Fund II terms
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
