
// Cyberpunk Theme - Load in order of specificity
import "./src/styles/cyberpunk-theme.css";
import "./src/styles/cyberpunk-nav.css";
import "./src/styles/global.css";
import "./src/styles/vertical-nav.css";
import "./src/styles/media.css";

export const onClientEntry = () => {
  if (typeof window === "undefined") return;
  
  // Keep html/body theme attributes aligned with the persisted Theme UI mode.
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
  
  // Add cyberpunk class to body for additional styling hooks
  document.body.classList.add("cyberpunk-theme");
};
