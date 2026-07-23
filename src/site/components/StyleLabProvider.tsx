import * as React from "react";
import {
  darkDefaultVariables,
  defaultPreset,
  getPresetById,
  lightDefaultVariables,
  resolvedMode,
  styleLabPresets,
  styleLabVariableKeys,
  type StyleLabMode,
  type StylePreset,
  type StyleVariableOverrides,
} from "../lib/styleLabPresets";

const STORAGE_KEY = "bm-style-lab";

export type StyleLabState = {
  activePresetId: string | null;
  customVariables: StyleVariableOverrides;
  mode: StyleLabMode;
};

type StyleLabContextValue = {
  activePresetId: string | null;
  customVariables: StyleVariableOverrides;
  mode: StyleLabMode;
  isCustom: boolean;
  allPresets: StylePreset[];
  applyPreset: (id: string) => void;
  setCustomMode: (mode: StyleLabMode) => void;
  setVariable: (key: string, value: string) => void;
  setVariables: (vars: StyleVariableOverrides) => void;
  resetAll: () => void;
};

const StyleLabContext = React.createContext<StyleLabContextValue | null>(null);

export const useStyleLab = (): StyleLabContextValue => {
  const ctx = React.useContext(StyleLabContext);
  if (!ctx) throw new Error("useStyleLab must be used within StyleLabProvider");
  return ctx;
};

const loadStoredState = (): StyleLabState => {
  if (typeof window === "undefined") {
    return {
      activePresetId: defaultPreset.id,
      customVariables: {},
      mode: defaultPreset.mode,
    };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StyleLabState>;
      return {
        activePresetId: parsed.activePresetId ?? defaultPreset.id,
        customVariables: parsed.customVariables ?? {},
        mode: parsed.mode ?? defaultPreset.mode,
      };
    }
  } catch (_) { /* localStorage may be unavailable */ }
  return {
    activePresetId: defaultPreset.id,
    customVariables: {},
    mode: defaultPreset.mode,
  };
};

const saveStoredState = (state: StyleLabState) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) { /* localStorage may be unavailable */ }
};

const isRecruiterPage = (pathname: string) =>
  pathname.startsWith("/recruiter") || pathname.startsWith("/roles");

const applyVariablesToRoot = (variables: StyleVariableOverrides) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  styleLabVariableKeys.forEach((key) => {
    const value = variables[key];
    if (value) {
      root.style.setProperty(key, value);
    } else {
      root.style.removeProperty(key);
    }
  });
};

const clearVariablesFromRoot = () => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  styleLabVariableKeys.forEach((key) => {
    root.style.removeProperty(key);
  });
};

const VISUAL_THEME_PRESETS = new Set(["neumorphism", "retrofuturism", "brutalism"]);

const applyMode = (mode: StyleLabMode, activePresetId: string | null = null) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const body = document.body;
  const resolved = resolvedMode(mode);
  root.setAttribute("data-theme", resolved);
  body?.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
  if (body) body.style.colorScheme = resolved;

  const visualTheme = activePresetId && VISUAL_THEME_PRESETS.has(activePresetId) ? activePresetId : "";
  if (visualTheme) {
    root.setAttribute("data-visual-theme", visualTheme);
  } else {
    root.removeAttribute("data-visual-theme");
  }
};

const applyCurrentStyle = (nextState: StyleLabState, nextPathname: string) => {
  if (typeof window === "undefined") return;
  // The recruiter hub keeps its original dark styling and is untouched by
  // the style lab.
  if (isRecruiterPage(nextPathname)) {
    clearVariablesFromRoot();
    applyMode("dark");
    return;
  }
  const baseVariables = nextState.activePresetId
    ? getPresetById(nextState.activePresetId).variables
    : nextState.mode === "light"
    ? lightDefaultVariables
    : darkDefaultVariables;
  const mergedVariables = { ...baseVariables, ...nextState.customVariables };
  applyMode(nextState.mode, nextState.activePresetId);
  applyVariablesToRoot(mergedVariables);
};

let __activeProvider: symbol | null = null;

