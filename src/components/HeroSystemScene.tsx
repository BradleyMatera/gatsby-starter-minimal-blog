// src/components/HeroSystemScene.tsx
// Compact hero badge using a personal photo instead of Three.js.

import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const HeroSystemScene: React.FC = () => (
  <section className="hero-system" aria-label="Current focus banner">
    <div className="hero-system__card hero-system__card--compact">
      <div className="hero-system__photo">
        <StaticImage
          src="../images/hero-amazon.jpg"
          alt="Bradley working at Amazon"
          placeholder="blurred"
          layout="constrained"
          width={420}
          loading="eager"
          quality={80}
          style={{ width: "100%", height: "100%" }}
          imgStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="hero-system__copy">
        <span className="hero-system__eyebrow">Currently practicing</span>
        <p className="hero-system__tagline">
          Early-career Web Dev (B.S. Oct 2025) · React/Express demos · Learning AWS + AI-assisted workflows
        </p>
      </div>
    </div>
  </section>
);

export default HeroSystemScene;
