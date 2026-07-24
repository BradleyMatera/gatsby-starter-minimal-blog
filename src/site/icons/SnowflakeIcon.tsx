import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const SnowflakeIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <polyline points="9 5 12 2 15 5" />
    <polyline points="9 19 12 22 15 19" />
    <polyline points="5 9 2 12 5 15" />
    <polyline points="19 9 22 12 19 15" />
  </svg>
);

export default SnowflakeIcon;
