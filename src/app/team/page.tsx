import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { OperatingPrinciples } from "@/components/OperatingPrinciples";
import { TeamMoments } from "@/components/TeamMoments";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Team · Clara Vista Investment Partners",
  description:
    "Decades of operating depth — the partners, advisors, and operators behind Clara Vista's investments in European football.",
};

type Person = {
  name: string;
  role: string;
  bio: ReactNode;
  /** Optional LinkedIn profile URL — shows a small icon link on the card when set. */
  linkedin?: string;
  /** Public path to a headshot in /public/team. Photo is rendered with the
   *  same warm-archival duotone applied to the Ipswich crowd image so portraits
   *  resolve consistently against the cream/green palette. */
  photo?: string;
  /** Optional slug used to attach per-person photo overrides in CSS (e.g. tweaking
   *  object-position when an off-center crop reads better than the global default). */
  slug?: string;
};

const LEADERSHIP: Person[] = [
  {
    name: "Bob Gold",
    role: "Investments",
    photo: "/team/bob_gold.webp",
    linkedin: "https://www.linkedin.com/in/robert-gold-76143513/",
    bio: (
      <>
        30+ years as a PE &amp; VC investment leader, including 13 years as fund CEO. $10B of AUM.
      </>
    ),
  },
  {
    name: "Ed Schwartz",
    role: "Real Estate",
    photo: "/team/ed_schwartz.webp",
    linkedin: "https://www.linkedin.com/in/edward-schwartz-9a358627/",
    bio: "30+ years advising pensions and endowments, and a board member of professional sports organizations.",
  },
  {
    name: "Jeff Gaspin",
    role: "Media",
    photo: "/team/jeff_gaspin.webp",
    slug: "jeff-gaspin",
    linkedin: "https://www.linkedin.com/in/jeff-gaspin/",
    bio: "30+ years as an innovation-driven leader at global media and independent production companies.",
  },
  {
    name: "Wills Hapworth",
    role: "Venture",
    photo: "/team/wills_hapworth.webp",
    linkedin: "https://www.linkedin.com/in/willshapworth/",
    bio: "20+ years as investor and advisor to high-growth tech companies. Founding Partner of TIA Ventures.",
  },
  {
    name: "Charlie Lambropoulos",
    role: "Technology",
    photo: "/team/charlie_lambropoulos.webp",
    linkedin: "https://www.linkedin.com/in/charlielambropoulos/",
    bio: "20+ years scaling startups. Co-founded Lyfe Mobile (acquired by RhythmOne) and ScrumLaunch agency.",
  },
  {
    name: "Ram Parimi",
    role: "Growth",
    photo: "/team/ram_parimi.webp",
    linkedin: "https://www.linkedin.com/in/ramparimi/",
    bio: "20+ years as a founder and executive building and scaling businesses across multiple industries.",
  },
  {
    name: "Andy Greenfield",
    role: "Consumer Insights",
    photo: "/team/andy_greenfield.webp",
    linkedin: "https://www.linkedin.com/in/andy-greenfield-404a829/",
    bio: "30+ years as entrepreneur and investor building consumer research companies.",
  },
  {
    name: "Harry Landis",
    role: "Strategy",
    photo: "/team/harry_landis.webp",
    linkedin: "https://www.linkedin.com/in/harry-landis-5494b7204/",
    bio: "Gen-Z founder and investor with experience building and consulting on business strategy and product.",
  },
  {
    name: "Kevin Stone",
    role: "Diligence",
    photo: "/team/kevin_stone.webp",
    linkedin: "https://www.linkedin.com/in/kevinstoneorg/",
    bio: "Investment leader focused on sourcing and evaluating opportunities and conducting diligence.",
  },
];

