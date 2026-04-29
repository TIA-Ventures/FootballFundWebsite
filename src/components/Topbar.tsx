"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

type NavKey = "home" | "thesis" | "portfolio" | "team" | null;

type TopbarProps = {
  /** Which nav item to render as active (subtle underline). */
  activeNav?: NavKey;
  /** Show the "Investment Partners · Football & Technology Fund II" tagline. Home only. */
  showTagline?: boolean;
};

export function Topbar({ activeNav = null, showTagline = false }: TopbarProps) {
  const onThemeToggle = () => {
    const cur = document.documentElement.dataset.theme || "day";
    document.documentElement.dataset.theme = cur === "day" ? "night" : "day";
  };

  const activeStyle: CSSProperties = { color: "var(--ivory)" };

  return (
    <header className="topbar">
      <Link href="/" className="brand" aria-label="Clara Vista — Home">
        <span className="brand-mark" />
        <span className="brand-wordmark">
          CLARA <span>VISTA</span>
        </span>
        {showTagline ? (
          <>
            <span className="brand-divider" />
            <span className="brand-tagline">Investment Partners · Football &amp; Technology Fund II</span>
          </>
        ) : null}
      </Link>
      <div className="nav-area">
        <nav className="nav">
          <Link href="/" style={activeNav === "home" ? activeStyle : undefined}>
            Home
          </Link>
          <Link href="/thesis" style={activeNav === "thesis" ? activeStyle : undefined}>
            Thesis
          </Link>
          <div
            className={`nav-portfolio${activeNav === "portfolio" ? " is-active" : ""}`}
          >
            <Link
              href="/portfolio"
              className="nav-portfolio-trigger"
              style={activeNav === "portfolio" ? activeStyle : undefined}
              aria-haspopup="menu"
            >
              Portfolio
              <svg
                className="nav-portfolio-caret"
                viewBox="0 0 12 12"
                aria-hidden="true"
              >
                <path
                  d="M3 4.5 6 7.5 9 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <div className="nav-portfolio-menu" role="menu" aria-label="Portfolio clubs">
              <Link href="/portfolio/ipswich" role="menuitem" className="npm-item">
                <span className="npm-flag" aria-hidden="true">
                  <span className="npm-dot" />
                </span>
                <span className="npm-text">
                  <span className="npm-club">Ipswich Town FC</span>
                  <span className="npm-meta">Premier League · England</span>
                </span>
              </Link>
              <Link href="/portfolio/italy" role="menuitem" className="npm-item">
                <span className="npm-flag" aria-hidden="true">
                  <span className="npm-dot npm-dot--target" />
                </span>
                <span className="npm-text">
                  <span className="npm-club">
                    Italy <em>(target)</em>
                  </span>
                  <span className="npm-meta">Serie B · Italy</span>
                </span>
              </Link>
              <Link href="/portfolio/spain" role="menuitem" className="npm-item">
                <span className="npm-flag" aria-hidden="true">
                  <span className="npm-dot npm-dot--target" />
                </span>
                <span className="npm-text">
                  <span className="npm-club">
                    Spain <em>(target)</em>
                  </span>
                  <span className="npm-meta">La Liga · Spain</span>
                </span>
              </Link>
              <span className="npm-divider" aria-hidden="true" />
              <Link href="/portfolio" role="menuitem" className="npm-all">
                <span>View all portfolio</span>
                <span className="npm-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <Link href="/team" style={activeNav === "team" ? activeStyle : undefined}>
            Team
          </Link>
          <a href="#" className="nav-cta">
            LP Access
          </a>
        </nav>
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
          type="button"
        >
          <svg
            className="icon-night"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6.5 6.5 0 1 0 9 9 9 9 0 0 1-9-9z" />
          </svg>
          <svg
            className="icon-day"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </button>
      </div>
    </header>
  );
}
