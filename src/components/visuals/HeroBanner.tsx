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
      <picture>
        <source type="image/avif" srcSet="/hero-amazon-2000.avif" />
        <source type="image/webp" srcSet="/hero-amazon-2000.webp" />
        <img
          src="/hero-amazon-2000.jpg"
          alt="Bradley Matera working with AWS systems"
          className="media-img"
          width="2000"
          height="1500"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </picture>
    </div>
  </section>
);

export default HeroBanner;
