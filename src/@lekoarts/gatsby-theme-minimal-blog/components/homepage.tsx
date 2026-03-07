/** @jsx jsx */
import { jsx } from "theme-ui";
import { HeadFC, Link } from "gatsby";
import Layout from "./layout";
import Title from "./title";
import Listing from "./listing";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import useSiteMetadata from "../hooks/use-site-metadata";
import replaceSlashes from "../utils/replaceSlashes";
import { visuallyHidden } from "../styles/utils";
import Seo from "./seo";
import Hero from "../texts/hero.mdx";
import Bottom from "../texts/bottom.mdx";
import TinyTriangleAccent from "../../../components/TinyTriangleAccent";

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
  const { siteTitle } = useSiteMetadata();

  return (
    <Layout>
      <h1 sx={visuallyHidden}>{siteTitle}</h1>
      <section className="u-home-hero">
        <Hero />
      </section>
      <div className="homepage-title-row">
        <TinyTriangleAccent />
        <Title text="Latest writing">
          <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>Browse the archive</Link>
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

export const Head: HeadFC = () => <Seo />;
