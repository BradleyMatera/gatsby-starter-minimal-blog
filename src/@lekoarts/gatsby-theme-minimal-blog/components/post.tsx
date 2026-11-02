import * as React from "react";
import { Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "./layout";
import ItemTags from "./item-tags";
import Seo from "./seo";
import PostFooter from "./post-footer";
import ReadingLayout from "../../../features/blog/components/ReadingLayout";
import TopicArtwork from "../../../features/blog/components/TopicArtwork";
import { getArticleCover } from "../../../features/blog/article-covers";
import { ShopifySpotlight } from "../../../features/shopify";
import "../../../styles/editorial.css";

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

const Post: React.FC<React.PropsWithChildren<PageProps<MBPostProps>>> = ({ data, children }) => {
  const post = data?.post;
  if (!post) return (
    <Layout className="editorial-page">
      <h1>Post not found</h1>
      <p>Sorry, this post could not be loaded. Please check the URL.</p>
    </Layout>
  );
  return (
    <Layout className="editorial-page editorial-post">
      <article itemScope itemType="http://schema.org/Article">
        <header className="editorial-header">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol className="breadcrumbs__list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog/">Blog</Link></li>
              <li aria-current="page">{post.title}</li>
            </ol>
          </nav>
          <span className="eyebrow">Blog post</span>
          <h1 itemProp="headline">{post.title}</h1>
          <div className="editorial-meta">
            <Link to="/about/" itemProp="author">Bradley Matera</Link>
            <time dateTime={post.date} itemProp="datePublished">{post.date}</time>
            {typeof post.timeToRead === "number" ? <span>{post.timeToRead} min read</span> : null}
          </div>
          {post.tags?.length ? <ItemTags tags={post.tags} /> : null}
          <TopicArtwork context={[post.title, ...(post.tags?.map((tag) => tag.name) || [])].join(" ")} title={post.title} slug={post.slug} image={post.banner?.childImageSharp?.resize?.src} eager />
        </header>
        <ShopifySpotlight context={{ path: post.slug, title: post.title, tags: post.tags?.map((tag) => tag.name), description: post.description || post.excerpt }} placement="article-intro" variant="inline" limit={1} />
        <ReadingLayout pageKey={post.slug}>
          <div className="post-content" itemProp="articleBody">{children}</div>
          <ShopifySpotlight context={{ path: post.slug, title: post.title, tags: post.tags?.map((tag) => tag.name), description: post.description || post.excerpt }} placement="article-end" offset={1} variant="compact" limit={2} />
          <PostFooter post={post} />
        </ReadingLayout>
      </article>
    </Layout>
  );
};

export default Post;

export const Head: HeadFC<MBPostProps> = ({ data }) => {
  const post = data?.post;
  if (!post) {
    return <Seo title="Post not found" description="This post could not be loaded." />;
  }
  const publishedTime = (() => {
    const parsed = new Date(post.date);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  })();
  const articleTags = post.tags?.map((tag) => tag.name).filter((tag): tag is string => Boolean(tag));
  const cover = getArticleCover(post.slug);
  const imageUrl = cover?.src || post.banner?.childImageSharp?.resize?.src;

  return (
    <>
      <Seo
        title={post.title}
        description={post.description ? post.description : post.excerpt}
        image={imageUrl}
        imageAlt={cover?.alt}
        pathname={post.slug}
        canonicalUrl={post.canonicalUrl}
        ogType="article"
        article={{
          publishedTime,
          modifiedTime: publishedTime,
          tags: articleTags,
          section: post.tags?.[0]?.name,
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: post.title, path: post.slug },
        ]}
      />
    </>
  );
};
