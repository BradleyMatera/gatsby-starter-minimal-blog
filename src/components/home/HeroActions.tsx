import * as React from "react";
import { Link } from "gatsby";
import { useScrollReveal } from "./useScrollReveal";
import joinClasses from "../../utils/joinClasses";

const HeroActions = () => {
  const { ref, revealed } = useScrollReveal(150, { initiallyVisible: true });
  const emailAddress = "bradmatera@gmail.com";
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={joinClasses("hero-actions", "u-reveal", revealed ? "is-revealed" : undefined)}
    >
      <Link className="hero-action" data-variant="primary" to="/contact">
        <span className="hero-action__label">Start a project via email</span>
        <span className="hero-action__detail">{emailAddress}</span>
      </Link>
    </div>
  );
};

export default HeroActions;
