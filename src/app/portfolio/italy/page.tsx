import type { Metadata } from "next";
import { TbdClubPage } from "@/components/TbdClubPage";

export const metadata: Metadata = {
  title: "Italy (target) · Portfolio · Clara Vista Investment Partners",
  description:
    "Clara Vista is in late-stage diligence on a controlling interest in a historic Italian football club competing in Serie B with a credible path to Serie A.",
};

export default function ItalyPage() {
  return (
    <TbdClubPage
      breadcrumbCurrent="Italy · target"
      h1={
        <>
          Italy <em>(target)</em> <em className="deep-h1-accent">.</em>
        </>
      }
      sub="Controlling interest in a historic Italian club — Serie B with a credible path to Serie A."
      sideMeta={[
        { label: "Country", value: "Italy" },
        { label: "League", value: "Serie B" },
        { label: "Founded", value: <em>under embargo</em> },
        { label: "Stadium", value: <em>under embargo</em> },
        { label: "Stake", value: "Controlling (~80%)" },
        { label: "Status", value: "Pending close" },
      ]}
      banner={{
        eyebrow: "Acquisition pending close",
        body: (
          <>
            Clara Vista is in late-stage diligence on a controlling interest in a historic Italian club.{" "}
            <em>Full disclosure will follow announcement.</em>
          </>
        ),
      }}
      prose={{
        eyebrow: "Deal preview",
        paragraphs: [
          <>
            The target is a historic Italian football club currently competing in <em>Serie B</em>, with three Serie A
            promotions in the last decade and one of the youngest squads in the league. The acquisition contemplates a
            controlling interest at approximately <strong>1.5x revenues</strong> — a structural discount to comparable
            European clubs.
          </>,
          <>
            The club operates a <em>modern Serie A-ready stadium</em> under long-dated concession, located within
            reasonable distance of a major metropolitan media market. Geographic, infrastructure, and on-pitch factors
            combine to create a credible path to Serie A and to enterprise-value re-rating.
          </>,
          <>
            Detailed deal terms — including final purchase price, capital structure, management arrangements, and
            post-close operating plan — remain{" "}
            <span className="em-dash">— under embargo until close —</span> and will be disclosed in the Investment
            Committee close memo.
          </>,
        ],
      }}
      why={{
        eyebrow: "Why Italy",
        h2: (
          <>
            A European market <em>at an inflection.</em>
          </>
        ),
        deck:
          "Serie A is the third-largest European football league by revenue, with structural tailwinds from media-rights renegotiation, stadium modernization, and international audience growth.",
        bullets: [
          {
            strong: "Promotion economics",
            rest:
              "Serie B → A promotion is associated with material multiple expansion and sustained revenue uplift.",
          },
          {
            strong: "Stadium modernization wave",
            rest:
              "Italian football is in the early innings of a stadium investment cycle that has driven valuations elsewhere in Europe.",
          },
          {
            strong: "Mid-table La Liga / Serie B mispricing",
            rest:
              "Historically depressed valuations for non-top-flight clubs are inconsistent with media rights trajectory.",
          },
          {
            strong: "Operating leverage",
            rest:
              "Well-run sporting and commercial functions can deliver 30–50% commercial uplift on a similar cost base.",
          },
        ],
      }}
    />
  );
}
