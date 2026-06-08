"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* ============================================================
   Track Record data model
   ----------------------------------------------------------------
   Combines Clara Vista (PE, controlling stakes in European football)
   and TIA Ventures (VC, early-stage technology). Fund vintage,
   status and acquirer mapped from the partnership's Fund I/II/III
   schedules; descriptions and CEOs from tiaventures.com/companies;
   company URLs scraped from the same source (or web-verified for
   the three not linked there).
   ============================================================ */

type Firm = "TIA" | "ClaraVista";
type FundSlug = "tia-i" | "tia-ii" | "tia-iii" | "cv-i";
type Status = "Active" | "Realized" | "Diligence";
type SectorSlug =
  | "football"
  | "consumer"
  | "saas"
  | "hospitality"
  | "marketing"
  | "real-estate"
  | "healthcare"
  | "media-sports"
  | "data-ai";

type Investment = {
  name: string;
  firm: Firm;
  funds: FundSlug[];
  status: Status;
  sector: SectorSlug;
  description: string;
  /** External company website. */
  url?: string;
  /** Internal page (used for Clara Vista clubs). */
  href?: string;
  /** Founder/CEO for TIA portfolio companies. */
  ceo?: string;
  /** League + country for Clara Vista clubs. */
  league?: string;
  /** Acquirer for realized investments. */
  acquiredBy?: string;
  /** Logo asset in /public/track-record/. Pass a bare slug for ".png", or include
   *  an explicit extension (e.g. "ipswich.svg") for non-PNG assets. Omit for the
   *  monogram fallback. */
  logo?: string;
};

const SECTORS: { id: SectorSlug; label: string }[] = [
  { id: "football", label: "European Football" },
  { id: "consumer", label: "Consumer" },
  { id: "saas", label: "B2B SaaS" },
  { id: "hospitality", label: "Hospitality & Food" },
  { id: "marketing", label: "Sales & Marketing" },
  { id: "real-estate", label: "Real Estate & Industrial" },
  { id: "healthcare", label: "Healthcare" },
  { id: "media-sports", label: "Media & Sports" },
  { id: "data-ai", label: "Data & AI" },
];

const FUND_LABEL: Record<FundSlug, string> = {
  "tia-i": "Fund I",
  "tia-ii": "Fund II",
  "tia-iii": "Fund III",
  "cv-i": "Fund II",
};

const FIRM_TABS: { id: "all" | Firm; label: string; sub?: string }[] = [
  { id: "all", label: "All Funds" },
  { id: "ClaraVista", label: "Clara Vista", sub: "PE" },
  { id: "TIA", label: "TIA Ventures", sub: "VC" },
];

