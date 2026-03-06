import * as React from "react";

type TimelineEntry = {
  id: string;
  dates: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  responsibilities: { label: string; detail: string }[];
  skills: string[];
  proof: { label: string; href: string }[];
  condensed?: boolean;
};

const entries: TimelineEntry[] = [
  {
    id: "aws-internship-2025",
    dates: "May 2025 - Aug 2025",
    title: "Cloud Support Engineer Intern (Capstone Project)",
    company: "Amazon Web Services (AWS)",
    location: "Seattle, WA (On-site internship)",
    summary:
      "Completed guided support rotations in training environments and produced review-ready documentation, cost reasoning, and repeatable troubleshooting notes for cloud workflows.",
    responsibilities: [
      { label: "Capstone", detail: "Built a serverless metadata extraction workflow using AWS Lambda, DynamoDB, and S3 with an accessible front end deployed on AWS Amplify." },
      { label: "Cost model", detail: "Created a transparent cost model that estimated cost per upload and retrieval using measurable inputs instead of vague assumptions." },
      { label: "Documentation", detail: "Recorded assumptions, calculation logic, and troubleshooting steps so reviewers could follow the reasoning and reproduce the results." },
    ],
    skills: [
      "Amazon S3, EC2, RDS, DynamoDB",
      "CloudFront, SageMaker, Bedrock",
      "Technical writing & compliance",
    ],
    proof: [
      { label: "AWS Internships", href: "https://www.amazon.jobs/en/teams/aws" },
    ],
  },
  {
    id: "ciris-2024",
    dates: "Jan 2024 - Dec 2024",
    title: "Junior Frontend Developer (Volunteer)",
    company: "CIRIS Ethical AI",
    location: "Remote (Part-time)",
    summary:
      "Improved onboarding docs and tooling in open-source ethics projects so new contributors could get local environments running with less guesswork.",
    responsibilities: [
      { label: "Onboarding docs", detail: "Updated READMEs, workflows, and contributor guides after testing each project setup myself." },
      { label: "Issue triage", detail: "Logged issues and documented AI-assisted debugging steps so maintainers had clearer reproduction notes." },
      { label: "Environment notes", detail: "Clarified environment variables, preview URLs, and token-verification troubleshooting for new contributors." },
    ],
    skills: ["React.js", "JavaScript", "Technical documentation", "GitHub workflows"],
    proof: [
      { label: "Pull requests", href: "https://github.com/CIRISAI/CIRISNode/pulls?q=is%3Apr+author%3ABradleyMatera" },
    ],
  },
  {
    id: "earlier-roles",
    dates: "2011 - 2023",
    title: "Earlier roles outside tech",
    company: "Army, logistics, case management, rescue work",
    location: "Mostly on-site roles",
    summary:
      "Before I started building software in public, I worked across military, operations, care, and logistics roles that taught me discipline, documentation, and how to stay useful when things are messy.",
    responsibilities: [
      { label: "Documentation habits", detail: "Learned to keep notes clear, track details carefully, and communicate changes in environments where missing information had real consequences." },
      { label: "Steady execution", detail: "Worked in jobs that required patience, safety awareness, teamwork, and calm problem-solving under pressure." },
      { label: "Why it matters now", detail: "Those roles do not replace engineering experience, but they do shape how I approach learning, collaboration, and responsibility in technical work." },
    ],
    skills: ["Documentation", "Communication", "Discipline", "Calm under pressure"],
    proof: [
      { label: "Rescue work", href: "https://www.kittenresq.net/" },
      { label: "Army medic role", href: "https://www.goarmy.com/careers-and-jobs/specialty-careers/medical" },
    ],
    condensed: true,
  },
];

const ExperienceTimeline = () => (
  <section className="timeline" aria-label="Professional experience timeline">
    <div className="experience-cards">
      {entries.map((item) => (
        <article key={item.id} className={`experience-card${item.condensed ? " experience-card--condensed" : ""}`}>
          <div className="experience-card__header">
            <div className="experience-card__title">
              {item.title} · <strong>{item.company}</strong>
            </div>
            <div className="experience-card__meta">
              {item.dates} · {item.location}
            </div>
          </div>
          {item.summary ? (
            <p className="experience-card__summary">{item.summary}</p>
          ) : null}
          <ul className="experience-card__list">
            {item.responsibilities.map((line, index) => (
              <li key={`${item.id}-${index}`}>
                <strong>{line.label}:</strong> {line.detail}
              </li>
            ))}
          </ul>
          <div className="experience-card__skills">Skills: {item.skills.join(", ")}</div>
          <div className="experience-card__proof">
            {item.proof.map((proof) => (
              <a key={proof.href} href={proof.href} target="_blank" rel="noopener noreferrer">
                {proof.label}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default ExperienceTimeline;
