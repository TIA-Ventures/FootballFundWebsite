import type { Metadata } from "next";
import { TbdClubPage } from "@/components/TbdClubPage";

export const metadata: Metadata = {
  title: "Italy (target) · Portfolio · Clara Vista Investment Partners",
  description:
    "Clara Vista is evaluating a controlling interest in an Italian football club competing in Serie A. Details remain TBA.",
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
      sub="An Italian football opportunity in Serie A — details remain confidential while the process is underway."
      sideMeta={[
        { label: "Country", value: "Italy" },
        { label: "League", value: "Serie A" },
        { label: "Founded", value: <em>TBA</em> },
        { label: "Stadium", value: <em>TBA</em> },
        { label: "Stake", value: <em>TBA</em> },
        { label: "Status", value: "TBA" },
      ]}
      banner={{
        eyebrow: "Confidential",
        body: (
          <>
            Clara Vista is pursuing a football opportunity in Italy.{" "}
            <em>Details remain TBA.</em>
          </>
        ),
      }}
      prose={{
        eyebrow: "Brief",
        paragraphs: [
          <>
            The opportunity is an Italian club competing in <em>Serie A</em> — one of the most storied top-flight
            leagues in world football and a market with deep commercial and competitive heritage.
          </>,
          <>
            Our interest reflects the same operating thesis applied across the portfolio: data-led recruitment,
            disciplined wage structure, commercial modernization, and a player-trading engine designed to compound
            enterprise value.
          </>,
          <>
            Club identity, financial position, and proposed deal structure remain{" "}
            <span className="em-dash">— TBA —</span> until the process concludes.
          </>,
        ],
      }}
      why={{
        eyebrow: "Why Italy",
        h2: (
          <>
            A heritage market with <em>institutional upside.</em>
          </>
        ),
        deck:
          "Serie A combines a globally recognized league brand, a maturing media-rights cycle, and ownership tables that increasingly reward disciplined, data-led operators.",
        bullets: [
          {
            strong: "League heritage",
            rest:
              "Serie A is among the most decorated leagues in football history, with durable domestic demand and a recognizable global brand.",
          },
          {
            strong: "Media re-rating",
            rest:
              "An evolving media-rights and distribution cycle supports a step-change in club economics for well-run sides establishing themselves in the top flight.",
          },
          {
            strong: "Valuation discipline",
            rest:
              "Entry pricing in the Italian market can sit at meaningful discounts to English peers, creating asymmetry for operators who can compound revenue and on-pitch performance.",
          },
          {
            strong: "Operating edge",
            rest:
              "Clara Vista deploys the same proprietary recruitment and performance infrastructure used across the portfolio — bridging quantitative edge with local football culture.",
          },
        ],
      }}
    />
  );
}
