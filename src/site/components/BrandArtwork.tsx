import * as React from "react";

export type BrandArtworkVariant = "digital-architecture" | "growth-systems" | "engineering-craft" | "cloud-networks"
  | "web-design-studio" | "local-discovery" | "accessible-interface" | "site-renovation"
  | "performance-engine" | "website-repair" | "care-monitoring" | "pricing-toolkit"
  | "editorial-cloud" | "editorial-security" | "editorial-ai" | "editorial-development" | "about-workshop" | "process-blueprint";

type BrandArtworkProps = {
  variant?: BrandArtworkVariant;
  className?: string;
  eager?: boolean;
};

const originalArtwork = new Set(["digital-architecture", "growth-systems", "engineering-craft", "cloud-networks"]);

const BrandArtwork = ({ variant = "digital-architecture", className = "", eager = false }: BrandArtworkProps) => {
  const frame = React.useRef<HTMLPictureElement>(null);
  React.useEffect(() => {
    const element = frame.current;
    if (!element || eager || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.dataset.reveal = "waiting";
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.dataset.reveal = "visible";
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px 60px 0px", threshold: 0.05 });
    observer.observe(element);
    return () => { observer.disconnect(); delete element.dataset.reveal; };
  }, [variant, eager]);
  return <picture ref={frame} className={`brand-artwork ${className}`} data-artwork={variant}>
    <source srcSet={`/images/brand/${variant}-720.webp`} type="image/webp" media="(max-width: 700px)" />
    <img src={`/images/brand/${variant}.${originalArtwork.has(variant) ? "webp" : "png"}`} alt="" width="1440" height="960" loading={eager ? "eager" : "lazy"} decoding="async" />
  </picture>;
};

export default BrandArtwork;
