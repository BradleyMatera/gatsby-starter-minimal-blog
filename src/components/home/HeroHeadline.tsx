import * as React from "react";
import { useScrollReveal } from "./useScrollReveal";

const HeroHeadline = () => {
  const { ref, revealed } = useScrollReveal(0);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s cubic-bezier(.22,.9,.2,1), transform 0.7s cubic-bezier(.22,.9,.2,1)",
      }}
    >
      <span className="hero-highlight">Bradley Matera</span>
      <h1 className="hero-headline">Full Stack Engineer specializing in cloud-native applications</h1>
      <p className="hero-description">
        <strong>B.S. Web Development (GPA 3.8, Full Sail University)</strong> | <strong>AWS Cloud Support Intern (Amazon, Summer 2025)</strong> | Full Stack Software Engineer building production-ready systems with scalable backends and cloud architecture.
      </p>
      <p className="hero-description">
        Hands-on experience troubleshooting live AWS environments and optimizing customer workloads. Explore the case studies, sprint retros, and tooling guides I use to deliver secure, accessible applications from discovery to deployment.
      </p>
    </div>
  );
};

export default HeroHeadline;
