// src/components/HeroSystemScene.tsx
// Compact hero badge using a personal photo instead of Three.js.

import React from "react";

const HeroSystemScene: React.FC = () => (
  <section className="hero-system" aria-label="Current focus banner">
    <div className="hero-system__card hero-system__card--compact">
      <div className="hero-system__photo">
        <picture>
          <source type="image/avif" srcSet="/about-header-graphic.avif" />
          <source type="image/webp" srcSet="/about-header-graphic.webp" />
          <img
            src="/about-header-graphic.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="media-img"
            width="1536"
            height="1024"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </picture>
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
