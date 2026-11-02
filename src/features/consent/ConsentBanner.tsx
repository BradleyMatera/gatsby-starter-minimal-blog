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
  const bannerRef = React.useRef<HTMLDivElement>(null);
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

  React.useEffect(() => {
    const root = document.documentElement;
    const banner = bannerRef.current;
    if (!visible || !banner) return;
    const measure = () => root.style.setProperty("--consent-space", `${banner.getBoundingClientRect().height + 16}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(banner);
    return () => {
      observer.disconnect();
      root.style.setProperty("--consent-space", "0px");
    };
  }, [visible, mounted]);

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
    <div ref={bannerRef} className="consent-banner" role="region" aria-label="Analytics consent">
      <p>This site uses aggregated or pseudonymous analytics to understand traffic patterns.
        No advertising tracking. See the <a href="/privacy/">Privacy Policy</a> for details.</p>
      <div className="consent-banner__actions">
        <button type="button" onClick={handleDecline}>Decline</button>
        <button type="button" className="consent-banner__accept" onClick={handleAccept}>Accept</button>
      </div>
    </div>
  );
};

export default ConsentBanner;
