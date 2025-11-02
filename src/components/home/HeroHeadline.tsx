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
      <h1 className="hero-headline">Full-Stack Development and Cloud Engineering</h1>
      <p className="hero-description">
        I am a Full Stack Software Engineer who recently completed my B.S. in Web Development at Full Sail University. I build real, production-ready systems with scalable backend services and strong cloud architecture. I have hands-on AWS experience from my Support Engineering internship at Amazon where I troubleshot live environments and worked with real customer workloads.
      </p>
      <p className="hero-description">
        Explore the case studies, sprint retros, and tooling guides I use to deliver secure, accessible applications from discovery to deployment.
      </p>
    </div>
  );
};

export default HeroHeadline;
