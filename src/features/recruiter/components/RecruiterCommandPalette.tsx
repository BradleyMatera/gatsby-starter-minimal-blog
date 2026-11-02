import * as React from "react";
import { RECRUITER_SECTIONS, type RecruiterSectionId } from "../hooks/useRecruiterProgress";

type RecruiterCommandPaletteProps = { isOpen: boolean; onClose: () => void };

const RecruiterCommandPalette: React.FC<RecruiterCommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState("");
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const jumpRef = React.useRef<HTMLElement | null>(null);
  const filtered = RECRUITER_SECTIONS.filter((section) => `${section.label} ${section.id}`.toLowerCase().includes(query.trim().toLowerCase()));
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      triggerRef.current = document.activeElement as HTMLElement;
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!isOpen && dialog.open) {
      dialog.close();
      setQuery("");
      if (jumpRef.current) {
        jumpRef.current.focus({ preventScroll: true });
        jumpRef.current = null;
      } else triggerRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);
  const jump = (id: RecruiterSectionId) => {
    const node = document.querySelector<HTMLElement>(`[data-section-id="${id}"]`);
    if (!node) return;
    const heading = node.querySelector<HTMLElement>("h1, h2") || node;
    heading.tabIndex = -1;
    jumpRef.current = heading;
    node.scrollIntoView({ behavior: "auto", block: "start" });
    onClose();
  };
  return (
    <dialog ref={dialogRef} className="recruiter-command-dialog" aria-labelledby="recruiter-command-title" onCancel={onClose}>
      <div className="recruiter-command-dialog__header"><h2 id="recruiter-command-title">Find a section</h2><button type="button" className="recruiter-btn recruiter-btn--secondary" onClick={onClose}>Close</button></div>
      <label htmlFor="recruiter-section-search">Search recruiter sections</label>
      <input ref={inputRef} id="recruiter-section-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Projects, resume, skills…" />
      <ul>{filtered.map((section) => <li key={section.id}><button type="button" onClick={() => jump(section.id)}>{section.label}<span aria-hidden="true">→</span></button></li>)}</ul>
      <p role="status">{filtered.length ? `${filtered.length} sections` : "No sections found. Try a different word."}</p>
    </dialog>
  );
};

export default RecruiterCommandPalette;
