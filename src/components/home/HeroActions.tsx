import * as React from "react";
import { Link } from "gatsby";
import { useScrollReveal } from "./useScrollReveal";

const HeroActions = () => {
  const { ref, revealed } = useScrollReveal(150);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="hero-actions"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s cubic-bezier(.22,.9,.2,1), transform 0.7s cubic-bezier(.22,.9,.2,1)",
      }}
    >
      <Link data-variant="primary" to="/projects">
        Browse project case studies
      </Link>
      <Link data-variant="ghost" to="/roles/cloud-engineer">
        Explore engineering role playbooks
      </Link>
    </div>
  );
};

export default HeroActions;
