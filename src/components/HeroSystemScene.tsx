// src/components/HeroSystemScene.tsx
// Compact hero badge using a personal photo instead of Three.js.

import React from "react";

const HeroSystemScene: React.FC = () => (
  <section className="hero-system" aria-label="Current focus banner">
    <div className="hero-system__card hero-system__card--compact">
      <div className="hero-system__photo">
        <img
          src="/hero-amazon.jpg"
          alt="Bradley working at Amazon"
          loading="lazy"
          decoding="async"
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
