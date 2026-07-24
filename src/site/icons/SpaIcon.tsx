import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const SpaIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <path d="M12 22a7 7 0 0 1-7-7c0-2 1-3.9 3-5.5s3.5-4 4-6.5c.5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 0 1-7 7Z" />
    <path d="M12 22a7 7 0 0 0 0-14" />
  </svg>
);

export default SpaIcon;
