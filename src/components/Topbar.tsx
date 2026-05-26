"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type NavKey =
  | "home"
  | "thesis"
  | "approach"
  | "portfolio"
  | "track-record"
  | "team"
  | null;

type TopbarProps = {
  /** Which nav item to render as active (subtle underline). */
  activeNav?: NavKey;
  /** Show the "Investment Partners · Football & Technology" tagline. Home only. */
  showTagline?: boolean;
};

export function Topbar({ activeNav = null, showTagline = false }: TopbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const onThemeToggle = () => {
    const cur = document.documentElement.dataset.theme || "day";
    document.documentElement.dataset.theme = cur === "day" ? "night" : "day";
  };

  const activeStyle: CSSProperties = { color: "var(--ivory)" };

  const closeMobile = () => setMobileOpen(false);

  const mobileLabel = useMemo(
    () => (mobileOpen ? "Close menu" : "Open menu"),
    [mobileOpen],
  );

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      const insideMenu = menuRef.current?.contains(target);
      const onToggle = toggleRef.current?.contains(target);
      if (!insideMenu && !onToggle) closeMobile();
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [mobileOpen]);

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
            <span className="brand-tagline">Investment Partners · Football &amp; Technology</span>
          </>
        ) : null}
      </Link>
      <div className="nav-area">
        <nav className="nav">
          <Link href="/" style={activeNav === "home" ? activeStyle : undefined}>
            Home
          </Link>
          <Link href="/team" style={activeNav === "team" ? activeStyle : undefined}>
            Team
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
              <Link href="/portfolio/italy" role="menuitem" className="npm-item">
                <span className="npm-flag" aria-hidden="true">
                  <span className="npm-dot npm-dot--target" />
                </span>
                <span className="npm-text">
                  <span className="npm-club">
                    Italy <em>(target)</em>
                  </span>
                  <span className="npm-meta">Serie A · Italy</span>
                </span>
              </Link>
              <span className="npm-divider" aria-hidden="true" />
              <Link href="/portfolio" role="menuitem" className="npm-all">
                <span>View all portfolio</span>
                <span className="npm-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <Link href="/thesis" style={activeNav === "thesis" ? activeStyle : undefined}>
            Thesis
          </Link>
          <Link href="/approach" style={activeNav === "approach" ? activeStyle : undefined}>
            Approach
          </Link>
          <a
            href="https://login.app.carta.com/credentials/login/"
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            LP Access
          </a>
        </nav>
        <button
          ref={toggleRef}
          className="mobile-menu-toggle"
          type="button"
          aria-label={mobileLabel}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d={mobileOpen ? "M6 6l12 12M18 6L6 18" : "M5 7h14M5 12h14M5 17h14"}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
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

      {mobileOpen ? (
        <div className="mobile-menu-backdrop" onClick={closeMobile} aria-hidden="true" />
      ) : null}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu${mobileOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="mobile-menu-inner">
          <Link href="/" className="mm-link" onClick={closeMobile} style={activeNav === "home" ? activeStyle : undefined}>
            Home
          </Link>
          <Link href="/team" className="mm-link" onClick={closeMobile} style={activeNav === "team" ? activeStyle : undefined}>
            Team
          </Link>
          <div className="mm-group">
            <Link
              href="/portfolio"
              className="mm-link"
              onClick={closeMobile}
              style={activeNav === "portfolio" ? activeStyle : undefined}
            >
              Portfolio
            </Link>
            <div className="mm-sub">
              <Link href="/portfolio/ipswich" className="mm-sublink" onClick={closeMobile}>
                Ipswich Town FC
              </Link>
              <Link href="/portfolio/spain" className="mm-sublink" onClick={closeMobile}>
                Spain <em>(target)</em>
              </Link>
              <Link href="/portfolio/italy" className="mm-sublink" onClick={closeMobile}>
                Italy <em>(target)</em>
              </Link>
            </div>
          </div>
          <Link
            href="/thesis"
            className="mm-link"
            onClick={closeMobile}
            style={activeNav === "thesis" ? activeStyle : undefined}
          >
            Thesis
          </Link>
          <Link
            href="/approach"
            className="mm-link"
            onClick={closeMobile}
            style={activeNav === "approach" ? activeStyle : undefined}
          >
            Approach
          </Link>
          <a
            href="https://login.app.carta.com/credentials/login/"
            className="mm-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
          >
            LP Access
          </a>
        </div>
      </div>
    </header>
  );
}
