// Gatsby theme shadow file for the blog index route.
import * as React from "react";
import { HeadFC, Link } from "gatsby";
import { useLocation } from "@reach/router";
import Layout from "./layout";
import Listing from "./listing";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import Seo from "./seo";
import BlogAccent from "../../../site/accents/BlogAccent";
import { Section } from "../../../ui";
import { SearchIcon, TagIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from "../../../site/icons";

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
  "/making-triangle-webgpu-demo-match-reality/",
  "/rebuilt-webgpu-triangle-demo",
  "/rebuilt-webgpu-triangle-demo/",
]);

const CATEGORIES: { id: string; label: string; matches: string[] }[] = [
  { id: "all", label: "All", matches: [] },
  { id: "webgpu", label: "WebGPU & Graphics", matches: ["webgpu", "graphics", "shaders", "webgl", "triangle", "gpu"] },
  { id: "frontend", label: "Frontend & React", matches: ["react", "javascript", "frontend", "gatsby", "html", "css", "typescript"] },
  { id: "cloud", label: "Cloud & AWS", matches: ["aws", "lambda", "dynamodb", "s3", "cloudfront", "docker", "devops", "cloud"] },
  { id: "career", label: "Career & Learning", matches: ["career", "learning", "job-hunting", "full-sail", "certifications", "education"] },
  { id: "projects", label: "Projects & Builds", matches: ["projects", "portfolio", "codepen", "case-study", "builds", "demo"] },
];

const getCategoryForPost = (tags?: { name: string; slug: string }[]) => {
  if (!tags?.length) return "projects";
  const tagSlugs = tags.map((t) => t.slug.toLowerCase());
  for (let i = 1; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].matches.some((m) => tagSlugs.includes(m))) {
      return CATEGORIES[i].id;
    }
  }
  return "projects";
};

