// Preset themes for the Web Designer Style Lab.
// Each preset provides a complete set of CSS custom property overrides
// and a base light/dark mode flag.

export type StyleLabMode = "light" | "dark";

export type StyleVariableOverrides = Record<string, string>;

export type StylePreset = {
  id: string;
  name: string;
  mode: StyleLabMode;
  description?: string;
  variables: StyleVariableOverrides;
};

// Tokens that the panel exposes for customization. Every preset should
// provide a value for each of these so the inline style override is complete.
export const styleLabVariableKeys = [
  "--color-page-bg",
  "--color-surface",
  "--color-surface-alt",
  "--color-surface-muted",
  "--color-text",
  "--color-text-subtle",
  "--color-text-inverse",
  "--color-border",
  "--color-border-strong",
  "--color-accent",
  "--color-accent-secondary",
  "--color-accent-hover",
  "--color-accent-soft",
  "--color-link",
  "--color-card-shadow",
  "--color-glow",
  "--font-primary",
  "--font-heading",
  "--text-base",
  "--heading-h1-size",
  "--heading-h2-size",
  "--heading-h3-size",
  "--space-section",
  "--space-card",
  "--section-spacing",
  "--radius-lg",
  "--radius-xl",
  "--shadow-card-hover",
  "--transition-smooth",
] as const;

export type StyleLabVariableKey = (typeof styleLabVariableKeys)[number];

