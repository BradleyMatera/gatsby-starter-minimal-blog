import * as React from "react";
import StyleLabPanel from "./StyleLabPanel";

const StyleLabToggle: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        className="style-lab-toggle"
        onClick={() => setOpen(true)}
        aria-label="Customize This Website! — Open Style Lab"
        aria-haspopup="dialog"
      >
        <span className="style-lab-toggle__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13.5" cy="6.5" r="2.5" />
            <path d="M13.5 9c-2.5 0-4.5 2-4.5 4.5 0 1.5 1 3 2.5 3.5" />
            <path d="M2 19.5C2 16 6 13 10.5 13c4 0 7.5 2 9.5 5" />
            <path d="M17.5 3 21 3 21 6.5" />
            <path d="m21 3-7 7" />
          </svg>
        </span>
        <span className="style-lab-toggle__label">Customize This Website!</span>
      </button>
      <StyleLabPanel isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default StyleLabToggle;