const ADVISORS: Person[] = [
  {
    name: "Mark Simonian",
    role: "TMT",
    photo: "/team/mark_simonian.webp",
    bio: (
      <>
        35+ years as an industry-shaping deal-making senior executive in <em>Technology, Media &amp; Telecom.</em>
      </>
    ),
  },
  {
    name: "Dan Rosensweig",
    role: "Technology",
    photo: "/team/dan_rosensweig.webp",
    linkedin: "https://www.linkedin.com/in/danielrosensweig/",
    bio: (
      <>
        25+ years as a leader in technology, including roles as <em>CEO of Guitar Hero</em> and <em>COO of Yahoo</em>.
      </>
    ),
  },
  {
    name: "Dan Reiss",
    role: "Media",
    photo: "/team/dan_reiss.webp",
    bio: "30+ years as a media and marketing executive, leading digital transformation and revenue growth.",
  },
  {
    name: "Charles Baker",
    role: "Sports Transactions",
    photo: "/team/charles_baker.webp",
    bio: "30+ years advising on high-stakes transactions across global sports, including team sales and media rights.",
  },
  {
    name: "Jill Stelfox",
    role: "Sports Data",
    photo: "/team/jill_stelfox.webp",
    linkedin: "https://www.linkedin.com/in/jillstelfox/",
    bio: (
      <>
        30+ years at the intersection of sports and data. Led development of <em>NFL Next Gen Stats.</em>
      </>
    ),
  },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.067 2.067 0 1 1 0-4.134 2.067 2.067 0 0 1 0 4.134zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function PersonLinkedIn({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      className="person-linkedin"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
    >
      <LinkedInIcon />
    </a>
  );
}

function PersonLinkedInMark() {
  return (
    <span className="person-linkedin person-linkedin--placeholder" aria-hidden="true">
      <LinkedInIcon />
    </span>
  );
}

function PersonCard({ person }: { person: Person }) {
  const photoClass = person.photo ? "person-photo has-photo" : "person-photo";
  return (
    <div className="person-card">
      <div
        className={photoClass}
        data-slug={person.slug}
        aria-hidden={person.photo ? undefined : "true"}
      >
        {person.photo ? (
          <Image
            src={person.photo}
            alt={`Portrait of ${person.name}`}
            width={124}
            height={160}
            sizes="124px"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="person-content">
        <div className="person-name">{person.name}</div>
        <div className="person-role-row">
          <div className="person-role">{person.role}</div>
          {person.linkedin ? (
            <PersonLinkedIn href={person.linkedin} name={person.name} />
          ) : (
            <PersonLinkedInMark />
          )}
        </div>
        <p className="person-bio">{person.bio}</p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <Topbar activeNav="team" />
      <main className="cv-page team-page">
        <div className="page-hero">
          <div className="page-hero-inner">
            <div>
              <div className="ph-eyebrow">Team</div>
              <h1 className="ph-h1">
                Decades of <em>operating depth.</em>
              </h1>
            </div>
            <p className="ph-intro">
              Our team combines <em>decades of financial leadership</em> with deep operating experience across sports,
              media, technology, and data — and the football data operations leadership that elite European clubs build
              their models around.
            </p>
          </div>
        </div>

        <div className="section compact">
          <div className="section-inner">
            <div className="experience-stats">
              <div className="exp-stat">
                <div className="exp-stat-num">
                  $10<em>B+</em>
                </div>
                <div className="exp-stat-label">Assets managed by leadership</div>
              </div>
              <div className="exp-stat">
                <div className="exp-stat-num">
                  150<em>+</em>
                </div>
                <div className="exp-stat-label">Years of financial leadership</div>
              </div>
              <div className="exp-stat">
                <div className="exp-stat-num">
                  15<em>+</em>
                </div>
                <div className="exp-stat-label">Public companies guided</div>
              </div>
            </div>
          </div>
        </div>

        <div className="section bg-deep">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">001 · Leadership</div>
                <h2 className="sh-h2">
                  Leadership and <em>Investment Committee.</em>
                </h2>
              </div>
            </div>
            <div className="person-grid">
              {LEADERSHIP.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">Interlude · On the ground</div>
                <h2 className="sh-h2">
                  Boardroom to <em>the field.</em>
                </h2>
              </div>
              <p className="sh-deck">
                Moments from inside the club since the initial investment — directors&apos; box, dressing room,
                lap of honour. Clara Vista is hands-on, focused on driving growth and success.
              </p>
            </div>
            <TeamMoments />
          </div>
        </div>

        <div className="section bg-deep">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">002 · Advisors</div>
                <h2 className="sh-h2">
                  Senior Advisors <em>and Experts.</em>
                </h2>
              </div>
            </div>
            <div className="person-grid">
              {ADVISORS.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="sh-eyebrow">003 · Operating Principles</div>
                <h2 className="sh-h2">
                  Four pillars, <em>one philosophy.</em>
                </h2>
              </div>
              <p className="sh-deck">
                What unites the team across geographies, vintages, and asset classes — the principles every Clara Vista
                investment is built on. Tap any to expand.
              </p>
            </div>

            <OperatingPrinciples />

            <div className="cta-row">
              <Link href="/thesis" className="cta-link">
                Read the thesis
              </Link>
              <a href="#" className="cta-link">
                Fund II terms
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
