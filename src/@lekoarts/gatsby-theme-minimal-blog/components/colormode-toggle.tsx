import * as React from "react";
import { useColorMode } from "theme-ui";

const labels: Record<string, string> = {
  light: "Switch to dark mode",
  dark: "Switch to light mode",
};

const ColorModeToggle = () => {
  const [colorMode, setColorMode] = useColorMode();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isMounted) return;
    const mode = colorMode ?? "light";
    document.body.setAttribute("data-theme", mode);
  }, [colorMode, isMounted]);

  if (!isMounted) {
    return (
      <span className="color-mode-toggle color-mode-toggle--placeholder" aria-hidden="true">
        ○
      </span>
    );
  }

  const currentMode = colorMode ?? "light";
  const nextMode = currentMode === "dark" ? "light" : "dark";
  const label = labels[currentMode] ?? "Toggle color mode";

  return (
    <button
      type="button"
      className="color-mode-toggle"
      onClick={() => setColorMode(nextMode)}
      aria-label={label}
    >
      <span aria-hidden="true">{currentMode === "dark" ? "🌙" : "☀️"}</span>
    </button>
  );
};

export default ColorModeToggle;
