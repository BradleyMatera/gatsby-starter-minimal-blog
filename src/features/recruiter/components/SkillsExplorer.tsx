import * as React from "react";
import { useRecruiterFilter } from "../hooks/useRecruiterFilter";

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

const EVIDENCE: Record<string, { label: string; href: string }> = {
  "JavaScript": { label: "Portfolio source", href: "https://github.com/BradleyMatera/gatsby-starter-minimal-blog" },
  "React": { label: "Car-Match case study", href: "/projects/car-match/" },
  "TypeScript": { label: "Pokédex case study", href: "/projects/interactive-pokedex/" },
  "Node.js": { label: "Car-Match case study", href: "/projects/car-match/" },
  "HTML / CSS": { label: "Portfolio source", href: "https://github.com/BradleyMatera/gatsby-starter-minimal-blog" },
  "SQL": { label: "Portfolio source", href: "https://github.com/BradleyMatera/gatsby-starter-minimal-blog" },
  "AWS": { label: "Metadata workflow case study", href: "/projects/aws-serverless-metadata-workflow/" },
  "Docker": { label: "Car-Match source", href: "https://github.com/BradleyMatera/car-match" },
  "Git / GitHub": { label: "Contribution record", href: "/open-source/" },
  "Documentation": { label: "Contribution record", href: "/open-source/" },
  "Debugging": { label: "CIRIS contribution details", href: "/projects/ciris-ai/" },
  "Troubleshooting": { label: "AWS experience", href: "#aws-section" },
  "AI-Assisted Development": { label: "ProjectHub case study", href: "/projects/projecthub/" },
};

const SkillsExplorer: React.FC = () => {
  const [category, setCategory] = useRecruiterFilter("skill-category");
  const activeCategory = CATEGORIES.includes(category) ? category : "All";
  const filtered = activeCategory === "All" ? SKILLS : SKILLS.filter((skill) => skill.category === activeCategory);
  return (
    <section id="skills-explorer" className="recruiter-section" aria-labelledby="recruiter-skills-heading">
      <div className="recruiter-section__header">
        <span className="recruiter-section__eyebrow">Technical Skills</span>
        <h2 id="recruiter-skills-heading" className="recruiter-section__title">Skills <span className="recruiter-title-accent">Explorer</span></h2>
        <p className="recruiter-section__subtitle">Explore the work behind each skill, with project context and direct evidence.</p>
      </div>
      <div className="recruiter-filter-bar">
        <label htmlFor="recruiter-skill-category">Skill focus</label>
        <select id="recruiter-skill-category" value={activeCategory} onChange={(event) => setCategory(event.target.value)}>{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select>
        <p role="status" aria-live="polite">{filtered.length} of {SKILLS.length} skills</p>
        {activeCategory !== "All" && <button type="button" onClick={() => setCategory("All")}>Reset filter</button>}
      </div>
      <div className="recruiter-evidence-list">
        {filtered.map((skill) => <article className="recruiter-evidence-row" key={skill.name}>
          <div><span className="recruiter-section__eyebrow">{skill.category}</span><h3>{skill.name}</h3></div>
          <div><p>{skill.description}</p><p className="recruiter-evidence-row__context">Used in: {skill.projects.join(" · ")}</p></div>
          <a href={EVIDENCE[skill.name].href} className="recruiter-text-link">{EVIDENCE[skill.name].label} →</a>
        </article>)}
      </div>
    </section>
  );
};

export default SkillsExplorer;
