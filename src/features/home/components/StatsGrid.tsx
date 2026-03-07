import * as React from "react";
import joinClasses from "../../../utils/joinClasses";

type Stat = {
  value: string;
  meta: string;
};

const stats: Stat[] = [
  { value: "AWS", meta: "Cloud Support Engineer Intern · Amazon" },
  { value: "B.S.", meta: "Web Development · Full Sail · GPA 3.8" },
  { value: "Focus", meta: "Cloud, DevOps, APIs, AI workflows" },
];

import { useScrollReveal } from "../../../site/hooks/useScrollReveal";

const StatsGrid = () => {
  const { ref, revealed } = useScrollReveal(300, { initiallyVisible: true });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={joinClasses("stats-grid", "u-reveal", revealed ? "is-revealed" : undefined)}
      aria-label="Quick stats"
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
