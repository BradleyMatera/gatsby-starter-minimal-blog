import * as React from "react";

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
    id: "car-match",
    name: "Car-Match",
    tagline: "Full-stack matchmaking with profiles, forums, and real-time chat",
    category: "Full-Stack",
    description:
      "Built to solve the 'too many disconnected dating features' problem by combining profiles, matching, chat, and forums in one product flow. React frontend, Express API, MongoDB, split deployment on GitHub Pages + Render.",
    tech: ["React", "Express", "MongoDB", "Render", "GitHub Pages", "JWT"],
    metrics: [
      { label: "Response", value: "<400ms" },
      { label: "Stack", value: "MERN" },
    ],
    github: "https://github.com/BradleyMatera/car-match",
    demo: "https://bradleymatera.github.io/car-match/",
  },
  {
    id: "projecthub",
    name: "ProjectHub (Scout)",
    tagline: "Embeddable AI recruiter assistant with grounded answers and free-tier LLM failover",
    category: "AI Systems",
    description:
      "One script tag embeds a chat widget recruiters can use to ask about my projects, AWS internship, skills, and target roles. It builds grounded answers first, then routes open-ended questions through a network of free LLM providers with automatic failover.",
    tech: ["JavaScript", "Node.js", "Express", "GCP e2-micro", "Caddy", "Vite", "Carbon Design System"],
    metrics: [
      { label: "Providers", value: "5+" },
      { label: "Cost", value: "Free tier" },
    ],
    github: "https://github.com/BradleyMatera/ProjectHub",
    demo: "https://bradleymatera.github.io/ProjectHub/",
    caseStudy: "/projecthub-embeddable-ai-recruiter-free-tiers/",
  },
  {
    id: "pokedex",
    name: "Interactive Pokédex",
    tagline: "Gen 1 Pokémon search with build-time + client-side filtering",
    category: "Frontend",
    description:
      "Consumes the public Pokémon REST API with keyboard-friendly filtering, debounced search (300ms), skeleton states, and responsive layouts. Static export for GitHub Pages.",
    tech: ["Next.js", "PokeAPI", "Tailwind", "Static export"],
    metrics: [
      { label: "Indexed", value: "151" },
      { label: "Lighthouse", value: "90+" },
    ],
    github: "https://github.com/BradleyMatera/Interactive-Pokedex",
    demo: "https://bradleymatera.github.io/Interactive-Pokedex/",
  },
  {
    id: "ciris",
    name: "CIRIS AI Contributions",
    tagline: "Open-source ethics-engine docs, Docker, and auth logging",
    category: "Open Source",
    description:
      "Joined CIRIS to reduce contributor onboarding friction by improving docs, local setup with Docker Compose, and adding token-verification logging. Coordinated docs + runtime changes as one contributor journey.",
    tech: ["Node.js", "Express", "MongoDB", "Docker", "JWT"],
    metrics: [
      { label: "Merged", value: "PRs" },
      { label: "Focus", value: "Docs + Docker" },
    ],
    github: "https://github.com/CIRISAI/CIRISNode/pulls?q=is%3Apr+author%3ABradleyMatera",
    demo: "https://github.com/CIRISAI",
  },
  {
    id: "animal-sounds",
    name: "AnimalSounds",
    tagline: "Offline-first wildlife soundboard with browser-persisted favorites",
    category: "Frontend",
    description:
      "Built as an offline-first soundboard so kids and families can tap and learn animal sounds instantly without waiting on network calls. Next.js App Router, NextUI, bundled MP3 assets.",
    tech: ["Next.js", "NextUI", "Tailwind", "Web Audio API", "GitHub Pages"],
    metrics: [
      { label: "Audio", value: "Offline" },
      { label: "Favorites", value: "Persisted" },
    ],
    github: "https://github.com/BradleyMatera/AnimalSounds",
    demo: "https://bradleymatera.github.io/AnimalSounds/",
  },
  {
    id: "convo-ai",
    name: "Convo-AI",
    tagline: "Your AI that learns, remembers, and evolves",
    category: "AI Systems",
    description:
      "A voice-first AI assistant that runs entirely on your machine. It listens with Whisper, thinks with Ollama, remembers with RAG, and speaks with neural TTS. No cloud, no API keys, no limits.",
    tech: [
      "Python",
      "FastAPI",
      "Ollama",
      "faster-whisper",
      "Coqui TTS",
      "nomic-embed-text",
      "React + Vite",
      "Tailwind CSS",
      "SQLite",
    ],
    metrics: [
      { label: "Privacy", value: "100% Local" },
      { label: "Models", value: "8+ Ollama" },
      { label: "Memory", value: "RAG" },
      { label: "Cloud keys", value: "0" },
    ],
    github: "https://github.com/BradleyMatera/Convo-Ai",
    demo: "https://bradleymatera.github.io/Convo-Ai/",
  },
  {
    id: "triangle-shader",
    name: "Triangle Shader Lab",
    tagline: "WebGPU shader experiment with editable TypeScript pipeline",
    category: "Graphics",
    description:
      "A WebGPU-powered shader experiment that renders and animates a triangle in the browser. Built as a learning exercise in modern graphics APIs, GPU buffers, and WGSL shaders.",
    tech: ["WebGPU", "WGSL", "TypeScript", "Canvas"],
    metrics: [
      { label: "API", value: "WebGPU" },
      { label: "Pipeline", value: "Editable" },
    ],
    github: "https://github.com/BradleyMatera/TriangleDemo",
    demo: "https://bradleymatera.github.io/TriangleDemo/",
  },
  {
    id: "ethics-frontend",
    name: "EthicsFrontEndDemo",
    tagline: "Secrets, environment variables, and security patterns tutorial",
    category: "Education",
    description:
      "A live tutorial demonstrating front-end patterns for handling environment variables and secrets safely. Covers .env usage, build-time injection, and client-side exposure pitfalls.",
    tech: ["JavaScript", "Node.js", "Security", "GitHub Pages"],
    metrics: [
      { label: "Topic", value: "Secrets" },
      { label: "Format", value: "Interactive" },
    ],
    github: "https://github.com/BradleyMatera/EthicsFrontEndDemo",
    demo: "https://bradleymatera.github.io/EthicsFrontEndDemo/",
  },
  {
    id: "cheese-math",
    name: "CheeseMath",
    tagline: "Multi-tool calculator rebuilt with Jest and modern Next.js",
    category: "Tools",
    description:
      "Rebuilt a legacy React calculator in Next.js with Tailwind + NextUI while preserving Jest coverage. Includes regex and card-check utilities.",
    tech: ["JavaScript", "TypeScript", "Jest", "Next.js", "Tailwind"],
    metrics: [
      { label: "Tests", value: "Jest" },
      { label: "Versions", value: "2" },
    ],
    github: "https://github.com/BradleyMatera/CheeseMath-Jest-Tests",
    demo: "https://bradleymatera.github.io/CheeseMath-Jest-Tests/",
  },
  {
    id: "obj-parser",
    name: "OBJ Parser",
    tagline: "Zig parsing lab for OBJ/MTL geometry files",
    category: "Systems",
    description:
      "Built to learn Zig by parsing real geometry files instead of reading only toy examples. Explicit memory management and binary-safe parsing paths.",
    tech: ["Zig"],
    metrics: [
      { label: "Format", value: "OBJ+MTL" },
      { label: "Memory", value: "Manual" },
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

const CATEGORIES = ["All", "Full-Stack", "Frontend", "AI Systems", "Open Source", "Graphics", "Education", "Tools", "Systems"];

const ProjectExplorer: React.FC = () => {
  const [activeProject, setActiveProject] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filtered = React.useMemo(
    () =>
      activeCategory === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="project-explorer" className="recruiter-section recruiter-section--media reveal-section">
      {/* Background media layer */}
      <div className="recruiter-section__media" aria-hidden="true">
        <video
          className="recruiter-section__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-amazon-2000.webp"
        >
          <source src="/project-explorer.mp4" type="video/mp4" />
        </video>
        <div className="recruiter-section__media-overlay" />
      </div>

      <div className="recruiter-section__content">
        <div className="recruiter-section__header">
          <span className="recruiter-section__eyebrow">Projects</span>
          <h2 className="recruiter-section__title">
            Project <span className="recruiter-title-accent">Explorer</span>
          </h2>
          <p className="recruiter-section__subtitle">
            All live demos, repos, and case studies in one place. Tap a card to expand details.
          </p>
        </div>

        {/* Category filter */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setActiveProject(null);
            }}
            className="recruiter-btn magnetic-btn"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.8125rem",
              borderRadius: 9999,
              border: "1px solid",
              borderColor:
                activeCategory === cat ? "var(--r-accent)" : "var(--r-border)",
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

      <div
        className="recruiter-grid reveal-child recruiter-grid--2"
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        {filtered.map((project) => {
          const isActive = activeProject === project.id;

          return (
            <div
              key={project.id}
              className="recruiter-card"
              style={{
                cursor: "pointer",
                transition: "border-color 0.2s ease",
                borderColor: isActive ? "var(--r-accent)" : undefined,
              }}
              onClick={() => setActiveProject(isActive ? null : project.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveProject(isActive ? null : project.id);
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
                <div>
                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      marginBottom: "0.125rem",
                      color: "var(--r-text)",
                    }}
                  >
                    {project.name}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--r-accent)",
                      fontWeight: 600,
                    }}
                  >
                    {project.tagline}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    padding: "0.125rem 0.5rem",
                    borderRadius: 9999,
                    background: "var(--r-accent-light)",
                    color: "var(--r-accent)",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {project.category}
                </span>
              </div>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--r-text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "0.875rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {project.description}
              </p>

              {/* Inline expand */}
              {isActive && (
                <div
                  style={{
                    marginTop: "0.875rem",
                    paddingTop: "0.875rem",
                    borderTop: "1px solid var(--r-border)",
                  }}
                >
                  {/* Metrics */}
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div
                          style={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "var(--r-text)",
                          }}
                        >
                          {m.value}
                        </div>
                        <div
                          style={{
                            fontSize: "0.6875rem",
                            color: "var(--r-text-muted)",
                          }}
                        >
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.375rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {project.tech.map((t) => (
                      <span key={t} className="recruiter-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div style={{ display: "flex", gap: "0.625rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="recruiter-btn magnetic-btn recruiter-btn--secondary"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub →
                  </a>
                )}
                {project.caseStudy && (
                  <a
                    href={project.caseStudy}
                    className="recruiter-btn magnetic-btn recruiter-btn--secondary"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Build Post →
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="recruiter-btn magnetic-btn recruiter-btn--primary"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
};

export default ProjectExplorer;
