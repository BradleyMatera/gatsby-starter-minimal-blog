import * as React from "react";
import { HeadFC, Link } from "gatsby";
import { useLocation } from "@reach/router";
import Layout from "./layout";
import Listing from "./listing";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import Seo from "./seo";
import BlogAccent from "../../../components/BlogAccent";
import { Section } from "../../../components/ui";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
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

const hiddenPostSlugs = new Set([
  "/making-triangle-webgpu-demo-match-reality",
  "/rebuilt-webgpu-triangle-demo",
]);

const Blog = ({ posts }: MBBlogProps) => {
  const PAGE_SIZE = 5;
  const { tagsPath, basePath } = useMinimalBlogConfig();
  const location = useLocation();
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const visiblePosts = React.useMemo(
    () => posts.filter((post) => !hiddenPostSlugs.has(post.slug)),
    [posts]
  );

  const tags = React.useMemo(() => {
    const all = new Map<
      string,
      {
        name: string;
        slug: string;
        count: number;
      }
    >();
    visiblePosts.forEach((post) => {
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
  }, [visiblePosts]);

  const activeTagMeta = React.useMemo(() => {
    if (!activeTag) return null;
    return tags.find((tag) => tag.slug === activeTag) ?? null;
  }, [activeTag, tags]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") ?? "";
    const initialTag = params.get("tag");
    const initialPage = params.get("page");
    setQuery(initialQuery);
    setActiveTag(initialTag || null);
    if (initialPage) {
      const parsed = parseInt(initialPage, 10);
      if (!Number.isNaN(parsed) && parsed > 0) {
        setPage(parsed);
      }
    }
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
    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }
    const search = params.toString();
    const url = search ? `${location.pathname}?${search}` : location.pathname;
    window.history.replaceState({}, "", url);
  }, [query, activeTag, location.pathname, page]);

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
    return visiblePosts.filter((post) => {
      const matchesTag = activeTag ? post.tags?.some((tag) => tag.slug === activeTag) : true;
      if (!matchesTag) return false;
      if (!normalizedQuery) return true;
      const haystack = [post.title, post.description, post.excerpt, post.tags?.map((tag) => tag.name).join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [visiblePosts, query, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginated = React.useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const trimmedQuery = query.trim();
  const resultCount = filtered.length;
  const resultLabel = resultCount === 1 ? "article" : "articles";
  const listingTitle = activeTagMeta
    ? `Posts tagged #${activeTagMeta.name}`
    : trimmedQuery
    ? "Search results"
    : "Latest articles";
  const displayStart = resultCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const displayEnd = resultCount === 0 ? 0 : Math.min(resultCount, displayStart + paginated.length - 1);
  const qualifiers = [
    trimmedQuery ? `matching "${trimmedQuery}"` : "",
    activeTagMeta ? `in #${activeTagMeta.name}` : "",
  ].filter(Boolean);
  const listingDescription = resultCount === 0
    ? trimmedQuery || activeTagMeta
      ? `No ${resultLabel} ${qualifiers.join(" ")}.`
      : "No articles available yet."
    : `${`Showing ${displayStart}–${displayEnd} of ${resultCount} ${resultLabel}`}${qualifiers.length ? ` ${qualifiers.join(" ")}` : ""}.`;

  return (
    <Layout>
      <Section
        className="blog-intro"
        eyebrow="Blog"
        title="Field notes, experiments, and project retrospectives"
        disableReveal
        description={
          <>
            <p className="section-lead">
              I write quick breakdowns of problems I solve and cool tech I’m learning. Nothing long. No spam. If something breaks and I fix it, I write about it.
            </p>
            <p className="section-lead">
              Most entries begin as AI-assisted drafts (ChatGPT/Copilot) that I edit, annotate, and fact-check. If a post is still rough or mostly generated, the header calls that out.
            </p>
          </>
        }
      >
        <div className="blog-search-accent">
          <BlogAccent />
        </div>
        <div className="surface-card surface-card--muted blog-search-card">
          <div className="blog-filter-controls">
            <form
              className="search-bar blog-filter-controls__search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const value = formData.get("q");
              if (typeof value === "string") {
                setQuery(value);
                setPage(1);
              }
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
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
            />
            </form>
            {tags.length > 0 ? (
              <div className="blog-filter-controls__select">
                <label htmlFor="blog-tag-select" className="sr-only">
                  Filter by tag
                </label>
                <select
                  id="blog-tag-select"
                  value={activeTag ?? ""}
                  onChange={(event) => {
                    const value = event.target.value;
                    setActiveTag(value ? value : null);
                    setPage(1);
                  }}
                >
                  <option value="">All topics ({posts.length})</option>
                  {tags.map((tag) => (
                    <option key={tag.slug} value={tag.slug}>
                      {`${tag.name} (${tag.count})`}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <Link
              className="card-link blog-filter-more"
              to={replaceSlashes(`/${basePath}/${tagsPath}`)}
            >
              Browse all blog tags →
            </Link>
          </div>
        </div>
      </Section>

      <Section
        id="latest-articles"
        title={listingTitle}
        description={<p className="section-lead">{listingDescription}</p>}
        className="blog-listing-section"
        disableReveal
      >
        <Listing posts={paginated} className="blog-listing" />

        {filtered.length === 0 ? (
          <p className="section-lead">
            No posts match your filters yet. Try a different keyword or explore the tag directory.
          </p>
        ) : null}
        {filtered.length > 0 && totalPages > 1 ? (
          <nav className="blog-pagination" aria-label="Pagination">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </nav>
        ) : null}
        <noscript>
          <p className="section-lead">
            JavaScript is disabled, so interactive filtering is unavailable. Browse all tags instead:
            <a className="card-link" href={replaceSlashes(`/${basePath}/${tagsPath}`)}>
              View all tags →
            </a>
          </p>
        </noscript>
      </Section>
    </Layout>
  );
};

export default Blog;

export const Head: HeadFC = () => <Seo title="Blog" description="Short breakdowns of fixes, experiments, and lessons from the cloud and full-stack work I ship." />;
