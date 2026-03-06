import React from "react";
import { useColorMode } from "theme-ui";
import { SunIcon, MoonIcon } from "../components/visuals/icons";

type Theme = "light" | "dark";

const STORAGE_KEY = "bm-theme";
const THEME_UI_KEY = "theme-ui-color-mode";

const ThemeToggle: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  const applyTheme = (next: Theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const body = document.body;
    root.setAttribute("data-theme", next);
    body?.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    body.style.colorScheme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
    window.localStorage.setItem(THEME_UI_KEY, next);
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const themeUiStored = window.localStorage.getItem(THEME_UI_KEY) as Theme | null;
    const resolvedMode = (colorMode as Theme | undefined) || stored || themeUiStored || "dark";
    applyTheme(resolvedMode);

    if (colorMode !== resolvedMode) {
      setColorMode(resolvedMode);
    }
  }, [colorMode, setColorMode]);

  const toggle = () => {
    const current = (colorMode as Theme | undefined) || "dark";
    const next: Theme = current === "light" ? "dark" : "light";
    applyTheme(next);
    setColorMode(next);
  };

  const theme = (colorMode as Theme | undefined) || "dark";

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle light and dark mode">
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === "light" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
