import * as React from "react";

/* --------------------------------------------------------------------------
   Resource Library — Curated real documents from the Resumes folder.
   All documents open in a new browser tab for viewing.
   -------------------------------------------------------------------------- */

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "pdf" | "link" | "image";
  path?: string;
  url?: string;
  badge?: string;
};

const RESOURCES: Resource[] = [
  // ─── RESUMES (curated to most relevant) ───
  {
    id: "resume-canonical",
    title: "Junior Software Engineer Resume",
    description: "Canonical current resume. Targeted for junior software engineering roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Junior-Software-Engineer.pdf",
    badge: "Primary",
  },
  {
    id: "resume-cloud-support",
    title: "Cloud Support Engineer Resume",
    description: "Tailored for cloud support and AWS-adjacent roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Cloud-Support-Engineer.pdf",
  },
  {
    id: "resume-web-dev",
    title: "Web Developer Resume",
    description: "Focused on web development positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Web-Developer.pdf",
  },
  {
    id: "resume-technical-support",
    title: "Technical Support Resume",
    description: "Emphasizes troubleshooting, documentation, and support skills.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Technical-Support.pdf",
  },
  {
    id: "resume-ai-automation",
    title: "AI Automation Engineer Resume",
    description: "Targeted for AI and automation-focused roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-AI-Automation-Engineer.pdf",
  },
  {
    id: "resume-data-engineer",
    title: "Data Engineer Resume",
    description: "Focused on data engineering and analysis roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Data-Engineer.pdf",
  },
  {
    id: "resume-devops",
    title: "DevOps / Cloud Operations Resume",
    description: "Tailored for DevOps and cloud operations positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-DevOps-Cloud-Operations.pdf",
  },
  {
    id: "resume-frontend",
    title: "Frontend / UI Developer Resume",
    description: "Focused on frontend and user interface development.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Frontend-UI-Developer.pdf",
  },
  {
    id: "resume-backend",
    title: "Backend Developer Resume",
    description: "Targeted for backend development roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Backend-Developer.pdf",
  },
  {
    id: "resume-it-support",
    title: "IT Support Resume",
    description: "Focused on IT support and help desk positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-IT-Support.pdf",
  },
  {
    id: "resume-erp",
    title: "ERP Support Specialist Resume",
    description: "Tailored for ERP software support roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-ERP-Support-Specialist.pdf",
  },
  {
    id: "resume-legal-ai",
    title: "Legal AI Engineer Resume",
    description: "Focused on legal AI and automation roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Legal-AI-Engineer.pdf",
  },
  {
    id: "resume-project-coordinator",
    title: "Project Coordinator Resume",
    description: "Focused on project coordination and management.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Project-Coordinator.pdf",
  },
  {
    id: "resume-business-analyst",
    title: "Business Analyst Resume",
    description: "Tailored for business analysis roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Business-Analyst.pdf",
  },
  {
    id: "resume-junior-data",
    title: "Junior Data Engineer Resume",
    description: "Focused on entry-level data engineering positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Junior-Data-Engineer.pdf",
  },
  {
    id: "resume-junior-qa",
    title: "Junior QA Engineer Resume",
    description: "Focused on quality assurance and testing roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Junior-QA-Engineer.pdf",
  },
  {
    id: "resume-ai-ml",
    title: "AI / ML Support Resume",
    description: "Targeted for AI and machine learning support positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-AI-ML-Support.pdf",
  },
  {
    id: "resume-app-support",
    title: "Application Support Engineer Resume",
    description: "Targeted for application support positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Application-Support-Engineer.pdf",
  },
  {
    id: "resume-cloud-tech",
    title: "Cloud Support Technician Resume",
    description: "Focused on cloud support technician roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Cloud-Support-Technician.pdf",
  },
  {
    id: "resume-associate-support",
    title: "Associate Software Support Resume",
    description: "Tailored for associate-level software support.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Associate-Software-Support-Specialist.pdf",
  },
  // ─── EDUCATION ───
  {
    id: "licenses-certifications",
    title: "Licenses & Certifications",
    description: "AWS Solutions Architect Associate, AWS AI Practitioner, freeCodeCamp certificates, and Full Sail diploma.",
    category: "Education",
    type: "pdf",
    path: "/documents/education/Licenses%20%26%20certifications.pdf",
    badge: "Verified",
  },
  {
    id: "salutatorian-certificate",
    title: "Salutatorian Certificate",
    description: "Academic achievement recognition.",
    category: "Education",
    type: "image",
    path: "/documents/education/Salutatorian-certificate.jpeg",
  },
  {
    id: "webdev-diploma",
    title: "Web Development Diploma",
    description: "Full Sail University Web Development diploma.",
    category: "Education",
    type: "image",
    path: "/documents/education/WebDevDip.jpeg",
  },
  // ─── TRANSCRIPTS (one only) ───
  {
    id: "transcript-fullsail",
    title: "Full Sail University Transcript",
    description: "Official university transcript showing completed coursework and degree conferral.",
    category: "Transcripts",
    type: "pdf",
    path: "/documents/transcripts/TRPF3QGL-FullSailTranscripts.pdf",
    badge: "Official",
  },
  // ─── LINKS ───
  {
    id: "github-profile",
    title: "GitHub Profile",
    description: "Open source contributions, project repos, commit history, and collaboration.",
    category: "Links",
    type: "link",
    url: "https://github.com/BradleyMatera",
    badge: "Live",
  },
  {
    id: "linkedin-profile",
    title: "LinkedIn Profile",
    description: "Professional profile with experience, recommendations, and endorsements.",
    category: "Links",
    type: "link",
    url: "https://www.linkedin.com/in/bradmatera",
    badge: "Live",
  },
];

