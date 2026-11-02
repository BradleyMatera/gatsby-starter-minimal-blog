import * as React from "react";
import { LockIcon, XIcon } from "../../../site/icons";

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
        border: "1px solid var(--r-border)",
        background:
          "var(--r-surface)",
      }}
    >
      <span className="privacy-banner__icon">
        <LockIcon size={18} />
      </span>
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
          Phone and email addresses stay hidden until you choose Reveal contact details.
          Once revealed, use the email or phone link to get in touch. You can hide them
          again at any time.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss privacy notice"
        style={{
          flexShrink: 0,
          background: "none",
          border: "none",
          color: "var(--recruiter-text-muted)",
          cursor: "pointer",
          padding: "0.5rem",
          minWidth: 44,
          minHeight: 44,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <XIcon size={16} />
      </button>
    </div>
  );
};

export default PrivacyBanner;
