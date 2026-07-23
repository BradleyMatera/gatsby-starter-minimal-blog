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
};
