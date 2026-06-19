"use client";

import Link from "next/link";
import { HeroVideoBackdrop } from "./HeroVideoBackdrop";

export function HomeHero() {
  return (
    <>
      <section className="hero home-hero">
        <HeroVideoBackdrop />

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
            <span className="home-platform-banner-accent">data-driven sports investment platform</span>{" "}
            built to generate asymmetric outcomes. We invest behind strong tailwinds and partner with
            winning organizations to achieve{" "}
            <strong>excellence across every dimension of performance.</strong>
          </p>
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="ps-head">
          <div>
            <div className="ps-eyebrow">Portfolio</div>
            <h2>Three clubs. One operating system.</h2>
          </div>
        </div>
        <div className="ps-grid">
          <div className="club-card">
            <div className="cc-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ipswich-town.svg" alt="Ipswich Town FC crest" />
            </div>
            <div className="cc-meta">
              <span className="cc-num">1 / Ipswich Town FC</span>
              <span className="cc-status">
                <span className="cc-dot active" aria-hidden="true" />
                <span className="cc-status-text">Active</span>
              </span>
            </div>
            <div className="cc-name">Ipswich Town</div>
            <div className="cc-location">Ipswich · England · Premier League</div>
            <p className="cc-note">
              Controlling shareholder, Ipswich is the anchor investment of Fund II. Held via the{" "}
              <em>Portman Holdings LLC</em> consortium alongside ORG Portfolio Management and the Three Lions Fund.
              Back-to-back promotions to the Premier League — among the highest player value creation in global
              football in 2024/25.
            </p>
            <div className="cc-stats">
              <div>
                <div className="cc-stat-label">Founded</div>
                <div className="cc-stat-value">1878</div>
              </div>
              <div>
                <div className="cc-stat-label">League</div>
                <div className="cc-stat-value">Premier League</div>
              </div>
            </div>
            <Link href="/portfolio/ipswich" className="cc-link">
              View deep dive
            </Link>
          </div>
          <div className="club-card">
            <div className="cc-logo cc-logo-placeholder" aria-hidden="true" />
            <div className="cc-meta">
              <span className="cc-num">2 / Italy</span>
              <span className="cc-status">
                <span className="cc-dot diligence" aria-hidden="true" />
                <span className="cc-status-text">Confidential</span>
              </span>
            </div>
            <div className="cc-name">
              Italy <em>(target)</em>
            </div>
            <div className="cc-location">Italy · Serie A</div>
            <p className="cc-note">
              A football opportunity in Italy&apos;s Serie A — one of the most storied top-flight leagues in world
              football. <em>Details TBA.</em>
            </p>
            <div className="cc-stats">
              <div>
                <div className="cc-stat-label">Founded</div>
                <div className="cc-stat-value">
                  <em>TBA</em>
                </div>
              </div>
              <div>
                <div className="cc-stat-label">League</div>
                <div className="cc-stat-value">Serie A</div>
              </div>
            </div>
            <Link href="/portfolio/italy" className="cc-link">
              View brief
            </Link>
          </div>
          <div className="club-card">
            <div className="cc-logo cc-logo-placeholder" aria-hidden="true" />
            <div className="cc-meta">
              <span className="cc-num">3 / Spain</span>
              <span className="cc-status">
                <span className="cc-dot diligence" aria-hidden="true" />
                <span className="cc-status-text">Active diligence</span>
              </span>
            </div>
            <div className="cc-name">
              Spain <em>(target)</em>
            </div>
            <div className="cc-location">Spain · La Liga</div>
            <p className="cc-note">
              A historic Spanish club in active diligence — La Liga is the second most valuable football league in the
              world, primary league for the 600M-strong Spanish-speaking market, with mid-table valuations trading well
              below European peers. <em>Details TBA.</em>
            </p>
            <div className="cc-stats">
              <div>
                <div className="cc-stat-label">Founded</div>
                <div className="cc-stat-value">
                  <em>TBA</em>
                </div>
              </div>
              <div>
                <div className="cc-stat-label">League</div>
                <div className="cc-stat-value">La Liga</div>
              </div>
            </div>
            <Link href="/portfolio/spain" className="cc-link">
              View diligence brief
            </Link>
          </div>
        </div>
      </section>

      <section className="home-disclaimer" aria-label="Disclaimer">
        <div className="home-disclaimer-inner">
          <p>
            Clara Vista is regularly pursuing sports-focused investment opportunities in multiple
            markets, including the possible acquisition of interests in European football clubs.
          </p>
          <p>
            Clara Vista is also an investor in Ipswich Town FC, however, the firm is not pursuing a
            Multi-Club Ownership model (MCO). None of these investments will have any connection with
            Ipswich Town or Gamechanger 20, Ltd.
          </p>
        </div>
      </section>
    </>
  );
}
