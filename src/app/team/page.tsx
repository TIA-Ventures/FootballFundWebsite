import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { OperatingPrinciples } from "@/components/OperatingPrinciples";
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
    photo: "/team/bob_gold.png",
    bio: (
      <>
        30+ years as a PE &amp; VC investment leader, including 13 years as fund CEO. <em>$10B of AUM.</em>
      </>
    ),
  },
  {
    name: "Ed Schwartz",
    role: "Real Estate",
    photo: "/team/ed_schwartz.png",
    bio: "30+ years as an investment advisor to pensions and endowments, more recently a board member of professional sports organizations.",
  },
  {
    name: "Jeff Gaspin",
    role: "Media",
    photo: "/team/jeff_gaspin.png",
    slug: "jeff-gaspin",
    bio: "30+ years as an innovation-driven leader at global media and independent production companies.",
  },
  {
    name: "Wills Hapworth",
    role: "Venture",
    photo: "/team/wills_hapworth.png",
    bio: (
      <>
        20+ years as an investor in and advisor to high-growth technology companies. <em>Founding Partner of TIA Ventures.</em>
      </>
    ),
  },
  {
    name: "Charlie Lambropoulos",
    role: "Technology",
    photo: "/team/charlie_lambropoulos.png",
    bio: "20+ years scaling startups. Co-founded Lyfe Mobile (acquired by RhythmOne) and ScrumLaunch agency.",
  },
  {
    name: "Ram Parimi",
    role: "Growth",
    photo: "/team/ram_parimi.png",
    bio: "20+ years as a founder and executive building and scaling businesses across multiple industries.",
  },
  {
    name: "Andy Greenfield",
    role: "Consumer Insights",
    photo: "/team/andy_greenfield.png",
    bio: "30+ years as an entrepreneur building consumer research companies and delivering key consumer insights.",
  },
  {
    name: "Harry Landis",
    role: "Strategy",
    photo: "/team/harry_landis.jpg",
    bio: "Gen-Z founder and investor with experience building and consulting on business strategy and product.",
  },
  {
    name: "Kevin Stone",
    role: "Diligence",
    photo: "/team/kevin_stone.png",
    bio: "Investment leader focused on sourcing and evaluating opportunities and conducting diligence.",
  },
];

const ADVISORS: Person[] = [
  {
    name: "Mark Simonian",
    role: "TMT",
    photo: "/team/mark_simonian.png",
    bio: (
      <>
        35+ years as an industry-shaping deal-making senior executive in <em>Technology, Media &amp; Telecommunications.</em>
      </>
    ),
  },
  {
    name: "Dan Rosensweig",
    role: "Technology",
    photo: "/team/dan_rosensweig.png",
    bio: (
      <>
        25+ years as a leader in technology, including roles as <em>CEO of Guitar Hero</em> and <em>COO of Yahoo</em>.
      </>
    ),
  },
  {
    name: "Dan Reiss",
    role: "Media",
    photo: "/team/dan_reiss.png",
    bio: "30+ years as a media and marketing executive, leading digital transformation and revenue growth.",
  },
  {
    name: "Charles Baker",
    role: "Sports Transactions",
    photo: "/team/charles_baker.png",
    bio: "30+ years advising on high-stakes transactions across global sports, including team sales and media rights.",
  },
  {
    name: "Jill Stelfox",
    role: "Sports Data",
    photo: "/team/jill_stelfox.png",
    bio: (
      <>
        30+ years at the intersection of sports and data. Led development of <em>NFL Next Gen Stats.</em>
      </>
    ),
  },
];

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
          // eslint-disable-next-line @next/next/no-img-element
          <img src={person.photo} alt={`Portrait of ${person.name}`} loading="lazy" />
        ) : null}
      </div>
      <div className="person-content">
        <div className="person-name">{person.name}</div>
        <div className="person-role">{person.role}</div>
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
              <p className="sh-deck">
                The partners and committee members who source, underwrite, and govern Clara Vista&apos;s investments.
              </p>
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
                <div className="sh-eyebrow">002 · Advisors</div>
                <h2 className="sh-h2">
                  Senior Advisors <em>and Experts.</em>
                </h2>
              </div>
              <p className="sh-deck">
                A bench of senior operators and domain experts we deploy on diligence, deal structuring, and post-close
                value creation across the portfolio.
              </p>
            </div>
            <div className="person-grid">
              {ADVISORS.map((p) => (
                <PersonCard key={p.name} person={p} />
              ))}
            </div>
          </div>
        </div>

        <div className="section bg-deep">
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
              <a href="/thesis" className="cta-link">
                Read the thesis
              </a>
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
