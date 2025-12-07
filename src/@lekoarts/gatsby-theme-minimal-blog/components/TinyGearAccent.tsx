// src/@lekoarts/gatsby-theme-minimal-blog/components/TinyGearAccent.tsx
// Static gear accent.

import React from "react";

const TinyGearAccent: React.FC = () => (
  <span className="accent-tile accent-tile--neutral" aria-hidden="true">
    <svg viewBox="0 0 24 24" role="presentation" focusable="false">
      <path
        d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0-4 1 2.1a6.5 6.5 0 0 1 1.6.7l2.2-.9 1.5 2.6-1.8 1.5a6.6 6.6 0 0 1 .1 1.7l1.7 1.4-1.5 2.6-2.2-.8a6.6 6.6 0 0 1-1.6.7L12 20l-1-2.1a6.5 6.5 0 0 1-1.6-.7l-2.2.9-1.5-2.6 1.7-1.4a6.6 6.6 0 0 1-.1-1.7l-1.7-1.5L7.2 6l2.2.8a6.5 6.5 0 0 1 1.6-.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export default TinyGearAccent;
