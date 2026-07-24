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
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const mostRecent = sortedPosts[0];
  const oldest = sortedPosts[sortedPosts.length - 1];

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

        {/* Direct answer for AEO extraction (40-70 words) */}
        <p className="direct-answer" sx={{ fontSize: `1.125rem`, opacity: 0.8, marginBottom: `1rem`, lineHeight: 1.6 }}>
          <strong>What is the {tagName} tag?</strong> The {tagName} tag collects {posts.length} {posts.length === 1 ? "article" : "articles"} from Bradley Matera&apos;s portfolio covering {tagName}-related topics in web development, cloud engineering, and AI. Each article includes real project examples, code snippets, and verification steps — not generic tutorials.
        </p>

        {/* Content depth: article count and date range */}
        <p sx={{ fontSize: `1rem`, opacity: 0.65, marginBottom: `2rem` }}>
          {posts.length} {posts.length === 1 ? "article" : "articles"} spanning {mostRecent && oldest ? `${oldest.date.slice(0, 4)}–${mostRecent.date.slice(0, 4)}` : ""}. Written by Bradley Matera, a web developer in Durand, Illinois, serving Northwest Illinois with website design, SEO, and full-stack development. Last updated {mostRecent ? mostRecent.date.slice(0, 10) : "recently"}.
        </p>

        {/* Content depth: key topics covered */}
        <h2 sx={{ fontSize: `1.5rem`, marginBottom: `1rem` }}>What you&apos;ll find in these articles</h2>
        <p sx={{ marginBottom: `1rem`, opacity: 0.8, lineHeight: 1.6 }}>
          These {posts.length} {posts.length === 1 ? "article covers" : "articles cover"} {tagName}-related topics from a practical, hands-on perspective. Each piece is based on real projects, experiments, or problems I solved — not theoretical overviews. You&apos;ll find code examples, before-and-after comparisons, and specific tools or techniques that worked in practice.
        </p>

        {/* Question heading + extractable list */}
        <h2 sx={{ fontSize: `1.5rem`, marginBottom: `1rem` }}>Articles in this tag</h2>
        <p sx={{ marginBottom: `1rem`, opacity: 0.7 }}>
          The following {posts.length} {posts.length === 1 ? "article is" : "articles are"} tagged &ldquo;{tagName}&rdquo;:
        </p>

        {/* Comparison table for AEO extraction */}
        <table sx={{ width: `100%`, borderCollapse: `collapse`, marginBottom: `2rem`, fontSize: `0.9rem` }}>
          <thead>
            <tr>
              <th sx={{ textAlign: `left`, padding: `0.5rem`, borderBottom: `2px solid`, borderColor: `border` }}>Title</th>
              <th sx={{ textAlign: `left`, padding: `0.5rem`, borderBottom: `2px solid`, borderColor: `border` }}>Date</th>
              <th sx={{ textAlign: `left`, padding: `0.5rem`, borderBottom: `2px solid`, borderColor: `border` }}>Read time</th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map((post) => (
              <tr key={post.slug}>
                <td sx={{ padding: `0.5rem`, borderBottom: `1px solid`, borderColor: `border` }}>
                  <Link to={post.slug} sx={{ color: `primary`, textDecoration: `none` }}>{post.title}</Link>
                </td>
                <td sx={{ padding: `0.5rem`, borderBottom: `1px solid`, borderColor: `border`, opacity: 0.7 }}>{post.date}</td>
                <td sx={{ padding: `0.5rem`, borderBottom: `1px solid`, borderColor: `border`, opacity: 0.7 }}>
                  {typeof post.timeToRead === "number" ? `${post.timeToRead} min` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Full listing with excerpts */}
        <Listing posts={posts} showTags={false} />

        {/* Content depth: key takeaways for GEO/AEO */}
        <h2 sx={{ fontSize: `1.5rem`, marginTop: `3rem`, marginBottom: `1rem` }}>Key takeaways from these {posts.length} {posts.length === 1 ? "article" : "articles"}</h2>
        <ul sx={{ marginBottom: `2rem`, lineHeight: 1.7, paddingLeft: `1.5rem` }}>
          <li>Each {tagName} article is written from direct experience — building, debugging, or researching real projects.</li>
          <li>Code examples are tested and verified before publishing, with links to source where available.</li>
          <li>Articles are dated and updated when tools or best practices change — check the article date for context.</li>
          <li>Questions or corrections? <Link to="/contact/" sx={{ color: `primary` }}>Contact Bradley</Link> — I respond to reader questions.</li>
        </ul>

        {/* Question heading for related tags */}
        <h2 sx={{ fontSize: `1.5rem`, marginTop: `3rem`, marginBottom: `1rem` }}>Explore related tags</h2>
        <p sx={{ marginBottom: `1rem`, opacity: 0.7 }}>
          Looking for more topics? Browse all <Link to="/tags/" sx={{ color: `primary` }}>tags</Link> or visit the <Link to="/blog/" sx={{ color: `primary` }}>blog index</Link> for the full archive.
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
