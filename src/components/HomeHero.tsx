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
            <div className="eyebrow">Data-Driven Sports Investment</div>
            <h1 className="headline">
              WE <em>INVEST.</em>
              <br />
              WE <em>BUILD.</em>
              <br />
              WE <em>WIN.</em>
            </h1>
            <p className="subhead">
              Owning exceptional football clubs in the world&apos;s most valuable leagues.
              We invest behind strong tailwinds and partner with winning organizations to achieve excellence across every dimension of
              performance.
            </p>
          </div>
        </div>
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="ps-head">
          <div>
            <div className="ps-eyebrow">001 · Active Portfolio</div>
            <h2>
              Three clubs. Three leagues. <em>One operating system.</em>
            </h2>
          </div>
        </div>
        <div className="ps-grid">
          <div className="club-card">
            <div className="cc-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ipswich-town.svg" alt="Ipswich Town FC crest" />
            </div>
            <div className="cc-meta">
              <span className="cc-num">01 / Ipswich Town FC</span>
              <span className="cc-status">
                <span className="cc-dot active" aria-hidden="true" />
                <span className="cc-status-text">Active</span>
              </span>
            </div>
            <div className="cc-name">Ipswich Town</div>
            <div className="cc-location">Ipswich · England</div>
            <p className="cc-note">
              Anchor investment of Fund I, with Clara Vista leading the $140M SPV to controlling interest in Q1 2026. Back-to-back
              promotions to the Premier League — one of the rarest feats in English football, and the highest player value creation
              in global football in 2024/25.
            </p>
            <div className="cc-stats">
              <div>
                <div className="cc-stat-label">Founded</div>
                <div className="cc-stat-value">1878</div>
              </div>
              <div>
                <div className="cc-stat-label">League</div>
                <div className="cc-stat-value">Championship</div>
              </div>
            </div>
            <Link href="/portfolio/ipswich" className="cc-link">
              View deep dive
            </Link>
          </div>
          <div className="club-card">
            <div className="cc-logo cc-logo-placeholder" aria-hidden="true" />
            <div className="cc-meta">
              <span className="cc-num">02 / Spain</span>
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
              A historic Spanish club in active diligence — La Liga is the second most valuable football league in the world, primary
              league for the 600M-strong Spanish-speaking market, with mid-table valuations trading well below European peers.{" "}
              <em>Details under embargo.</em>
            </p>
            <div className="cc-stats">
              <div>
                <div className="cc-stat-label">Founded</div>
                <div className="cc-stat-value">
                  <em>under embargo</em>
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
          <div className="club-card">
            <div className="cc-logo cc-logo-placeholder" aria-hidden="true" />
            <div className="cc-meta">
              <span className="cc-num">03 / Italy</span>
              <span className="cc-status">
                <span className="cc-dot diligence" aria-hidden="true" />
                <span className="cc-status-text">Active diligence</span>
              </span>
            </div>
            <div className="cc-name">
              Italy <em>(target)</em>
            </div>
            <div className="cc-location">Italy · Serie A</div>
            <p className="cc-note">
              A historic Italian club with a track record of recent Serie A promotions, a modern Serie A stadium, and one
              of the youngest squads in Serie A. <em>Details under embargo.</em>
            </p>
            <div className="cc-stats">
              <div>
                <div className="cc-stat-label">Founded</div>
                <div className="cc-stat-value">
                  <em>under embargo</em>
                </div>
              </div>
              <div>
                <div className="cc-stat-label">League</div>
                <div className="cc-stat-value">Serie A</div>
              </div>
            </div>
            <Link href="/portfolio/italy" className="cc-link">
              View diligence brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
