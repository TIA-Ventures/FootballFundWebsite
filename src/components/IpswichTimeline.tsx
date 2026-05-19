import type { ReactNode } from "react";

export type TimelineChapter = "founding" | "golden" | "modern";

export type TimelineEvent = {
  year: string;
  label: ReactNode;
  detail: string;
  chapter: TimelineChapter;
  isAnchor?: boolean;
  hero?: boolean;
};

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

const CHAPTER_BANDS: {
  chapter: TimelineChapter;
  label: string;
  years: string;
  start: number;
  end: number;
}[] = [
  { chapter: "founding", label: "Foundations", years: "1878 — 1936", start: 0, end: 2 },
  { chapter: "golden", label: "Golden Era", years: "1955 — 1982", start: 2, end: 9 },
  { chapter: "modern", label: "Modern Rebuild", years: "2018 — present", start: 9, end: 15 },
];

type IpswichTimelineProps = {
  events?: TimelineEvent[];
};

export function IpswichTimeline({ events = IPSWICH_TIMELINE }: IpswichTimelineProps) {
  const n = events.length;

  return (
    <div className="h-timeline h-timeline--scroll">
      <p className="h-timeline-hint" aria-hidden="true">
        Scroll →
      </p>

      <div
        className="h-timeline-scroll"
        tabIndex={0}
        role="region"
        aria-label="Ipswich Town club history timeline"
      >
        {/* Chapter index row — era labels sit above the track in their own
            dedicated band so they don't compete with event text for space. */}
        <div className="h-timeline-eras-row" aria-hidden="true">
          {CHAPTER_BANDS.map((band) => {
            const leftPct = (band.start / n) * 100;
            const widthPct = ((band.end - band.start) / n) * 100;
            return (
              <div
                key={band.chapter}
                className={`h-era-header chap-${band.chapter}`}
                style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
              >
                <span className="h-era-header-label">{band.label}</span>
                <span className="h-era-header-years">{band.years}</span>
              </div>
            );
          })}
        </div>

        <div className="h-timeline-track">
          {/* Vertical era bands sit behind the rail and events. Fill is
              masked top/bottom so the tint blends into the chart background. */}
          <div className="h-timeline-bands" aria-hidden="true">
            {CHAPTER_BANDS.map((band, bi) => {
              const leftPct = (band.start / n) * 100;
              const widthPct = ((band.end - band.start) / n) * 100;
              return (
                <div
                  key={band.chapter}
                  className={`h-era-band chap-${band.chapter}${bi > 0 ? " has-divider" : ""}`}
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                >
                  <div className="h-era-band-fill" />
                </div>
              );
            })}
          </div>

          <div className="h-timeline-rail" aria-hidden="true">
            {CHAPTER_BANDS.map((band) => {
              const leftPct = (band.start / n) * 100;
              const widthPct = ((band.end - band.start) / n) * 100;
              return (
                <span
                  key={band.chapter}
                  className={`h-timeline-rail-seg chap-${band.chapter}`}
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                />
              );
            })}
          </div>

          <ol className="h-timeline-grid">
            {events.map((e, i) => {
              const startsEra = i === 0 || events[i - 1].chapter !== e.chapter;
              const band = CHAPTER_BANDS.find((b) => b.chapter === e.chapter);
              return (
                <li
                  key={e.year}
                  className={`h-event chap-${e.chapter}${e.isAnchor ? " is-anchor" : ""}${
                    e.hero ? " is-hero" : ""
                  } ${i % 2 === 0 ? "is-above" : "is-below"}${startsEra ? " starts-era" : ""}`}
                  data-era-label={startsEra && band ? band.label : undefined}
                  data-era-years={startsEra && band ? band.years : undefined}
                >
                  <div className="h-event-dot" aria-hidden="true" />
                  <div className="h-event-content">
                    <div className="h-event-year">{e.year}</div>
                    <div className="h-event-label">{e.label}</div>
                    <p className="h-event-detail">{e.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
