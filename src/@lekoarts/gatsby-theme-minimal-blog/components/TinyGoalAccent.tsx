// src/@lekoarts/gatsby-theme-minimal-blog/components/TinyGoalAccent.tsx
// Static goal/flag accent.

import React from "react";

const TinyGoalAccent: React.FC = () => (
  <span className="accent-tile accent-tile--success" aria-hidden="true">
    <svg viewBox="0 0 24 24" role="presentation" focusable="false">
      <path
        d="M7 4v16m0-14h8l-2.5 3L15 12H7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="20" r="1.6" fill="currentColor" />
    </svg>
  </span>
);

export default TinyGoalAccent;
