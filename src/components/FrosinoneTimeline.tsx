import {
  ClubTimeline,
  type TimelineChapterBand,
  type TimelineEvent,
} from "./ClubTimeline";

export const FROSINONE_TIMELINE: TimelineEvent[] = [
  {
    year: "1928",
    chapter: "founding",
    label: "Club refounded",
    detail: "Frosinone Calcio begins its modern competitive history in Ciociaria, Lazio.",
  },
  {
    year: "1932",
    chapter: "founding",
    label: "Stadio Matusa opens",
    detail: "The municipal ground hosts the club for 85 years until Benito Stirpe.",
  },
  {
    year: "1966",
    chapter: "founding",
    label: "Serie C promotion",
    detail: "First climb into the third tier after winning Serie D.",
  },
  {
    year: "2004",
    chapter: "founding",
    label: "Serie C1 champions",
    detail: "Second Serie C2 title — platform for the climb toward Serie B.",
  },
  {
    year: "2006",
    chapter: "golden",
    label: "Serie B debut",
    detail: "First season in the second tier after decades in the lower divisions.",
  },
  {
    year: "2015",
    chapter: "golden",
    hero: true,
    label: (
      <>
        First <em>Serie A</em> promotion
      </>
    ),
    detail: "3–1 over Crotone on 16 May — historic top-flight debut after 87 years.",
  },
  {
    year: "2016",
    chapter: "golden",
    label: "Relegated",
    detail: "One season in Serie A; immediate return to Serie B.",
  },
  {
    year: "2017",
    chapter: "golden",
    hero: true,
    label: (
      <>
        <em>Benito Stirpe</em> opens
      </>
    ),
    detail: "Modern 16,227-seat stadium completed — club-owned, concession through 2061.",
  },
  {
    year: "2018",
    chapter: "modern",
    label: "Returns to Serie A",
    detail: "Second promotion via Serie B play-offs under the Stirpe family.",
  },
  {
    year: "2023",
    chapter: "modern",
    hero: true,
    label: (
      <>
        <em>Serie B</em> champions
      </>
    ),
    detail: "80 points and a record 24 wins — third Serie A promotion.",
  },
  {
    year: "2024",
    chapter: "modern",
    label: "Relegated",
    detail: "Brief Serie A spell; immediate rebuild in Serie B.",
  },
  {
    year: "2025/26",
    chapter: "modern",
    hero: true,
    label: (
      <>
        Promoted to <em>Serie A</em>
      </>
    ),
    detail: "Fourth top-flight promotion — back in Serie A after one season down.",
  },
  {
    year: "May 2026",
    chapter: "modern",
    isAnchor: true,
    label: (
      <>
        <em>Clara Vista</em> invests
      </>
    ),
    detail: "Controlling stake via Clara Vista Frosinone SPV I.",
  },
];

const FROSINONE_CHAPTER_BANDS: TimelineChapterBand[] = [
  { chapter: "founding", label: "Foundations", years: "1928 — 2004", start: 0, end: 4 },
  { chapter: "golden", label: "Ascent", years: "2006 — 2017", start: 4, end: 8 },
  { chapter: "modern", label: "Promotions & Control", years: "2018 — present", start: 8, end: 13 },
];

export function FrosinoneTimeline() {
  return (
    <ClubTimeline
      events={FROSINONE_TIMELINE}
      chapterBands={FROSINONE_CHAPTER_BANDS}
      ariaLabel="Frosinone Calcio club history timeline"
      reversed
    />
  );
}
