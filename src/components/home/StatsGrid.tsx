import * as React from "react";

type Stat = {
  value: string;
  meta: string;
};

const stats: Stat[] = [
  { value: "AWS", meta: "Cloud Support Engineer Intern · Amazon" },
  { value: "B.S.", meta: "Web Development · Full Sail · GPA 3.8" },
  { value: "Focus", meta: "Cloud, DevOps, APIs, AI workflows" },
];

import { useScrollReveal } from "./useScrollReveal";

const StatsGrid = () => {
  const { ref, revealed } = useScrollReveal(300, { initiallyVisible: true });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="stats-grid"
      aria-label="Quick stats"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s cubic-bezier(.22,.9,.2,1), transform 0.7s cubic-bezier(.22,.9,.2,1)",
      }}
    >
      {stats.map((stat, i) => (
        <div className="stat-card" key={i}>
          <span className="stat-card__value">{stat.value}</span>
          <span className="stat-card__meta">{stat.meta}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
