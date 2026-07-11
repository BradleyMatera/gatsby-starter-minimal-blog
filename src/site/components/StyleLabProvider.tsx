import * as React from "react";
import {
  darkDefaultVariables,
  defaultPreset,
  getPresetById,
  lightDefaultVariables,
  styleLabPresets,
  styleLabVariableKeys,
  type StyleLabMode,
  type StylePreset,
  type StyleVariableOverrides,
} from "../lib/styleLabPresets";

const STORAGE_KEY = "bm-style-lab";
const THEME_UI_KEY = "theme-ui-color-mode";
const LEGACY_THEME_KEY = "bm-theme";

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
  } catch (_) {}
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
    window.localStorage.setItem(THEME_UI_KEY, state.mode);
    window.localStorage.setItem(LEGACY_THEME_KEY, state.mode);
  } catch (_) {}
};

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

const applyMode = (mode: StyleLabMode) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const body = document.body;
  root.setAttribute("data-theme", mode);
  body?.setAttribute("data-theme", mode);
  root.style.colorScheme = mode;
  if (body) body.style.colorScheme = mode;
};

export const StyleLabProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = React.useState<StyleLabState>(() => ({
    activePresetId: defaultPreset.id,
    customVariables: {},
    mode: defaultPreset.mode,
  }));
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const stored = loadStoredState();
    setState(stored);
    const baseVariables = stored.activePresetId
      ? getPresetById(stored.activePresetId).variables
      : stored.mode === "light"
      ? lightDefaultVariables
      : darkDefaultVariables;
    const mergedVariables = { ...baseVariables, ...stored.customVariables };
    applyMode(stored.mode);
    applyVariablesToRoot(mergedVariables);
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    saveStoredState(state);
    const baseVariables = state.activePresetId
      ? getPresetById(state.activePresetId).variables
      : state.mode === "light"
      ? lightDefaultVariables
      : darkDefaultVariables;
    const mergedVariables = { ...baseVariables, ...state.customVariables };
    applyMode(state.mode);
    applyVariablesToRoot(mergedVariables);
  }, [state, hydrated]);

  const applyPreset = React.useCallback((id: string) => {
    const preset = getPresetById(id);
    setState((prev) => ({
      ...prev,
      activePresetId: id,
      mode: preset.mode,
      customVariables: {},
    }));
  }, []);

  const setCustomMode = React.useCallback((mode: StyleLabMode) => {
    setState((prev) => ({
      ...prev,
      mode,
      // Pressing Light/Dark drops the user into custom mode so the base
      // tokens actually change instead of being locked to a preset.
      activePresetId: null,
    }));
  }, []);

  const setVariable = React.useCallback((key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      customVariables: { ...prev.customVariables, [key]: value },
    }));
  }, []);

  const setVariables = React.useCallback((vars: StyleVariableOverrides) => {
    setState((prev) => ({
      ...prev,
      customVariables: { ...prev.customVariables, ...vars },
    }));
  }, []);

  const resetAll = React.useCallback(() => {
    setState({
      activePresetId: defaultPreset.id,
      customVariables: {},
      mode: defaultPreset.mode,
    });
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
