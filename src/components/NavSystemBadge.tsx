// src/components/NavSystemBadge.tsx
// Static badge beside the site title — no WebGL required.

import React from "react";

const NavSystemBadge: React.FC = () => (
  <span className="nav-system-badge" aria-label="Portfolio system badge">
    <span className="nav-system-badge__icon" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="presentation">
        <defs>
          <linearGradient id="navBadgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#e23b2d" offset="0%" />
            <stop stopColor="#f28f7f" offset="100%" />
          </linearGradient>
        </defs>
        <rect x="4" y="8" width="56" height="48" rx="12" fill="url(#navBadgeGradient)" opacity="0.18" />
        <circle cx="18" cy="32" r="5" fill="#e23b2d" />
        <circle cx="32" cy="18" r="5" fill="#0ea5e9" />
        <circle cx="46" cy="36" r="5" fill="#22c55e" />
        <path d="M18 32 L32 18 L46 36" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="46" r="4" fill="#fbbf24" />
        <path d="M18 32 L32 46 L46 36" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>
    </span>
    <span className="nav-system-badge__text">
      <span>Calm shipping</span>
      <span>UI · Cloud · AI</span>
    </span>
  </span>
);

export default NavSystemBadge;
