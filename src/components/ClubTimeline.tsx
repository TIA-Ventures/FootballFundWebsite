"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";

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
  /** Scroll the timeline to this event index on first paint (user can still scroll back). */
  initialScrollToIndex?: number;
  /** Render most-recent first (left) shifting to the past on the right. */
  reversed?: boolean;
};

export function ClubTimeline({
  events,
  chapterBands,
  ariaLabel,
  initialScrollToIndex,
  reversed = false,
}: ClubTimelineProps) {
  const n = events.length;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const orderedEvents = reversed ? [...events].reverse() : events;
  const displayBands = reversed
    ? chapterBands
        .map((b) => ({ ...b, start: n - b.end, end: n - b.start }))
        .reverse()
    : chapterBands;

  useEffect(() => {
    if (initialScrollToIndex === undefined) return;
    const scroller = scrollRef.current;
    if (!scroller) return;

    const el = scroller.querySelector<HTMLElement>(
      `[data-timeline-index="${initialScrollToIndex}"]`,
    );
    if (el) {
      el.scrollIntoView({ inline: "center", block: "nearest", behavior: "auto" });
    }
  }, [initialScrollToIndex]);

  return (
    <div className="h-timeline h-timeline--scroll">
      <p className="h-timeline-hint" aria-hidden="true">
        Scroll →
      </p>

      <div
        className="h-timeline-scroll"
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
      >
        <div className="h-timeline-eras-row" aria-hidden="true">
          {displayBands.map((band) => {
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
            {displayBands.map((band, bi) => {
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
            {displayBands.map((band) => {
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
            {orderedEvents.map((e, i) => {
              const startsEra = i === 0 || orderedEvents[i - 1].chapter !== e.chapter;
              const band = chapterBands.find((b) => b.chapter === e.chapter);
              const originalIndex = reversed ? n - 1 - i : i;
              return (
                <Fragment key={`${e.year}-${i}`}>
                  {startsEra && band ? (
                    <li
                      className={`h-era-divider chap-${e.chapter}${i === 0 ? " is-first" : ""}`}
                      aria-label={`${band.label}, ${band.years}`}
                    >
                      <div className="h-era-divider-inner">
                        <span className="h-era-divider-label">{band.label}</span>
                        <span className="h-era-divider-years">{band.years}</span>
                      </div>
                    </li>
                  ) : null}
                  <li
                    className={`h-event chap-${e.chapter}${e.isAnchor ? " is-anchor" : ""}${
                      e.hero ? " is-hero" : ""
                    } ${i % 2 === 0 ? "is-above" : "is-below"}${startsEra ? " starts-era" : ""}`}
                    data-timeline-index={originalIndex}
                  >
                    <div className="h-event-dot" aria-hidden="true" />
                    <div className="h-event-content">
                      <div className="h-event-year">{e.year}</div>
                      <div className="h-event-label">{e.label}</div>
                      <p className="h-event-detail">{e.detail}</p>
                    </div>
                  </li>
                </Fragment>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
