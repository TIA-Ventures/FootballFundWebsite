import Link from "next/link";
import type { PortfolioClub } from "@/data/portfolioClubs";

export function PortfolioClubGrid({ clubs }: { clubs: PortfolioClub[] }) {
  return (
    <div className="ps-grid">
      {clubs.map((c) => (
        <div key={c.num} className="club-card">
          <div
            className={`cc-logo${c.logo ? "" : " cc-logo-placeholder"}`}
            aria-hidden={c.logo ? undefined : true}
          >
            {c.logo === "ipswich" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/ipswich-town.svg" alt="Ipswich Town FC crest" />
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
  );
}
