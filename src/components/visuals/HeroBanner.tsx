import * as React from "react";
import { Link } from "gatsby";

export type HeroBannerProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
};

const HeroBanner = ({ title, subtitle, ctaText, ctaLink }: HeroBannerProps) => (
  <section className="hero-banner section-surface" aria-label="Hero banner">
    <div className="hero-banner__text">
      <p className="hero-banner__eyebrow">Bradley Matera · Systems software</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <Link className="hero-banner__cta" to={ctaLink}>
        <span>{ctaText}</span>
      </Link>
    </div>
    <div className="hero-banner__visual" role="presentation">
      <img src="/hero-amazon-4032x3024.jpg" alt="Bradley Matera working with AWS systems" className="media-img" />
    </div>
  </section>
);

export default HeroBanner;
