// Active site styles. Order matters: tokens/base -> chrome -> utilities -> feature scopes.
import "../../src/styles/global.css";
import "../../src/styles/site-chrome.css";
import "../../src/styles/utilities.css";
import "../../src/styles/site-transitions.css";
import "../../src/styles/scroll-experience.css";
import "../../src/styles/vertical-nav.css";
import "../../src/styles/media.css";

export const onClientEntry = () => {
  if (typeof window === "undefined") return;

  let storedThemeUiMode = null;
  let storedTheme = null;

  try {
    storedThemeUiMode = window.localStorage.getItem("theme-ui-color-mode");
  } catch (_) {}
  try {
    storedTheme = window.localStorage.getItem("bm-theme");
  } catch (_) {}

  const mode = storedThemeUiMode || storedTheme || "dark";

  if (!storedThemeUiMode) {
    try {
      window.localStorage.setItem("theme-ui-color-mode", mode);
    } catch (_) {}
  }

  // Defer DOM mutations until after React hydration to avoid mismatch errors.
  requestAnimationFrame(() => {
    document.body.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.style.colorScheme = mode;
    document.body.style.colorScheme = mode;
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
