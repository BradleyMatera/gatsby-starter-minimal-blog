import * as React from "react";
import { useStyleLab } from "./StyleLabProvider";
import {
  fontOptions,
  shadowPresets,
  styleLabPresets,
  transitionPresets,
  type StyleLabMode,
  type StyleVariableOverrides,
} from "../lib/styleLabPresets";
import { CloseIcon } from "../icons";

const variableLabels: Record<string, string> = {
  "--color-page-bg": "Page background",
  "--color-surface": "Surface",
  "--color-surface-alt": "Surface alt",
  "--color-surface-muted": "Surface muted",
  "--color-text": "Text",
  "--color-text-subtle": "Subtle text",
  "--color-text-inverse": "Inverse text",
  "--color-border": "Border",
  "--color-border-strong": "Strong border",
  "--color-accent": "Accent",
  "--color-accent-secondary": "Accent secondary",
  "--color-accent-hover": "Accent hover",
  "--color-accent-soft": "Accent soft",
  "--color-link": "Links",
  "--color-card-shadow": "Card shadow color",
  "--color-glow": "Glow color",
  "--font-primary": "Body font",
  "--font-heading": "Heading font",
  "--text-base": "Base font size",
  "--heading-h1-size": "H1 size",
  "--heading-h2-size": "H2 size",
  "--heading-h3-size": "H3 size",
  "--space-section": "Section spacing",
  "--space-card": "Card padding",
  "--section-spacing": "Page section spacing",
  "--radius-lg": "Large radius",
  "--radius-xl": "XL radius",
  "--shadow-card-hover": "Card hover shadow",
  "--transition-smooth": "Transition timing",
};

const colorKeys = [
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
];

// Parse an rgba(...) string into { r, g, b, a }.
const parseRgba = (value: string): { r: number; g: number; b: number; a: number } | null => {
  const match = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (!match) return null;
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
};

const hexToRgbParts = (hex: string): { r: number; g: number; b: number } | null => {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return null;
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return { r, g, b };
};

const toColorInputValue = (value: string): string => {
  if (value.startsWith("#") && value.length === 7) return value;
  const rgba = parseRgba(value);
  if (rgba) return rgbToHex(rgba.r, rgba.g, rgba.b);
  return "#000000";
};

const isRgba = (value: string) => value.startsWith("rgba(");

const updateAlpha = (value: string, alpha: number): string => {
  const rgba = parseRgba(value);
  if (!rgba) return value;
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
};

const getAlpha = (value: string): number => {
  const rgba = parseRgba(value);
  return rgba?.a ?? 1;
};

const getNumericValue = (value: string): number => {
  const match = value.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const Section: React.FC<SectionProps> = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="style-lab__section">
      <button type="button" className="style-lab__section-title" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{title}</span>
        <span className={`style-lab__chevron ${open ? "style-lab__chevron--open" : ""}`} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && <div className="style-lab__section-body">{children}</div>}
    </div>
  );
};

const ColorField: React.FC<{ variableKey: string; currentValue: string }> = ({ variableKey, currentValue }) => {
  const { setVariable } = useStyleLab();
  const hex = toColorInputValue(currentValue);
  const alpha = getAlpha(currentValue);
  const usesAlpha = isRgba(currentValue);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    if (usesAlpha) {
      const parts = hexToRgbParts(newHex);
      if (parts) {
        setVariable(variableKey, `rgba(${parts.r}, ${parts.g}, ${parts.b}, ${alpha})`);
      }
    } else {
      setVariable(variableKey, newHex);
    }
  };

  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlpha = parseFloat(e.target.value);
    setVariable(variableKey, updateAlpha(currentValue, newAlpha));
  };

  return (
    <div className="style-lab__field style-lab__field--color">
      <label className="style-lab__label">{variableLabels[variableKey] || variableKey}</label>
      <div className="style-lab__color-row">
        <input type="color" value={hex} onChange={handleColorChange} aria-label={`${variableLabels[variableKey] || variableKey} color`} />
        <code className="style-lab__value">{currentValue}</code>
      </div>
      {usesAlpha && (
        <div className="style-lab__alpha-row">
          <span>Opacity</span>
          <input type="range" min="0" max="1" step="0.01" value={alpha} onChange={handleAlphaChange} aria-label={`${variableLabels[variableKey] || variableKey} opacity`} />
          <span>{Math.round(alpha * 100)}%</span>
        </div>
      )}
    </div>
  );
};

const RangeField: React.FC<{ variableKey: string; currentValue: string; min: number; max: number; step: number; unit: string }> = ({
  variableKey,
  currentValue,
  min,
  max,
  step,
  unit,
}) => {
  const { setVariable } = useStyleLab();
  const val = getNumericValue(currentValue) || min;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseFloat(e.target.value);
    setVariable(variableKey, `${newVal}${unit}`);
  };

  return (
    <div className="style-lab__field style-lab__field--range">
      <div className="style-lab__range-header">
        <label className="style-lab__label">{variableLabels[variableKey] || variableKey}</label>
        <span className="style-lab__value">{val}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val} onChange={handleChange} aria-label={variableLabels[variableKey] || variableKey} />
    </div>
  );
};

