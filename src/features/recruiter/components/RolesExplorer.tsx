import * as React from "react";

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

const RolesExplorer: React.FC = () => (
  <section id="roles-explorer" className="recruiter-section" aria-labelledby="recruiter-roles-heading">
    <div className="recruiter-section__header"><span className="recruiter-section__eyebrow">Roles</span><h2 id="recruiter-roles-heading" className="recruiter-section__title">How I Practice <span className="recruiter-title-accent">Engineering</span></h2><p className="recruiter-section__subtitle">Transparency-first: every role card shows what I can demonstrate today and what I still need mentorship on.</p></div>
    <div className="recruiter-grid recruiter-grid--2">{ROLES.map((role) => <article className="recruiter-card" key={role.id}>
      <h3>{role.title}</h3><p>{role.summary}</p><a href={role.slug} className="recruiter-text-link">View full role page →</a>
      <details className="recruiter-details"><summary>Current experience and growth areas</summary><h4>What I Have</h4><ul>{role.have.map((item) => <li key={item}>{item}</li>)}</ul><h4>What I Still Need Mentorship On</h4><ul>{role.gaps.map((item) => <li key={item}>{item}</li>)}</ul></details>
    </article>)}</div>
  </section>
);

export default RolesExplorer;
