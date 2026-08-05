/** @jsx jsx */
// Gatsby theme shadow file: keep this path for the theme override,
// but treat src/features and src/site as the source of truth for real app code.
import { jsx } from "theme-ui";
import { HeadFC, Link } from "gatsby";
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
  return (
    <Layout>
      <section className="u-home-hero">
        <Hero />
      </section>
      <div className="home-mobile-cta">
        <Link
          to="/contact/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: "48px",
            padding: "0.875rem 1.5rem",
            borderRadius: "999px",
            fontSize: "1rem",
            fontWeight: 700,
            textDecoration: "none",
            background: "#6f6052",
            color: "#ffffff",
            border: "1px solid #6f6052",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          Get a free plan
        </Link>
      </div>
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
