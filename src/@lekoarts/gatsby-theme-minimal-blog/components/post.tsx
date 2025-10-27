/** @jsx jsx */
import { jsx, Heading } from "theme-ui";
import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import Layout from "./layout";
import ItemTags from "./item-tags";
import Seo from "./seo";
import PostFooter from "./post-footer";

export type MBPostProps = {
  post: {
    slug: string;
    title: string;
    date: string;
    tags?: {
      name: string;
      slug: string;
    }[];
    description?: string;
    canonicalUrl?: string;
    excerpt: string;
    timeToRead?: number;
    banner?: {
      childImageSharp: {
        resize: {
          src: string;
        };
      };
    };
  };
};

type TocItem = {
  id: string;
  text: string;
  level: number;
};

const Post: React.FC<React.PropsWithChildren<PageProps<MBPostProps>>> = ({ data: { post }, children }) => {
  const [tocItems, setTocItems] = React.useState<TocItem[]>([]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const headings = Array.from(document.querySelectorAll<HTMLHeadingElement>("#site-main h2, #site-main h3"));
    const mapped = headings
      .filter((heading) => heading.id)
      .map((heading) => ({
        id: heading.id,
        text: heading.innerText,
        level: heading.tagName === "H3" ? 3 : 2,
      }));
    setTocItems(mapped);
  }, []);

  return (
    <Layout>
      <article className="surface-card" itemScope itemType="http://schema.org/Article">
        <header sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span className="eyebrow">Blog post</span>
          <Heading as="h1" className="section-title" sx={{ mb: 0 }} itemProp="headline">
            {post.title}
          </Heading>
          <div className="post-meta">
            <span>
              <time dateTime={post.date} itemProp="datePublished">
                {post.date}
              </time>
            </span>
            {typeof post.timeToRead === "number" ? <span>{post.timeToRead} min read</span> : null}
            {post.tags ? <ItemTags tags={post.tags} /> : null}
          </div>
        </header>

        <div className="post-layout">
          <section className="post-content" itemProp="articleBody">
            {children}
          </section>
          {tocItems.length > 1 ? (
            <aside className="toc" aria-label="Table of contents">
              <p className="toc__title">On this page</p>
              <nav>
                <ul className="toc__list">
                  {tocItems.map((item) => (
                    <li key={item.id} style={{ paddingLeft: item.level === 3 ? "0.75rem" : 0 }}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          ) : null}
        </div>

        <PostFooter post={post} />
      </article>
    </Layout>
  );
};

export default Post;

export const Head: HeadFC<MBPostProps> = ({ data: { post } }) => (
  <Seo
    title={post.title}
    description={post.description ? post.description : post.excerpt}
    image={post.banner ? post.banner?.childImageSharp?.resize?.src : undefined}
    pathname={post.slug}
    canonicalUrl={post.canonicalUrl}
  />
);
