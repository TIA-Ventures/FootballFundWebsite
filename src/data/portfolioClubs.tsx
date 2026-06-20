import type { ReactNode } from "react";

export type ClubStatus = "active" | "pending" | "diligence";

export type PortfolioClub = {
  num: string;
  href: string;
  status: ClubStatus;
  statusLabel: string;
  logo: "ipswich" | null;
  name: ReactNode;
  loc: string;
  note: ReactNode;
  founded: ReactNode;
  leagueLabel: string;
  leagueValue: ReactNode;
  link: string;
};

export const PORTFOLIO_CLUBS: Record<"home" | "hub", PortfolioClub[]> = {
  hub: [
    {
      num: "1 / Ipswich Town FC",
      href: "/portfolio/ipswich",
      status: "active",
      statusLabel: "Active",
      logo: "ipswich",
      name: "Ipswich Town",
      loc: "Ipswich · England · Premier League",
      note: (
        <>
          Controlling shareholder, Ipswich is the anchor investment of Fund II. Held via the{" "}
          <em>Portman Holdings LLC</em> consortium alongside ORG Portfolio Management and the Three Lions Fund. Bob
          Gold sits on the board of Gamechanger 20 Ltd, the parent company of the club.
        </>
      ),
      founded: "1878",
      leagueLabel: "Investment",
      leagueValue: "Mar 2024",
      link: "View deep dive",
    },
    {
      num: "2 / Italy",
      href: "/portfolio/italy",
      status: "diligence",
      statusLabel: "To Be Announced",
      logo: null,
      name: <>Italy</>,
      loc: "Italy · Serie A",
      note: (
        <>
          A football opportunity in Italy&apos;s Serie A — one of the most storied top-flight leagues in world
          football. <em>Details TBA.</em>
        </>
      ),
      founded: <em>TBA</em>,
      leagueLabel: "League",
      leagueValue: "Serie A",
      link: "View brief",
    },
    {
      num: "3 / Spain",
      href: "/portfolio/spain",
      status: "diligence",
      statusLabel: "To Be Announced",
      logo: null,
      name: <>Spain</>,
      loc: "Spain · La Liga",
      note: (
        <>
          A historic Spanish club — La Liga is the second most-valuable football league in the world and the primary
          league for the 600M-strong Spanish-speaking market. <em>Details TBA.</em>
        </>
      ),
      founded: <em>TBA</em>,
      leagueLabel: "League",
      leagueValue: "La Liga",
      link: "View brief",
    },
  ],
  home: [
    {
      num: "1 / Ipswich Town FC",
      href: "/portfolio/ipswich",
      status: "active",
      statusLabel: "Active",
      logo: "ipswich",
      name: "Ipswich Town",
      loc: "Ipswich · England · Premier League",
      note: (
        <>
          Controlling shareholder, Ipswich is the anchor investment of Fund II. Held via the <em>Portman Holdings LLC</em>{" "}
          consortium alongside ORG Portfolio Management and the Three Lions Fund. Back-to-back promotions to the Premier
          League — among the highest player value creation in global football in 2024/25.
        </>
      ),
      founded: "1878",
      leagueLabel: "League",
      leagueValue: "Premier League",
      link: "View deep dive",
    },
    {
      num: "2 / Italy",
      href: "/portfolio/italy",
      status: "diligence",
      statusLabel: "To Be Announced",
      logo: null,
      name: <>Italy</>,
      loc: "Italy · Serie A",
      note: (
        <>
          A football opportunity in Italy&apos;s Serie A — one of the most storied top-flight leagues in world football.{" "}
          <em>Details TBA.</em>
        </>
      ),
      founded: <em>TBA</em>,
      leagueLabel: "League",
      leagueValue: "Serie A",
      link: "View brief",
    },
    {
      num: "3 / Spain",
      href: "/portfolio/spain",
      status: "diligence",
      statusLabel: "To Be Announced",
      logo: null,
      name: <>Spain</>,
      loc: "Spain · La Liga",
      note: (
        <>
          A historic Spanish club — La Liga is the second most valuable football league in the world, primary league for
          the 600M-strong Spanish-speaking market, with mid-table valuations trading well below European peers.{" "}
          <em>Details TBA.</em>
        </>
      ),
      founded: <em>TBA</em>,
      leagueLabel: "League",
      leagueValue: "La Liga",
      link: "View brief",
    },
  ],
};
