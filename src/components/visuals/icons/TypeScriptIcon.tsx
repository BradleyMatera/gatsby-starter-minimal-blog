import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const TypeScriptIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 17V11h4" />
    <path d="M10 11v6" />
    <path d="M14 11h2a2 2 0 0 1 0 4h-2v2" />
  </svg>
);

export default TypeScriptIcon;
