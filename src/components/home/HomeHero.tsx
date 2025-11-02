import * as React from "react";
import HeroHeadline from "./HeroHeadline";
import HeroActions from "./HeroActions";
import StatsGrid from "./StatsGrid";
import FeatureCardList from "./FeatureCardList";

const HomeHero = () => (
  <section className="section-shell hero-section">
    <div className="surface-card hero-grid">
      <div>
        <HeroHeadline />
        <HeroActions />
        <StatsGrid />
      </div>
      <FeatureCardList />
    </div>
  </section>
);

export default HomeHero;
