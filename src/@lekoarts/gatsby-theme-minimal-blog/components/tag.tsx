import * as React from "react";
import { Link } from "gatsby";
import Seo from "./seo";
import Listing from "./listing";
import Layout from "./layout";
import "../../../styles/editorial.css";

type TagData = {
  allPost: {
    nodes: Array<{
      slug: string;
      title: string;
      date: string;
      excerpt: string;
      description: string;
      timeToRead?: number;
      tags?: Array<{ name: string; slug: string }>;
    }>;
  };
};

type TagPageContext = {
  slug: string;
  name: string;
  basePath?: string;
};

const Tag = ({ data, pageContext }: { data: TagData; pageContext: TagPageContext }) => {
  const { slug, name } = pageContext;
  const posts = data.allPost.nodes;
  const tagName = name || slug;
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const mostRecent = sortedPosts[0];
  const oldest = sortedPosts[sortedPosts.length - 1];

  return (
    <Layout className="editorial-page editorial-library">
      <section className="tag-page">
        <nav aria-label="Breadcrumb">
          <Link to="/tags/">Tags</Link>
          <span>/</span>
          <span>{tagName}</span>
        </nav>

        <h1>
          Posts tagged &ldquo;{tagName}&rdquo;
        </h1>
        <p className="direct-answer">
          <strong>What is the {tagName} tag?</strong> The {tagName} tag collects {posts.length} {posts.length === 1 ? "article" : "articles"} from Bradley Matera&apos;s portfolio covering {tagName}-related topics in web development, cloud engineering, and AI. Each article includes real project examples, code snippets, and verification steps — not generic tutorials.
        </p>
        <p>
          {posts.length} {posts.length === 1 ? "article" : "articles"} spanning {mostRecent && oldest ? `${oldest.date.slice(0, 4)}–${mostRecent.date.slice(0, 4)}` : ""}. Written by Bradley Matera, a web developer in Durand, Illinois, serving Northwest Illinois with website design, SEO, and full-stack development. Last updated {mostRecent ? mostRecent.date.slice(0, 10) : "recently"}.
        </p>
        <h2>What you&apos;ll find in these articles</h2>
        <p>
          These {posts.length} {posts.length === 1 ? "article covers" : "articles cover"} {tagName}-related topics from a practical, hands-on perspective. Each piece is based on real projects, experiments, or problems I solved — not theoretical overviews. You&apos;ll find code examples, before-and-after comparisons, and specific tools or techniques that worked in practice.
        </p>
        <h2>Articles in this tag</h2>
        <p>
          The following {posts.length} {posts.length === 1 ? "article is" : "articles are"} tagged &ldquo;{tagName}&rdquo;:
        </p>
        <Listing posts={sortedPosts} showTags={false} />
        <h2>Key takeaways from these {posts.length} {posts.length === 1 ? "article" : "articles"}</h2>
        <ul>
          <li>Each {tagName} article is written from direct experience — building, debugging, or researching real projects. Source code is linked where available.</li>
          <li>Code examples are tested and verified before publishing. Where claims reference external documentation (e.g., Google Search guidelines, MDN), source links are included inline.</li>
          <li>Articles are dated and updated when tools or best practices change — check the article date for context.</li>
          <li>Author: <Link to="/about/">Bradley Matera</Link>, a web developer in Durand, Illinois. Questions or corrections? <Link to="/contact/">Contact me</Link> — I respond to reader questions.</li>
        </ul>
        <h2>Explore related tags</h2>
        <p>
          Looking for more topics? Browse all <Link to="/tags/">tags</Link> or visit the <Link to="/blog/">blog index</Link> for the full archive.
        </p>
      </section>
    </Layout>
  );
};

export default Tag;

export const Head = ({ pageContext, data }: { pageContext: TagPageContext; data: TagData }) => {
  const { slug, name } = pageContext;
  const tagName = name || slug;
  const pathname = `/tags/${slug}/`;
  const postCount = data?.allPost?.nodes?.length || 0;
  const description = `${postCount} ${postCount === 1 ? "article" : "articles"} tagged "${tagName}" on Bradley Matera's portfolio — web development, AI, cloud engineering, and career insights from Northwest Illinois. Each article includes project examples, code snippets, and verification steps.`;
  const title = `Tag: ${tagName}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: `https://bradleymatera.dev${pathname}`,
      isPartOf: {
        "@type": "WebSite",
        name: "Bradley Matera — Portfolio",
        url: "https://bradleymatera.dev",
      },
      author: {
        "@type": "Person",
        name: "Bradley Matera",
        url: "https://bradleymatera.dev/",
      },
      publisher: {
        "@type": "Person",
        name: "Bradley Matera",
        url: "https://bradleymatera.dev/",
      },
    },
  ];

  return (
    <Seo
      title={title}
      description={description}
      pathname={pathname}
      canonicalUrl={`https://bradleymatera.dev${pathname}`}
      breadcrumbs={[
        { name: "Tags", path: "/tags/" },
        { name: tagName, path: pathname },
      ]}
      structuredData={structuredData}
    />
  );
};
