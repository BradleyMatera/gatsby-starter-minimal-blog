import * as React from "react";

/* --------------------------------------------------------------------------
   ContributionsShowcase — Open-source contributions for recruiters.
   -------------------------------------------------------------------------- */

type Contribution = {
  id: string;
  org: string;
  role: string;
  period: string;
  description: string;
  items: string[];
  result: string;
  links: { label: string; url: string }[];
};

const CONTRIBUTIONS: Contribution[] = [
  {
    id: "ciris-node",
    org: "CIRIS AI Ethics Engine",
    role: "Volunteer Contributor",
    period: "2024 – Present",
    description:
      "Followed setup docs, filed bugs I hit, and opened lightweight PRs (typo fixes, README clarifications). Documented every AI-assisted change in PR descriptions.",
    items: [
      "Updated README/setup steps after running through the project locally.",
      "Opened small PRs (typo fixes, lint cleanups) and logged bigger ideas as issues.",
      "Documented prompt logs + AI assistance for transparency.",
    ],
    result: "Two small PRs merged; larger refactors still live in forks/practice branches.",
    links: [
      { label: "View merged PRs", url: "https://github.com/CIRISAI/CIRISNode/pulls?q=is%3Apr+author%3ABradleyMatera" },
      { label: "Organization", url: "https://github.com/CIRISAI" },
    ],
  },
  {
    id: "ciris-covenant",
    org: "CIRIS Covenant Site",
    role: "Frontend Helper",
    period: "2024",
    description:
      "Paired with a maintainer on the contributor application form; added environment notes (Netlify variables, preview steps) after running through deployment.",
    items: [
      "Followed maintainers' guidance to tweak the contributor application form.",
      "Added notes about environment variables and preview workflows.",
    ],
    result: "Documentation PR merged; future automation ideas tracked as TODOs.",
    links: [
      { label: "View application PR", url: "https://github.com/CIRISAI/CIRIS-Covenant.github.io/pull/3" },
    ],
  },
];

const ContributionsShowcase: React.FC = () => {
  return (
    <section id="contributions-showcase" className="recruiter-section recruiter-section--media reveal-section">
      {/* Background media layer */}
      <div className="recruiter-section__media" aria-hidden="true">
        <video
          className="recruiter-section__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-amazon-2000.webp"
          aria-hidden="true"
        >
          <source src="/community-contributions.mp4" type="video/mp4" />
          <track kind="descriptions" srcLang="en" label="Decorative background animation" />
        </video>
        <div className="recruiter-section__media-overlay" />
      </div>

      <div className="recruiter-section__content">
        <div className="recruiter-section__header">
          <div className="recruiter-section__eyebrow">Open Source</div>
          <h2 className="recruiter-section__title">
            Community <span className="recruiter-gradient-text">Contributions</span>
          </h2>
          <p className="recruiter-section__subtitle">
            Unpaid, student-level contributions with documentation focus and honest scope.
          </p>
        </div>

        <div className="recruiter-grid reveal-child recruiter-grid--2" style={{ maxWidth: 960, margin: "0 auto" }}>
        {CONTRIBUTIONS.map((contrib) => (
          <div
            key={contrib.id}
            className="recruiter-glass reveal-child"
            style={{
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.25rem",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, margin: 0 }}>
                  {contrib.org}
                </h3>
                <span
                  className="recruiter-tag"
                  style={{
                    fontSize: "0.625rem",
                    padding: "0.2rem 0.5rem",
                  }}
                >
                  {contrib.role}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--recruiter-text-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                {contrib.period}
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--recruiter-text-secondary)",
                  lineHeight: 1.55,
                }}
              >
                {contrib.description}
              </p>
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {contrib.items.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--recruiter-text-secondary)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ color: "var(--recruiter-purple)", flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>

            <div
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                background: "var(--color-accent-soft, rgba(111,103,95,0.12))",
                fontSize: "0.8125rem",
                color: "var(--recruiter-text-secondary)",
                lineHeight: 1.55,
              }}
            >
              <strong style={{ color: "var(--recruiter-text)" }}>Result: </strong>
              {contrib.result}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {contrib.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="recruiter-btn magnetic-btn recruiter-btn--secondary"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.75rem",
                    textDecoration: "none",
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default ContributionsShowcase;
