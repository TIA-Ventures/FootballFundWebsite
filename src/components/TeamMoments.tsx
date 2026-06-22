import Image from "next/image";

type Orientation = "portrait" | "landscape";

export type TeamMoment = {
  src: string;
  orientation: Orientation;
  label: string;
  meta?: string;
  alt: string;
};

/* Opens with boardroom → pitch group → promoted; remaining moments follow.
   Re-used by any Ipswich hover preview that imports TEAM_MOMENTS. */
export const TEAM_MOMENTS: TeamMoment[] = [
  {
    src: "/team-moments/boardroom.webp",
    orientation: "portrait",
    label: "Boardroom",
    meta: "Portman Road",
    alt: "Clara Vista leadership at Portman Road with the Ipswich Town crest.",
  },
  {
    src: "/team-moments/gallery/img-5766.webp",
    orientation: "landscape",
    label: "Portman Road",
    meta: "Matchday",
    alt: "Clara Vista partners on the pitch with Ipswich Town.",
  },
  {
    src: "/team-moments/promoted.webp",
    orientation: "landscape",
    label: "Promoted",
    meta: "May 2026",
    alt: "Ipswich Town squad with the PROMOTED 2026 banner at Portman Road.",
  },
  {
    src: "/team-moments/gallery/img-1186.webp",
    orientation: "landscape",
    label: "Directors' box",
    meta: "Portman Road",
    alt: "Clara Vista leadership overlooking the Portman Road pitch.",
  },
  {
    src: "/team-moments/gallery/img-1899.webp",
    orientation: "portrait",
    label: "On the pitch",
    meta: "Portman Road",
    alt: "Clara Vista partners and colleagues on the pitch at Portman Road.",
  },
  {
    src: "/team-moments/gamechanger-lounge.webp",
    orientation: "landscape",
    label: "Gamechanger Lounge",
    meta: "Portman Road",
    alt: "Two Clara Vista partners inside the Gamechanger Lounge at Portman Road.",
  },
  {
    src: "/team-moments/gallery/img-1902.webp",
    orientation: "portrait",
    label: "Portman Road",
    meta: "Ipswich Town",
    alt: "Clara Vista partners on the pitch at Ipswich Town.",
  },
  {
    src: "/team-moments/gallery/img-3810.webp",
    orientation: "landscape",
    label: "Behind the scenes",
    meta: "Matchday",
    alt: "Clara Vista partners on matchday at Ipswich Town.",
  },
  {
    src: "/team-moments/gallery/img-6772.webp",
    orientation: "portrait",
    label: "On the pitch",
    meta: "Ipswich Town",
    alt: "Clara Vista team on the pitch at Portman Road.",
  },
  {
    src: "/team-moments/full-time.webp",
    orientation: "portrait",
    label: "Full time",
    meta: "On the pitch",
    alt: "Clara Vista partner on the pitch with an Ipswich Town player after a promotion match.",
  },
  {
    src: "/team-moments/gallery/img-1919.webp",
    orientation: "landscape",
    label: "Directors' box",
    meta: "Matchday",
    alt: "Clara Vista in the directors' box at Portman Road.",
  },
  {
    src: "/team-moments/gallery/img-6212.webp",
    orientation: "portrait",
    label: "Dressing room",
    meta: "Portman Road",
    alt: "Clara Vista partners in the Ipswich Town dressing room.",
  },
  {
    src: "/team-moments/sun-out.webp",
    orientation: "landscape",
    label: "Sun out",
    meta: "Stand-side",
    alt: "Stand-side at Portman Road during a daytime match.",
  },
  {
    src: "/team-moments/gallery/128381e3-fe71-47e8-b0f0-18048fb5d44c.webp",
    orientation: "portrait",
    label: "Portman Road",
    meta: "Ipswich Town crest",
    alt: "Clara Vista leadership at Portman Road with the club crest.",
  },
  {
    src: "/team-moments/gallery/img-3910.webp",
    orientation: "landscape",
    label: "Promotion night",
    meta: "Portman Road",
    alt: "Clara Vista partners celebrating promotion at Portman Road.",
  },
  {
    src: "/team-moments/gallery/img-0534.webp",
    orientation: "portrait",
    label: "Matchday",
    meta: "On the pitch",
    alt: "Clara Vista partners walking the Portman Road pitch.",
  },
  {
    src: "/team-moments/lap-of-honour.webp",
    orientation: "landscape",
    label: "Lap of honour",
    meta: "Portman Road",
    alt: "Ipswich Town players acknowledging supporters during a lap of honour.",
  },
  {
    src: "/team-moments/gallery/img-5165.webp",
    orientation: "portrait",
    label: "On the pitch",
    meta: "Sir Alf Ramsey Stand",
    alt: "Clara Vista partners on the pitch at Portman Road.",
  },
  {
    src: "/team-moments/floodlit.webp",
    orientation: "landscape",
    label: "Floodlit",
    meta: "Evening fixture",
    alt: "Portman Road under the floodlights during an evening fixture.",
  },
  {
    src: "/team-moments/promotion-night.webp",
    orientation: "portrait",
    label: "Promotion night",
    meta: "Pitchside",
    alt: "Clara Vista team and an Ipswich Town player on the pitch after promotion.",
  },
  {
    src: "/team-moments/gallery/img-1249.webp",
    orientation: "portrait",
    label: "Gamechanger Lounge",
    meta: "Portman Road",
    alt: "Clara Vista partner with an Ipswich Town player in the lounge.",
  },
  {
    src: "/team-moments/gallery/img-3516.webp",
    orientation: "portrait",
    label: "Matchday",
    meta: "Portman Road",
    alt: "Clara Vista partner with an Ipswich Town player on matchday.",
  },
  {
    src: "/team-moments/gallery/img-3969.webp",
    orientation: "portrait",
    label: "Promotion",
    meta: "Pitchside",
    alt: "Clara Vista partner with an Ipswich Town player after promotion.",
  },
  {
    src: "/team-moments/directors-box.webp",
    orientation: "portrait",
    label: "Directors' box",
    meta: "Matchday",
    alt: "Clara Vista partner at the directors' box overlooking the Portman Road pitch.",
  },
  {
    src: "/team-moments/gallery/img-3825.webp",
    orientation: "portrait",
    label: "Directors' box",
    meta: "Celebration",
    alt: "Clara Vista partner applauding from the directors' box.",
  },
  {
    src: "/team-moments/gallery/img-1223.webp",
    orientation: "portrait",
    label: "We are going up",
    meta: "Promotion",
    alt: "Clara Vista partner celebrating Ipswich Town promotion.",
  },
  {
    src: "/team-moments/gallery/img-1354.webp",
    orientation: "portrait",
    label: "Pitch invasion",
    meta: "Promotion",
    alt: "Promotion celebration from the stands at Portman Road.",
  },
];

const MOMENT_DIMENSIONS: Record<Orientation, { width: number; height: number }> = {
  portrait: { width: 540, height: 720 },
  landscape: { width: 720, height: 540 },
};

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
          {TEAM_MOMENTS.map((m) => {
            const dims = MOMENT_DIMENSIONS[m.orientation];
            return (
              <li key={m.src} className={`team-moment is-${m.orientation}`}>
                <figure className="team-moment-figure">
                  <div className="team-moment-frame">
                    <Image
                      src={m.src}
                      alt={m.alt}
                      width={dims.width}
                      height={dims.height}
                      sizes="(max-width: 720px) 72vw, 420px"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="team-moment-cap">
                    <span className="team-moment-cap-label">{m.label}</span>
                    {m.meta ? (
                      <span className="team-moment-cap-meta" aria-hidden="true">
                        {" — "}
                        {m.meta}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
