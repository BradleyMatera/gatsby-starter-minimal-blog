
import "./src/styles/global.css";
import "./src/styles/media.css";

export const onClientEntry = () => {
  if (typeof window === "undefined") return;
  let mode = window.localStorage.getItem("theme-ui-color-mode");
  if (!mode) {
    const prefersDark =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    mode = prefersDark ? "dark" : "light";
  }
  document.body.setAttribute("data-theme", mode);
};
