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
          Spain <em>(target).</em>
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
            The diligence target is a historic Spanish club competing in <em>La Liga</em>, the{" "}
            <strong>second most-valuable football league in the world</strong> and the primary league for the global
            Spanish-speaking market — roughly <strong>600M</strong> people. In several international markets the league's
            aggregate <strong>social footprint competes with the Premier League</strong> for attention.
          </>,
          <>
            Mid-table La Liga clubs historically trade at meaningful discounts to comparable English Championship and
            Italian Serie A clubs — despite competing in a higher-value league with a larger total addressable audience.
            Published <strong>league-wide revenue multiples (~5.3×)</strong> are skewed by Real Madrid and Barcelona
            (enterprise values of <strong>~€6.3B</strong> and <strong>~€5B</strong>);{" "}
            <strong>mid- and lower-table</strong> names often print closer to <strong>2–2.5×</strong> revenues. Clara
            Vista views residual mispricing as closing through media rights renegotiation, US audience monetization, and
            ongoing club-level operating professionalization.
          </>,
          <>
            The <strong>LaLiga–CVC</strong> partnership (2021, <strong>~€1.9B</strong>) directs roughly{" "}
            <strong>70%</strong> of its mandate to <strong>stadium and digital infrastructure</strong> — raising the
            quality of the asset base across the league. Recent seasons brought <strong>16M+</strong> fans through the
            turnstiles in a single campaign, underscoring the depth of domestic demand.
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
