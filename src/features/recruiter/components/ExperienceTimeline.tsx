import * as React from "react";

/* --------------------------------------------------------------------------
   Experience Timeline — Animated, expandable career timeline.
   -------------------------------------------------------------------------- */

type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  type: string;
  highlights: string[];
  tags: string[];
};

const TIMELINE: TimelineEntry[] = [
  {
    period: "Oct 2024 – Jun 2025",
    title: "Junior Frontend Developer",
    org: "CIRIS Ethical AI — Freelance, Remote",
    type: "Freelance",
    highlights: [
      "Ran the project locally and improved onboarding/setup documentation with environment notes and JWT guidance.",
      "Contributed small merged PRs: logging around token verification, lint fixes, improved error messages.",
      "Tracked larger improvements as GitHub Issues to keep work transparent and organized.",
    ],
    tags: ["JavaScript", "GitHub", "Documentation", "JWT", "Debugging", "Frontend"],
  },
  {
    period: "May 2025 – Aug 2025",
    title: "Cloud Support Engineer Intern",
    org: "Amazon Web Services (AWS) — Seattle, WA",
    type: "Internship",
    highlights: [
      "Completed guided support rotations in training environments with no customer data.",
      "Finished Juniper/Junos troubleshooting labs delivered in Jupyter Notebooks.",
      "Built a serverless metadata extraction capstone using Lambda, DynamoDB, S3, and Amplify.",
      "Created a transparent cost model using request counts, GB-month, compute time, read/write units, and transfer out.",
    ],
    tags: ["AWS", "Lambda", "DynamoDB", "S3", "CloudFront", "Troubleshooting", "Documentation"],
  },
  {
    period: "Oct 2025",
    title: "B.S. Web Development",
    org: "Full Sail University — Winter Park, FL",
    type: "Education",
    highlights: [
      "Completed accelerated B.S. in Web Development focused on JavaScript, React, Node.js, SQL, and project-based development.",
      "Participated in Tech Talk Club and weekly Agile-style standups.",
      "Collaborated on Fallen Knight: Requiem of Honor, a KAJAM game jam project ranked #9 in Artstyle.",
    ],
    tags: ["React", "Node.js", "SQL", "Agile", "Project-based"],
  },
  {
    period: "Sep 2022 – Jan 2023",
    title: "Case Manager",
    org: "Mason County, WA",
    type: "Full-time",
    highlights: [
      "Guided clients through Veterans Court, Drug Court, and Mental Health Court processes.",
      "Maintained clear, accurate documentation for court-mandated requirements.",
      "Used crisis intervention and strong communication to keep clients engaged and supported.",
    ],
    tags: ["Documentation", "Communication", "Organization", "Crisis Intervention"],
  },
  {
    period: "Jun 2020 – Sep 2022",
    title: "Animal Care Associate",
    org: "Mason County Kitten Rescue — Mason County, WA",
    type: "Part-time",
    highlights: [
      "Cared for abandoned and at-risk kittens with daily feeding, cleaning, and basic healthcare.",
      "Trained new volunteers and supported intake, fostering, and adoption efforts.",
      "Worked alongside a small team, building communication and organization skills.",
    ],
    tags: ["Teamwork", "Training", "Compassion", "Organization"],
  },
  {
    period: "Jan 2018 – Jan 2020",
    title: "Roof Loader",
    org: "Stoneway Roofing Supply",
    type: "Full-time",
    highlights: [
      "Loaded and delivered roofing materials to job sites in all weather conditions.",
      "Worked in tight schedules while staying focused on safety and clear crew communication.",
      "Developed discipline, physical endurance, and time management.",
    ],
    tags: ["Safety", "Time management", "Communication", "Physical endurance"],
  },
  {
    period: "Jun 2011 – Apr 2014",
    title: "Healthcare Specialist",
    org: "U.S. Army — Ft. Bragg",
    type: "Military",
    highlights: [
      "Provided medical support in training environments and combat zones.",
      "Developed calm-under-pressure skills, attention to detail, and quick adaptability.",
      "Demonstrated responsibility and reliability in high-stakes situations.",
    ],
    tags: ["Responsibility", "Adaptability", "Teamwork", "Pressure"],
  },
];

const ExperienceTimeline: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  return (
    <section id="experience-timeline" className="recruiter-section reveal-section">
      <div className="recruiter-section__header">
        <div className="recruiter-section__eyebrow">Experience</div>
        <h2 className="recruiter-section__title">
          Career <span className="recruiter-gradient-text">Timeline</span>
        </h2>
        <p className="recruiter-section__subtitle">
          From military service to cloud engineering. Every step built the engineer I am today.
        </p>
      </div>

      <div className="recruiter-timeline" style={{ padding: "0 clamp(1rem, 4vw, 3rem)" }}>
        <div className="recruiter-timeline__line" />

        {TIMELINE.map((entry, index) => {
          const isExpanded = expandedIndex === index;
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                marginBottom: "2rem",
                position: "relative",
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "1.5rem",
                  transform: "translateX(-50%)",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: isExpanded ? "var(--recruiter-purple)" : "var(--recruiter-surface-solid)",
                  border: `2px solid ${isExpanded ? "var(--recruiter-purple)" : "var(--recruiter-border)"}`,
                  zIndex: 2,
                  transition: "all 0.3s ease",
                  boxShadow: isExpanded ? "0 0 12px var(--recruiter-purple-glow)" : "none",
                }}
              />

              {/* Card */}
              <div
                className="recruiter-glass reveal-child"
                style={{
                  width: "calc(50% - 2rem)",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease",
                }}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedIndex(isExpanded ? null : index);
                  }
                }}
                aria-expanded={isExpanded}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--recruiter-purple)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {entry.period}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      padding: "0.125rem 0.5rem",
                      borderRadius: 9999,
                      background: "rgba(255,255,255,0.05)",
                      color: "var(--recruiter-text-muted)",
                    }}
                  >
                    {entry.type}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                  {entry.title}
                </h3>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--recruiter-text-secondary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {entry.org}
                </div>

                {isExpanded && (
                  <div style={{ marginTop: "1rem" }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem" }}>
                      {entry.highlights.map((h, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            gap: "0.625rem",
                            padding: "0.375rem 0",
                            fontSize: "0.875rem",
                            color: "var(--recruiter-text-secondary)",
                            lineHeight: 1.55,
                          }}
                        >
                          <span style={{ color: "var(--recruiter-purple)", flexShrink: 0 }}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="recruiter-tag"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--recruiter-text-muted)",
                    marginTop: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  {isExpanded ? "Show less ↑" : "Show more ↓"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
