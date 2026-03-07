import type { AllPostQueryResult, SiteMetadataShape } from "./types";

export const feedOptions = {
  query: `
    {
      site {
        siteMetadata {
          title: siteTitle
          description: siteDescription
          siteUrl
          site_url: siteUrl
        }
      }
    }
  `,
  feeds: [
    {
      serialize: ({
        query: { site, allPost },
      }: {
        query: {
          allPost: AllPostQueryResult;
          site: { siteMetadata: SiteMetadataShape };
        };
      }) =>
        allPost.nodes.map((post) => {
          const url = `${site.siteMetadata.siteUrl}${post.slug}`;
          const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`;
          return {
            title: post.title,
            date: post.date,
            excerpt: post.excerpt,
            url,
            guid: url,
            custom_elements: [{ "content:encoded": content }],
          };
        }),
      query: `{
        allPost(sort: { date: DESC }) {
          nodes {
            title
            date(formatString: "MMMM D, YYYY")
            excerpt
            slug
          }
        }
      }`,
      output: `/rss.xml`,
      title: `Bradley's Blog Feed`,
    },
  ],
};
