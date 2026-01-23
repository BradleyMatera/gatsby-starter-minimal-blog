import * as React from "react";

type MetricBadgeProps = {
  text: string;
};

const MetricBadge = ({ text }: MetricBadgeProps) => (
  <span className="metric-badge" role="status" aria-label={text}>
    {text}
  </span>
);

export default MetricBadge;
