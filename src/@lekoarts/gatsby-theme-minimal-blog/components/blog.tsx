import * as React from "react";
import { HeadFC, Link } from "gatsby";
import Layout from "./layout";
import Listing from "./listing";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import Seo from "./seo";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export type MBBlogProps = {
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

const Blog = ({ posts }: MBBlogProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const tags = React.useMemo(() => {
    const all = new Map<string, number>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        all.set(tag.name, (all.get(tag.name) ?? 0) + 1);
      });
    });
    return Array.from(all.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [posts]);

  React.useEffect(() => {
    const term = query.trim();
    if (!term) {
      return;
    }
    const timeout = window.setTimeout(() => {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "blog_search", {
          search_term: term,
          tag: activeTag ?? "all",
        });
      }
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [query, activeTag]);

  const filtered = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag = activeTag ? post.tags?.some((tag) => tag.name === activeTag) : true;
      if (!matchesTag) return false;
      if (!normalizedQuery) return true;
      const haystack = [post.title, post.description, post.excerpt, post.tags?.map((tag) => tag.name).join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [posts, query, activeTag]);

  return (
    <Layout>
      <header className="section-shell__header" style={{ marginBottom: "1.5rem" }}>
        <span className="eyebrow">Blog</span>
        <h1 className="section-title">Field notes, experiments, and project retrospectives</h1>
        <p className="section-lead">
          I write quick breakdowns of problems I solve and cool tech I’m learning. Nothing long. No spam. If something breaks and I fix it, I write about it.
        </p>
      </header>

      <div className="surface-card surface-card--muted" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
        <div className="search-bar" role="search">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27a6 6 0 10-.71.71l.27.28v.79l5 5a1 1 0 001.41-1.41zm-5.5 0a4 4 0 114-4 4 4 0 01-4 4z"
            />
          </svg>
          <label htmlFor="blog-search" className="sr-only">
            Search blog posts
          </label>
          <input
            id="blog-search"
            type="search"
            placeholder="Search posts by topic, technology, or keyword"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {tags.length > 0 ? (
          <div className="project-gallery__filters" style={{ marginTop: "1rem" }}>
            <button
              type="button"
              className="filter-pill"
              data-active={!activeTag}
              onClick={() => setActiveTag(null)}
            >
              All topics ({posts.length})
            </button>
            {tags.map((tag) => (
              <button
                key={tag.name}
                type="button"
                className="filter-pill"
                data-active={activeTag === tag.name}
                onClick={() => setActiveTag((current) => (current === tag.name ? null : tag.name))}
              >
                {tag.name} ({tag.count})
              </button>
            ))}
            <Link
              className="card-link"
              to={replaceSlashes(`/${basePath}/${tagsPath}`)}
              style={{ marginLeft: "auto" }}
            >
              View all tags →
            </Link>
          </div>
        ) : null}
      </div>

      <Listing posts={filtered} id="latest-articles" />

      {filtered.length === 0 ? (
        <p className="section-lead" style={{ marginTop: "1.5rem" }}>
          No posts match your filters yet. Try a different keyword or explore the tag directory.
        </p>
      ) : null}
    </Layout>
  );
};

export default Blog;

export const Head: HeadFC = () => <Seo title="Blog" description="Short breakdowns of fixes, experiments, and lessons from the cloud and full-stack work I ship." />;
