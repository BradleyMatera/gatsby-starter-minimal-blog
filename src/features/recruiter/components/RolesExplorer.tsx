import * as React from "react";
import { CheckIcon, XIcon } from "../../../site/icons";

/* --------------------------------------------------------------------------
   Roles Explorer — Inline role cards for the recruiter hub.
   -------------------------------------------------------------------------- */

type RoleCard = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  have: string[];
  gaps: string[];
};

const ROLES: RoleCard[] = [
  {
    id: "cloud",
    title: "Cloud Engineer",
    slug: "/roles/cloud-engineer",
    summary:
      "AWS internship (guided rotations), serverless capstone (Lambda, DynamoDB, S3, Amplify), cost modeling, and small public deployments with documented limitations.",
    have: [
      "AWS Solutions Architect Associate certified",
      "Serverless capstone with documented cost assumptions",
      "GitHub Pages / Render deployments",
    ],
    gaps: [
      "Production AWS environment ownership",
      "On-call rotations",
      "Multi-account security review",
    ],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    slug: "/roles/devops-engineer",
    summary:
      "GitHub Actions, Docker Compose, build checks, and deployment workflows. Focus on blocking obvious mistakes and documenting pipelines.",
    have: [
      "CI/CD workflows with GitHub Actions",
      "Docker Compose local setups",
      "Render + Netlify deployment experience",
    ],
    gaps: [
      "Enterprise-scale Kubernetes",
      "Production observability stacks",
      "Incident response on-call",
    ],
  },
  {
    id: "backend",
    title: "Backend Engineer",
    slug: "/roles/backend-engineer",
    summary:
      "Node.js and FastAPI experiments focused on auth, APIs, persistence, and honest documentation of limits.",
    have: [
      "Express APIs with auth and persistence",
      "FastAPI experiments with local models",
      "PostgreSQL + MongoDB usage",
    ],
    gaps: [
      "High-throughput API design",
      "Distributed systems patterns",
      "Production database tuning",
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack Engineer",
    slug: "/roles/full-stack-engineer",
    summary:
      "React frontends paired with small backends to practice end-to-end shipping. Car-Match is the main integrated project.",
    have: [
      "React + Express integrated projects",
      "Car-Match full-stack demo",
      "Deployment across frontend + backend",
    ],
    gaps: [
      "Large-scale production ownership",
      "Cross-team delivery timelines",
      "Deep testing discipline",
    ],
  },
  {
    id: "ai",
    title: "AI / Automation Engineer",
    slug: "/roles/ai-automation-engineer",
    summary:
      "Local model workflows, FastAPI experiments, prompt documentation, and small automation tools with clear limits.",
    have: [
      "Local AI experiments with documented prompts",
      "FastAPI backend for model orchestration",
      "Automation scripts for personal pipelines",
    ],
    gaps: [
      "Production AI integrations",
      "Enterprise guardrails + audits",
      "Large-scale orchestration",
    ],
  },
];

const RolesExplorer: React.FC = () => {
  const [activeRole, setActiveRole] = React.useState<string | null>(null);

  return (
    <section id="roles-explorer" className="recruiter-section reveal-section">
      <div className="recruiter-section__header">
        <div className="recruiter-section__eyebrow">Roles</div>
        <h2 className="recruiter-section__title">
          How I Practice <span className="recruiter-gradient-text">Engineering</span>
        </h2>
        <p className="recruiter-section__subtitle">
          Transparency-first: every role card shows what I can demonstrate today and what I still need mentorship on.
        </p>
      </div>

      <div className="recruiter-grid reveal-child recruiter-grid--2" style={{ maxWidth: 960, margin: "0 auto" }}>
        {ROLES.map((role) => {
          const isActive = activeRole === role.id;

          return (
            <div
              key={role.id}
              className="recruiter-glass reveal-child"
              style={{
                padding: "1.75rem",
                cursor: "pointer",
                borderLeft: isActive ? "3px solid var(--recruiter-purple)" : "3px solid transparent",
                transition: "all 0.3s ease",
              }}
              onClick={() => setActiveRole(isActive ? null : role.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveRole(isActive ? null : role.id);
                }
              }}
              aria-expanded={isActive}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, margin: 0 }}>
                  {role.title}
                </h3>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--recruiter-text-muted)",
                    flexShrink: 0,
                  }}
                >
                  {isActive ? "Show less ↑" : "Show more ↓"}
                </span>
              </div>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--recruiter-text-secondary)",
                  lineHeight: 1.55,
                  marginBottom: isActive ? "1rem" : 0,
                }}
              >
                {role.summary}
              </p>

              {isActive && (
                <div
                  style={{
                    borderTop: "1px solid var(--recruiter-border)",
                    paddingTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--r-success)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      What I Have
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.375rem",
                      }}
                    >
                      {role.have.map((item) => (
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
                          <span style={{ color: "var(--r-success)", flexShrink: 0 }}><CheckIcon size={14} /></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--r-error)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      What I Still Need Mentorship On
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.375rem",
                      }}
                    >
                      {role.gaps.map((item) => (
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
                          <span style={{ color: "var(--r-error)", flexShrink: 0 }}><XIcon size={14} /></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={role.slug}
                    className="recruiter-btn magnetic-btn recruiter-btn--secondary"
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.8125rem",
                      marginTop: "0.5rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      width: "fit-content",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View full role page →
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RolesExplorer;
