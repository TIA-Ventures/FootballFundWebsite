import Link from "next/link";
import { PORTFOLIO_CLUBS } from "@/data/portfolioClubs";
import { PortfolioClubGrid } from "@/components/PortfolioClubGrid";
import { HomeHeroVideo } from "@/components/HomeHeroVideo";

export function HomeHero() {
  return (
    <>
      <section className="hero home-hero">
        <HomeHeroVideo />

        <div className="hero-bottom">
          <div className="hero-headline">
            <h1 className="headline-manifesto" aria-label="We invest. We build. We win.">
              <span className="headline-we">WE</span>{" "}
              <span className="headline-verb">INVEST.</span>
              <br />
              <span className="headline-we">WE</span>{" "}
              <span className="headline-verb">BUILD.</span>
              <br />
              <span className="headline-we">WE</span>{" "}
              <span className="headline-verb">WIN.</span>
            </h1>
            <p className="headline-lead">
              We own exceptional football teams across the world in the most valuable leagues.
            </p>
            <div className="hero-actions">
              <Link href="/approach" className="hero-cta hero-cta--primary">
                Our Approach
              </Link>
              <Link href="#portfolio" className="hero-cta hero-cta--secondary">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-platform-banner" aria-label="About Clara Vista">
        <div className="home-platform-banner-inner">
          <p>
            Clara Vista is a{" "}
            <span className="home-platform-banner-accent">data-driven sports investment platform</span> built to
            generate asymmetric outcomes. We invest behind strong tailwinds and partner with winning organizations to
            achieve <strong>excellence across every dimension of performance.</strong>
          </p>
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="ps-head">
          <div>
            <div className="ps-eyebrow">Portfolio</div>
            <h2>Three clubs. One proven strategy.</h2>
          </div>
        </div>
        <PortfolioClubGrid clubs={PORTFOLIO_CLUBS.home} />
      </section>

      <section className="home-disclaimer" aria-label="Disclaimer">
        <div className="home-disclaimer-inner">
          <p>
            Clara Vista is regularly pursuing sports-focused investment opportunities in multiple markets, including the
            possible acquisition of interests in European football clubs.
          </p>
          <p>
            Clara Vista is also an investor in Ipswich Town FC, however, the firm is not pursuing a Multi-Club Ownership
            model (MCO). None of these investments will have any connection with Ipswich Town or Gamechanger 20, Ltd.
          </p>
        </div>
      </section>
    </>
  );
}
