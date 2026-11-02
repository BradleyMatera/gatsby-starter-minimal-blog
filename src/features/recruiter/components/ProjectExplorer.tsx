import * as React from "react";
import { projectMedia } from "../../projects/projectMedia";
import { useRecruiterFilter } from "../hooks/useRecruiterFilter";

/* --------------------------------------------------------------------------
   Project Explorer — All projects consolidated from the old /projects page.
   Each card is expandable inline with metrics, stack, and proof links.
   -------------------------------------------------------------------------- */

type Project = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  github?: string;
  demo?: string;
  caseStudy?: string;
};

const PROJECTS: Project[] = [
  {
    id: "aws-metadata-workflow",
    name: "AWS Serverless Metadata Workflow",
    tagline: "Event-driven metadata pipeline — S3, Lambda, DynamoDB, retries, monitoring",
    category: "Cloud",
    description:
      "A public reconstruction and expansion of an architecture I built during an AWS Support Engineering internship. S3 uploads invoke a Python Lambda that normalizes object metadata and writes it to DynamoDB with deterministic identity and duplicate-safe conditional logic. AWS SAM defines retries, an encrypted SQS failure destination, CloudWatch alarms, and least-privilege infrastructure.",
    tech: ["AWS Lambda", "Amazon S3", "DynamoDB", "SQS", "CloudWatch", "AWS SAM", "Python", "GitHub Actions"],
    metrics: [
      { label: "Tests", value: "11" },
      { label: "Coverage", value: "100%" },
      { label: "Commits", value: "114" },
    ],
    github: "https://github.com/BradleyMatera/AWS-Serverless-Metadata-Workflow",
    demo: "https://bradleymatera.github.io/AWS-Serverless-Metadata-Workflow/",
    caseStudy: "/projects/aws-serverless-metadata-workflow/",
  },
  {
    id: "car-match",
    name: "Car-Match",
    tagline: "Full-stack community MVP — profiles, forums, events, messaging",
    category: "Full-Stack",
    description:
      "A React frontend with an Express backend, built as a Full Sail University course project. Frontend on GitHub Pages, backend on Google Cloud Run (free tier). Forums are mock-backed by default and persist when MongoDB is configured. 100+ commits, Docker support, and full docs in the repo.",
    tech: ["React", "Express", "MongoDB", "Google Cloud Run", "GitHub Pages", "JWT", "Docker"],
    metrics: [
      { label: "Commits", value: "100+" },
      { label: "Stack", value: "MERN" },
      { label: "Status", value: "MVP" },
    ],
    github: "https://github.com/BradleyMatera/car-match",
    demo: "https://bradleymatera.github.io/car-match/",
  },
  {
    id: "projecthub",
    name: "ProjectHub (Scout)",
    tagline: "Embeddable AI chat widget — one script tag, free-tier LLM providers",
    category: "AI Systems",
    description:
      "An embeddable AI chat widget that recruiters can use to ask about my projects, skills, and background. It builds grounded answers from a synced GitHub knowledge base first, then routes open-ended questions through free LLM providers with automatic failover. 100+ commits, JavaScript (479KB) + Python (39KB), deployed on GitHub Pages.",
    tech: ["JavaScript", "Python", "Vite", "GitHub Pages", "Free-tier LLMs"],
    metrics: [
      { label: "Commits", value: "100+" },
      { label: "Cost", value: "Free tier" },
      { label: "Embed", value: "1 script tag" },
    ],
    github: "https://github.com/BradleyMatera/ProjectHub",
    demo: "https://bradleymatera.github.io/ProjectHub/",
    caseStudy: "/projecthub-embeddable-ai-recruiter-free-tiers/",
  },
  {
    id: "pokedex",
    name: "Interactive Pokédex",
    tagline: "Static Next.js 16 app — 151 Pokémon with build-time data and client-side search",
    category: "Frontend",
    description:
      "A Next.js 16 static export that fetches PokéAPI data at build time and prerenders 151 detail pages. Client-side search and filtering with React context providers. Tailwind CSS v4 + NextUI. Deployed to GitHub Pages via GitHub Actions.",
    tech: ["Next.js 16", "TypeScript", "PokeAPI", "Tailwind v4", "NextUI", "Static export"],
    metrics: [
      { label: "Pokémon", value: "151" },
      { label: "Status", value: "Live" },
      { label: "Export", value: "Static" },
    ],
    github: "https://github.com/BradleyMatera/Interactive-Pokedex",
    demo: "https://bradleymatera.github.io/Interactive-Pokedex/",
  },
  {
    id: "ciris",
    name: "CIRIS AI Contributions",
    tagline: "Open-source backend code — Python, JWT auth, API routes, deferral system",
    category: "Open Source",
    description:
      "Submitted 10 PRs to CIRISNode (the CIRIS Ethics Engine backend, written in Python). 7 were merged. Work included implementing JWT authentication, building benchmark/DID/WA API routes, creating a deferral system, and refactoring the API route structure. Not just docs — real backend code.",
    tech: ["Python", "TypeScript", "Docker", "JWT", "FastAPI"],
    metrics: [
      { label: "PRs", value: "10" },
      { label: "Merged", value: "7" },
      { label: "Focus", value: "Backend" },
    ],
    github: "https://github.com/CIRISAI/CIRISNode/pulls?q=is%3Apr+author%3ABradleyMatera",
    demo: "https://github.com/CIRISAI/CIRISNode",
  },
  {
    id: "animal-sounds",
    name: "AnimalSounds",
    tagline: "Offline-first soundboard — Next.js 14 + Bun, bundled MP3s, localStorage favorites",
    category: "Frontend",
    description:
      "A static Next.js 14 soundboard built with Bun, NextUI, and Tailwind. Audio ships as bundled MP3s in public/audio so it works offline. Favorites and local analytics persist in localStorage. Optional Pexels photo enrichment for dev. Deployed to GitHub Pages. 23 commits, MIT licensed.",
    tech: ["Next.js 14", "Bun", "NextUI", "Tailwind", "localStorage", "GitHub Pages"],
    metrics: [
      { label: "Commits", value: "23" },
      { label: "Audio", value: "Offline" },
      { label: "License", value: "MIT" },
    ],
    github: "https://github.com/BradleyMatera/AnimalSounds",
    demo: "https://bradleymatera.github.io/AnimalSounds/",
  },
  {
    id: "convo-ai",
    name: "Convo-AI",
    tagline: "Local-first voice AI — Whisper, Ollama, Coqui TTS, all on your machine",
    category: "AI Systems",
    description:
      "A local-first, voice-enabled conversational AI assistant. It listens with faster-whisper, thinks with a local Ollama LLM, remembers with RAG over SQLite, and speaks with Coqui TTS. No cloud API keys, no telemetry. Ships with a FastAPI WebSocket server, Python CLI, React + Tailwind web UI, and Docker support. 15 commits, MIT licensed.",
    tech: ["Python", "FastAPI", "Ollama", "faster-whisper", "Coqui TTS", "React + Vite", "Tailwind", "SQLite", "Docker"],
    metrics: [
      { label: "Commits", value: "15" },
      { label: "Privacy", value: "100% Local" },
      { label: "License", value: "MIT" },
    ],
    github: "https://github.com/BradleyMatera/Convo-Ai",
    demo: "https://bradleymatera.github.io/Convo-Ai/",
  },
  {
    id: "triangle-shader",
    name: "Triangle Shader Lab",
    tagline: "WebGPU lab — 16 interactive lessons, WGSL editor, pipeline visualizer",
    category: "Graphics",
    description:
      "A WebGPU learning lab built with Next.js 16, Bun, NextUI, and Tailwind. Three canonical demos on the landing page (hello triangle, two-cubes, textured cube) plus a full /lab section with 16 interactive lessons, a WGSL editor, pipeline visualizer, geometry lab, lighting/texture modules, and performance analytics. 63 commits. Honest note: this repo started as a fork of an old leaf-js branch but has been completely rewritten — no shared code with the original.",
    tech: ["WebGPU", "WGSL", "Next.js 16", "TypeScript", "Bun", "NextUI", "Tailwind"],
    metrics: [
      { label: "Commits", value: "63" },
      { label: "Lessons", value: "16" },
      { label: "Demos", value: "3" },
    ],
    github: "https://github.com/BradleyMatera/TriangleDemo",
    demo: "https://bradleymatera.github.io/TriangleDemo/",
  },
  {
    id: "ethics-frontend",
    name: "SecureLearn LMS",
    tagline: "Interactive LMS for teaching secrets management — courses, quizzes, labs, certificates",
    category: "Education",
    description:
      "An interactive Learning Management System for teaching secrets management to developers. Structured curriculum with modules and lessons, hands-on terminal-based labs, quizzes after each lesson, verifiable certificates with unique verification numbers, and role-based dashboards (student, instructor, admin). Built with Next.js 15, HeroUI, TypeScript, and Tailwind. 47 commits.",
    tech: ["Next.js 15", "TypeScript", "HeroUI", "Tailwind", "Docker"],
    metrics: [
      { label: "Commits", value: "47" },
      { label: "Roles", value: "3" },
      { label: "Format", value: "LMS" },
    ],
    github: "https://github.com/BradleyMatera/EthicsFrontEndDemo",
    demo: "https://bradleymatera.github.io/EthicsFrontEndDemo/",
  },
  {
    id: "cheese-math",
    name: "CheeseMath",
    tagline: "Calculator suite — math, string manipulation, regex, card validation",
    category: "Tools",
    description:
      "An advanced calculator suite with two versions in one repo: the original React 18 app with Jest and Selenium tests (preserved for reference), and a Next.js 16 rebuild with TypeScript, Bun, NextUI, Tailwind, and Framer Motion. Includes math tools, string manipulation, regex analysis, and credit card validation. 40 commits, MIT licensed.",
    tech: ["Next.js 16", "TypeScript", "Bun", "NextUI", "Tailwind", "Framer Motion"],
    metrics: [
      { label: "Commits", value: "40" },
      { label: "Versions", value: "2" },
      { label: "License", value: "MIT" },
    ],
    github: "https://github.com/BradleyMatera/CheeseMath-Jest-Tests",
    demo: "https://bradleymatera.github.io/CheeseMath-Jest-Tests/",
  },
  {
    id: "obj-parser",
    name: "OBJ Parser",
    tagline: "Zig parsing lab — OBJ/MTL files to binary format, 2 commits",
    category: "Systems",
    description:
      "A small Zig project that reads Wavefront OBJ files, optionally reads MTL material files, and converts them to an optimized binary format with verification tools. Built to learn Zig's explicit memory management and binary-safe parsing. Honest note: this is a very small project — 2 commits, 21KB of Zig code, no GitHub Pages deployment. It's a learning exercise, not a production tool.",
    tech: ["Zig"],
    metrics: [
      { label: "Commits", value: "2" },
      { label: "Format", value: "OBJ+MTL" },
      { label: "Size", value: "21KB" },
    ],
    github: "https://github.com/BradleyMatera/obj-parser",
  },
  {
    id: "codepen",
    name: "CodePen Collection",
    tagline: "UI pattern demos, accessibility examples, and layout experiments",
    category: "Frontend",
    description:
      "I use CodePen as a quick UX lab to test interactions before committing larger features to production repos. Small isolated experiments make UI decisions faster.",
    tech: ["HTML", "CSS", "JavaScript"],
    metrics: [
      { label: "Type", value: "Demos" },
      { label: "Scope", value: "UI Patterns" },
    ],
    demo: "https://codepen.io/student-account-bradley-matera",
  },
];

