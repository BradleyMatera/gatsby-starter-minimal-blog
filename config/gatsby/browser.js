// Active site styles. Order matters: tokens/base -> chrome -> utilities -> feature scopes.
import "../../src/styles/global.css";
import "../../src/styles/site-chrome.css";
import "../../src/styles/utilities.css";
import "../../src/styles/site-transitions.css";
import "../../src/styles/scroll-experience.css";
import "../../src/styles/vertical-nav.css";
import "../../src/styles/media.css";
import "../../src/site/styles/style-lab.css";

import * as React from "react";
import { StyleLabProvider } from "../../src/site/components";

export const wrapRootElement = ({ element }) => {
  return React.createElement(StyleLabProvider, null, element);
};

export const onClientEntry = () => {
  if (typeof window === "undefined") return;

  // The StyleLabProvider will read localStorage and apply the stored style
  // lab state in a hydration-safe useEffect. We only add the body class here
  // for CSS backwards-compatibility.
  requestAnimationFrame(() => {
    document.body.classList.add("cyberpunk-theme");
  });
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
  if (location.hash) {
    setTimeout(() => {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }
};
