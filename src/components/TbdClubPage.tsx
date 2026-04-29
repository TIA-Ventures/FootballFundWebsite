import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "./Footer";
import { Topbar } from "./Topbar";

export type SideMetaRow = { label: string; value: ReactNode };
export type WhyBullet = { strong: string; rest: string };

export type TbdClubPageProps = {
  breadcrumbCurrent: string;
  h1: ReactNode;
  sub: string;
  sideMeta: SideMetaRow[];
  banner: {
    eyebrow: string;
    body: ReactNode;
  };
  prose: {
    eyebrow: string;
    paragraphs: ReactNode[];
  };
  why: {
    eyebrow: string;
    h2: ReactNode;
    deck: string;
    bullets: WhyBullet[];
  };
};

export function TbdClubPage(props: TbdClubPageProps) {
  return (
    <>
      <Topbar activeNav="portfolio" />
      <main className="cv-page portfolio-page">
        <div className="deep-hero">
          <div className="deep-hero-inner">
            <div className="breadcrumb">
              <Link href="/portfolio">Portfolio</Link>
              <span className="sep">/</span>
              <span className="current">{props.breadcrumbCurrent}</span>
            </div>
            <div className="deep-meta">
              <div>
                <h1 className="deep-h1">{props.h1}</h1>
                <p className="deep-sub">{props.sub}</p>
              </div>
              <div className="deep-side-meta">
                {props.sideMeta.map((row) => (
                  <div className="deep-side-row" key={row.label}>
                    <span className="label">{row.label}</span>
                    <span className="value">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="embargo-banner">
              <div className="embargo-icon" aria-hidden="true" />
              <div className="embargo-text">
                <strong>{props.banner.eyebrow}</strong>
                {props.banner.body}
              </div>
            </div>
          </div>
        </div>

        <div className="prose-section">
          <div className="prose-inner">
            <div className="prose-eyebrow">{props.prose.eyebrow}</div>
            <div className="prose-body">
              {props.prose.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="section bg-deep">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">{props.why.eyebrow}</div>
                <h2 className="sh-h2">{props.why.h2}</h2>
              </div>
              <p className="sh-deck">{props.why.deck}</p>
            </div>
            <ul className="bullet-list">
              {props.why.bullets.map((b) => (
                <li key={b.strong}>
                  <strong>{b.strong}</strong> — {b.rest}
                </li>
              ))}
            </ul>
            <div className="cta-row">
              <Link href="/portfolio" className="cta-link">
                Back to portfolio
              </Link>
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