const INVESTMENTS: Investment[] = [
  // ---------- Clara Vista — PE, controlling stakes ----------
  {
    name: "Ipswich Town FC",
    firm: "ClaraVista",
    funds: ["cv-i"],
    status: "Active",
    sector: "football",
    description:
      "Anchor investment of Fund II — held via the Portman Holdings LLC consortium. Back-to-back promotions to the Premier League and the highest player value creation in global football in 2024/25.",
    href: "/portfolio/ipswich",
    league: "Premier League · England",
    logo: "ipswich.svg",
  },
  {
    name: "Spain (target)",
    firm: "ClaraVista",
    funds: ["cv-i"],
    status: "Diligence",
    sector: "football",
    description:
      "A historic Spanish club in active diligence — La Liga is the second-most valuable football league in the world. Details under embargo.",
    href: "/portfolio/spain",
    league: "La Liga · Spain",
  },
  {
    name: "Frosinone Calcio",
    firm: "ClaraVista",
    funds: ["cv-i"],
    status: "Active",
    sector: "football",
    description:
      "Controlling investment via Clara Vista Frosinone SPV I — promoted to Serie A in 2025/26, modern Serie A-ready stadium, and three top-flight promotions in the last decade.",
    href: "/portfolio/frosinone",
    league: "Serie A · Italy",
    logo: "frosinone-calcio.png",
  },

  // ---------- TIA Ventures — VC, alphabetical ----------
  {
    name: "Ackwest",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Active",
    sector: "data-ai",
    description:
      "Enterprise market-research platform delivering first-party data for faster business decisions.",
    ceo: "Hugh Davis & Keith Price",
    url: "https://ackwest.com",
    logo: "ackwest",
  },
  {
    name: "Aldoa",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Active",
    sector: "saas",
    description:
      "All-in-one platform that streamlines operations for environmental consulting firms.",
    ceo: "Adam Lowentheil",
    url: "https://www.aldoa.com",
    logo: "aldoa",
  },
  {
    name: "ARC",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Active",
    sector: "consumer",
    description:
      "Mobile-phone charging kiosks for retailers — lifting in-store dwell time and consumer spend.",
    ceo: "Doug Baldasare",
    url: "https://experiencearc.com",
    logo: "arc",
  },
  {
    name: "Audicus",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Active",
    sector: "healthcare",
    description:
      "Direct-to-consumer hearing aids at a fraction of the in-clinic price.",
    ceo: "Patrick Freuler",
    url: "https://www.audicus.com",
    logo: "audicus",
  },
  {
    name: "Balto",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Active",
    sector: "marketing",
    description:
      "AI platform giving telephone sales reps real-time coaching during live calls.",
    ceo: "Marc Bernstein",
    url: "https://www.baltosoftware.com",
    logo: "balto",
  },
  {
    name: "BentoBox",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Realized",
    sector: "hospitality",
    description:
      "Operations and marketing platform that helps restaurants drive direct revenue.",
    ceo: "Krystle Mobayeni",
    url: "https://getbento.com",
    logo: "bentobox",
    acquiredBy: "Fiserv",
  },
  {
    name: "Bevi",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Active",
    sector: "hospitality",
    description:
      "Connected beverage machines replacing the bottled-water supply chain in offices.",
    ceo: "Sean Grundy",
    url: "https://www.bevi.co",
    logo: "bevi",
  },
  {
    name: "Bite",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Active",
    sector: "hospitality",
    description:
      "Self-ordering touchscreen kiosks that lower restaurant costs and lift average ticket.",
    ceo: "Brandon Barton",
    url: "https://www.getbite.com/",
    logo: "bite",
  },
  {
    name: "BriefCatch",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Active",
    sector: "saas",
    description:
      "Cloud editor that helps lawyers tighten case documents, detect typos, refine sentences.",
    ceo: "Ross Guberman",
    url: "https://briefcatch.com",
    logo: "briefcatch",
  },
  {
    name: "Cognota",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Active",
    sector: "saas",
    description:
      "Operations platform for corporate L&D teams running large-scale upskilling programs.",
    ceo: "Ryan Austin",
    url: "https://cognota.com",
    logo: "cognota",
  },
  {
    name: "Connexient",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Realized",
    sector: "saas",
    description:
      "Indoor turn-by-turn navigation for large facilities — hospitals, airports, campuses.",
    ceo: "Mark Green",
    acquiredBy: "Everbridge",
  },
  {
    name: "Cookie",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Active",
    sector: "consumer",
    description:
      "Accounting, tax, and finance platform built for content creators.",
    ceo: "Nate Coughran",
    url: "https://cookiefinance.co",
    logo: "cookie",
  },
  {
    name: "Cquence",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Realized",
    sector: "media-sports",
    description:
      "Video creation platform helping editors find and assemble footage 10× faster.",
    ceo: "Larry Rosenzweig",
    url: "https://www.cquence.app",
    logo: "cquence",
    acquiredBy: "Spekit",
  },
  {
    name: "Eight Sleep",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Realized",
    sector: "healthcare",
    description:
      "Sleep technology that tracks biometric data and adjusts the bed itself in real time.",
    ceo: "Matteo Franceschetti",
    url: "https://eightsleep.com",
    logo: "eight-sleep",
  },
  {
    name: "Fermata",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Active",
    sector: "data-ai",
    description:
      "Data and analytics platform helping investigative agencies close cases faster.",
    ceo: "Amanda Van Goetz",
    url: "https://www.fermatadiscovery.com",
    logo: "fermata",
  },
  {
    name: "Gipper",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Active",
    sector: "media-sports",
    description:
      "Graphics and branding platform that gives sub-professional sports programs pro polish.",
    ceo: "Matthew Glick",
    url: "https://www.gipper.com",
    logo: "gipper",
  },
  {
    name: "Headcount365",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Active",
    sector: "saas",
    description:
      "Enterprise platform connecting Finance, HR, and Talent Acquisition for real-time headcount forecasting.",
    ceo: "Eric Guidice",
    url: "https://www.headcount365.com",
    logo: "headcount365",
  },
  {
    name: "Indify",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Active",
    sector: "media-sports",
    description:
      "Data research platform that surfaces the next breakout artists in music and entertainment.",
    ceo: "Keshav Garg",
    url: "https://indify.io",
    logo: "indify",
  },
  {
    name: "KidPass",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Realized",
    sector: "consumer",
    description:
      "Subscription service for parents to discover and book activities for their kids.",
    ceo: "Solomon Liou",
    url: "https://kidpass.com",
    logo: "kidpass",
    acquiredBy: "BEGiN",
  },
  {
    name: "Leal Health",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Realized",
    sector: "healthcare",
    description:
      "AI clinical-trial platform connecting cancer patients to pharma and physician treatment options.",
    ceo: "Tzvia Bader",
    url: "https://trialjectory.com",
    logo: "leal-health",
  },
  {
    name: "LeafLink",
    firm: "TIA",
    funds: ["tia-i", "tia-ii"],
    status: "Active",
    sector: "saas",
    description:
      "B2B marketplace connecting cannabis brands and retailers — the category's largest.",
    ceo: "Artie Minson",
    url: "https://leaflink.com",
    logo: "leaflink",
  },
  {
    name: "Marpipe",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Active",
    sector: "marketing",
    description:
      "Lets brands rapidly test and refine creative against large consumer panels.",
    ceo: "Daniel Pantelo",
    url: "https://www.marpipe.com",
    logo: "marpipe",
  },
  {
    name: "Moved",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Active",
    sector: "real-estate",
    description:
      "Personalised concierge marketplace for planning a residential move.",
    ceo: "Adam Pittenger",
    url: "https://moved.com",
    logo: "moved",
  },
  {
    name: "MutualMarkets",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Active",
    sector: "marketing",
    description:
      "AI-driven brand partnerships and campaigns connecting brands to authentic consumers.",
    ceo: "Alan & Eric Gould",
    url: "https://mutualmarkets.ai",
    logo: "mutualmarkets",
  },
  {
    name: "Ovation",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Active",
    sector: "hospitality",
    description:
      "Guest feedback platform turning restaurant reviews into measurable revenue.",
    ceo: "Zack Oates",
    url: "https://ovationup.com",
    logo: "ovation",
  },
  {
    name: "Picture Protection Service",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Realized",
    sector: "media-sports",
    description:
      "Creates, manages, and enforces copyrights for web-based creative works.",
    ceo: "Dan Levine",
    url: "http://www.pictureprotectionservice.com",
    logo: "pps",
  },
  {
    name: "Rally",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Active",
    sector: "saas",
    description:
      "CRM for user research, letting enterprises scale studies and ship better products.",
    ceo: "Oren Friedman",
    url: "https://www.rallyuxr.com",
    logo: "rally",
  },
  {
    name: "RentRedi",
    firm: "TIA",
    funds: ["tia-ii", "tia-iii"],
    status: "Active",
    sector: "real-estate",
    description:
      "Property management software built for the next generation of landlords.",
    ceo: "Ryan Barone",
    url: "https://rentredi.com",
    logo: "rentredi",
  },
  {
    name: "ShotQuality",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Active",
    sector: "media-sports",
    description:
      "Sports analytics platform delivering actionable insights to coaches and bettors.",
    ceo: "Simon Gerszberg",
    url: "https://shotquality.com",
    logo: "shotquality",
  },
  {
    name: "Sion",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Realized",
    sector: "saas",
    description:
      "Commission management software that lifts travel-agent profitability and efficiency.",
    ceo: "Irving Betesh",
    url: "https://sioncentral.com",
    logo: "sion",
  },
  {
    name: "Soil Connect",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Active",
    sector: "real-estate",
    description:
      "B2B marketplace solving inefficiencies in soil and aggregate handling for construction.",
    ceo: "Jonathan Alvarado",
    url: "https://www.soilconnect.com",
    logo: "soil-connect",
  },
  {
    name: "Steelhead",
    firm: "TIA",
    funds: ["tia-iii"],
    status: "Realized",
    sector: "real-estate",
    description: "End-to-end operations software for manufacturers, mobile-first.",
    ceo: "Jeff Halonen",
    url: "https://gosteelhead.com",
    logo: "steelhead",
  },
  {
    name: "Storyslab",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Realized",
    sector: "marketing",
    description:
      "Mobile-first sales enablement that lifts experience and conversion in field and remote sales.",
    ceo: "Hans Fuller",
    url: "https://www.storyslab.com",
    logo: "storyslab",
  },
  {
    name: "TapRM",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Active",
    sector: "hospitality",
    description:
      "Modern beer distributor giving craft brands an e-commerce and distribution channel.",
    ceo: "Jason Sherman",
    url: "https://taprm.com",
    logo: "taprm",
  },
  {
    name: "TeamSupport",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Realized",
    sector: "saas",
    description:
      "Enterprise software helping businesses run seamless customer support operations.",
    ceo: "Robert Johnson",
    url: "https://www.teamsupport.com",
    logo: "teamsupport",
    acquiredBy: "Level Equity",
  },
  {
    name: "TONE",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Realized",
    sector: "marketing",
    description:
      "SMS sales platform turning text conversations into measurable e-commerce revenue.",
    ceo: "Tivan Amour",
    logo: "tone",
    acquiredBy: "SaveMySales",
  },
  {
    name: "Trupoly",
    firm: "TIA",
    funds: ["tia-i"],
    status: "Realized",
    sector: "real-estate",
    description:
      "Investor Relationship Management software for real-estate firms — effortless document sharing.",
    ceo: "Ryan Smith",
    logo: "trupoly",
    acquiredBy: "American Realty Capital",
  },
  {
    name: "Vertoe",
    firm: "TIA",
    funds: ["tia-ii"],
    status: "Realized",
    sector: "consumer",
    description:
      "On-demand short-term luggage storage in cities — freedom from your bags.",
    ceo: "Sid Khattri",
    logo: "vertoe",
  },
];

