import * as React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

const MonitorIcon = ({ size = 32, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false" role="presentation">
    <rect x="4" y="6" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="12" y="24" width="8" height="2" rx="1" fill="currentColor" />
    <rect x="10" y="22" width="12" height="2" rx="1" fill="currentColor" opacity="0.4" />
  </svg>
);

export default MonitorIcon;
