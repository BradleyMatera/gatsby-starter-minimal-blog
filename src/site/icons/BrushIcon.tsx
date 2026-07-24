import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const BrushIcon: React.FC<IconProps> = ({ size = 24, className }) => (
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
    <path d="M9.06 11.9 8.5 12.5a2.83 2.83 0 0 1-4-4l.6-.6a2.83 2.83 0 0 1 4 4Z" />
    <path d="M20.5 3.5 12 12" />
    <path d="m12.5 11.5 5-5a2.83 2.83 0 0 1 4 4l-5 5a2.83 2.83 0 0 1-4-4Z" />
    <path d="M14 15a3 3 0 0 1-3 3 3 3 0 0 1-3-3c0-1.5 3-6 3-6s3 4.5 3 6Z" />
  </svg>
);

export default BrushIcon;
