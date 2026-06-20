import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PortfolioClubGrid } from "@/components/PortfolioClubGrid";
import { PortfolioMapEmbed } from "@/components/PortfolioMapEmbed";
import { Topbar } from "@/components/Topbar";
import { PORTFOLIO_CLUBS } from "@/data/portfolioClubs";

export const metadata: Metadata = {
  title: "Portfolio · Clara Vista Investment Partners",
  description:
    "Three clubs. Three leagues. One proven strategy. A geographically diversified portfolio of European football clubs unified by a single data-led operating model.",
};

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
                  Three clubs. <em>One proven strategy.</em>
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
            <PortfolioClubGrid clubs={PORTFOLIO_CLUBS.hub} />

            <div className="cta-row">
              <Link href="/thesis" className="cta-link">
                Read the thesis
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
