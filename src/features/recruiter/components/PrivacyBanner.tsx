import * as React from "react";

/* --------------------------------------------------------------------------
   PrivacyBanner — Professional explanation of PII protection.
   -------------------------------------------------------------------------- */

const PrivacyBanner: React.FC = () => {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;

  return (
    <div
      className="recruiter-glass reveal-child"
      style={{
        maxWidth: 1100,
        margin: "0 auto 2rem",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        border: "1px solid rgba(251,191,36,0.2)",
        background:
          "linear-gradient(145deg, rgba(251,191,36,0.04) 0%, rgba(13,13,18,0.72) 60%)",
      }}
    >
      <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>🔒</span>
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            color: "var(--recruiter-text)",
            margin: "0 0 0.25rem",
          }}
        >
          Personal contact information is intentionally obscured
        </p>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--recruiter-text-secondary)",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          Phone and email addresses on this page are displayed with a visual blur
          to prevent automated scraping by bots and data harvesters. Simply hover or
          click to reveal the full value. This measure protects against unsolicited
          calls and spam while keeping the information fully accessible to recruiters
          and hiring managers reviewing this profile.
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss privacy notice"
        style={{
          flexShrink: 0,
          background: "none",
          border: "none",
          color: "var(--recruiter-text-muted)",
          cursor: "pointer",
          fontSize: "1rem",
          padding: "0.25rem",
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default PrivacyBanner;
