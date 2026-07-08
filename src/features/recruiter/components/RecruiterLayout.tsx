import * as React from "react";
import { Link } from "gatsby";
import { GlobalScrollEffects } from "../../../site/components";

/* --------------------------------------------------------------------------
   RecruiterLayout — Warm, editorial portal. No glass, no neon.
   -------------------------------------------------------------------------- */

const RecruiterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="recruiter-page" style={{ minHeight: "100vh" }}>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* Cursor Spotlight */}
      <div className="cursor-spotlight" id="cursor-spotlight" aria-hidden="true" />

      <GlobalScrollEffects />

      <header className="recruiter-portal-header">
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0.75rem clamp(1rem, 4vw, 2rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "var(--r-text)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              fontFamily: "var(--r-font-heading)",
            }}
          >
            <span style={{ fontSize: "1.125rem" }}>←</span>
            <span>BradleyMatera.dev</span>
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              fontSize: "0.8125rem",
              color: "var(--r-text-secondary)",
            }}
          >
            <span style={{ display: "none" }} className="recruiter-nav-desktop">
              Recruiter Portal
            </span>
            <a
              href="/documents/resumes/matera-bradley-Junior-Software-Engineer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="recruiter-btn magnetic-btn recruiter-btn--primary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="recruiter-portal-footer">
        <div style={{ marginBottom: "0.75rem" }}>
          <Link
            to="/"
            style={{
              color: "var(--r-accent)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            ← Back to Portfolio
          </Link>
        </div>
        <div style={{ color: "var(--r-text-muted)" }}>
          © {new Date().getFullYear()} Bradley Matera · Recruiter Portal
        </div>
      </footer>
    </div>
  );
};

export default RecruiterLayout;
