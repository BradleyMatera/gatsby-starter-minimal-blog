import * as React from "react";
import { Link } from "gatsby";
import useMinimalBlogConfig from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-minimal-blog-config";
import replaceSlashes from "../../@lekoarts/gatsby-theme-minimal-blog/utils/replaceSlashes";

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
  };
  showTags?: boolean;
};

const formatExcerpt = (excerpt: string, maxLength = 180) => {
  if (!excerpt) return "";
  if (excerpt.length <= maxLength) return excerpt;
  return `${excerpt.substring(0, maxLength).trim()}…`;
};

const BlogCard = ({ post, showTags = true }: BlogCardProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();

  return (
    <article className="blog-card">
      <header>
        <Link to={post.slug} className="blog-card__title">
          {post.title}
        </Link>
        <div className="blog-card__meta">
          <span>
            <time dateTime={post.date}>{post.date}</time>
          </span>
          {typeof post.timeToRead === "number" ? <span>{post.timeToRead} min read</span> : null}
        </div>
      </header>
      <p className="blog-card__excerpt">{formatExcerpt(post.description || post.excerpt)}</p>
      {showTags && post.tags && post.tags.length > 0 ? (
        <div className="tag-list">
          {post.tags.map((tag) => (
            <Link
              key={tag.slug}
              className="tag-badge"
              to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      ) : null}
      <div className="card-actions">
        <Link to={post.slug} data-variant="primary">
          Read article
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
