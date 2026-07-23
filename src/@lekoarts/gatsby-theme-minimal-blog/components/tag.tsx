import * as React from "react";
import { Link } from "gatsby";
import Seo from "./seo";
import Listing from "./listing";
import Layout from "./layout";

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

  return (
    <Layout>
      <section className="tag-page" sx={{ maxWidth: `1200px`, margin: `0 auto`, padding: `4rem 1.5rem` }}>
        <nav aria-label="Breadcrumb" sx={{ marginBottom: `1.5rem`, fontSize: `0.875rem` }}>
          <Link to="/tags/" sx={{ color: `primary`, textDecoration: `none` }}>Tags</Link>
          <span sx={{ margin: `0 0.5rem`, opacity: 0.5 }}>/</span>
          <span sx={{ fontWeight: `bold` }}>{tagName}</span>
        </nav>
        <h1 sx={{ fontSize: `2.5rem`, marginBottom: `0.5rem` }}>
          Posts tagged &ldquo;{tagName}&rdquo;
        </h1>
        <p sx={{ fontSize: `1.125rem`, opacity: 0.7, marginBottom: `1rem` }}>
          {posts.length} {posts.length === 1 ? "article" : "articles"} about {tagName} from Bradley Matera&apos;s portfolio.
        </p>
        <p sx={{ fontSize: `1rem`, opacity: 0.65, marginBottom: `2rem` }}>
          This page collects {posts.length} {posts.length === 1 ? "article" : "articles"} tagged &ldquo;{tagName}&rdquo; from Bradley Matera, a web developer in Northwest Illinois. Each article includes project examples, code snippets, and verification steps related to {tagName}.
        </p>
        <Listing posts={posts} showTags={false} />
      </section>
    </Layout>
  );
};

export default Tag;

export const Head = ({ pageContext }: { pageContext: TagPageContext }) => {
  const { slug, name } = pageContext;
  const tagName = name || slug;
  const pathname = `/tags/${slug}/`;
  const description = `Articles tagged "${tagName}" on Bradley Matera's portfolio — web development, AI, cloud engineering, and career insights from Northwest Illinois.`;
  const title = `Tag: ${tagName}`;

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
    />
  );
};
