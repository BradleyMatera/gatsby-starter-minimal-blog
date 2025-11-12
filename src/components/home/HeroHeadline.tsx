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
      <h1 className="hero-headline">Systems-focused web developer who builds with AI support</h1>
      <p className="hero-description">
        U.S. Army combat medic → <strong>B.S. Web Development, Full Sail 2025</strong>. I treat software like the field work I came from: stay calm, study the system in front of me, and get it working.
      </p>
      <p className="hero-description">
        Recent AWS Cloud Support internship work was all about labs, monitoring dashboards, and automating repetitive support workflows. I pair with tools like ChatGPT and Copilot in nearly every session to scaffold code, then I debug, adapt, and ship the result.
      </p>
    </div>
  );
};

export default HeroHeadline;
