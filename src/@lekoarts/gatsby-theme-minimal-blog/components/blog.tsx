import * as React from "react";
import { HeadFC, Link } from "gatsby";
import { useLocation } from "@reach/router";
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
  const { tagsPath, basePath, blogPath } = useMinimalBlogConfig();
  const location = useLocation();
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const tags = React.useMemo(() => {
    const all = new Map<
      string,
      {
        name: string;
        slug: string;
        count: number;
      }
    >();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        const existing = all.get(tag.slug);
        if (existing) {
          existing.count += 1;
        } else {
          all.set(tag.slug, { name: tag.name, slug: tag.slug, count: 1 });
        }
      });
    });
    return Array.from(all.values()).sort((a, b) => b.count - a.count);
  }, [posts]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") ?? "";
    const initialTag = params.get("tag");
    setQuery(initialQuery);
    setActiveTag(initialTag);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    if (activeTag) {
      params.set("tag", activeTag);
    } else {
      params.delete("tag");
    }
    const search = params.toString();
    const url = search ? `${location.pathname}?${search}` : location.pathname;
    window.history.replaceState({}, "", url);
  }, [query, activeTag, location.pathname]);

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
      const matchesTag = activeTag ? post.tags?.some((tag) => tag.slug === activeTag) : true;
      if (!matchesTag) return false;
      if (!normalizedQuery) return true;
      const haystack = [post.title, post.description, post.excerpt, post.tags?.map((tag) => tag.name).join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [posts, query, activeTag]);

  const handleTagLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, tagSlug: string | null) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    setActiveTag(tagSlug);
  };

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
        <form
          className="search-bar"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const value = formData.get("q");
            setQuery(typeof value === "string" ? value : "");
          }}
        >
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
            name="q"
            type="search"
            placeholder="Search posts by topic, technology, or keyword"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
        {tags.length > 0 ? (
          <div className="project-gallery__filters" style={{ marginTop: "1rem" }}>
            <Link
              to={replaceSlashes(`/${basePath}/${blogPath}`)}
              className="filter-pill"
              data-active={!activeTag}
              aria-current={!activeTag ? "page" : undefined}
              onClick={(event) => handleTagLinkClick(event, null)}
            >
              All topics ({posts.length})
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
                className="filter-pill"
                data-active={activeTag === tag.slug}
                aria-current={activeTag === tag.slug ? "page" : undefined}
                onClick={(event) =>
                  handleTagLinkClick(event, activeTag === tag.slug ? null : tag.slug)
                }
              >
                {tag.name} ({tag.count})
              </Link>
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
      <noscript>
        <p className="section-lead" style={{ marginTop: "1.5rem" }}>
          JavaScript is disabled, so interactive filtering is unavailable. Browse all tags instead:
          <a className="card-link" href={replaceSlashes(`/${basePath}/${tagsPath}`)}>
            View all tags →
          </a>
        </p>
      </noscript>
    </Layout>
  );
};

export default Blog;

export const Head: HeadFC = () => <Seo title="Blog" description="Short breakdowns of fixes, experiments, and lessons from the cloud and full-stack work I ship." />;
