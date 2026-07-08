import * as React from "react";

/* --------------------------------------------------------------------------
   Technical Writing — Featured blog posts for recruiters.
   -------------------------------------------------------------------------- */

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  tags: string[];
  slug: string;
};

const ARTICLES: Article[] = [
  {
    id: "cloud-ready-web",
    title: "Building Cloud-Ready Web Experiences",
    excerpt:
      "How I approach architecture decisions when building for scale, cost, and maintainability on AWS.",
    category: "Cloud",
    readTime: "8 min",
    tags: ["AWS", "Architecture", "Scalability"],
    slug: "/cloud-ready-web-experiences/",
  },
  {
    id: "docker-multilang",
    title: "Docker Multi-Language Projects",
    excerpt:
      "Patterns for running multiple runtimes in a single containerized codebase without conflicts.",
    category: "DevOps",
    readTime: "6 min",
    tags: ["Docker", "CI/CD", "Node.js", "Python"],
    slug: "/containerizing-multi-language-projects-with-docker-a-practical-guide/",
  },
  {
    id: "aws-vs-azure",
    title: "AWS vs Azure vs Google Cloud",
    excerpt:
      "A practical comparison of the big three cloud providers from a junior developer learning cloud fundamentals.",
    category: "Cloud",
    readTime: "12 min",
    tags: ["AWS", "Azure", "GCP", "Comparison"],
    slug: "/aws-vs-azure-vs-google-cloud/",
  },
  {
    id: "systems-that-ship",
    title: "Designing Systems That Actually Ship",
    excerpt:
      "The difference between architecture diagrams and production code — and how to bridge the gap.",
    category: "Engineering",
    readTime: "10 min",
    tags: ["Architecture", "Shipping", "Teamwork"],
    slug: "/designing-systems-that-actually-ship/",
  },
  {
    id: "learn-by-doing",
    title: "How I Learn by Doing",
    excerpt:
      "My approach to picking up new technologies: build first, document second, teach third.",
    category: "Career",
    readTime: "5 min",
    tags: ["Learning", "Career", "Mindset"],
    slug: "/how-i-learn-by-doing/",
  },
  {
    id: "webgpu-triangle",
    title: "Making a WebGPU Triangle Demo Match Reality",
    excerpt:
      "Deep dive into WebGPU shader programming and the math behind realistic 3D rendering.",
    category: "Frontend",
    readTime: "15 min",
    tags: ["WebGPU", "3D", "Graphics", "TypeScript"],
    slug: "/making-triangle-webgpu-demo-match-reality/",
  },
];

const CATEGORIES = ["All", "Cloud", "DevOps", "Engineering", "Career", "Frontend"];

const TechnicalWriting: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filtered = React.useMemo(
    () =>
      activeCategory === "All"
        ? ARTICLES
        : ARTICLES.filter((a) => a.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="technical-writing" className="recruiter-section reveal-section">
      <div className="recruiter-section__header">
        <div className="recruiter-section__eyebrow">Technical Writing</div>
        <h2 className="recruiter-section__title">
          Articles by <span className="recruiter-gradient-text">Bradley</span>
        </h2>
        <p className="recruiter-section__subtitle">
          Deep dives into architecture, cloud, and frontend engineering. Written for engineers, valuable for recruiters.
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
            onClick={() => setActiveCategory(cat)}
            className="recruiter-btn magnetic-btn"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.8125rem",
              borderRadius: 9999,
              border: "1px solid",
              borderColor:
                activeCategory === cat
                  ? "var(--recruiter-purple)"
                  : "var(--recruiter-border)",
              background:
                activeCategory === cat
                  ? "rgba(167,139,250,0.12)"
                  : "rgba(255,255,255,0.04)",
              color:
                activeCategory === cat
                  ? "var(--recruiter-purple)"
                  : "var(--recruiter-text-secondary)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="recruiter-grid reveal-child recruiter-grid--2" style={{ maxWidth: 900, margin: "0 auto" }}>
        {filtered.map((article) => (
          <a
            key={article.id}
            href={article.slug}
            className="recruiter-glass reveal-child"
            style={{
              padding: "1.5rem",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--recruiter-purple)",
                }}
              >
                {article.category}
              </span>
              <span style={{ color: "var(--recruiter-border)" }}>•</span>
              <span style={{ fontSize: "0.75rem", color: "var(--recruiter-text-muted)" }}>
                {article.readTime} read
              </span>
            </div>

            <h3
              style={{
                fontSize: "1.0625rem",
                fontWeight: 700,
                color: "var(--recruiter-text)",
                margin: 0,
                lineHeight: 1.35,
              }}
            >
              {article.title}
            </h3>

            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--recruiter-text-secondary)",
                lineHeight: 1.55,
                flex: 1,
              }}
            >
              {article.excerpt}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.6875rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.05)",
                    color: "var(--recruiter-text-muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TechnicalWriting;
