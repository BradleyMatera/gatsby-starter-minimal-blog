/** @jsx jsx */
// Gatsby theme shadow file: keep this path for the theme override,
// but treat src/features and src/site as the source of truth for real app code.
import { jsx } from "theme-ui";
import { HeadFC, Link } from "gatsby";
import * as React from "react";
import Layout from "./layout";
import Seo from "./seo";
import { buildProfessionalServiceSchema } from "../../../site/seo/local-seo";
import Hero from "../texts/hero.mdx";

export type MBHomepageProps = {
  posts: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead?: number;
    tags?: {
      name: string;
      slug: string;
    }[];
  }[];
};

const Homepage = () => {
  const heroRef = React.useRef<HTMLElement | null>(null);
  const [showMobileCta, setShowMobileCta] = React.useState(false);

  React.useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    const sections = root.querySelectorAll(".section-shell");
    if (sections.length === 0) return;

    // Fallback: if IntersectionObserver isn't available, show everything
    if (typeof IntersectionObserver === "undefined") {
      root.classList.add("no-io");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    sections.forEach((s) => observer.observe(s));

    // Safety timeout: show everything after 4s no matter what
    const safety = window.setTimeout(() => {
      sections.forEach((s) => s.classList.add("is-visible"));
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  React.useEffect(() => {
    const primaryActions = heroRef.current?.querySelector(".hero-ba__actions");
    if (!primaryActions || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileCta(!entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(primaryActions);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <section className="u-home-hero" ref={heroRef}>
        <Hero />
      </section>
      {showMobileCta ? (
        <div className="home-mobile-cta">
          <Link to="/contact/" className="home-mobile-cta__link">
            Get my free website plan
          </Link>
        </div>
      ) : null}
    </Layout>
  );
};

export default Homepage;

export const Head: HeadFC = () => (
  <Seo
    title="Small Business Web Design in Northwest Illinois"
    description="Fast, accessible websites, local SEO, repairs, and website care for Northwest Illinois small businesses. Work directly with Bradley. Packages start at $447."
    pathname="/"
    structuredData={buildProfessionalServiceSchema({
      path: "/",
      serviceName: "Small Business Web Design",
      description: "Fast, accessible websites, local SEO, repairs, and website care for Northwest Illinois small businesses. Work directly with Bradley. Packages start at $447.",
    })}
  />
);
