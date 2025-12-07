import React from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "bm-theme";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: Theme = stored || (prefersDark ? "dark" : "light");
    applyTheme(initial);
    setTheme(initial);
  }, []);

  const applyTheme = (next: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle light and dark mode">
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === "light" ? "🌞" : "🌜"}
      </span>
    </button>
  );
};

export default ThemeToggle;