export const StyleLabProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = React.useState<StyleLabState>(() => ({
    activePresetId: defaultPreset.id,
    customVariables: {},
    mode: defaultPreset.mode,
  }));
  const [hydrated, setHydrated] = React.useState(false);
  const [pathname, setPathname] = React.useState("");
  // Guard that prevents the state-save effect from writing state that came
  // from localStorage back to localStorage. This breaks the reset loop where
  // a remounting provider could read its own default write and overwrite the
  // user-selected preset.
  const skipNextSave = React.useRef(false);
  const isPrimary = React.useRef(false);

  React.useEffect(() => {
    if (!__activeProvider) {
      __activeProvider = Symbol("style-lab-provider");
      isPrimary.current = true;
    }
    return () => {
      if (isPrimary.current) __activeProvider = null;
    };
  }, []);


  // Keep pathname in sync with the browser and with Gatsby client-side navigation.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const updatePathname = () => setPathname(window.location.pathname);
    updatePathname();
    window.addEventListener("popstate", updatePathname);
    window.addEventListener("gatsby-route-update", updatePathname);
    return () => {
      window.removeEventListener("popstate", updatePathname);
      window.removeEventListener("gatsby-route-update", updatePathname);
    };
  }, []);

  React.useEffect(() => {
    if (!isPrimary.current) return;
    const stored = loadStoredState();
    const initialPathname = typeof window !== "undefined" ? window.location.pathname : "";
    skipNextSave.current = true;
    setState(stored);
    applyCurrentStyle(stored, initialPathname);
    setHydrated(true);
  }, []);

  // Re-apply styles when pathname changes (e.g. navigating to/from /recruiter/)
  // but do NOT save to localStorage — the state hasn't changed, only the route.
  React.useEffect(() => {
    if (!hydrated || !isPrimary.current) return;
    applyCurrentStyle(state, pathname);
  }, [state, hydrated, pathname]);

  // Listen for system color scheme changes when mode is "system" and re-apply.
  React.useEffect(() => {
    if (!hydrated || !isPrimary.current || state.mode !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyMode("system");
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [state.mode, hydrated]);

  // Only persist to localStorage when state itself changes (user action).
  React.useEffect(() => {
    if (!hydrated || !isPrimary.current) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    saveStoredState(state);
  }, [state, hydrated]);

  const applyPreset = React.useCallback((id: string) => {
    const preset = getPresetById(id);
    const nextState = {
      activePresetId: id,
      mode: preset.mode,
      customVariables: {},
    };
    skipNextSave.current = false;
    setState(nextState);
  }, []);

  const setCustomMode = React.useCallback((mode: StyleLabMode) => {
    const nextState = {
      ...state,
      mode,
      // Pressing Light/Dark drops the user into custom mode so the base
      // tokens actually change instead of being locked to a preset.
      activePresetId: null,
    };
    skipNextSave.current = false;
    setState(nextState);
  }, [state]);

  const setVariable = React.useCallback((key: string, value: string) => {
    const nextState = {
      ...state,
      customVariables: { ...state.customVariables, [key]: value },
    };
    skipNextSave.current = false;
    setState(nextState);
  }, [state]);

  const setVariables = React.useCallback((vars: StyleVariableOverrides) => {
    const nextState = {
      ...state,
      customVariables: { ...state.customVariables, ...vars },
    };
    skipNextSave.current = false;
    setState(nextState);
  }, [state]);

  const resetAll = React.useCallback(() => {
    const nextState = {
      activePresetId: defaultPreset.id,
      customVariables: {},
      mode: defaultPreset.mode,
    };
    skipNextSave.current = false;
    setState(nextState);
  }, []);

  const value: StyleLabContextValue = React.useMemo(
    () => ({
      activePresetId: state.activePresetId,
      customVariables: state.customVariables,
      mode: state.mode,
      isCustom: Object.keys(state.customVariables).length > 0,
      allPresets: styleLabPresets,
      applyPreset,
      setCustomMode,
      setVariable,
      setVariables,
      resetAll,
    }),
    [state, applyPreset, setCustomMode, setVariable, setVariables, resetAll]
  );

  return <StyleLabContext.Provider value={value}>{children}</StyleLabContext.Provider>;
};

export default StyleLabProvider;
