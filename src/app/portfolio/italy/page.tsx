import type { Metadata } from "next";
import { TbdClubPage } from "@/components/TbdClubPage";

export const metadata: Metadata = {
  title: "Italy (target) · Portfolio · Clara Vista Investment Partners",
  description:
    "Clara Vista is conducting diligence on a controlling interest in a historic Italian football club competing in Serie B with a credible path to Serie A.",
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
      sub="Active diligence on a historic Italian club — Serie B with a credible path to Serie A."
      sideMeta={[
        { label: "Country", value: "Italy" },
        { label: "League", value: "Serie B" },
        { label: "Founded", value: <em>under embargo</em> },
        { label: "Stadium", value: <em>under embargo</em> },
        { label: "Stake", value: "Controlling (~80%)" },
        { label: "Status", value: "Active diligence" },
      ]}
      banner={{
        eyebrow: "Active diligence",
        body: (
          <>
            Clara Vista is conducting diligence on a controlling interest in a historic Italian club.{" "}
            <em>Details remain under embargo.</em>
          </>
        ),
      }}
      prose={{
        eyebrow: "Diligence brief",
        paragraphs: [
          <>
            The diligence target is a historic Italian football club currently competing in <em>Serie B</em>, with three Serie A
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
            Specific club identity, financial position, and proposed deal structure remain{" "}
            <span className="em-dash">— under embargo —</span> until diligence concludes and an Investment Committee
            decision is reached.
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
