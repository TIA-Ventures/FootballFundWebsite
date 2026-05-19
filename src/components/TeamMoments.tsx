type Orientation = "portrait" | "landscape";

export type TeamMoment = {
  src: string;
  orientation: Orientation;
  label: string;
  meta?: string;
  alt: string;
};

/* Ordered to vary orientation and pacing — anchor portrait first, build
   into the promotion celebration, close with on-pitch + lounge moments.
   Re-used by the home-page Ipswich hover preview, so any reorder here
   also drives the cycle shown beside the Active Portfolio panel. */
export const TEAM_MOMENTS: TeamMoment[] = [
  {
    src: "/team-moments/boardroom.jpg",
    orientation: "portrait",
    label: "Boardroom",
    meta: "Portman Road",
    alt: "Clara Vista leadership at Portman Road with the Ipswich Town crest.",
  },
  {
    src: "/team-moments/gamechanger-lounge.jpg",
    orientation: "landscape",
    label: "Gamechanger Lounge",
    meta: "Portman Road",
    alt: "Two Clara Vista partners inside the Gamechanger Lounge at Portman Road.",
  },
  {
    src: "/team-moments/promoted.jpg",
    orientation: "landscape",
    label: "Promoted",
    meta: "May 2026",
    alt: "Ipswich Town squad with the PROMOTED 2026 banner at Portman Road.",
  },
  {
    src: "/team-moments/full-time.jpg",
    orientation: "portrait",
    label: "Full time",
    meta: "On the pitch",
    alt: "Clara Vista partner on the pitch with an Ipswich Town player after a promotion match.",
  },
  {
    src: "/team-moments/sun-out.jpg",
    orientation: "landscape",
    label: "Sun out",
    meta: "Stand-side",
    alt: "Stand-side at Portman Road during a daytime match.",
  },
  {
    src: "/team-moments/lap-of-honour.jpg",
    orientation: "landscape",
    label: "Lap of honour",
    meta: "Portman Road",
    alt: "Ipswich Town players acknowledging supporters during a lap of honour.",
  },
  {
    src: "/team-moments/promotion-night.jpg",
    orientation: "portrait",
    label: "Promotion night",
    meta: "Pitchside",
    alt: "Clara Vista team and an Ipswich Town player on the pitch after promotion.",
  },
  {
    src: "/team-moments/floodlit.jpg",
    orientation: "landscape",
    label: "Floodlit",
    meta: "Evening fixture",
    alt: "Portman Road under the floodlights during an evening fixture.",
  },
  {
    src: "/team-moments/directors-box.jpg",
    orientation: "portrait",
    label: "Directors' box",
    meta: "Matchday",
    alt: "Clara Vista partner at the directors' box overlooking the Portman Road pitch.",
  },
];

export function TeamMoments() {
  return (
    <div className="team-moments">
      <p className="team-moments-hint" aria-hidden="true">
        Scroll →
      </p>
      <div
        className="team-moments-scroll"
        tabIndex={0}
        role="region"
        aria-label="Photographs from Clara Vista's involvement with Ipswich Town"
      >
        <ul className="team-moments-track">
          {TEAM_MOMENTS.map((m) => (
            <li
              key={m.src}
              className={`team-moment is-${m.orientation}`}
            >
              <figure className="team-moment-figure">
                <div className="team-moment-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt={m.alt} loading="lazy" decoding="async" />
                </div>
                <figcaption className="team-moment-cap">
                  <span className="team-moment-cap-label">{m.label}</span>
                  {m.meta ? (
                    <span className="team-moment-cap-meta" aria-hidden="true">
                      {" — "}{m.meta}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
