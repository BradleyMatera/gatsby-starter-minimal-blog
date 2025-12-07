// src/@lekoarts/gatsby-theme-minimal-blog/components/TinyCloudAccent.tsx
// Static cloud accent to replace the animated Three.js version.

import React from "react";

const TinyCloudAccent: React.FC = () => (
  <span className="accent-tile accent-tile--sky" aria-hidden="true">
    <svg viewBox="0 0 24 24" role="presentation" focusable="false">
      <path
        d="M7.5 15.5h8a3 3 0 1 0-.5-5.96A4 4 0 0 0 7 11.6a2.9 2.9 0 0 0 .47 5.9Z"
        fill="currentColor"
        opacity="0.92"
      />
    </svg>
  </span>
);

export default TinyCloudAccent;
