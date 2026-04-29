import type { Metadata } from "next";
import { TbdClubPage } from "@/components/TbdClubPage";

export const metadata: Metadata = {
  title: "Spain (target) · Portfolio · Clara Vista Investment Partners",
  description:
    "Clara Vista is conducting diligence on a controlling interest in a historic La Liga football club — gateway to a 600M-strong Spanish-speaking audience.",
};

export default function SpainPage() {
  return (
    <TbdClubPage
      breadcrumbCurrent="Spain · target"
      h1={
        <>
          Spain <em>(target)</em> <em className="deep-h1-accent">.</em>
        </>
      }
      sub="Active diligence on a historic La Liga club — gateway to a 600M-strong Spanish-speaking audience."
      sideMeta={[
        { label: "Country", value: "Spain" },
        { label: "League", value: "La Liga" },
        { label: "Founded", value: <em>under embargo</em> },
        { label: "Stadium", value: <em>under embargo</em> },
        { label: "Stake", value: <em>under embargo</em> },
        { label: "Status", value: "Active diligence" },
      ]}
      banner={{
        eyebrow: "Active diligence",
        body: (
          <>
            Clara Vista is conducting diligence on a controlling interest in a historic Spanish club.{" "}
            <em>Details remain under embargo.</em>
          </>
        ),
      }}
      prose={{
        eyebrow: "Diligence brief",
        paragraphs: [
          <>
            The diligence target is a historic Spanish club competing in <em>La Liga</em> — the gateway property for the
            global Spanish-speaking market and, by audience and rights value, the closest peer to the Premier League.
          </>,
          <>
            Our interest is grounded in a structural <strong>valuation asymmetry</strong>: outside Real Madrid and
            Barcelona, mid-table La Liga clubs print at meaningful discounts to English and Italian peers despite a
            larger addressable audience and a league-wide modernization cycle now underway.
          </>,
          <>
            Specific club identity, financial position, and proposed deal structure remain{" "}
            <span className="em-dash">— under embargo —</span> until diligence concludes and an Investment Committee
            decision is reached.
          </>,
        ],
      }}
      why={{
        eyebrow: "Why Spain",
        h2: (
          <>
            The largest <em>underowned</em> football market.
          </>
        ),
        deck:
          "Language-market scale, reinvestment in the physical and digital stack, skewed headline multiples, and a more open table than the Premier League — a constructive backdrop for disciplined operators.",
        bullets: [
          {
            strong: "Audience & reach",
            rest:
              "La Liga is the primary football property for ~600M Spanish speakers globally; in key regions its aggregate social audiences rival the Premier League for share of voice.",
          },
          {
            strong: "US distribution",
            rest:
              "ESPN-led US rights anchor direct access to the highest-value sports media market and a growing monetization path for Spanish football.",
          },
          {
            strong: "Valuation asymmetry",
            rest:
              "League-average revenue multiples (~5.3×) sit atop Real Madrid and Barcelona (~€6.3B and ~€5B enterprise values). Mid- and lower-table clubs often trade at 2–2.5× — a spread versus English and Italian peers we view as analytically sticky, not permanent.",
          },
          {
            strong: "League reinvestment",
            rest:
              "The ~€1.9B LaLiga–CVC partnership (2021) routes ~70% of its mandate to infrastructure and digital projects — a league-wide modernization tailwind for clubs below the top two.",
          },
          {
            strong: "Demand & competitive balance",
            rest:
              "16M+ stadium attendees in a single season evidences domestic depth of demand; greater week-to-week parity than the Premier League offers a clearer ascent narrative for well-run clubs targeting international audiences.",
          },
          {
            strong: "Operating cadence",
            rest:
              "Most clubs outside the duopoly remain family- or municipality-influenced — creating room for commercial, data, and corporate discipline without replicating English inflation.",
          },
        ],
      }}
    />
  );
}
