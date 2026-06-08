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

export type TimelineChapterBand = {
  chapter: TimelineChapter;
  label: string;
  years: string;
  start: number;
  end: number;
};

type ClubTimelineProps = {
  events: TimelineEvent[];
  chapterBands: TimelineChapterBand[];
  ariaLabel: string;
};

export function ClubTimeline({ events, chapterBands, ariaLabel }: ClubTimelineProps) {
  const n = events.length;

  return (
    <div className="h-timeline h-timeline--scroll">
      <p className="h-timeline-hint" aria-hidden="true">
        Scroll →
      </p>

      <div className="h-timeline-scroll" tabIndex={0} role="region" aria-label={ariaLabel}>
        <div className="h-timeline-eras-row" aria-hidden="true">
          {chapterBands.map((band) => {
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
          <div className="h-timeline-bands" aria-hidden="true">
            {chapterBands.map((band, bi) => {
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
            {chapterBands.map((band) => {
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
              const band = chapterBands.find((b) => b.chapter === e.chapter);
              return (
                <li
                  key={`${e.year}-${i}`}
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
