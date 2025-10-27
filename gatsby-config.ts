import type { GatsbyConfig, PluginRef } from "gatsby";
import "dotenv/config";

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

const config: GatsbyConfig = {
  siteMetadata: {
    siteTitle: `Bradley Matera · Portfolio & Blog`,
    siteTitleAlt: `Bradley Matera — Accessible web developer & AWS intern`,
    siteHeadline: `Bradley Matera · Building accessible, cloud-ready web experiences`,
    siteUrl: `https://bradleysgatsbyblog.netlify.app`,
    siteDescription: `Insights, projects, and field notes from Bradley Matera — blending design systems, full-stack engineering, and AWS operations to ship inclusive products.`,
    siteImage: `/banner.jpg`,
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
        name: `Bradley Matera - Portfolio & Blog`,
        short_name: `Bradley's Blog`,
        description: `An online hub for Bradley Matera's web development journey, featuring portfolio projects, blogs, and educational resources.`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#007acc`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-V5RJ4522VW`, // Your Google Analytics Measurement ID
        head: true, // Ensures the script is loaded in the <head> section
        respectDNT: true,
        pageTransitionDelay: 0,
        enableWebVitalsTracking: true,
        cookieFlags: `SameSite=None;Secure`,
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
  banner: any;
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
