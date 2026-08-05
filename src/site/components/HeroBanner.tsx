import * as React from "react";
import { Link } from "gatsby";
import { useReducedMotion } from "../../utils/useReducedMotion";

export type HeroBannerProps = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  titleAs?: "h1" | "h2";
};

const AnimatedTitle: React.FC<{ title: string }> = ({ title }) => {
  const reducedMotion = useReducedMotion();
  const words = title.split(" ");

  if (reducedMotion) {
    return <>{title}</>;
  }

  return (
    <>
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <span
            className="hero-banner__word"
            style={{ animationDelay: `${0.1 + index * 0.06}s` }}
          >
            {word}
          </span>
          {index < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </>
  );
};

const HeroBanner = ({ title, subtitle, ctaText, ctaLink, titleAs = "h1" }: HeroBannerProps) => {
  const TitleTag = titleAs as "h1";
  return (
  <section className="hero-banner hero-banner--v2 section-surface" aria-label="Hero banner">
    <div className="hero-banner__mesh" aria-hidden="true" />
    <div className="hero-banner__text">
      <p className="hero-banner__eyebrow" style={{ animationDelay: "0s" }}>Bradley Matera · Small business web design in Northwest Illinois</p>
      <TitleTag className="hero-banner__title" style={{ animationDelay: "0.1s" }}>
        <AnimatedTitle title={title} />
      </TitleTag>
      <p className="hero-banner__subtitle" style={{ animationDelay: "0.2s" }}>{subtitle}</p>
      <Link className="hero-banner__cta" to={ctaLink} style={{ animationDelay: "0.3s" }}>
        <span>{ctaText}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
    <div className="hero-banner__visual" role="presentation" style={{ animationDelay: "0.15s" }}>
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
          {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
        />
      </picture>
    </div>
    <div className="hero-banner__scroll-indicator" aria-hidden="true">
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
        <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <circle cx="10" cy="9" r="2" fill="currentColor" className="hero-banner__scroll-dot" />
      </svg>
    </div>
  </section>
  );
};

export default HeroBanner;
