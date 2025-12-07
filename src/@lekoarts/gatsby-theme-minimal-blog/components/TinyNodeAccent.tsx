// src/@lekoarts/gatsby-theme-minimal-blog/components/TinyNodeAccent.tsx
// Static node accent to replace Three.js animation.

import React from "react";

const TinyNodeAccent: React.FC = () => (
  <span className="accent-tile accent-tile--teal" aria-hidden="true">
    <svg viewBox="0 0 24 24" role="presentation" focusable="false">
      <circle cx="7" cy="12" r="3" fill="currentColor" />
      <circle cx="14.5" cy="7.5" r="3" fill="currentColor" opacity="0.9" />
      <circle cx="17" cy="15.5" r="3" fill="currentColor" opacity="0.82" />
      <path d="M9.4 10.6 12.8 8m-1.4 6.9 3.5-2" stroke="#0f4c3b" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </span>
);

export default TinyNodeAccent;
