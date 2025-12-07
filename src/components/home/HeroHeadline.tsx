import * as React from "react";
import { useScrollReveal } from "./useScrollReveal";

const HeroHeadline = () => {
  const { ref, revealed } = useScrollReveal(0, { initiallyVisible: true });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s cubic-bezier(.22,.9,.2,1), transform 0.7s cubic-bezier(.22,.9,.2,1)",
      }}
    >
      <span className="hero-highlight">Hi, my name is Bradley Matera.</span>
      <h1 className="hero-headline">Technologist building real experience in cloud, automation, and software development</h1>
      <p className="hero-description">
        I came into this field later on. I graduated in Web Development in 2025 and I’m working on building real experience in cloud, automation, and software development. I’m early in my career, but I’ve put in a lot of time learning, shipping projects, and figuring out how systems work.
      </p>
      <p className="hero-description">
        Before tech I worked a mix of jobs while raising my family and trying to find the right direction. I served as a U.S. Army combat medic, then worked in things like roofing, case management, and rescue work. None of it was long-term, but every job taught me how to stay calm, solve problems, and keep moving even when the situation is unpredictable.
      </p>
    </div>
  );
};

export default HeroHeadline;
