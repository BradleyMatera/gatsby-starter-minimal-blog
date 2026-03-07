import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const ApiIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <path d="M4 4h6v6H4z" />
    <path d="M14 4h6v6h-6z" />
    <path d="M4 14h6v6H4z" />
    <path d="M17 14v3a2 2 0 0 1-2 2h-1" />
    <path d="M14 17h3" />
    <path d="M7 10v4" />
    <path d="M17 4v4" />
    <path d="M10 7h4" />
  </svg>
);

export default ApiIcon;
