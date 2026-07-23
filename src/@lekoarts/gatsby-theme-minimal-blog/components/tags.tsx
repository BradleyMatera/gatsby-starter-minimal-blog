import * as React from "react";
import { Link } from "gatsby";
import Seo from "./seo";
import Layout from "./layout";

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
  const sortedGroups = [...groups].sort((a, b) => b.totalCount - a.totalCount);
  const totalArticles = groups.reduce((sum, g) => sum + g.totalCount, 0);

  // Group tags by category
  const categorized: Record<string, typeof sortedGroups> = {};
  const uncategorized: typeof sortedGroups = [];
  sortedGroups.forEach((g) => {
    const cat = TAG_CATEGORIES[g.fieldValue.toLowerCase()];
    if (cat) {
      if (!categorized[cat]) categorized[cat] = [];
      categorized[cat].push(g);
    } else {
      uncategorized.push(g);
    }
  });

  const categoryNames = Object.keys(categorized).sort();

  return (
    <Layout>
      <section className="tags-page" sx={{ maxWidth: `900px`, margin: `0 auto`, padding: `4rem 1.5rem` }}>
        <h1 sx={{ fontSize: `2.5rem`, marginBottom: `0.5rem` }}>All Tags</h1>

        {/* Direct answer for AEO (40-70 words) */}
        <p className="direct-answer" sx={{ fontSize: `1.125rem`, opacity: 0.8, marginBottom: `1rem`, lineHeight: 1.6 }}>
          <strong>What topics does Bradley Matera write about?</strong> Bradley Matera&apos;s portfolio covers {groups.length} topic tags across {totalArticles} articles, organized into categories like Cloud, DevOps, Frontend, Security, Career, and Local SEO. Each article includes real project examples, code snippets, and verification steps from a web developer in Northwest Illinois.
        </p>

        <p sx={{ fontSize: `1rem`, opacity: 0.65, marginBottom: `2rem` }}>
          Browse all {groups.length} topic tags from Bradley Matera&apos;s portfolio, organizing articles by subject area including web development, AI, cloud engineering, React, AWS, DevOps, and career insights from Northwest Illinois.
        </p>

        {/* Comparison table of all tags for AEO extraction */}
        <h2 sx={{ fontSize: `1.5rem`, marginBottom: `1rem` }}>All tags by article count</h2>
        <table sx={{ width: `100%`, borderCollapse: `collapse`, marginBottom: `2rem`, fontSize: `0.9rem` }}>
          <thead>
            <tr>
              <th sx={{ textAlign: `left`, padding: `0.5rem`, borderBottom: `2px solid`, borderColor: `border` }}>Tag</th>
              <th sx={{ textAlign: `left`, padding: `0.5rem`, borderBottom: `2px solid`, borderColor: `border` }}>Category</th>
              <th sx={{ textAlign: `right`, padding: `0.5rem`, borderBottom: `2px solid`, borderColor: `border` }}>Articles</th>
            </tr>
          </thead>
          <tbody>
            {sortedGroups.map((group) => (
              <tr key={group.fieldValue}>
                <td sx={{ padding: `0.5rem`, borderBottom: `1px solid`, borderColor: `border` }}>
                  <Link
                    to={`/tags/${group.fieldValue.toLowerCase().replace(/\s+/g, "-")}/`}
                    sx={{ color: `primary`, textDecoration: `none` }}
                  >
                    {group.fieldValue}
                  </Link>
                </td>
                <td sx={{ padding: `0.5rem`, borderBottom: `1px solid`, borderColor: `border`, opacity: 0.7 }}>
                  {TAG_CATEGORIES[group.fieldValue.toLowerCase()] || "General"}
                </td>
                <td sx={{ padding: `0.5rem`, borderBottom: `1px solid`, borderColor: `border`, textAlign: `right`, opacity: 0.7 }}>
                  {group.totalCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Categorized tag clouds for content depth */}
        {categoryNames.map((cat) => (
          <React.Fragment key={cat}>
            <h2 sx={{ fontSize: `1.25rem`, marginTop: `2rem`, marginBottom: `1rem` }}>{cat}</h2>
            <ul sx={{ listStyle: `none`, padding: 0, display: `flex`, flexWrap: `wrap`, gap: `0.75rem`, marginBottom: `1rem` }}>
              {categorized[cat].map((group) => (
                <li key={group.fieldValue}>
                  <Link
                    to={`/tags/${group.fieldValue.toLowerCase().replace(/\s+/g, "-")}/`}
                    sx={{
                      display: `inline-block`,
                      padding: `0.5rem 1rem`,
                      borderRadius: `999px`,
                      border: `1px solid`,
                      borderColor: `border`,
                      textDecoration: `none`,
                      fontSize: `0.95rem`,
                      "&:hover": { borderColor: `primary`, color: `primary` },
                    }}
                  >
                    {group.fieldValue} <span sx={{ opacity: 0.5, fontSize: `0.8em` }}>({group.totalCount})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}

        {uncategorized.length > 0 && (
          <>
            <h2 sx={{ fontSize: `1.25rem`, marginTop: `2rem`, marginBottom: `1rem` }}>General</h2>
            <ul sx={{ listStyle: `none`, padding: 0, display: `flex`, flexWrap: `wrap`, gap: `0.75rem` }}>
              {uncategorized.map((group) => (
                <li key={group.fieldValue}>
                  <Link
                    to={`/tags/${group.fieldValue.toLowerCase().replace(/\s+/g, "-")}/`}
                    sx={{
                      display: `inline-block`,
                      padding: `0.5rem 1rem`,
                      borderRadius: `999px`,
                      border: `1px solid`,
                      borderColor: `border`,
                      textDecoration: `none`,
                      fontSize: `0.95rem`,
                      "&:hover": { borderColor: `primary`, color: `primary` },
                    }}
                  >
                    {group.fieldValue} <span sx={{ opacity: 0.5, fontSize: `0.8em` }}>({group.totalCount})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
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
