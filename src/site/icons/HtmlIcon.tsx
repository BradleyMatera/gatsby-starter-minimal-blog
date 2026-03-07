import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const HtmlIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" />
    <path d="M8 8h8" />
    <path d="M8 12h8" />
    <path d="M12 12v5l-2.5-1" />
    <path d="M12 17l2.5-1" />
  </svg>
);

export default HtmlIcon;
