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
      <section className="u-home-summary-table" aria-labelledby="services-summary-heading">
        <h2 id="services-summary-heading">Services at a glance</h2>
        <p className="section-lead">
          A quick comparison of the main ways we can work together. See the{" "}
          <Link to="/pricing/">full pricing page</Link> for what each option includes.
        </p>
        <table className="data-table">
          <caption>Comparison of main service offerings: starting price, timeline, and best fit</caption>
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Starting price</th>
              <th scope="col">Timeline</th>
              <th scope="col">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" data-label="Service">New website</th>
              <td data-label="Starting price">$447</td>
              <td data-label="Timeline">~14 days</td>
              <td data-label="Best for">New businesses and solo operators needing a first site</td>
            </tr>
            <tr>
              <th scope="row" data-label="Service">Redesign</th>
              <td data-label="Starting price">$597</td>
              <td data-label="Timeline">2-3 weeks</td>
              <td data-label="Best for">Existing sites that look dated or perform poorly</td>
            </tr>
            <tr>
              <th scope="row" data-label="Service">Repair</th>
              <td data-label="Starting price">$65/hour</td>
              <td data-label="Timeline">Varies by issue</td>
              <td data-label="Best for">Broken features, bugs, or small fixes on an existing site</td>
            </tr>
            <tr>
              <th scope="row" data-label="Service">Local SEO</th>
              <td data-label="Starting price">Included in builds; ongoing from $37/month</td>
              <td data-label="Timeline">Ongoing</td>
              <td data-label="Best for">Businesses wanting to rank in their service area</td>
            </tr>
            <tr>
              <th scope="row" data-label="Service">Care plans</th>
              <td data-label="Starting price">$37/month</td>
              <td data-label="Timeline">Ongoing (month-to-month)</td>
              <td data-label="Best for">Keeping an existing site fast, secure, and visible</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="u-home-local-guides">
        <h2>Local web design guides</h2>
        <p>Honest guides for businesses in the Rockford metro area — real prices, real timelines, and how to evaluate a web designer before you hire one.</p>
        <ul className="feature-list">
          <li><Link to="/website-design-rockford-il-what-it-actually-costs-and-how-to-choose/">Website Design Rockford IL: What It Actually Costs</Link></li>
          <li><Link to="/seo-rockford-il-a-local-business-guide-to-actually-ranking/">SEO Rockford IL: A Local Business Guide</Link></li>
          <li><Link to="/website-design-in-loves-park-illinois-a-small-business-guide/">Website Design in Loves Park, Illinois</Link></li>
          <li><Link to="/web-developer-rockford-illinois/">Web Developer in Rockford, Illinois</Link></li>
          <li><Link to="/web-developer-loves-park-illinois/">Web Developer in Loves Park, Illinois</Link></li>
        </ul>
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
