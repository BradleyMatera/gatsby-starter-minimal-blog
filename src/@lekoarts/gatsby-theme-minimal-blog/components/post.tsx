/** @jsx jsx */
import { jsx, Heading } from "theme-ui";
import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import Layout from "./layout";
import ItemTags from "./item-tags";
import Seo from "./seo";
import PostFooter from "./post-footer";
import BlogAccent from "../../../components/BlogAccent";
import { Section } from "../../../components/ui";

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

const Post: React.FC<React.PropsWithChildren<PageProps<MBPostProps>>> = ({ data, children }) => {
  const post = data?.post;
  if (!post) {
    return (
      <Layout>
        <Section className="post-entry" disableReveal>
          <article className="surface-card">
            <header sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span className="eyebrow">Blog post</span>
              <Heading as="h1" className="section-title" sx={{ mb: 0 }}>
                Post not found
              </Heading>
            </header>
            <p>Sorry, this post could not be loaded. Please check the URL.</p>
          </article>
        </Section>
      </Layout>
    );
  }

  const [tocItems, setTocItems] = React.useState<TocItem[]>([]);
  const houseAds = [
    {
      title: "Brad's Amazon Picks",
      body: "Curated tech gear I actually use. Support the site at no extra cost.",
      cta: "Shop the picks",
      href: "/store/#brads-amazon-picks",
    },
    {
      title: "Direct Downloads",
      body: "Grab the templates, checklists, and playbooks I sell directly.",
      cta: "View downloads",
      href: "/store/",
    },
    {
      title: "Customer Portal",
      body: "Already purchased? Access your downloads and receipts here.",
      cta: "Open portal",
      href: "/purchases/",
    },
  ];

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
      <Section className="post-entry" disableReveal>
        <div className="blog-search-accent">
          <BlogAccent />
        </div>
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
            <aside className="house-ads house-ads--left" aria-label="Promoted links">
              {houseAds.map((ad) => (
                <a key={ad.title} className="house-ad" href={ad.href}>
                  <span className="house-ad__eyebrow">House ad</span>
                  <span className="house-ad__title">{ad.title}</span>
                  <span className="house-ad__body">{ad.body}</span>
                  <span className="house-ad__cta">{ad.cta}</span>
                </a>
              ))}
            </aside>
            <section className="post-content" itemProp="articleBody">
              {children}
            </section>
            <aside className="post-rail">
              {tocItems.length > 1 ? (
                <div className="toc" aria-label="Table of contents">
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
                </div>
              ) : null}
              <div className="house-ads house-ads--right" aria-label="Promoted links">
                {houseAds.map((ad) => (
                  <a key={ad.title} className="house-ad" href={ad.href}>
                    <span className="house-ad__eyebrow">House ad</span>
                    <span className="house-ad__title">{ad.title}</span>
                    <span className="house-ad__body">{ad.body}</span>
                    <span className="house-ad__cta">{ad.cta}</span>
                  </a>
                ))}
              </div>
            </aside>
          </div>

          <PostFooter post={post} />
        </article>
      </Section>
    </Layout>
  );
};

export default Post;

export const Head: HeadFC<MBPostProps> = ({ data }) => {
  const post = data?.post;
  if (!post) {
    return <Seo title="Post not found" description="This post could not be loaded." />;
  }
  return (
    <Seo
      title={post.title}
      description={post.description ? post.description : post.excerpt}
      image={post.banner ? post.banner?.childImageSharp?.resize?.src : undefined}
      pathname={post.slug}
      canonicalUrl={post.canonicalUrl}
    />
  );
};
