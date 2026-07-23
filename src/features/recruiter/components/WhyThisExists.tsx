import * as React from "react";

/* --------------------------------------------------------------------------
   Why This Exists — Explain the value proposition for recruiters.
   -------------------------------------------------------------------------- */

const RecruiterPainPoints: React.FC = () => {
  const painPoints = [
    "Endless email threads chasing documents",
    "Scattered portfolios across five platforms",
    "Resumes that don't tell the full story",
    "Unclear technical depth or project ownership",
    "Time lost piecing together a candidate profile",
  ];

  const solutions = [
    "Everything lives in one place",
    "Verified experience with source-of-truth documents",
    "Project details with honest scope and outcomes",
    "Certifications listed with dates and verification paths",
    "Clear timeline with real roles and dates",
  ];

  return (
    <section id="why-this-exists" className="recruiter-section recruiter-section--media reveal-section">
      {/* Background media layer */}
      <div className="recruiter-section__media" aria-hidden="true">
        <img
          className="recruiter-section__video recruiter-ken-burns"
          src="/about-header-graphic.webp"
          alt="Abstract header graphic — background for the Why I Built This section"
          aria-hidden="true"
        />
        <div className="recruiter-section__media-overlay" />
      </div>

      <div className="recruiter-section__content">
        <div className="recruiter-section__header">
          <div className="recruiter-section__eyebrow">Why I Built This</div>
          <h2 className="recruiter-section__title">
            Recruiting shouldn't feel like <span className="recruiter-gradient-text">detective work</span>
          </h2>
          <p className="recruiter-section__subtitle">
            Hiring managers spend too much time piecing together candidate stories from scattered sources.
            I built this hub to eliminate every friction point in evaluating me as a candidate.
          </p>
        </div>

      <div className="recruiter-grid reveal-child recruiter-grid--2" style={{ maxWidth: 960, margin: "0 auto" }}>
        <div className="recruiter-glass reveal-child" style={{ padding: "2rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--recruiter-text)" }}>
            The typical candidate experience
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {painPoints.map((point) => (
              <li
                key={point}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid var(--recruiter-border)",
                  color: "var(--recruiter-text-secondary)",
                  fontSize: "0.9375rem",
                }}
              >
                <span style={{ color: "var(--r-error)", flexShrink: 0, marginTop: 2 }}>✕</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="recruiter-glass reveal-child"
          style={{
            padding: "2rem",
            borderColor: "rgba(167, 139, 250, 0.25)",
            background: "linear-gradient(145deg, rgba(167,139,250,0.06) 0%, rgba(13,13,18,0.72) 60%)",
          }}
        >
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--recruiter-text)" }}>
            The Bradley Matera experience
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {solutions.map((sol) => (
              <li
                key={sol}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid var(--recruiter-border)",
                  color: "var(--recruiter-text)",
                  fontSize: "0.9375rem",
                }}
              >
                <span style={{ color: "var(--r-success)", flexShrink: 0, marginTop: 2 }}>✓</span>
                {sol}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA strip */}
      <div
        className="recruiter-glass reveal-child"
        style={{
          maxWidth: 800,
          margin: "3rem auto 0",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--recruiter-text)",
            marginBottom: "1rem",
          }}
        >
          This entire page is my portfolio. Every section is a deliverable.
        </p>
        <p style={{ color: "var(--recruiter-text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
          What you're seeing right now is the level of craft I bring to every project I work on —
          attention to detail, user empathy, and technical execution.
        </p>
      </div>
    </div>
    </section>
  );
};

export default RecruiterPainPoints;
