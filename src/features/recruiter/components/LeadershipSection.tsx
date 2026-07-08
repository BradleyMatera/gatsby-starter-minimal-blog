import * as React from "react";

/* --------------------------------------------------------------------------
   Leadership Section — Military and mentoring experience.
   -------------------------------------------------------------------------- */

const LEADERSHIP_EXPERIENCES = [
  {
    title: "Healthcare Specialist — U.S. Army",
    period: "Jun 2011 – Apr 2014",
    description:
      "Provided medical support in training environments and combat zones. Developed calm-under-pressure skills, attention to detail, and quick adaptability in high-stakes situations.",
    skills: ["Responsibility", "Adaptability", "Teamwork", "Pressure"],
    highlight: "Demonstrated reliability and accountability when outcomes mattered most.",
  },
  {
    title: "Animal Care Associate — Mason County Kitten Rescue",
    period: "Jun 2020 – Sep 2022",
    description:
      "Cared for abandoned and at-risk kittens with daily feeding, cleaning, and basic healthcare. Trained new volunteers and supported intake, fostering, and adoption efforts.",
    skills: ["Training", "Compassion", "Organization", "Teamwork"],
    highlight: "Helped train new volunteers and supported adoption efforts alongside a small team.",
  },
  {
    title: "Roof Loader — Stoneway Roofing Supply",
    period: "Jan 2018 – Jan 2020",
    description:
      "Loaded and delivered roofing materials to job sites in all weather conditions. Worked in tight schedules while staying focused on safety and clear crew communication.",
    skills: ["Safety", "Time management", "Communication", "Physical endurance"],
    highlight: "Developed discipline, reliability, and time management under demanding conditions.",
  },
  {
    title: "Junior Frontend Developer — CIRIS Ethical AI",
    period: "Oct 2024 – Jun 2025",
    description:
      "Worked on CIRIS Ethical AI by improving onboarding documentation, contributing small merged PRs, and tracking larger improvements with GitHub Issues. Built communication skills through remote freelance collaboration.",
    skills: ["Documentation", "GitHub", "Collaboration", "Debugging"],
    highlight: "Improved developer onboarding and contributed code updates in a transparent, tracked way.",
  },
];

const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="recruiter-section" data-static-visibility="true">
      <div className="recruiter-section__header">
        <div className="recruiter-section__eyebrow">Leadership</div>
        <h2 className="recruiter-section__title">
          Beyond the <span className="recruiter-gradient-text">Code</span>
        </h2>
        <p className="recruiter-section__subtitle">
          Leadership isn't a title — it's demonstrated through action, accountability, and impact on others.
        </p>
      </div>

      <div className="recruiter-grid recruiter-grid--2" style={{ maxWidth: 1000, margin: "0 auto" }}>
        {LEADERSHIP_EXPERIENCES.map((exp, index) => (
          <div
            key={index}
            className="recruiter-glass"
            style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(96,165,250,0.2))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.125rem",
                }}
              >
                ★
              </div>
              <div>
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, margin: 0, color: "var(--recruiter-text)" }}>
                  {exp.title}
                </h3>
                <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-muted)" }}>{exp.period}</div>
              </div>
            </div>

            <p style={{ fontSize: "0.875rem", color: "var(--recruiter-text-secondary)", lineHeight: 1.6 }}>
              {exp.description}
            </p>

            <div
              style={{
                padding: "0.75rem",
                borderRadius: "0.625rem",
                background: "rgba(167,139,250,0.06)",
                border: "1px solid rgba(167,139,250,0.15)",
                fontSize: "0.8125rem",
                color: "var(--recruiter-text)",
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: "var(--recruiter-purple)" }}>Highlight: </strong>
              {exp.highlight}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "auto" }}>
              {exp.skills.map((skill) => (
                <span key={skill} className="recruiter-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeadershipSection;
