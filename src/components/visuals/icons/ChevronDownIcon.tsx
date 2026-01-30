import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const ChevronDownIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default ChevronDownIcon;
