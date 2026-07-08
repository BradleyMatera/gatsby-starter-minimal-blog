import * as React from "react";

/* --------------------------------------------------------------------------
   Skills Explorer — Inline detail panels. Hover a skill, details appear
   directly beneath it. No sticky sidebar that scrolls away.
   -------------------------------------------------------------------------- */

type Skill = {
  name: string;
  level: number;
  category: string;
  projects: string[];
  description: string;
};

const SKILLS: Skill[] = [
  {
    name: "JavaScript",
    level: 90,
    category: "Frontend",
    projects: ["CIRIS Ethical AI", "Portfolio", "Full Sail Projects"],
    description: "Core language for frontend development. Used in freelance work, school projects, and personal site.",
  },
  {
    name: "React",
    level: 85,
    category: "Frontend",
    projects: ["Portfolio", "Full Sail Projects"],
    description: "Built components and UI with React during Full Sail coursework and portfolio development.",
  },
  {
    name: "TypeScript",
    level: 78,
    category: "Frontend",
    projects: ["Portfolio", "Full Sail Projects"],
    description: "Used in portfolio and school projects for type safety and cleaner code.",
  },
  {
    name: "Node.js",
    level: 80,
    category: "Backend",
    projects: ["Portfolio", "Full Sail Projects"],
    description: "Server-side JavaScript for APIs and backend logic in school and portfolio work.",
  },
  {
    name: "HTML / CSS",
    level: 92,
    category: "Frontend",
    projects: ["All Projects"],
    description: "Strong foundation in semantic markup, responsive design, and modern CSS.",
  },
  {
    name: "SQL",
    level: 72,
    category: "Backend",
    projects: ["Full Sail", "Portfolio (PostgreSQL)"],
    description: "Database queries, joins, and basic schema design from coursework and portfolio.",
  },
  {
    name: "AWS",
    level: 75,
    category: "Cloud",
    projects: ["AWS Internship Capstone"],
    description: "AWS Solutions Architect Associate certified. Hands-on with Lambda, DynamoDB, S3, Amplify, CloudFront during internship.",
  },
  {
    name: "Docker",
    level: 65,
    category: "DevOps",
    projects: ["CIRIS Ethical AI", "Portfolio"],
    description: "Docker Compose for local development setup. Basic containerization knowledge.",
  },
  {
    name: "Git / GitHub",
    level: 88,
    category: "DevOps",
    projects: ["CIRIS Ethical AI", "Portfolio", "Full Sail"],
    description: "Branching, PRs, code review, issue tracking, and collaboration workflows.",
  },
  {
    name: "Documentation",
    level: 90,
    category: "Soft Skills",
    projects: ["CIRIS Ethical AI", "AWS Internship", "Mason County"],
    description: "Onboarding docs, troubleshooting guides, GitHub Issues, and clear technical writing.",
  },
  {
    name: "Debugging",
    level: 82,
    category: "Soft Skills",
    projects: ["CIRIS Ethical AI", "AWS Internship"],
    description: "Reproduce, isolate, check logs, change one thing at a time. Used in CIRIS token verification and AWS labs.",
  },
  {
    name: "Troubleshooting",
    level: 85,
    category: "Soft Skills",
    projects: ["AWS Internship", "CIRIS Ethical AI"],
    description: "Cloud troubleshooting, networking concepts, and systematic problem-solving from AWS training.",
  },
  {
    name: "AI-Assisted Development",
    level: 70,
    category: "AI",
    projects: ["Portfolio", "Full Sail"],
    description: "Uses AI tools for explanations, debugging ideas, and test cases, but verifies output.",
  },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Cloud", "DevOps", "Soft Skills", "AI"];

const SkillsExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [hoveredSkill, setHoveredSkill] = React.useState<string | null>(null);
  const [touchedSkill, setTouchedSkill] = React.useState<string | null>(null);

  const filtered = React.useMemo(
    () =>
      activeCategory === "All"
        ? SKILLS
        : SKILLS.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const activeSkill = touchedSkill || hoveredSkill;

  return (
    <section id="skills-explorer" className="recruiter-section reveal-section">
      <div className="recruiter-section__header">
        <span className="recruiter-section__eyebrow">Technical Skills</span>
        <h2 className="recruiter-section__title">
          Skills <span className="recruiter-title-accent">Explorer</span>
        </h2>
        <p className="recruiter-section__subtitle">
          Hover or tap any skill to see depth, projects, and real-world application — inline, not in a sidebar.
        </p>
      </div>

      {/* Category tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "2.5rem",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="recruiter-btn magnetic-btn"
            style={{
              padding: "0.5rem 1.25rem",
              fontSize: "0.875rem",
              borderRadius: 9999,
              border: "1px solid",
              borderColor:
                activeCategory === cat
                  ? "var(--r-accent)"
                  : "var(--r-border)",
              background:
                activeCategory === cat
                  ? "var(--r-accent-light)"
                  : "var(--r-surface-raised)",
              color:
                activeCategory === cat
                  ? "var(--r-accent)"
                  : "var(--r-text-secondary)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills list with inline details */}
      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.map((skill) => {
          const isActive = activeSkill === skill.name;
          return (
            <div
              key={skill.name}
              className="recruiter-card"
              style={{
                padding: "1.25rem",
                cursor: "pointer",
                transition: "border-color 0.2s ease",
                borderColor: isActive ? "var(--r-accent)" : undefined,
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => setTouchedSkill(isActive ? null : skill.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setTouchedSkill(isActive ? null : skill.name);
                }
              }}
              aria-expanded={isActive}
            >
              {/* Bar row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.625rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "var(--r-text)",
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      padding: "0.125rem 0.5rem",
                      borderRadius: 9999,
                      background: "var(--r-surface)",
                      color: "var(--r-text-muted)",
                    }}
                  >
                    {skill.category}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "var(--r-accent)",
                  }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "var(--r-surface)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: "100%",
                    borderRadius: 3,
                    background: "var(--r-accent)",
                    transition: "width 0.6s ease",
                  }}
                />
              </div>

              {/* Inline detail panel */}
              {isActive && (
                <div
                  style={{
                    marginTop: "1rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--r-border)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--r-text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "1rem",
                    }}
                  >
                    {skill.description}
                  </p>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--r-text-muted)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Used in
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                      {skill.projects.map((p) => (
                        <span key={p} className="recruiter-tag">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--r-text-muted)",
                    }}
                  >
                    Proficiency: {skill.level}/100
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsExplorer;
