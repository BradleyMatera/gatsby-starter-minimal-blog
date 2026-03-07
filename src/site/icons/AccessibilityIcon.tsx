import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const AccessibilityIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <circle cx="12" cy="4" r="2" />
    <path d="M12 6v6" />
    <path d="M6 10l6 2 6-2" />
    <path d="M8 22l4-10 4 10" />
  </svg>
);

export default AccessibilityIcon;
