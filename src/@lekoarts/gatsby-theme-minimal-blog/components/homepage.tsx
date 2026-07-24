/** @jsx jsx */
// Gatsby theme shadow file: keep this path for the theme override,
// but treat src/features and src/site as the source of truth for real app code.
import { jsx } from "theme-ui";
import { HeadFC, Link } from "gatsby";
import Layout from "./layout";
import Title from "./title";
import Listing from "./listing";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import Seo from "./seo";
import { buildProfessionalServiceSchema, serviceAreaDescription } from "../../../site/seo/local-seo";
import Hero from "../texts/hero.mdx";
import Bottom from "../texts/bottom.mdx";
import { TinyTriangleAccent } from "../../../site/accents";

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

const Homepage = ({ posts }: MBHomepageProps) => {
  const { basePath, blogPath } = useMinimalBlogConfig();

  return (
    <Layout>
      <section className="u-home-hero">
        <Hero />
      </section>
      <div className="homepage-title-row">
        <TinyTriangleAccent />
        <Title text="Latest writing">
          <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>Browse all blog posts</Link>
        </Title>
      </div>
      <Listing posts={posts} id="latest-posts" showTags={false} />
      <section className="u-home-bottom">
        <Bottom />
      </section>
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
  >
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": "https://bradleymatera.dev/#bradley",
            name: "Bradley Matera",
            url: "https://bradleymatera.dev/about/",
            email: "bradmatera@gmail.com",
            telephone: "+16083135373",
            jobTitle: "Web Developer",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Durand",
              addressRegion: "IL",
              addressCountry: "US",
            },
            sameAs: [
              "https://www.linkedin.com/in/bradmatera",
              "https://github.com/BradleyMatera",
              "https://dev.to/bradleymatera",
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://bradleymatera.dev/#website",
            url: "https://bradleymatera.dev",
            name: "Bradley Matera",
            publisher: { "@id": "https://bradleymatera.dev/#bradley" },
            inLanguage: "en",
          },
        ],
      })}
    </script>
  </Seo>
);
