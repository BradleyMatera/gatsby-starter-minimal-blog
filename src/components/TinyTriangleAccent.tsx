// src/components/TinyTriangleAccent.tsx
// Lightweight SVG accent for list bullets and hero highlights.

import React from "react";
import joinClasses from "../utils/joinClasses";

type TinyTriangleAccentProps = {
  className?: string;
};

const TinyTriangleAccent: React.FC<TinyTriangleAccentProps> = ({ className }) => (
  <span className={joinClasses("tiny-triangle-accent accent-tile accent-tile--warm", className)} aria-hidden="true">
    <svg viewBox="0 0 24 24" role="presentation" focusable="false">
      <path
        d="M12 4.5 4.5 18h15z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="1.8" fill="currentColor" />
    </svg>
  </span>
);

export default TinyTriangleAccent;
