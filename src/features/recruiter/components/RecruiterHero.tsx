import * as React from "react";
import { Link } from "gatsby";

const RecruiterHero3D = React.lazy(() => import("./RecruiterHero3D"));

/* --------------------------------------------------------------------------
   Recruiter Hero — Warm editorial hero with a background video/image layer.
   -------------------------------------------------------------------------- */

const RecruiterHero: React.FC = () => {
  return (
    <section id="recruiter-hero" className="recruiter-hero reveal-section">
      {/* Background media layer */}
      <div className="recruiter-hero__media" aria-hidden="true">
        <video
          className="recruiter-hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-amazon-2000.webp"
          aria-hidden="true"
        >
          <source src="/hero-recruiter.mp4" type="video/mp4" />
          <track kind="descriptions" srcLang="en" label="Decorative background animation" />
        </video>
        <div className="recruiter-hero__media-overlay" />
      </div>

      <div className="recruiter-hero__content">
        <span className="recruiter-hero__eyebrow">Recruiter Resource Hub</span>

        <h1 className="recruiter-hero__headline">
          Everything a recruiter needs.
          <br />
          <span className="recruiter-title-accent">Without the back and forth.</span>
        </h1>

        <p className="recruiter-hero__subheadline">
          I&apos;ve gathered every resource, project, document, certification,
          technical explanation, timeline, and portfolio item into one curated
          experience designed specifically for hiring teams.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
          }}
        >
          <Link to="#why-this-exists" className="recruiter-btn magnetic-btn recruiter-btn--primary">
            Explore Recruiter Hub
          </Link>
          <Link to="#interview-resources" className="recruiter-btn magnetic-btn recruiter-btn--secondary">
            Download Resume
          </Link>
          <Link to="#contact-cta" className="recruiter-btn magnetic-btn recruiter-btn--secondary">
            Schedule Interview
          </Link>
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            marginTop: "3rem",
          }}
        >
          <TrustBadge label="AWS Certified" />
          <TrustBadge label="Junior Software Engineer" />
          <TrustBadge label="Cloud Support Trained" />
          <TrustBadge label="Open Source Contributor" />
        </div>
      </div>

      <div className="recruiter-hero__accent-3d" aria-hidden="true">
        <React.Suspense fallback={<div className="recruiter-hero-3d" />}>
          <RecruiterHero3D />
        </React.Suspense>
      </div>
    </section>
  );
};

const TrustBadge: React.FC<{ label: string }> = ({ label }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      padding: "0.375rem 0.875rem",
      borderRadius: 9999,
      fontSize: "0.75rem",
      fontWeight: 600,
      color: "var(--r-text-secondary)",
      background: "var(--r-surface)",
      border: "1px solid var(--r-border)",
    }}
  >
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "var(--r-accent)",
        display: "inline-block",
      }}
    />
    {label}
  </span>
);

export default RecruiterHero;