const CATEGORIES = ["All", "Cloud", "Full-Stack", "Frontend", "AI Systems", "Open Source", "Graphics", "Education", "Tools", "Systems"];

const PROJECT_PAGES: Record<string, string> = {
  "aws-metadata-workflow": "aws-serverless-metadata-workflow", "car-match": "car-match",
  projecthub: "projecthub", pokedex: "interactive-pokedex", ciris: "ciris-ai",
  "animal-sounds": "animal-sounds", "convo-ai": "convo-ai", "triangle-shader": "triangle-shader-lab",
  "cheese-math": "cheesemath", "obj-parser": "obj-parser", "ethics-frontend": "securelearn-lms",
};

const ProjectExplorer: React.FC = () => {
  const [category, setCategory] = useRecruiterFilter("project-category");
  const activeCategory = CATEGORIES.includes(category) ? category : "All";
  const filtered = activeCategory === "All" ? PROJECTS : PROJECTS.filter((project) => project.category === activeCategory);
  return (
    <section id="project-explorer" className="recruiter-section" aria-labelledby="recruiter-projects-heading">
      <div className="recruiter-section__header">
        <span className="recruiter-section__eyebrow">Projects</span>
        <h2 id="recruiter-projects-heading" className="recruiter-section__title">Project <span className="recruiter-title-accent">Explorer</span></h2>
        <p className="recruiter-section__subtitle">All live demos, repos, and case studies in one place. Open a write-up or explore the details below.</p>
      </div>
      <div className="recruiter-filter-bar">
        <label htmlFor="recruiter-project-category">Project focus</label>
        <select id="recruiter-project-category" value={activeCategory} onChange={(event) => setCategory(event.target.value)}>
          {CATEGORIES.map((item) => <option key={item}>{item}</option>)}
        </select>
        <p role="status" aria-live="polite">{filtered.length} of {PROJECTS.length} projects</p>
        {activeCategory !== "All" && <button type="button" onClick={() => setCategory("All")}>Reset filter</button>}
      </div>
      <div className="recruiter-project-grid">
        {filtered.map((project, index) => {
          const page = PROJECT_PAGES[project.id];
          const writeup = page ? `/projects/${page}/` : project.caseStudy;
          const media = projectMedia[writeup || project.demo || ""];
          return (
            <article className="recruiter-project-card" key={project.id}>
              {media?.src && <figure className="recruiter-project-card__media">
                <a className="recruiter-project-card__image-link" href={media.src} target="_blank" rel="noopener noreferrer" aria-label={`View full-size ${media.kind.toLowerCase()}: ${project.name}`}>
                  <span className="recruiter-project-card__image-label"><span>{media.kind}</span><span aria-hidden="true">↗</span></span>
                  <img src={media.src} alt={media.alt} width="1440" height="900" loading={index < 3 ? "eager" : "lazy"} decoding="async" />
                </a>
                <figcaption>{media.caption}</figcaption>
              </figure>}
              <div className="recruiter-project-card__heading">
                <span className="recruiter-tag">{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.tagline}</p>
              </div>
              <div className="recruiter-actions recruiter-project-card__actions">
                {writeup && <a href={writeup} className="recruiter-btn recruiter-btn--primary" aria-label={`Read ${project.name} case study`}>Case study →</a>}
                {project.demo && <a href={project.demo} className="recruiter-text-link" target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} demo in a new tab`}>Demo ↗</a>}
                {project.github && <a href={project.github} className="recruiter-text-link" target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} source in a new tab`}>Source ↗</a>}
              </div>
              <details className="recruiter-details">
                <summary>Details and technical stack</summary>
                <p>{project.description}</p>
                <dl className="recruiter-project-facts">{project.metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
                <ul className="recruiter-tag-list" aria-label="Technical stack">{project.tech.map((tech) => <li key={tech} className="recruiter-tag">{tech}</li>)}</ul>
                {project.caseStudy && project.caseStudy !== writeup && <a href={project.caseStudy}>Related write-up →</a>}
              </details>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectExplorer;
