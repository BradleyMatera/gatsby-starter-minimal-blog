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

const Tags = ({ data }: { data: TagsData }) => {
  const groups = data.allPost.group;

  return (
    <Layout>
      <section className="tags-page" sx={{ maxWidth: `900px`, margin: `0 auto`, padding: `4rem 1.5rem` }}>
        <h1 sx={{ fontSize: `2.5rem`, marginBottom: `0.5rem` }}>All Tags</h1>
        <p sx={{ fontSize: `1.125rem`, opacity: 0.7, marginBottom: `1rem` }}>
          Browse all topics covered across Bradley Matera&apos;s portfolio. Each tag links to related articles on web development, AI, cloud, and more.
        </p>
        <p sx={{ fontSize: `1rem`, opacity: 0.65, marginBottom: `2rem` }}>
          This page lists all {groups.length} topic tags from Bradley Matera&apos;s portfolio, organizing articles by subject area including web development, AI, cloud engineering, React, AWS, DevOps, and career insights from Northwest Illinois.
        </p>
        <ul sx={{ listStyle: `none`, padding: 0, display: `flex`, flexWrap: `wrap`, gap: `0.75rem` }}>
          {groups.map((group) => (
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
      </section>
    </Layout>
  );
};

export default Tags;

export const Head = () => {
  const pathname = `/tags/`;
  const description = `All topic tags from Bradley Matera's portfolio — explore articles by tag covering web development, AI, cloud engineering, React, AWS, DevOps, and more.`;

  return (
    <Seo
      title="Tags"
      description={description}
      pathname={pathname}
      canonicalUrl={`https://bradleymatera.dev${pathname}`}
      breadcrumbs={[{ name: "Tags", path: pathname }]}
    />
  );
};
