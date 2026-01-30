import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const SortIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
    role="presentation"
  >
    <line x1="4" y1="6" x2="11" y2="6" />
    <line x1="4" y1="12" x2="11" y2="12" />
    <line x1="4" y1="18" x2="13" y2="18" />
    <polyline points="15 15 18 18 21 15" />
    <line x1="18" y1="6" x2="18" y2="18" />
  </svg>
);

export default SortIcon;
