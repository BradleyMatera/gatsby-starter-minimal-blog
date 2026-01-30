
// Cyberpunk Theme - Load in order of specificity
import "./src/styles/cyberpunk-theme.css";
import "./src/styles/global.css";
import "./src/styles/vertical-nav.css";
import "./src/styles/media.css";

export const onClientEntry = () => {
  if (typeof window === "undefined") return;
  
  // Always use dark mode for cyberpunk theme
  let mode = window.localStorage.getItem("theme-ui-color-mode");
  if (!mode) {
    mode = "dark"; // Default to dark for cyberpunk aesthetic
  }
  document.body.setAttribute("data-theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
  
  // Add cyberpunk class to body for additional styling hooks
  document.body.classList.add("cyberpunk-theme");
};
