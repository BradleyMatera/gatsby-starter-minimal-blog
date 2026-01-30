import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const CheckIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default CheckIcon;