type FirmFilter = "all" | Firm;
type SectorFilter = "all" | SectorSlug;

function StatusBadge({ status }: { status: Status }) {
  const label =
    status === "Active" ? "Active" : status === "Realized" ? "Realized" : "Diligence";
  return (
    <span className={`tr-status tr-status--${status.toLowerCase()}`}>
      <span className="tr-status-dot" aria-hidden="true" />
      <span className="tr-status-label">{label}</span>
    </span>
  );
}

function ExternalIcon() {
  return (
    <svg
      className="tr-card-link-icon"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10 10 4M5 4h5v5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrackRecord() {
  const [firm, setFirm] = useState<FirmFilter>("all");
  const [sector, setSector] = useState<SectorFilter>("all");

  /* Reset sector if it becomes empty when the firm changes. */
  const switchFirm = (next: FirmFilter) => {
    setFirm(next);
    setSector("all");
  };

  /* Firm-filtered base set (drives both sector chip list + grid). */
  const byFirm = useMemo(
    () => (firm === "all" ? INVESTMENTS : INVESTMENTS.filter((i) => i.firm === firm)),
    [firm],
  );

  /* Sector chips appear only for sectors that actually have entries
     in the firm-filtered set — avoids dead chips. */
  const visibleSectors = useMemo(() => {
    const set = new Set(byFirm.map((i) => i.sector));
    return SECTORS.filter((s) => set.has(s.id));
  }, [byFirm]);

  const sectorCounts = useMemo(() => {
    const map: Record<string, number> = { all: byFirm.length };
    for (const s of visibleSectors) {
      map[s.id] = byFirm.filter((i) => i.sector === s.id).length;
    }
    return map;
  }, [byFirm, visibleSectors]);

  const filtered = useMemo(
    () => (sector === "all" ? byFirm : byFirm.filter((i) => i.sector === sector)),
    [byFirm, sector],
  );

  const firmCounts = useMemo(
    () => ({
      all: INVESTMENTS.length,
      TIA: INVESTMENTS.filter((i) => i.firm === "TIA").length,
      ClaraVista: INVESTMENTS.filter((i) => i.firm === "ClaraVista").length,
    }),
    [],
  );

  return (
    <div className="tr-companies">
      {/* Primary tabs — firm (VC vs PE) */}
      <div className="tr-firmtabs" role="tablist" aria-label="Filter by firm">
        {FIRM_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={firm === t.id}
            className={`tr-firmtab${firm === t.id ? " is-active" : ""}`}
            onClick={() => switchFirm(t.id)}
          >
            <span className="tr-firmtab-main">
              <span className="tr-firmtab-label">{t.label}</span>
              {t.sub ? <span className="tr-firmtab-sub">· {t.sub}</span> : null}
            </span>
            <span className="tr-firmtab-count">{firmCounts[t.id]}</span>
          </button>
        ))}
      </div>

      {/* Secondary chips — sector. Only show sectors that exist in current firm set. */}
      {visibleSectors.length > 1 ? (
        <div className="tr-filters-wrap">
          <div
            className="tr-filters"
            role="tablist"
            aria-label="Filter portfolio companies by sector"
          >
            <button
              type="button"
              role="tab"
              aria-selected={sector === "all"}
              className={`tr-filter${sector === "all" ? " is-active" : ""}`}
              onClick={() => setSector("all")}
            >
              <span className="tr-filter-label">All sectors</span>
              <span className="tr-filter-count">{sectorCounts.all}</span>
            </button>
            {visibleSectors.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={sector === s.id}
                className={`tr-filter${sector === s.id ? " is-active" : ""}`}
                onClick={() => setSector(s.id)}
              >
                <span className="tr-filter-label">{s.label}</span>
                <span className="tr-filter-count">{sectorCounts[s.id]}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* Result count */}
      <div className="tr-resultcount" aria-live="polite">
        {filtered.length === 1
          ? "1 investment"
          : `${filtered.length} investments`}
      </div>

      <ul className="tr-grid">
        {filtered.map((inv) => {
          const sectorLabel = SECTORS.find((s) => s.id === inv.sector)?.label;
          const fundLabel = inv.funds.map((f) => FUND_LABEL[f]).join(" · ");
          const isExternal = !!inv.url;
          const isInternal = !!inv.href;

          const inner = (
            <>
              <header className="tr-card-head">
                <div className="tr-card-logo" aria-hidden="true">
                  {inv.logo ? (
                    <img
                      src={`/track-record/${inv.logo.includes(".") ? inv.logo : `${inv.logo}.png`}`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="tr-card-logo-mono">{inv.name.charAt(0)}</span>
                  )}
                </div>
                {isExternal || isInternal ? <ExternalIcon /> : null}
              </header>

              <div className="tr-card-tags">
                <span className="tr-card-sector">{sectorLabel}</span>
                <span className="tr-card-fund">{fundLabel}</span>
              </div>

              <h3 className="tr-card-name">{inv.name}</h3>
              <p className="tr-card-desc">{inv.description}</p>

              <footer className="tr-card-foot">
                <div className="tr-card-status-row">
                  <StatusBadge status={inv.status} />
                  {inv.acquiredBy ? (
                    <span className="tr-card-acq">Acq. {inv.acquiredBy}</span>
                  ) : null}
                </div>
                {inv.ceo ? (
                  <div className="tr-card-ceo">
                    <span className="tr-card-ceo-label">CEO</span>
                    <span className="tr-card-ceo-name">{inv.ceo}</span>
                  </div>
                ) : inv.league ? (
                  <div className="tr-card-ceo">
                    <span className="tr-card-ceo-label">League</span>
                    <span className="tr-card-ceo-name">{inv.league}</span>
                  </div>
                ) : null}
              </footer>
            </>
          );

          return (
            <li key={inv.name} className="tr-card">
              {inv.href ? (
                <Link href={inv.href} className="tr-card-link" aria-label={inv.name}>
                  {inner}
                </Link>
              ) : inv.url ? (
                <a
                  href={inv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tr-card-link"
                  aria-label={`${inv.name} — opens in new tab`}
                >
                  {inner}
                </a>
              ) : (
                <div className="tr-card-link tr-card-link--static">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
