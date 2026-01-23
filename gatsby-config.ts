import type { GatsbyConfig, PluginRef } from "gatsby";
import "dotenv/config";

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

const config: GatsbyConfig = {
  siteMetadata: {
    siteTitle: `Bradley Matera — Portfolio`,
    siteTitleAlt: `Bradley Matera — Systems-minded web developer`,
    siteHeadline: `Bradley Matera — Full-stack and cloud systems`,
    siteUrl: `https://bradleymatera.dev`,
    siteDescription: `Portfolio and case studies from Bradley Matera. Full-stack web development, AWS cloud systems, and applied AI projects.`,
    siteImage: `/banner-1200x630.jpg`,
    siteLanguage: `en`,
    author: `@bradleymatera`,
  },
  trailingSlash: `always`,
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        navigation: [
          { title: `Home`, slug: `/` },
          { title: `About`, slug: `/about` },
          { title: `Projects`, slug: `/projects` },
          { title: `Roles`, slug: `/roles` },
          { title: `Contributions`, slug: `/contributions` },
          { title: `Blog`, slug: `/blog` },
          { title: `Contact`, slug: `/contact` },
        ],
        externalLinks: [
          { name: `LinkedIn`, url: `https://www.linkedin.com/in/bradmatera` },
          { name: `GitHub`, url: `https://github.com/BradleyMatera` },
          { name: `YouTube`, url: `https://www.youtube.com/@bradmatera` },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bradley Matera — Portfolio`,
        short_name: `Bradley Matera`,
        description: `Portfolio and case studies from Bradley Matera.`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#160632`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
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
            serialize: ({ query: { site, allPost } }: { query: { allPost: IAllPost; site: { siteMetadata: ISiteMetadata } } }) =>
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
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-plugin-image`,
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-statoscope`,
      options: {
        saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
        saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
        open: false,
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
};

export default config;

interface IPostTag {
  name: string;
  slug: string;
}

interface IPost {
  slug: string;
  title: string;
  defer: boolean;
  date: string;
  excerpt: string;
  contentFilePath: string;
  html: string;
  timeToRead: number;
  wordCount: number;
  tags: Array<IPostTag>;
  banner: unknown;
  description: string;
  canonicalUrl: string;
}

interface IAllPost {
  nodes: Array<IPost>;
}

interface ISiteMetadata {
  siteTitle: string;
  siteTitleAlt: string;
  siteHeadline: string;
  siteUrl: string;
  siteDescription: string;
  siteImage: string;
  author: string;
}
