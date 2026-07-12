import * as React from "react";
import { useStyleLab } from "./StyleLabProvider";
import { SunIcon, MoonIcon } from "../icons";

const ThemeToggle: React.FC = () => {
  const { mode, setCustomMode } = useStyleLab();

  const cycleMode = () => {
    const next = mode === "light" ? "dark" : mode === "dark" ? "system" : "light";
    setCustomMode(next);
  };

  const label =
    mode === "light" ? "Switch to dark mode" : mode === "dark" ? "Use system theme" : "Switch to light mode";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycleMode}
      aria-label={label}
      title={label}
    >
      {mode === "light" ? (
        <SunIcon size={20} />
      ) : mode === "dark" ? (
        <MoonIcon size={20} />
      ) : (
        <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>OS</span>
      )}
    </button>
  );
};

export default ThemeToggle;
