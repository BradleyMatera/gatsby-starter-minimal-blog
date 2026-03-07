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
