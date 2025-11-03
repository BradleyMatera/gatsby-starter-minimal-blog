import * as React from "react";
import { Link } from "gatsby";
import { useScrollReveal } from "./useScrollReveal";

const HeroActions = () => {
  const { ref, revealed } = useScrollReveal(150);
  const emailAddress = "bradmatera@gmail.com";
  const emailSubject = encodeURIComponent("Project inquiry for Bradley Matera");
  const emailBody = encodeURIComponent(
    [
      "Hi Bradley,",
      "",
      "I came across your portfolio and would love to chat about working together.",
      "Here are a few notes about the project:",
      "",
      "- Goals:",
      "- Timeline:",
      "- Helpful context:",
      "",
      "Talk soon!"
    ].join("\n")
  );
  const emailHref = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

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
