import {
  ClubTimeline,
  type TimelineChapterBand,
  type TimelineEvent,
} from "./ClubTimeline";

export type { TimelineChapter, TimelineEvent } from "./ClubTimeline";

export const IPSWICH_TIMELINE: TimelineEvent[] = [
  {
    year: "1878",
    chapter: "founding",
    label: "Club founded",
    detail: "Among the oldest clubs in English football. Based in Suffolk.",
  },
  {
    year: "1936",
    chapter: "founding",
    label: "Turns professional",
    detail: "Drops amateur status and enters the senior pyramid.",
  },
  {
    year: "1955",
    chapter: "golden",
    label: (
      <>
        Sir <em>Alf Ramsey</em> appointed
      </>
    ),
    detail: "England's future World Cup–winning manager takes charge.",
  },
  {
    year: "1961",
    chapter: "golden",
    label: "Second Division title",
    detail: "Ramsey leads promotion to the top flight.",
  },
  {
    year: "1962",
    chapter: "golden",
    hero: true,
    label: (
      <>
        <em>First Division</em> champions
      </>
    ),
    detail: "Top-flight title in their first season up.",
  },
  {
    year: "1969",
    chapter: "golden",
    label: (
      <>
        Sir <em>Bobby Robson</em> appointed
      </>
    ),
    detail: "Begins a 13-year tenure — the club's golden era.",
  },
  {
    year: "1978",
    chapter: "golden",
    hero: true,
    label: (
      <>
        <em>FA Cup</em> champions
      </>
    ),
    detail: "Beat Arsenal 1–0 at Wembley.",
  },
  {
    year: "1981",
    chapter: "golden",
    hero: true,
    label: (
      <>
        <em>UEFA Cup</em> champions
      </>
    ),
    detail: "The club's only European trophy.",
  },
  {
    year: "1982",
    chapter: "golden",
    label: "Robson → England",
    detail: "Departs to lead England to the 1990 World Cup semi-final.",
  },
  {
    year: "2018",
    chapter: "modern",
    label: "Drops to League One",
    detail: "Low point of a long decline.",
  },
  {
    year: "2023",
    chapter: "modern",
    label: "Up to Championship",
    detail: "First step of the back-to-back run.",
  },
  {
    year: "Mar 2024",
    chapter: "modern",
    isAnchor: true,
    label: (
      <>
        <em>Clara Vista</em> invests
      </>
    ),
    detail: "Initial investment in Gamechanger 20 Ltd.",
  },
  {
    year: "2024",
    chapter: "modern",
    hero: true,
    label: (
      <>
        Promoted to <em>Premier League</em>
      </>
    ),
    detail: "Back-to-back promotion — among English football's rarest feats.",
  },
  {
    year: "2024/25",
    chapter: "modern",
    label: "#1 player value",
    detail: "Highest player value creation in global football.",
  },
  {
    year: "Dec 2025",
    chapter: "modern",
    isAnchor: true,
    label: (
      <>
        <em>Consortium</em> takes control
      </>
    ),
    detail: "Portman Holdings LLC becomes majority shareholder.",
  },
];

const IPSWICH_CHAPTER_BANDS: TimelineChapterBand[] = [
  { chapter: "founding", label: "Foundations", years: "1878 — 1936", start: 0, end: 2 },
  { chapter: "golden", label: "Golden Era", years: "1955 — 1982", start: 2, end: 9 },
  { chapter: "modern", label: "Modern Rebuild", years: "2018 — present", start: 9, end: 15 },
];

type IpswichTimelineProps = {
  events?: TimelineEvent[];
};

export function IpswichTimeline({ events = IPSWICH_TIMELINE }: IpswichTimelineProps) {
  return (
    <ClubTimeline
      events={events}
      chapterBands={IPSWICH_CHAPTER_BANDS}
      ariaLabel="Ipswich Town club history timeline"
      reversed
    />
  );
}
