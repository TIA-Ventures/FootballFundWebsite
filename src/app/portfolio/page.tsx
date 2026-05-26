import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ClaraVistaMapLegacy } from "@/components/ClaraVistaMapLegacy";
import { Footer } from "@/components/Footer";
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
  /** Ipswich crest; Spain/Italy targets use reserved placeholder row (home club-card parity). */
  logo: "ipswich" | null;
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
    loc: "Ipswich · England · EFL Championship",
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
    num: "03 / Italy",
    href: "/portfolio/italy",
    status: "diligence",
    statusLabel: "Active diligence",
    logo: null,
    name: (
      <>
        Italy <em>(target)</em>
      </>
    ),
    loc: "Italy · Serie A",
    note: (
      <>
        A historic Italian club with a track record of recent Serie A promotions, modern infrastructure, and
        one of the youngest squads in Italian football. <em>Details under embargo.</em>
      </>
    ),
    founded: <em>under embargo</em>,
    leagueLabel: "League",
    leagueValue: "Serie A · target",
    link: "View diligence brief",
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
            <ClaraVistaMapLegacy embed />
          </div>
        </div>

        <div className="section portfolio-hub-cards">
          <div className="section-inner">
            <div className="portfolio-grid">
              {CLUBS.map((c) => (
                <Link key={c.num} href={c.href} className="pclub">
                  <div
                    className={`pclub-logo${c.logo ? "" : " pclub-logo-placeholder"}`}
                    aria-hidden={c.logo ? undefined : true}
                  >
                    {c.logo === "ipswich" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src="/ipswich-town.svg" alt="Ipswich Town FC crest" />
                    ) : null}
                  </div>
                  <div className="pclub-meta">
                    <span className="pclub-num">{c.num}</span>
                    <span className="pclub-status">
                      <span className={`pclub-dot ${c.status}`} />
                      {c.statusLabel}
                    </span>
                  </div>
                  <div className="pclub-name">{c.name}</div>
                  <div className="pclub-loc">{c.loc}</div>
                  <p className="pclub-note">{c.note}</p>
                  <div className="pclub-stats">
                    <div>
                      <div className="pclub-stat-label">Founded</div>
                      <div className="pclub-stat-value">{c.founded}</div>
                    </div>
                    <div>
                      <div className="pclub-stat-label">{c.leagueLabel}</div>
                      <div className="pclub-stat-value">{c.leagueValue}</div>
                    </div>
                  </div>
                  <div className="pclub-link">{c.link}</div>
                </Link>
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