const SelectField: React.FC<{ variableKey: string; currentValue: string; options: { label: string; value: string }[] }> = ({
  variableKey,
  currentValue,
  options,
}) => {
  const { setVariable } = useStyleLab();

  return (
    <div className="style-lab__field">
      <label className="style-lab__label">{variableLabels[variableKey] || variableKey}</label>
      <select
        className="style-lab__select"
        value={currentValue}
        onChange={(e) => setVariable(variableKey, e.target.value)}
        aria-label={variableLabels[variableKey] || variableKey}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const FontField: React.FC<{ variableKey: string; currentValue: string }> = ({ variableKey, currentValue }) => {
  const { setVariable } = useStyleLab();

  return (
    <div className="style-lab__field">
      <label className="style-lab__label">{variableLabels[variableKey] || variableKey}</label>
      <select
        className="style-lab__select"
        value={currentValue}
        onChange={(e) => setVariable(variableKey, e.target.value)}
        aria-label={variableLabels[variableKey] || variableKey}
      >
        {fontOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

type StyleLabPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const StyleLabPanel: React.FC<StyleLabPanelProps> = ({ isOpen, onClose }) => {
  const { activePresetId, customVariables, mode, applyPreset, setCustomMode, resetAll, allPresets } = useStyleLab();
  const activePreset = allPresets.find((p) => p.id === activePresetId) || allPresets[0];
  const currentVariables: StyleVariableOverrides = { ...activePreset.variables, ...customVariables };

  // Close on Escape.
  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open.
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  const shadowOptions = Object.entries(shadowPresets).map(([key, value]) => ({ label: key.charAt(0).toUpperCase() + key.slice(1), value }));
  const transitionOptions = Object.entries(transitionPresets).map(([key, value]) => ({ label: key.charAt(0).toUpperCase() + key.slice(1), value }));

  if (!isOpen) return null;

  return (
    <>
      <div className="style-lab__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="style-lab" role="dialog" aria-modal="true" aria-labelledby="style-lab-title">
        <div className="style-lab__header">
          <div className="style-lab__title-row">
            <span className="style-lab__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r="2.5" />
                <path d="M13.5 9c-2.5 0-4.5 2-4.5 4.5 0 1.5 1 3 2.5 3.5" />
                <path d="M2 19.5C2 16 6 13 10.5 13c4 0 7.5 2 9.5 5" />
                <path d="M17.5 3 21 3 21 6.5" />
                <path d="m21 3-7 7" />
              </svg>
            </span>
            <h2 id="style-lab-title" className="style-lab__title">Web Designer Lab</h2>
          </div>
          <button type="button" className="style-lab__close" onClick={onClose} aria-label="Close style lab">
            <CloseIcon size={22} />
          </button>
        </div>

        <div className="style-lab__body">
          <Section title="Presets" defaultOpen>
            <div className="style-lab__presets">
              {allPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`style-lab__preset ${activePresetId === preset.id ? "style-lab__preset--active" : ""}`}
                  onClick={() => applyPreset(preset.id)}
                  aria-pressed={activePresetId === preset.id}
                >
                  <span className="style-lab__preset-swatch" style={{ background: preset.variables["--color-accent"] }} />
                  <span className="style-lab__preset-name">{preset.name}</span>
                  <span className="style-lab__preset-desc">{preset.description}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Base mode" defaultOpen>
            <div className="style-lab__mode-group">
              {(["light", "dark"] as StyleLabMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`style-lab__mode-btn ${mode === m ? "style-lab__mode-btn--active" : ""}`}
                  onClick={() => setCustomMode(m)}
                  aria-pressed={mode === m}
                >
                  {m === "light" ? "Light" : "Dark"}
                </button>
              ))}
            </div>
            <p className="style-lab__hint">Switch the underlying base between light and dark tokens. Pressing a preset will switch to that preset's mode.</p>
          </Section>

          <Section title="Colors">
            <div className="style-lab__grid style-lab__grid--colors">
              {colorKeys.map((key) => (
                <ColorField key={key} variableKey={key} currentValue={currentVariables[key] || ""} />
              ))}
            </div>
          </Section>

          <Section title="Fonts">
            <div className="style-lab__grid style-lab__grid--fonts">
              <FontField variableKey="--font-primary" currentValue={currentVariables["--font-primary"]} />
              <FontField variableKey="--font-heading" currentValue={currentVariables["--font-heading"]} />
            </div>
          </Section>

          <Section title="Typography">
            <div className="style-lab__grid style-lab__grid--ranges">
              <RangeField variableKey="--text-base" currentValue={currentVariables["--text-base"]} min={0.75} max={1.35} step={0.01} unit="rem" />
              <RangeField variableKey="--heading-h1-size" currentValue={currentVariables["--heading-h1-size"]} min={1.25} max={3.5} step={0.05} unit="rem" />
              <RangeField variableKey="--heading-h2-size" currentValue={currentVariables["--heading-h2-size"]} min={1.1} max={2.8} step={0.05} unit="rem" />
              <RangeField variableKey="--heading-h3-size" currentValue={currentVariables["--heading-h3-size"]} min={1} max={2.2} step={0.05} unit="rem" />
            </div>
          </Section>

          <Section title="Effects">
            <div className="style-lab__grid style-lab__grid--selects">
              <SelectField variableKey="--shadow-card-hover" currentValue={currentVariables["--shadow-card-hover"]} options={shadowOptions} />
              <SelectField variableKey="--transition-smooth" currentValue={currentVariables["--transition-smooth"]} options={transitionOptions} />
            </div>
          </Section>
        </div>

        <div className="style-lab__footer">
          <button type="button" className="style-lab__reset" onClick={resetAll}>
            Reset to default
          </button>
          <button type="button" className="style-lab__done" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default StyleLabPanel;
