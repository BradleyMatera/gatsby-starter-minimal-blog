// Active site styles. Order matters: tokens/base -> chrome -> utilities -> feature scopes.
import "../../src/styles/global.css";
import "../../src/styles/site-chrome.css";
import "../../src/styles/utilities.css";
import "../../src/styles/site-transitions.css";
import "../../src/styles/scroll-experience.css";
import "../../src/styles/vertical-nav.css";
import "../../src/styles/media.css";
import "../../src/site/styles/style-lab.css";
import "../../src/styles/themes/neumorphism.css";
import "../../src/styles/themes/retrofuturism.css";
import "../../src/styles/themes/brutalism.css";
import "../../src/styles/demos.css";

import * as React from "react";
import { StyleLabProvider } from "../../src/site/components";

export const wrapRootElement = ({ element }) => {
  return React.createElement(StyleLabProvider, null, element);
};

export const onClientEntry = () => {
  // The theme's gatsby-plugin-theme-ui injects a pre-body script that reads
  // theme-ui-color-mode from localStorage and adds a theme-ui-{mode} class
  // to <html>. This causes a hydration mismatch because SSR doesn't have that
  // class. Remove it before React hydrates.
  if (typeof document !== "undefined") {
    const html = document.documentElement;
    Array.from(html.classList).forEach((cls) => {
      if (cls.startsWith("theme-ui-")) html.classList.remove(cls);
    });
  }
  // Also clean up the legacy localStorage key so the script is a no-op on
  // subsequent loads.
  try {
    window.localStorage.removeItem("theme-ui-color-mode");
    window.localStorage.removeItem("bm-theme");
  } catch (_) {}
};

export const shouldUpdateScroll = ({ routerProps: { location }, prevRouterProps }) => {
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return false;
    }
    // Element not yet rendered — let onRouteUpdate handle it
    return false;
  }
  window.scrollTo(0, 0);
  return false;
};

export const onRouteUpdate = ({ location }) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("gatsby-route-update", {
        detail: { pathname: location.pathname, hash: location.hash },
      })
    );
  }

  if (location.hash) {
    setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  // Analytics: only fire if consent has been granted
  const hasConsent = () => {
    try {
      return localStorage.getItem("analytics-consent") === "granted";
    } catch {
      return false;
    }
  };

  // Analytics: track pricing page views
  if (location.pathname === "/pricing/" && typeof window !== "undefined" && typeof window.gtag === "function" && hasConsent()) {
    window.gtag("event", "pricing_view", { source: document.referrer || "direct" });
  }

  // Analytics: track case study views
  if (location.pathname.startsWith("/work/") && location.pathname !== "/work/" && typeof window !== "undefined" && typeof window.gtag === "function" && hasConsent()) {
    window.gtag("event", "case_study_view", { slug: location.pathname });
  }

  // Analytics: attach listeners to data-analytics-* elements
  if (typeof document !== "undefined") {
    // Phone click tracking
    document.querySelectorAll('a[href^="tel:"]').forEach((el) => {
      if (el.dataset.analyticsBound) return;
      el.dataset.analyticsBound = "true";
      el.addEventListener("click", () => {
        if (typeof window !== "undefined" && typeof window.gtag === "function" && hasConsent()) {
          window.gtag("event", "phone_click", { source: location.pathname });
        }
      });
    });

    // Email click tracking
    document.querySelectorAll('a[href^="mailto:"]').forEach((el) => {
      if (el.dataset.analyticsBound) return;
      el.dataset.analyticsBound = "true";
      el.addEventListener("click", () => {
        if (typeof window !== "undefined" && typeof window.gtag === "function" && hasConsent()) {
          window.gtag("event", "email_click", { source: location.pathname });
        }
      });
    });

    // CTA click tracking
    document.querySelectorAll("[data-analytics-click]").forEach((el) => {
      if (el.dataset.analyticsBound) return;
      el.dataset.analyticsBound = "true";
      el.addEventListener("click", () => {
        const eventName = el.getAttribute("data-analytics-click");
        if (typeof window !== "undefined" && typeof window.gtag === "function" && eventName && hasConsent()) {
          window.gtag("event", eventName, {
            label: el.textContent?.trim().substring(0, 50) || "",
            location: location.pathname,
          });
        }
      });
    });

    // Form start tracking
    document.querySelectorAll("[data-analytics-form]").forEach((el) => {
      if (el.dataset.analyticsBound) return;
      el.dataset.analyticsBound = "true";
      const formName = el.getAttribute("data-analytics-form");
      const fired = el.dataset.formStartFired === "true";
      el.addEventListener("focusin", () => {
        if (el.dataset.formStartFired === "true") return;
        el.dataset.formStartFired = "true";
        if (typeof window !== "undefined" && typeof window.gtag === "function" && formName && hasConsent()) {
          window.gtag("event", "form_start", { form_name: formName });
        }
      }, { once: true });
    });
  }
};
