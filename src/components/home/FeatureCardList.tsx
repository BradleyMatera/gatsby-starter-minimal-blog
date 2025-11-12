import * as React from "react";

type Feature = {
  icon: string;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    icon: "01",
    title: "Production cloud systems",
    body: "Harden AWS workloads with IAM, logging, staged environments, and cost-aware design that keeps services stable and affordable.",
  },
  {
    icon: "02",
    title: "Secure backend services",
    body: "Ship Node.js APIs with real authentication, instrumentation, and documentation so teammates can build on top without surprises.",
  },
  {
    icon: "03",
    title: "Automation-first workflows",
    body: "Wire CI/CD, branch protections, and AI helpers into delivery pipelines so the right code reaches production every time.",
  },
];

import { useScrollReveal } from "./useScrollReveal";

const FeatureCardList = () => {
  const { ref, revealed } = useScrollReveal(450, { initiallyVisible: true });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="feature-list"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s cubic-bezier(.22,.9,.2,1), transform 0.7s cubic-bezier(.22,.9,.2,1)",
      }}
    >
      {features.map((feature, i) => (
        <div className="feature-card" key={i}>
          <span className="feature-card__icon">{feature.icon}</span>
          <h3 className="feature-card__title">{feature.title}</h3>
          <p className="feature-card__body">{feature.body}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCardList;
