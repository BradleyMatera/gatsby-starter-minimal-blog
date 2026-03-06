
// Cyberpunk Theme - Load in order of specificity
import "./src/styles/cyberpunk-theme.css";
import "./src/styles/cyberpunk-nav.css";
import "./src/styles/global.css";
import "./src/styles/vertical-nav.css";
import "./src/styles/media.css";

export const onClientEntry = () => {
  if (typeof window === "undefined") return;
  
  // Default to dark mode and keep html/body theme attributes aligned
  const mode = window.localStorage.getItem("theme-ui-color-mode") || "dark";
  window.localStorage.setItem("theme-ui-color-mode", mode);
  document.body.setAttribute("data-theme", mode);
  document.documentElement.setAttribute("data-theme", mode);
  
  // Add cyberpunk class to body for additional styling hooks
  document.body.classList.add("cyberpunk-theme");
};
