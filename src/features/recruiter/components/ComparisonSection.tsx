import * as React from "react";

/* --------------------------------------------------------------------------
   Comparison Section — Bradley vs typical candidate.
   -------------------------------------------------------------------------- */

const TYPICAL = [
  "PDF resume only",
  "GitHub with few commits",
  "No architecture documentation",
  "No blog or writing samples",
  "No certifications listed",
  "No project demos",
  "No interview prep materials",
  "Generic LinkedIn profile",
  "No technical explanations",
  "Scattered across platforms",
];

const BRADLEY = [
  "Interactive resume + downloadable PDFs",
  "Active GitHub with production projects",
  "Architecture diagrams for every major project",
  "15+ technical articles on cloud, frontend, and AI",
  "AWS certifications with verification links",
  "Real project documentation and internship experience",
  "Interview cheat sheet and project summary packets",
  "Detailed LinkedIn with recommendations and endorsements",
  "Deep technical explanations in every project card",
  "Everything lives on one curated page: bradleymatera.dev/recruiter",
];

const ComparisonSection: React.FC = () => {
  return (
    <section id="comparison" className="recruiter-section reveal-section">
      <div className="recruiter-section__header">
        <div className="recruiter-section__eyebrow">The Difference</div>
        <h2 className="recruiter-section__title">
          Typical Candidate vs <span className="recruiter-gradient-text">Bradley Matera</span>
        </h2>
        <p className="recruiter-section__subtitle">
          See why recruiters spend more time here than on any other candidate page.
        </p>
      </div>

      <div
        className="recruiter-grid reveal-child recruiter-grid--2"
        style={{ maxWidth: 900, margin: "0 auto", alignItems: "start" }}
      >
        {/* Typical */}
        <div
          className="recruiter-glass reveal-child"
          style={{
            padding: "2rem",
            opacity: 0.7,
            borderColor: "rgba(248,113,113,0.2)",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: "#f87171",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>✕</span> Typical Candidate
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {TYPICAL.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  fontSize: "0.875rem",
                  color: "var(--recruiter-text-secondary)",
                }}
              >
                <span style={{ color: "#f87171", flexShrink: 0 }}>✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bradley */}
        <div
          className="recruiter-glass reveal-child"
          style={{
            padding: "2rem",
            borderColor: "rgba(52,211,153,0.2)",
            background: "linear-gradient(145deg, rgba(52,211,153,0.04) 0%, rgba(13,13,18,0.72) 60%)",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: "#34d399",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>✓</span> Bradley Matera
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {BRADLEY.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  fontSize: "0.875rem",
                  color: "var(--recruiter-text)",
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#34d399", flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
