import type { PluginRef } from "gatsby";
import { feedOptions } from "./feed-options";
import { manifestOptions } from "./manifest-options";
import { externalLinks, navigation } from "./theme-options";

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

export const plugins: Array<PluginRef> = [
  {
    resolve: `@lekoarts/gatsby-theme-minimal-blog`,
    options: {
      navigation,
      externalLinks,
    },
  },
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      output: `/sitemap.xml`,
      excludes: [`/404`, `/404.html`, `/cancel`, `/cancel/`, `/purchases`, `/purchases/`, `/success`, `/success/`, `/contact/success`, `/contact/success/`],
      serialize: (page: { path?: string; sitemapLastmod?: string }, { resolvePagePath }: { resolvePagePath: (page: unknown) => string }) => {
        let changefreq = `weekly`;
        let priority = 0.7;

        const pagePath = page.path || ``;

        if (pagePath === `/`) {
          priority = 1.0;
          changefreq = `daily`;
        } else if (pagePath.startsWith(`/blog/`)) {
          changefreq = `daily`;
          priority = 0.8;
        } else if (
          pagePath.startsWith(`/web-developer-`) ||
          pagePath === `/pricing/` ||
          pagePath === `/about/` ||
          pagePath === `/contact/` ||
          pagePath === `/recruiter/`
        ) {
          priority = 0.9;
          changefreq = `weekly`;
        } else if (pagePath.startsWith(`/tags/`)) {
          changefreq = `weekly`;
          priority = 0.5;
        }

        const sitemapEntry: { url: string; changefreq: string; priority: number; lastmod?: string } = {
          url: resolvePagePath(page),
          changefreq,
          priority,
        };

        if (page.sitemapLastmod) {
          sitemapEntry.lastmod = page.sitemapLastmod;
        }

        return sitemapEntry;
      },
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: manifestOptions,
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: feedOptions,
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
      saveReportTo: `${__dirname}/../../public/.statoscope/_bundle.html`,
      saveStatsTo: `${__dirname}/../../public/.statoscope/_stats.json`,
      open: false,
    },
  },
].filter(Boolean) as Array<PluginRef>;
