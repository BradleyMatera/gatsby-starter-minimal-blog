// Active site styles. Order matters: tokens/base -> chrome -> utilities -> feature scopes.
import "../../src/styles/global.css";
import "../../src/styles/site-chrome.css";
import "../../src/styles/utilities.css";
import "../../src/styles/vertical-nav.css";
import "../../src/styles/media.css";

export const onClientEntry = () => {
  if (typeof window === "undefined") return;

  const storedThemeUiMode = window.localStorage.getItem("theme-ui-color-mode");
  const storedTheme = window.localStorage.getItem("bm-theme");
  const mode = storedThemeUiMode || storedTheme || "dark";

  if (!storedThemeUiMode) {
    window.localStorage.setItem("theme-ui-color-mode", mode);
  }

  document.body.setAttribute("data-theme", mode);
  document.documentElement.setAttribute("data-theme", mode);
  document.documentElement.style.colorScheme = mode;
  document.body.style.colorScheme = mode;
  document.body.classList.add("cyberpunk-theme");
};
