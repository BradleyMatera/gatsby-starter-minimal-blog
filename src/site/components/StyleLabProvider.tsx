import * as React from "react";
import {
  darkDefaultVariables, defaultPreset, getPresetById, lightDefaultVariables,
  resolvedMode, styleLabPresets, styleLabVariableKeys,
  type StyleLabMode, type StylePreset, type StyleVariableOverrides,
} from "../lib/styleLabPresets";

const STORAGE_KEY = "bm-style-lab";
export type StyleLabState = { activePresetId: string | null; customVariables: StyleVariableOverrides; mode: StyleLabMode };
type StyleLabContextValue = StyleLabState & {
  isCustom: boolean; allPresets: StylePreset[];
  applyPreset: (id: string) => void; setCustomMode: (mode: StyleLabMode) => void;
  setVariable: (key: string, value: string) => void; setVariables: (vars: StyleVariableOverrides) => void;
  resetAll: () => void;
};
const StyleLabContext = React.createContext<StyleLabContextValue | null>(null);
export const useStyleLab = (): StyleLabContextValue => {
  const context = React.useContext(StyleLabContext);
  if (!context) throw new Error("useStyleLab must be used within StyleLabProvider");
  return context;
};
const defaultState: StyleLabState = { activePresetId: defaultPreset.id, customVariables: {}, mode: defaultPreset.mode };
const visualThemes = new Set(["neumorphism", "retrofuturism", "brutalism"]);
const applyStyle = (state: StyleLabState) => {
  const root = document.documentElement;
  const mode = resolvedMode(state.mode);
  const base = state.activePresetId ? getPresetById(state.activePresetId).variables : mode === "light" ? lightDefaultVariables : darkDefaultVariables;
  const variables = { ...base, ...state.customVariables };
  root.dataset.theme = mode;
  document.body.dataset.theme = mode;
  root.style.colorScheme = mode;
  document.body.style.colorScheme = mode;
  if (state.activePresetId && visualThemes.has(state.activePresetId)) root.dataset.visualTheme = state.activePresetId;
  else delete root.dataset.visualTheme;
  styleLabVariableKeys.forEach(key => variables[key] ? root.style.setProperty(key, variables[key]) : root.style.removeProperty(key));
};
let activeStyleLabProvider: symbol | null = null;

export const StyleLabProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const providerId = React.useRef(Symbol("style-lab-provider"));
  const isPrimary = React.useRef(false);
  React.useEffect(() => {
    const id = providerId.current;
    if (!activeStyleLabProvider) {
      activeStyleLabProvider = id;
      isPrimary.current = true;
    }
    return () => {
      if (activeStyleLabProvider === id) activeStyleLabProvider = null;
      isPrimary.current = false;
    };
  }, []);
  const [state, setState] = React.useState<StyleLabState>(defaultState);
  const [hasPreference, setHasPreference] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);
  const [pathname, setPathname] = React.useState("");
  React.useEffect(() => {
    if (!isPrimary.current) return;
    setPathname(window.location.pathname);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StyleLabState>;
        const mode = ["light", "dark", "system"].includes(parsed.mode || "") ? parsed.mode! : "light";
        const activePresetId = parsed.activePresetId && styleLabPresets.some(p => p.id === parsed.activePresetId) ? parsed.activePresetId : null;
        setState({ activePresetId, mode, customVariables: parsed.customVariables || {} });
        setHasPreference(true);
      }
    } catch { setHasPreference(false); }
    setHydrated(true);
    const update = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", update);
    window.addEventListener("gatsby-route-update", update);
    return () => { window.removeEventListener("popstate", update); window.removeEventListener("gatsby-route-update", update); };
  }, []);
  const effective = React.useMemo<StyleLabState>(() => !hasPreference && /^\/(recruiter|roles)(\/|$)/.test(pathname)
    ? { activePresetId: null, customVariables: {}, mode: "dark" } : state, [hasPreference, pathname, state]);
  React.useEffect(() => {
    if (!hydrated || !isPrimary.current) return;
    applyStyle(effective);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => { if (effective.mode === "system") applyStyle(effective); };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [effective, hydrated]);
  React.useEffect(() => {
    if (hydrated && hasPreference && isPrimary.current) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { return; }
    }
  }, [hydrated, hasPreference, state]);
  const change = React.useCallback((next: StyleLabState) => { setHasPreference(true); setState(next); }, []);
  const applyPreset = React.useCallback((id: string) => { const preset = getPresetById(id); change({ activePresetId: preset.id, mode: preset.mode, customVariables: {} }); }, [change]);
  const setCustomMode = React.useCallback((mode: StyleLabMode) => change({ activePresetId: null, mode, customVariables: {} }), [change]);
  const setVariable = React.useCallback((key: string, value: string) => change({ ...effective, customVariables: { ...effective.customVariables, [key]: value } }), [effective, change]);
  const setVariables = React.useCallback((vars: StyleVariableOverrides) => change({ ...effective, customVariables: { ...effective.customVariables, ...vars } }), [effective, change]);
  const resetAll = React.useCallback(() => change(defaultState), [change]);
  const value = React.useMemo(() => ({ ...effective, isCustom: Object.keys(effective.customVariables).length > 0, allPresets: styleLabPresets, applyPreset, setCustomMode, setVariable, setVariables, resetAll }), [effective, applyPreset, setCustomMode, setVariable, setVariables, resetAll]);
  return <StyleLabContext.Provider value={value}>{children}</StyleLabContext.Provider>;
};
export default StyleLabProvider;
