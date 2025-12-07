// src/@lekoarts/gatsby-theme-minimal-blog/components/TinyMedalAccent.tsx
// Static medal accent to reduce runtime GPU work.

import React from "react";

const TinyMedalAccent: React.FC = () => (
  <span className="accent-tile accent-tile--gold" aria-hidden="true">
    <svg viewBox="0 0 24 24" role="presentation" focusable="false">
      <circle cx="12" cy="12" r="6.5" fill="currentColor" opacity="0.9" />
      <path
        d="m9 3.5 3 3 3-3M9 9l3 3 3-3"
        fill="none"
        stroke="#e23b2d"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export default TinyMedalAccent;
