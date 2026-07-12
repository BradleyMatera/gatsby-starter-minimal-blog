import * as React from "react";
import * as ReactDOM from "react-dom";
import { RECRUITER_SECTIONS, type RecruiterSectionId } from "../hooks/useRecruiterProgress";

type RecruiterCommandPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RecruiterCommandPalette: React.FC<RecruiterCommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return RECRUITER_SECTIONS;
    return RECRUITER_SECTIONS.filter(
      (s) => s.label.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    );
  }, [query]);

  const activeId = React.useMemo(() => {
    const item = filtered[selectedIndex];
    return item ? `cmd-palette-item-${item.id}` : undefined;
  }, [filtered, selectedIndex]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  React.useEffect(() => {
    if (typeof document === "undefined") return undefined;
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
    return undefined;
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return undefined;
    }
    inputRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[selectedIndex];
        if (item) scrollTo(item.id);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  const scrollTo = (id: RecruiterSectionId) => {
    const el = document.querySelector(`[data-section-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      onClose();
    }
  };

  if (!isOpen) return null;

  const palette = (
    <div className="command-palette" role="dialog" aria-modal="true" aria-label="Jump to section">
      <div className="command-palette__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="command-palette__panel">
        <input
          ref={inputRef}
          type="text"
          className="command-palette__input"
          placeholder="Jump to section..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search sections"
          aria-activedescendant={activeId}
          role="combobox"
          aria-expanded="true"
          aria-controls="command-palette-listbox"
        />
        <ul id="command-palette-listbox" className="command-palette__list" role="listbox">
          {filtered.map((item, index) => (
            <li
              key={item.id}
              id={`cmd-palette-item-${item.id}`}
              className={`command-palette__item ${index === selectedIndex ? "command-palette__item--selected" : ""}`}
              onClick={() => scrollTo(item.id)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <span className="command-palette__label">{item.label}</span>
              <span className="command-palette__hint">Jump</span>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="command-palette__empty">No sections found</li>
          )}
        </ul>
        <div className="command-palette__footer">
          <span>↑↓ to navigate</span>
          <span>↵ to jump</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined" || !document.body) return null;
  return ReactDOM.createPortal(palette, document.body);
};

export default RecruiterCommandPalette;
