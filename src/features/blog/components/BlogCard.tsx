import * as React from "react";
import { Link } from "gatsby";
import useMinimalBlogConfig from "../../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-minimal-blog-config";
import replaceSlashes from "../../../@lekoarts/gatsby-theme-minimal-blog/utils/replaceSlashes";
import joinClasses from "../../../utils/joinClasses";
import "../../../styles/editorial.css";
import TopicArtwork from "./TopicArtwork";

type BlogTag = {
  name: string;
  slug: string;
};

type BlogCardProps = {
  post: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead?: number;
    tags?: BlogTag[];
    banner?: { childImageSharp?: { resize?: { src?: string } } };
  };
  showTags?: boolean;
  featured?: boolean;
};

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
};

const BlogCard = ({ post, showTags = true, featured = false }: BlogCardProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();

  return (
    <article
      className={joinClasses("blog-card", "editorial-article-card", featured ? "blog-card--featured" : "")}
    >
      <TopicArtwork context={`${post.title} ${post.tags?.map(tag => tag.name).join(" ") || ""}`} title={post.title} slug={post.slug} image={post.banner?.childImageSharp?.resize?.src} />
      <div className="blog-card__header">
        <div className="blog-card__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {typeof post.timeToRead === "number" ? <span className="blog-card__dot" aria-hidden="true">·</span> : null}
          {typeof post.timeToRead === "number" ? <span>{post.timeToRead} min read</span> : null}
        </div>
      </div>

      <h2 className="blog-card__title">
        <Link to={post.slug}>{post.title}</Link>
      </h2>

      <p className="blog-card__excerpt">{post.description || post.excerpt}</p>

      {showTags && post.tags && post.tags.length > 0 ? (
        <div className="blog-card__tags">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag.slug}
              className="blog-card__tag"
              to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
};

export default BlogCard;
