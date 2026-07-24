import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const RingIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <path d="M7.5 7.5 12 3l4.5 4.5" />
    <circle cx="12" cy="15" r="6" />
  </svg>
);

export default RingIcon;
