// Gatsby theme shadow file for the blog index route.
import * as React from "react";
import { HeadFC, Link } from "gatsby";
import Layout from "./layout";
import Listing from "./listing";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import Seo from "./seo";
import { Section } from "../../../ui";
import { SearchIcon, TagIcon, ChevronLeftIcon, ChevronRightIcon } from "../../../site/icons";

import { useUrlState } from "../../../features/blog/useUrlState";
import ResponsiveFilters from "../../../features/blog/components/ResponsiveFilters";
import "../../../styles/editorial.css";

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
  const [filters, setFilters, ready] = useUrlState({ q: "", tag: "", category: "all", page: "1" });
  const query = filters.q;
  const activeTag = filters.tag || null;
  const activeCategory = CATEGORIES.some((category) => category.id === filters.category) ? filters.category : "all";
  const page = Math.max(1, Number.parseInt(filters.page, 10) || 1);

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
      setFilters({ page: String(totalPages) }, true);
    }
  }, [page, totalPages, setFilters]);

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

  const clearFilters = () => setFilters({ q: "", tag: "", category: "all", page: "1" });

  return (
    <Layout className="editorial-page editorial-library">
      <Section
        className="blog-intro"
        eyebrow="Blog"
        title="Field notes, experiments, and project retrospectives"
        titleAs="h1"
        disableReveal
        description={
          <>
            <p className="direct-answer section-lead">
              <strong>What is Bradley Matera&apos;s blog about?</strong> Short breakdowns of fixes, experiments, and lessons from cloud and full-stack work — AWS, React, Docker, CI/CD, WebGPU, and honest project notes from a junior software engineer in Northwest Illinois. Most entries begin as AI-assisted drafts that I edit, annotate, and fact-check.
            </p>
          </>
        }
      >
        <div className="editorial-library-controls">
          <form className="editorial-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="blog-search">Search blog posts</label>
            <div className="editorial-search__field">
              <SearchIcon size={20} />
              <input id="blog-search" name="q" type="search" disabled={!ready}
                placeholder="Search posts by topic, technology, or keyword"
                value={query}
                onChange={(event) => setFilters({ q: event.target.value, page: "1" }, true)} />
            </div>
          </form>
          <ResponsiveFilters label={`Filters${activeTag || activeCategory !== "all" ? " · active" : ""}`}>
            <div className="editorial-filter-fields">
              <div>
                <label htmlFor="blog-category">Category</label>
                <select id="blog-category" disabled={!ready} value={activeCategory} onChange={(event) => setFilters({ category: event.target.value, page: "1" })}>
                  {CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="blog-topic">Topic</label>
                <select id="blog-topic" disabled={!ready} value={activeTag || ""} onChange={(event) => setFilters({ tag: event.target.value, page: "1" })}>
                  <option value="">All topics</option>
                  {tags.map((tag) => <option key={tag.slug} value={tag.slug}>{tag.name} ({tag.count})</option>)}
                </select>
              </div>
            </div>
          </ResponsiveFilters>
          <div className="editorial-control-actions">
            <button type="button" onClick={clearFilters} disabled={!ready || (!query && !activeTag && activeCategory === "all")}>Clear all filters</button>
            <Link to={replaceSlashes(`/${basePath}/${tagsPath}`)}><TagIcon size={16} /> Browse all blog tags</Link>
          </div>
        </div>
      </Section>

      <Section
        id="latest-articles"
        title={listingTitle}
        description={<p className="section-lead" role="status" aria-live="polite">{listingDescription}</p>}
        className="blog-listing-section"
        disableReveal
      >
        {filtered.length === 0 ? (
          <div className="blog-empty-state">
            <p className="section-lead">
              No posts match your filters yet. Try a different keyword, tag, or category.
            </p>
            <button type="button" className="pagination-btn" onClick={clearFilters} disabled={!ready}>
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
                  onClick={() => setFilters({ page: String(Math.max(1, page - 1)) })}
                  disabled={!ready || page === 1}
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
                  onClick={() => setFilters({ page: String(Math.min(totalPages, page + 1)) })}
                  disabled={!ready || page === totalPages}
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

      <Section
        id="blog-faq"
        eyebrow="About the Blog"
        title="Common questions about this blog"
        disableReveal
      >
        <div className="blog-faq">
          <h2 className="blog-faq__question">What topics does this blog cover?</h2>
          <p className="blog-faq__answer">
            This blog covers AWS cloud engineering, React and frontend development, Docker and CI/CD workflows, WebGPU experiments, and career notes from a junior software engineer. Each post is a short breakdown of a fix, experiment, or lesson learned — not a comprehensive tutorial.
          </p>

          <h2 className="blog-faq__question">How often are new posts published?</h2>
          <p className="blog-faq__answer">
            Posts are published irregularly, typically every few weeks, whenever a fix, experiment, or project retrospective is worth writing up. There is no fixed schedule. Subscribe to the RSS feed or check back periodically.
          </p>

          <h2 className="blog-faq__question">Are these posts AI-generated?</h2>
          <p className="blog-faq__answer">
            Most entries begin as AI-assisted drafts that I edit, annotate, and fact-check before publishing. The code, experiments, and results are real — the AI helps with structure and phrasing, not with fabricating technical content.
          </p>
        </div>

        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div style={{ marginTop: "2rem", overflowX: "auto" }} tabIndex={0} role="region" aria-label="Blog category comparison">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border, #e1e4e8)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Category</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Topics</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Typical Post Length</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-border, #e1e4e8)" }}><td style={{ padding: "0.75rem" }}>Cloud &amp; AWS</td><td style={{ padding: "0.75rem" }}>Lambda, DynamoDB, S3, CloudFront</td><td style={{ padding: "0.75rem" }}>5–10 min read</td></tr>
              <tr style={{ borderBottom: "1px solid var(--color-border, #e1e4e8)" }}><td style={{ padding: "0.75rem" }}>Frontend &amp; React</td><td style={{ padding: "0.75rem" }}>React, Gatsby, TypeScript, CSS</td><td style={{ padding: "0.75rem" }}>3–8 min read</td></tr>
              <tr style={{ borderBottom: "1px solid var(--color-border, #e1e4e8)" }}><td style={{ padding: "0.75rem" }}>WebGPU &amp; Graphics</td><td style={{ padding: "0.75rem" }}>Shaders, WebGPU, WebGL</td><td style={{ padding: "0.75rem" }}>5–15 min read</td></tr>
              <tr style={{ borderBottom: "1px solid var(--color-border, #e1e4e8)" }}><td style={{ padding: "0.75rem" }}>Career &amp; Learning</td><td style={{ padding: "0.75rem" }}>Job hunting, education, certifications</td><td style={{ padding: "0.75rem" }}>3–7 min read</td></tr>
              <tr><td style={{ padding: "0.75rem" }}>Projects &amp; Builds</td><td style={{ padding: "0.75rem" }}>Portfolio, CodePen, case studies</td><td style={{ padding: "0.75rem" }}>5–12 min read</td></tr>
            </tbody>
          </table>
        </div>
      </Section>
    </Layout>
  );
};

export default Blog;

export const Head: HeadFC = () => (
  <>
    <Seo
      title="Blog"
      description="Short breakdowns of fixes, experiments, and lessons from cloud and full-stack work — AWS, React, Docker, CI/CD, and honest project notes from a junior software engineer."
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
        publisher: {
          "@type": "Person",
          name: "Bradley Matera",
          url: "https://bradleymatera.dev/",
        },
      })}
    </script>
  </>
);