// Helpful font stacks exposed in the panel.
export const fontOptions: { label: string; value: string }[] = [
  { label: "Inter (modern sans)", value: '"Inter Variable", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif' },
  { label: "Space Grotesk (geometric)", value: '"Space Grotesk Variable", "Space Grotesk", "Inter", "Segoe UI", sans-serif' },
  { label: "System UI", value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  { label: "Georgia (classic serif)", value: 'Georgia, "Times New Roman", Times, serif' },
  { label: "Merriweather (book serif)", value: '"Merriweather", Georgia, serif' },
  { label: "JetBrains Mono (dev)", value: '"JetBrains Mono", "Fira Code", Menlo, Monaco, monospace' },
  { label: "Comic Relief (playful)", value: '"Comic Sans MS", "Comic Neue", cursive, sans-serif' },
];

// Shadow presets used by the shadow depth control.
export const shadowPresets = {
  subtle: "0 4px 14px rgba(0,0,0,0.08)",
  medium: "0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
  strong: "0 12px 32px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)",
  neon: "0 0 12px var(--color-glow), 0 8px 24px rgba(0,0,0,0.12)",
  flat: "none",
};

// Timing presets used by the transition control.
export const transitionPresets = {
  instant: "cubic-bezier(0.4, 0, 0.2, 1)",
  smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
  bouncy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  slow: "cubic-bezier(0.65, 0, 0.35, 1)",
};

// Hex-to-rgba helper for building shadow/glow colors from picker inputs.
export const hexToRgba = (hex: string, alpha: number): string => {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Light default: the original warm "Brad's Default" palette.
export const lightDefaultVariables: StyleVariableOverrides = {
  "--color-page-bg": "#f3efe8",
  "--color-surface": "#fbf9f4",
  "--color-surface-alt": "#efe9e0",
  "--color-surface-muted": "#e6dfd4",
  "--color-text": "#1f1b17",
  "--color-text-subtle": "#5b554e",
  "--color-text-inverse": "#faf7f2",
  "--color-border": "#d8d0c4",
  "--color-border-strong": "#c8bfb3",
  "--color-accent": "#7a6b5d",
  "--color-accent-secondary": "#8d7d6e",
  "--color-accent-hover": "#5a4d42",
  "--color-accent-soft": "rgba(122, 107, 93, 0.12)",
  "--color-link": "#5a4d42",
  "--color-card-shadow": "rgba(41, 34, 28, 0.08)",
  "--color-glow": "rgba(122, 107, 93, 0.25)",
  "--font-primary": '"Inter Variable", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  "--font-heading": '"Space Grotesk Variable", "Space Grotesk", "Inter", "Segoe UI", sans-serif',
  "--text-base": "1rem",
  "--heading-h1-size": "clamp(1.8rem, 1vw + 1.35rem, 2.5rem)",
  "--heading-h2-size": "clamp(1.5rem, 0.7vw + 1.2rem, 1.9rem)",
  "--heading-h3-size": "clamp(1.25rem, 0.5vw + 1.05rem, 1.55rem)",
  "--space-section": "clamp(3rem, 6vw, 5rem)",
  "--space-card": "clamp(1.25rem, 2vw, 1.75rem)",
  "--section-spacing": "clamp(100px, 15vw, 200px)",
  "--radius-lg": "20px",
  "--radius-xl": "28px",
  "--shadow-card-hover": "0 8px 24px rgba(41, 34, 28, 0.16), 0 2px 8px rgba(41, 34, 28, 0.08)",
  "--transition-smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
};

// Dark default: the original OLED-dark "cyberpunk" palette.
export const darkDefaultVariables: StyleVariableOverrides = {
  "--color-page-bg": "#000000",
  "--color-surface": "#0b0b0b",
  "--color-surface-alt": "#121212",
  "--color-surface-muted": "#1a1a1a",
  "--color-text": "#f5f5f5",
  "--color-text-subtle": "#c7c7c7",
  "--color-text-inverse": "#000000",
  "--color-border": "#2d2d2d",
  "--color-border-strong": "#3a3a3a",
  "--color-accent": "#b0a89e",
  "--color-accent-secondary": "#c0b8ae",
  "--color-accent-hover": "#d4d4d4",
  "--color-accent-soft": "rgba(176, 168, 158, 0.2)",
  "--color-link": "#d4d4d4",
  "--color-card-shadow": "rgba(0, 0, 0, 0.6)",
  "--color-glow": "rgba(176, 168, 158, 0.25)",
  "--font-primary": '"Inter Variable", "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  "--font-heading": '"Space Grotesk Variable", "Space Grotesk", "Inter", "Segoe UI", sans-serif',
  "--text-base": "1rem",
  "--heading-h1-size": "clamp(1.8rem, 1vw + 1.35rem, 2.5rem)",
  "--heading-h2-size": "clamp(1.5rem, 0.7vw + 1.2rem, 1.9rem)",
  "--heading-h3-size": "clamp(1.25rem, 0.5vw + 1.05rem, 1.55rem)",
  "--space-section": "clamp(3rem, 6vw, 5rem)",
  "--space-card": "clamp(1.25rem, 2vw, 1.75rem)",
  "--section-spacing": "clamp(100px, 15vw, 200px)",
  "--radius-lg": "20px",
  "--radius-xl": "28px",
  "--shadow-card-hover": "0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)",
  "--transition-smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
};

export const styleLabPresets: StylePreset[] = [
  {
    id: "brad-default",
    name: "Brad's Default",
    mode: "light",
    description: "Warm paper and clay tones.",
    variables: lightDefaultVariables,
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    mode: "dark",
    description: "Neon edges on a black void.",
    variables: {
      ...darkDefaultVariables,
      "--color-page-bg": "#05030a",
      "--color-surface": "#0e0b14",
      "--color-surface-alt": "#16121f",
      "--color-accent": "#00f0ff",
      "--color-accent-secondary": "#ff00aa",
      "--color-accent-hover": "#7dffff",
      "--color-accent-soft": "rgba(0, 240, 255, 0.14)",
      "--color-link": "#00f0ff",
      "--color-glow": "rgba(0, 240, 255, 0.35)",
      "--color-card-shadow": "rgba(0, 240, 255, 0.12)",
      "--shadow-card-hover": "0 0 20px rgba(0, 240, 255, 0.18), 0 8px 24px rgba(0, 0, 0, 0.4)",
      "--font-heading": '"Space Grotesk Variable", "Space Grotesk", "Inter", sans-serif',
    },
  },
  {
    id: "retro",
    name: "Retro",
    mode: "light",
    description: "Cream, amber, and serif headings.",
    variables: {
      ...lightDefaultVariables,
      "--color-page-bg": "#f7f1e3",
      "--color-surface": "#fffbf0",
      "--color-accent": "#c45c26",
      "--color-accent-secondary": "#d4a017",
      "--color-accent-hover": "#8f3d14",
      "--color-accent-soft": "rgba(196, 92, 38, 0.12)",
      "--color-link": "#8f3d14",
      "--color-glow": "rgba(196, 92, 38, 0.22)",
      "--color-card-shadow": "rgba(80, 50, 30, 0.08)",
      "--shadow-card-hover": "0 8px 24px rgba(80, 50, 30, 0.14), 0 2px 8px rgba(80, 50, 30, 0.08)",
      "--font-primary": 'Georgia, "Times New Roman", Times, serif',
      "--font-heading": '"Merriweather", Georgia, serif',
      "--radius-lg": "8px",
      "--radius-xl": "12px",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    mode: "light",
    description: "Black, white, and nothing else.",
    variables: {
      ...lightDefaultVariables,
      "--color-page-bg": "#ffffff",
      "--color-surface": "#ffffff",
      "--color-surface-alt": "#f5f5f5",
      "--color-text": "#111111",
      "--color-text-subtle": "#555555",
      "--color-border": "#e5e5e5",
      "--color-border-strong": "#cccccc",
      "--color-accent": "#000000",
      "--color-accent-secondary": "#333333",
      "--color-accent-hover": "#000000",
      "--color-accent-soft": "rgba(0, 0, 0, 0.06)",
      "--color-link": "#000000",
      "--color-glow": "rgba(0, 0, 0, 0.08)",
      "--color-card-shadow": "rgba(0, 0, 0, 0.06)",
      "--shadow-card-hover": "0 8px 24px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)",
      "--radius-lg": "12px",
      "--radius-xl": "16px",
      "--font-heading": '"Inter Variable", "Inter", sans-serif',
    },
  },
  {
    id: "high-contrast",
    name: "High Contrast",
    mode: "light",
    description: "Maximum readability.",
    variables: {
      ...lightDefaultVariables,
      "--color-page-bg": "#ffffff",
      "--color-surface": "#ffffff",
      "--color-surface-alt": "#f0f0f0",
      "--color-text": "#000000",
      "--color-text-subtle": "#1a1a1a",
      "--color-border": "#000000",
      "--color-border-strong": "#000000",
      "--color-accent": "#0000ff",
      "--color-accent-secondary": "#000099",
      "--color-accent-hover": "#000066",
      "--color-accent-soft": "rgba(0, 0, 255, 0.12)",
      "--color-link": "#0000ff",
      "--color-card-shadow": "rgba(0, 0, 0, 0.2)",
      "--shadow-card-hover": "0 10px 28px rgba(0, 0, 0, 0.25)",
      "--font-primary": 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      "--font-heading": 'system-ui, -apple-system, sans-serif',
    },
  },
  {
    id: "oled-midnight",
    name: "OLED Midnight",
    mode: "dark",
    description: "True black with cool gray accents.",
    variables: {
      ...darkDefaultVariables,
      "--color-page-bg": "#000000",
      "--color-surface": "#050505",
      "--color-surface-alt": "#0a0a0a",
      "--color-accent": "#9ca3af",
      "--color-accent-secondary": "#d1d5db",
      "--color-accent-hover": "#e5e7eb",
      "--color-accent-soft": "rgba(156, 163, 175, 0.18)",
      "--color-link": "#d1d5db",
      "--color-glow": "rgba(156, 163, 175, 0.2)",
      "--color-card-shadow": "rgba(0, 0, 0, 0.5)",
      "--shadow-card-hover": "0 8px 24px rgba(0, 0, 0, 0.6)",
    },
  },
  {
    id: "forest",
    name: "Forest",
    mode: "dark",
    description: "Moss greens and bark browns.",
    variables: {
      ...darkDefaultVariables,
      "--color-page-bg": "#09140f",
      "--color-surface": "#11231a",
      "--color-surface-alt": "#1a3325",
      "--color-text": "#e7f0e9",
      "--color-text-subtle": "#a8c2ad",
      "--color-border": "#1f3d2b",
      "--color-accent": "#7dd3a8",
      "--color-accent-secondary": "#a8e6bf",
      "--color-accent-hover": "#b9f2cc",
      "--color-accent-soft": "rgba(125, 211, 168, 0.16)",
      "--color-link": "#7dd3a8",
      "--color-glow": "rgba(125, 211, 168, 0.28)",
      "--color-card-shadow": "rgba(0, 0, 0, 0.45)",
      "--shadow-card-hover": "0 8px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(125, 211, 168, 0.1)",
    },
  },
  {
    id: "ocean",
    name: "Ocean",
    mode: "dark",
    description: "Deep blues and seafoam.",
    variables: {
      ...darkDefaultVariables,
      "--color-page-bg": "#050e18",
      "--color-surface": "#0b1a2a",
      "--color-surface-alt": "#11273d",
      "--color-text": "#e8f4ff",
      "--color-text-subtle": "#9fb8d0",
      "--color-border": "#1a3a5c",
      "--color-accent": "#38bdf8",
      "--color-accent-secondary": "#7dd3fc",
      "--color-accent-hover": "#bae6fd",
      "--color-accent-soft": "rgba(56, 189, 248, 0.16)",
      "--color-link": "#38bdf8",
      "--color-glow": "rgba(56, 189, 248, 0.3)",
      "--color-card-shadow": "rgba(0, 0, 0, 0.45)",
      "--shadow-card-hover": "0 8px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(56, 189, 248, 0.12)",
    },
  },
];

export const defaultPreset = styleLabPresets.find((p) => p.id === "brad-default") || styleLabPresets[0];

export const getPresetById = (id: string | null): StylePreset => {
  return styleLabPresets.find((p) => p.id === id) || defaultPreset;
};