const Blog = ({ posts }: MBBlogProps) => {
  const PAGE_SIZE = 9;
  const { tagsPath, basePath } = useMinimalBlogConfig();
  const location = useLocation();
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
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
    const initialCategory = params.get("category") ?? "all";
    const initialPage = params.get("page");
    setQuery(initialQuery);
    setActiveTag(initialTag || null);
    setActiveCategory(CATEGORIES.some((c) => c.id === initialCategory) ? initialCategory : "all");
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
    if (activeCategory && activeCategory !== "all") {
      params.set("category", activeCategory);
    } else {
      params.delete("category");
    }
    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }
    const search = params.toString();
    const url = search ? `${location.pathname}?${search}` : location.pathname;
    window.history.replaceState({}, "", url);
  }, [query, activeTag, activeCategory, location.pathname, page]);

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
          category: activeCategory,
        });
      }
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [query, activeTag, activeCategory]);

  const filtered = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return visiblePosts.filter((post) => {
      const matchesTag = activeTag ? post.tags?.some((tag) => tag.slug === activeTag) : true;
      const matchesCategory = activeCategory === "all" || getCategoryForPost(post.tags) === activeCategory;
      if (!matchesTag || !matchesCategory) return false;
      if (!normalizedQuery) return true;
      const haystack = [post.title, post.description, post.excerpt, post.tags?.map((tag) => tag.name).join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [visiblePosts, query, activeTag, activeCategory]);

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
  const activeFilters = [
    trimmedQuery ? `matching "${trimmedQuery}"` : "",
    activeTagMeta ? `in #${activeTagMeta.name}` : "",
    activeCategory !== "all" ? `under ${CATEGORIES.find((c) => c.id === activeCategory)?.label}` : "",
  ].filter(Boolean);

  const listingTitle = activeTagMeta
    ? `Posts tagged #${activeTagMeta.name}`
    : trimmedQuery
    ? "Search results"
    : activeCategory !== "all"
    ? CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "Articles"
    : "Latest articles";
  const listingDescription = resultCount === 0
    ? trimmedQuery || activeTagMeta || activeCategory !== "all"
      ? `No ${resultLabel} ${activeFilters.join(" ")}.`
      : "No articles available yet."
    : `${`Showing ${Math.min(resultCount, (page - 1) * PAGE_SIZE + 1)}–${Math.min(resultCount, page * PAGE_SIZE)} of ${resultCount} ${resultLabel}`}${activeFilters.length ? ` ${activeFilters.join(" ")}` : ""}.`;

  const clearFilters = () => {
    setQuery("");
    setActiveTag(null);
    setActiveCategory("all");
    setPage(1);
  };

  return (
    <Layout>
      <Section
        className="blog-intro"
        eyebrow="Blog"
        title="Field notes, experiments, and project retrospectives"
        titleAs="h1"
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
              <SearchIcon size={20} />
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
              {query ? (
                <button
                  type="button"
                  className="blog-filter-controls__clear"
                  onClick={() => {
                    setQuery("");
                    setPage(1);
                  }}
                  aria-label="Clear search"
                >
                  <XIcon size={16} />
                </button>
              ) : null}
            </form>

            {tags.length > 0 ? (
              <div className="blog-filter-controls__tags" role="group" aria-label="Filter by tag">
                <div className="blog-filter-controls__tags-scroll">
                  <button
                    type="button"
                    className={`tag-pill ${activeTag === null ? "tag-pill--active" : ""}`}
                    onClick={() => {
                      setActiveTag(null);
                      setPage(1);
                    }}
                    aria-pressed={activeTag === null}
                  >
                    All topics
                  </button>
                  {tags.map((tag) => (
                    <button
                      key={tag.slug}
                      type="button"
                      className={`tag-pill ${activeTag === tag.slug ? "tag-pill--active" : ""}`}
                      onClick={() => {
                        setActiveTag(activeTag === tag.slug ? null : tag.slug);
                        setPage(1);
                      }}
                      aria-pressed={activeTag === tag.slug}
                    >
                      #{tag.name} <span className="tag-pill__count">{tag.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <Link
              className="card-link blog-filter-more"
              to={replaceSlashes(`/${basePath}/${tagsPath}`)}
            >
              <TagIcon size={16} />
              <span>Browse all blog tags</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {CATEGORIES.length > 1 ? (
            <div className="blog-category-bar" role="group" aria-label="Filter by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-pill ${activeCategory === cat.id ? "category-pill--active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setPage(1);
                  }}
                  aria-pressed={activeCategory === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </Section>

      <Section
        id="latest-articles"
        title={listingTitle}
        description={<p className="section-lead">{listingDescription}</p>}
        className="blog-listing-section"
        disableReveal
      >
        {filtered.length === 0 ? (
          <div className="blog-empty-state">
            <p className="section-lead">
              No posts match your filters yet. Try a different keyword, tag, or category.
            </p>
            <button type="button" className="pagination-btn" onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <Listing posts={paginated} className="blog-listing" />
            {totalPages > 1 ? (
              <nav className="blog-pagination" aria-label="Pagination">
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  className="pagination-btn"
                >
                  <ChevronLeftIcon size={16} />
                  <span>Previous</span>
                </button>
                <span className="pagination-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={page === totalPages}
                  className="pagination-btn"
                >
                  <span>Next</span>
                  <ChevronRightIcon size={16} />
                </button>
              </nav>
            ) : null}
          </>
        )}

        <noscript>
          <p className="section-lead">
            JavaScript is disabled, so interactive filtering is unavailable. Browse all tags instead:{" "}
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

export const Head: HeadFC = () => (
  <>
    <Seo
      title="Blog"
      description="Short breakdowns of fixes, experiments, and lessons from the cloud and full-stack work I ship — AWS, React, Docker, CI/CD, and honest project notes from a junior software engineer."
      pathname="/blog/"
      canonicalUrl="https://bradleymatera.dev/blog/"
    />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Bradley Matera — Blog",
        url: "https://bradleymatera.dev/blog/",
        description: "Field notes, experiments, and project retrospectives from a web developer in Northwest Illinois.",
        author: {
          "@type": "Person",
          name: "Bradley Matera",
          url: "https://bradleymatera.dev/",
        },
      })}
    </script>
  </>
);
