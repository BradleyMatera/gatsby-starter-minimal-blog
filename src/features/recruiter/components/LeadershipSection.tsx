import * as React from "react";

/* --------------------------------------------------------------------------
   Leadership Section — Military, volunteer, and non-engineering experience.
   Professional card layout with custom SVG icons, scroll-reveal animations,
   and a connected accent rail.
   -------------------------------------------------------------------------- */

type Experience = {
  icon: React.ReactNode;
  title: string;
  org: string;
  period: string;
  description: string;
  skills: string[];
  highlight: string;
};

/* ---- Custom SVG Icons (professional, line-art style) ---- */

const MedicShieldIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 3 L26 7 L26 16 C26 22 21 27 16 29 C11 27 6 22 6 16 L6 7 Z" />
    <path d="M16 11 L16 19" strokeWidth="2.5" />
    <path d="M12 15 L20 15" strokeWidth="2.5" />
  </svg>
);

const PawIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="16" cy="21" rx="6" ry="5" />
    <ellipse cx="9" cy="13" rx="2.5" ry="3" />
    <ellipse cx="23" cy="13" rx="2.5" ry="3" />
    <ellipse cx="6" cy="19" rx="2" ry="2.5" />
    <ellipse cx="26" cy="19" rx="2" ry="2.5" />
  </svg>
);

const HardHatIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 22 C5 15 10 10 16 10 C22 10 27 15 27 22" />
    <path d="M3 22 L29 22" />
    <path d="M3 22 L3 25 L29 25 L29 22" />
    <path d="M13 10 L13 7 C13 6 14 5 16 5 C18 5 19 6 19 7 L19 10" />
  </svg>
);

const CodeBranchIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="10" cy="8" r="3" />
    <circle cx="10" cy="24" r="3" />
    <circle cx="22" cy="16" r="3" />
    <path d="M10 11 L10 21" />
    <path d="M10 16 C10 14 12 13 14 13 L19 13" />
    <path d="M22 13 L22 10 C22 9 21 8 20 8 L13 8" opacity="0.5" />
  </svg>
);

const LEADERSHIP_EXPERIENCES: Experience[] = [
  {
    icon: <MedicShieldIcon />,
    title: "Healthcare Specialist",
    org: "U.S. Army — Ft. Bragg, 82nd Airborne",
    period: "Jun 2011 – Apr 2014",
    description:
      "Provided medical support in training environments and combat zones. Developed calm-under-pressure skills, attention to detail, and quick adaptability in high-stakes situations.",
    skills: ["Responsibility", "Adaptability", "Teamwork", "Pressure"],
    highlight: "Demonstrated reliability and accountability when outcomes mattered most.",
  },
  {
    icon: <PawIcon />,
    title: "Animal Care Associate",
    org: "Mason County Kitten Rescue",
    period: "Jun 2020 – Sep 2022",
    description:
      "Cared for abandoned and at-risk kittens with daily feeding, cleaning, and basic healthcare. Trained new volunteers and supported intake, fostering, and adoption efforts.",
    skills: ["Training", "Compassion", "Organization", "Teamwork"],
    highlight: "Helped train new volunteers and supported adoption efforts alongside a small team.",
  },
  {
    icon: <HardHatIcon />,
    title: "Roof Loader",
    org: "Stoneway Roofing Supply",
    period: "Jan 2018 – Jan 2020",
    description:
      "Loaded and delivered roofing materials to job sites in all weather conditions. Worked in tight schedules while staying focused on safety and clear crew communication.",
    skills: ["Safety", "Time management", "Communication", "Physical endurance"],
    highlight: "Developed discipline, reliability, and time management under demanding conditions.",
  },
  {
    icon: <CodeBranchIcon />,
    title: "Junior Frontend Developer",
    org: "CIRIS Ethical AI — Freelance, Remote",
    period: "Oct 2024 – Jun 2025",
    description:
      "Worked on CIRIS Ethical AI by improving onboarding documentation, contributing small merged PRs, and tracking larger improvements with GitHub Issues. Built communication skills through remote freelance collaboration.",
    skills: ["Documentation", "GitHub", "Collaboration", "Debugging"],
    highlight: "Improved developer onboarding and contributed code updates in a transparent, tracked way.",
  },
];

const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="recruiter-section reveal-section">
      <div className="recruiter-section__header">
        <div className="recruiter-section__eyebrow">Leadership</div>
        <h2 className="recruiter-section__title">
          Beyond the <span className="recruiter-gradient-text">Code</span>
        </h2>
        <p className="recruiter-section__subtitle">
          Leadership isn't a title — it's demonstrated through action, accountability, and impact on others.
        </p>
      </div>

      <div className="leadership-grid">
        {LEADERSHIP_EXPERIENCES.map((exp, index) => (
          <article key={index} className="leadership-card">
            <div className="leadership-card__rail" aria-hidden="true">
              <div className="leadership-card__number">{String(index + 1).padStart(2, "0")}</div>
              <div className="leadership-card__icon">{exp.icon}</div>
            </div>

            <div className="leadership-card__body">
              <div className="leadership-card__header">
                <h3 className="leadership-card__title">{exp.title}</h3>
                <span className="leadership-card__org">{exp.org}</span>
                <span className="leadership-card__period">{exp.period}</span>
              </div>

              <p className="leadership-card__desc">{exp.description}</p>

              <div className="leadership-card__highlight">
                <span className="leadership-card__highlight-label">Key takeaway</span>
                <span className="leadership-card__highlight-text">{exp.highlight}</span>
              </div>

              <div className="leadership-card__skills">
                {exp.skills.map((skill) => (
                  <span key={skill} className="recruiter-tag">{skill}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LeadershipSection;
