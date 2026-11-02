import * as React from "react";
import { Link } from "gatsby";
import Seo from "./seo";
import Layout from "./layout";
import { useUrlState } from "../../../features/blog/useUrlState";
import "../../../styles/editorial.css";

type TagsData = {
  allPost: {
    group: Array<{
      fieldValue: string;
      totalCount: number;
    }>;
  };
};

const TAG_CATEGORIES: Record<string, string> = {
  aws: "Cloud",
  cloud: "Cloud",
  azure: "Cloud",
  docker: "DevOps",
  kubernetes: "DevOps",
  devops: "DevOps",
  ci: "DevOps",
  github: "DevOps",
  deployment: "DevOps",
  containers: "DevOps",
  react: "Frontend",
  nextjs: "Frontend",
  javascript: "Frontend",
  frontend: "Frontend",
  gatsby: "Frontend",
  "react-native": "Frontend",
  mobile: "Frontend",
  web: "Frontend",
  "web-development": "Frontend",
  webdev: "Frontend",
  webgpu: "Graphics",
  graphics: "Graphics",
  ai: "AI",
  authentication: "Security",
  jwt: "Security",
  security: "Security",
  ctf: "Security",
  testing: "Quality",
  quality: "Quality",
  debugging: "Quality",
  troubleshooting: "Quality",
  career: "Career",
  "job-hunting": "Career",
  education: "Career",
  communication: "Career",
  "time-management": "Career",
  mindset: "Career",
  productivity: "Career",
  writing: "Career",
  process: "Process",
  workflow: "Process",
  documentation: "Process",
  systems: "Process",
  projects: "Projects",
  portfolio: "Projects",
  prototype: "Projects",
  illinois: "Local",
  "local-seo": "Local",
  "small-business": "Local",
  "website-checklist": "Local",
  zig: "Languages",
  parsing: "Languages",
};

const Tags = ({ data }: { data: TagsData }) => {
  const groups = data.allPost.group;
  const [filters, setFilters] = useUrlState({ q: "" });
  const totalArticles = groups.reduce((sum, group) => sum + group.totalCount, 0);
  const visible = [...groups].filter((group) => `${group.fieldValue} ${TAG_CATEGORIES[group.fieldValue.toLowerCase()] || "Other topics"}`.toLowerCase().includes(filters.q.trim().toLowerCase()))
    .sort((a, b) => b.totalCount - a.totalCount || a.fieldValue.localeCompare(b.fieldValue));
  const categories = Array.from(new Set(visible.map((group) => TAG_CATEGORIES[group.fieldValue.toLowerCase()] || "Other topics"))).sort();
  return (
    <Layout className="editorial-page editorial-library">
      <section className="tags-page">
        <header className="editorial-header">
          <h1>All Tags</h1>
          <h2>What topics does Bradley Matera write about?</h2>
          <p className="direct-answer">
            Bradley Matera&apos;s portfolio covers {groups.length} topic tags across {totalArticles} articles, organized into categories like Cloud, DevOps, Frontend, Security, Career, and Local SEO. Each article includes real project examples, code snippets, and verification steps from a web developer in Northwest Illinois.
          </p>
          <p>Browse all {groups.length} topic tags from Bradley Matera&apos;s portfolio, organizing articles by subject area including web development, AI, cloud engineering, React, AWS, DevOps, and career insights from Northwest Illinois.</p>
        </header>
        <form className="editorial-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="topic-search">Search topics</label>
          <input id="topic-search" type="search" value={filters.q} onChange={(event) => setFilters({ q: event.target.value }, true)} />
        </form>
        <div className="editorial-control-actions">
          <p role="status">{visible.length} of {groups.length} topics</p>
          <button type="button" disabled={!filters.q} onClick={() => setFilters({ q: "" })}>Clear search</button>
        </div>
        {categories.length ? categories.map((category) => (
          <section className="editorial-topic-group" key={category}>
            <h2>{category}</h2>
            <ul className="editorial-topic-list">
              {visible.filter((group) => (TAG_CATEGORIES[group.fieldValue.toLowerCase()] || "Other topics") === category).map((group) => (
                <li key={group.fieldValue}>
                  <Link to={`/tags/${group.fieldValue.toLowerCase().replace(/\s+/g, "-")}/`}>
                    <span>{group.fieldValue}</span>
                    <span>{group.totalCount} {group.totalCount === 1 ? "article" : "articles"} <span aria-hidden="true">→</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )) : <p>No topics match your search.</p>}
      </section>
    </Layout>
  );
};

export default Tags;

export const Head = ({ data }: { data: TagsData }) => {
  const pathname = `/tags/`;
  const groupCount = data?.allPost?.group?.length || 0;
  const description = `All ${groupCount} topic tags from Bradley Matera's portfolio — explore articles by tag covering web development, AI, cloud engineering, React, AWS, DevOps, security, and career insights from Northwest Illinois.`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Tags — Bradley Matera",
      description,
      url: `https://bradleymatera.dev${pathname}`,
      isPartOf: {
        "@type": "WebSite",
        name: "Bradley Matera — Portfolio",
        url: "https://bradleymatera.dev",
      },
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
    },
  ];

  return (
    <Seo
      title="Tags"
      description={description}
      pathname={pathname}
      canonicalUrl={`https://bradleymatera.dev${pathname}`}
      breadcrumbs={[{ name: "Tags", path: pathname }]}
      structuredData={structuredData}
    />
  );
};
