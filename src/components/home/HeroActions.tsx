import * as React from "react";
import { Link } from "gatsby";
import { useScrollReveal } from "./useScrollReveal";

const HeroActions = () => {
  const { ref, revealed } = useScrollReveal(150, { initiallyVisible: true });
  const emailAddress = "bradmatera@gmail.com";
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
      <Link className="hero-action" data-variant="primary" to="/contact">
        <span className="hero-action__label">Start a project via email</span>
        <span className="hero-action__detail">{emailAddress}</span>
      </Link>
    </div>
  );
};

export default HeroActions;
