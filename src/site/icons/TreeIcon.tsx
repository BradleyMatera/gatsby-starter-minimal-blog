import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const TreeIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <path d="M12 2 8 8h2L7 13h3l-3 5h10l-3-5h3l-3-5h2L12 2Z" />
    <path d="M12 18v4" />
  </svg>
);

export default TreeIcon;
