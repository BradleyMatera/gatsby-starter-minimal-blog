import * as React from "react";

/* --------------------------------------------------------------------------
   Skills Explorer — Polished accordion-style skill cards.
   - Click/tap to expand and keep the panel open
   - Smooth height + opacity transition
   - Rotating chevron indicator
   - Category filter tabs with counts
   - Progress bars animate in on first reveal
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

const ChevronIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s cubic-bezier(.22,.9,.2,1)",
      flexShrink: 0,
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SkillsExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [expandedSkill, setExpandedSkill] = React.useState<string | null>(null);
  const [animateBars, setAnimateBars] = React.useState(false);

  React.useEffect(() => {
    // Trigger progress bar animation after mount
    const timer = setTimeout(() => setAnimateBars(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filtered = React.useMemo(
    () =>
      activeCategory === "All"
        ? SKILLS
        : SKILLS.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { All: SKILLS.length };
    SKILLS.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  const toggleSkill = (name: string) => {
    setExpandedSkill((current) => (current === name ? null : name));
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setExpandedSkill(null);
  };

  return (
    <section id="skills-explorer" className="recruiter-section recruiter-section--media reveal-section">
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
          <source src="/skills-explorer.mp4" type="video/mp4" />
          <track kind="descriptions" srcLang="en" label="Decorative background animation" />
        </video>
        <div className="recruiter-section__media-overlay" />
      </div>

      <div className="recruiter-section__content">
        <div className="recruiter-section__header">
          <span className="recruiter-section__eyebrow">Technical Skills</span>
          <h2 className="recruiter-section__title">
            Skills <span className="recruiter-title-accent">Explorer</span>
          </h2>
          <p className="recruiter-section__subtitle">
            Click any skill to expand it. See real-world projects, proficiency, and how it fits the work.
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
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className="recruiter-btn magnetic-btn"
              aria-pressed={isActive}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                borderRadius: 9999,
                border: "1px solid",
                borderColor: isActive
                  ? "var(--r-accent)"
                  : "var(--r-border)",
                background: isActive
                  ? "var(--r-accent-light)"
                  : "var(--r-surface-raised)",
                color: isActive
                  ? "var(--r-accent)"
                  : "var(--r-text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              {cat}
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  padding: "0.125rem 0.375rem",
                  borderRadius: 9999,
                  background: isActive
                    ? "rgba(255,255,255,0.25)"
                    : "var(--r-surface)",
                  color: isActive ? "var(--r-accent)" : "var(--r-text-muted)",
                }}
              >
                {categoryCounts[cat] || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills accordion */}
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.875rem",
        }}
      >
        {filtered.map((skill) => {
          const isActive = expandedSkill === skill.name;
          return (
            <article
              key={skill.name}
              className="recruiter-card"
              style={{
                padding: 0,
                borderRadius: 12,
                border: "1px solid",
                borderColor: isActive
                  ? "var(--r-accent)"
                  : "var(--r-border)",
                background: isActive
                  ? "var(--r-surface-raised)"
                  : "var(--r-surface)",
                transition: "border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
                boxShadow: isActive
                  ? "0 8px 30px rgba(0,0,0,0.08)"
                  : "0 2px 8px rgba(0,0,0,0.04)",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => toggleSkill(skill.name)}
                aria-expanded={isActive}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  padding: "1.125rem 1.25rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  color: "inherit",
                  fontFamily: "inherit",
                }}
              >
                {/* Top row: name / badge / level / chevron */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 700,
                        color: "var(--r-text)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
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
                        flexShrink: 0,
                      }}
                    >
                      {skill.category}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "var(--r-accent)",
                      }}
                    >
                      {skill.level}%
                    </span>
                    <span style={{ color: "var(--r-text-muted)" }}>
                      <ChevronIcon expanded={isActive} />
                    </span>
                  </div>
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
                      width: animateBars ? `${skill.level}%` : "0%",
                      height: "100%",
                      borderRadius: 3,
                      background: "var(--r-accent)",
                      transition: "width 0.8s cubic-bezier(.22,.9,.2,1)",
                    }}
                  />
                </div>
              </button>

              {/* Expandable detail panel */}
              <div
                style={{
                  maxHeight: isActive ? 500 : 0,
                  opacity: isActive ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(.22,.9,.2,1), opacity 0.3s ease",
                }}
              >
                <div
                  style={{
                    padding: "0 1.25rem 1.25rem",
                    borderTop: "1px solid var(--r-border)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--r-text-secondary)",
                      lineHeight: 1.65,
                      margin: "1rem 0",
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
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.375rem",
                      }}
                    >
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
              </div>
            </article>
          );
        })}
      </div>
    </div>
    </section>
  );
};

export default SkillsExplorer;