const CATEGORIES = [
  "All",
  "Resumes",
  "Education",
  "Transcripts",
  "Links",
];

const ResourceLibrary: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filtered = React.useMemo(() => {
    return RESOURCES.filter((r) => {
      const matchesCategory = activeCategory === "All" || r.category === activeCategory;
      const matchesSearch =
        search.trim() === "" ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <section id="resource-library" className="recruiter-section reveal-section">
      <div className="recruiter-section__header">
        <div className="recruiter-section__eyebrow">Document Library</div>
        <h2 className="recruiter-section__title">
          All Documents, <span className="recruiter-gradient-text">One Place</span>
        </h2>
        <p className="recruiter-section__subtitle">
          Every resume, transcript, and certificate — viewable in your browser. No downloads required.
        </p>
      </div>

      {/* Search */}
      <div className="recruiter-search">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--recruiter-text-muted)"
          strokeWidth="2"
          style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          className="recruiter-search__input"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search documents"
        />
      </div>

      {/* Category tabs */}
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

      {/* Document count */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "0.875rem", color: "var(--recruiter-text-muted)" }}>
        Showing {filtered.length} of {RESOURCES.length} documents
      </div>

      {/* Grid */}
      <div className="recruiter-grid reveal-child recruiter-grid--3" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {filtered.map((resource) => (
          <DocumentCard key={resource.id} resource={resource} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--recruiter-text-muted)" }}>
          No documents match your search. Try a different keyword.
        </div>
      )}
    </section>
  );
};

const DocumentCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const isViewable = resource.type === "pdf" || resource.type === "image";
  const href = resource.type === "link" ? resource.url : resource.path;

  return (
    <div
      className="recruiter-glass reveal-child"
      style={{
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        transition: "transform 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
        {resource.badge && (
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "0.25rem 0.5rem",
              borderRadius: 4,
              background: "rgba(167,139,250,0.15)",
              color: "var(--recruiter-purple)",
            }}
          >
            {resource.badge}
          </span>
        )}
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--recruiter-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {resource.type === "pdf" ? "📄 PDF" : resource.type === "image" ? "🖼️ Image" : "🔗 Link"}
        </span>
      </div>

      <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--recruiter-text)", margin: 0, lineHeight: 1.35 }}>
        {resource.title}
      </h3>

      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--recruiter-text-secondary)",
          lineHeight: 1.55,
          flex: 1,
          margin: 0,
        }}
      >
        {resource.description}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--recruiter-border)",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "var(--recruiter-text-muted)" }}>
          {resource.category}
        </span>
        <a
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="recruiter-btn magnetic-btn"
          style={{
            padding: "0.375rem 0.875rem",
            fontSize: "0.8125rem",
            borderRadius: "0.5rem",
            background: "rgba(96,165,250,0.12)",
            color: "var(--recruiter-blue)",
            border: "none",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          {isViewable ? "View →" : "Open →"}
        </a>
      </div>
    </div>
  );
};

export default ResourceLibrary;
