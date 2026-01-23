import * as React from "react";
import HeroHeadline from "./HeroHeadline";
import HeroActions from "./HeroActions";
import StatsGrid from "./StatsGrid";
import FeatureCardList from "./FeatureCardList";

const HomeHero = () => {
  React.useEffect(() => {
    document.body.classList.add("home-scroll-snap");
    document.documentElement.classList.add("home-scroll-snap");

    return () => {
      document.body.classList.remove("home-scroll-snap");
      document.documentElement.classList.remove("home-scroll-snap");
    };
  }, []);

  return (
    <section className="section-shell hero-section home-snap">
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
};

export default HomeHero;
