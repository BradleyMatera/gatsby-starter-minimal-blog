import * as React from "react";

const CONSENT_KEY = "analytics-consent";

type ConsentState = "granted" | "denied" | null;

const getConsent = (): ConsentState => {
  if (typeof window === "undefined") return null;
  try {
    return (localStorage.getItem(CONSENT_KEY) as ConsentState) || null;
  } catch {
    return null;
  }
};

const setConsent = (state: Exclude<ConsentState, null>) => {
  try {
    localStorage.setItem(CONSENT_KEY, state);
  } catch {
    // localStorage may be unavailable
  }
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: state,
    });
  }
};

export const hasAnalyticsConsent = (): boolean => getConsent() === "granted";

const ConsentBanner: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const existing = getConsent();
    if (existing === null) {
      setVisible(true);
    }
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "default", {
        analytics_storage: existing === "granted" ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  }, []);

  const handleAccept = () => {
    setConsent("granted");
    setVisible(false);
  };

  const handleDecline = () => {
    setConsent("denied");
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "var(--color-page-bg, #fff)",
        color: "var(--color-text, #111)",
        borderTop: "2px solid var(--color-border, #ccc)",
        padding: "1rem 1.5rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        fontSize: "0.9rem",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 300px" }}>
        This site uses aggregated or pseudonymous analytics to understand traffic patterns.
        No advertising tracking. See the{" "}
        <a href="/privacy/" style={{ color: "inherit", textDecoration: "underline" }}>
          Privacy Policy
        </a>{" "}
        for details.
      </p>
      <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
        <button
          type="button"
          onClick={handleDecline}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid var(--color-border, #ccc)",
            background: "transparent",
            color: "inherit",
            borderRadius: "4px",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={handleAccept}
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            background: "var(--color-accent, #333)",
            color: "var(--color-text-inverse, #fff)",
            borderRadius: "4px",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
