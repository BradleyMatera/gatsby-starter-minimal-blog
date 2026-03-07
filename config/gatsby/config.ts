import type { GatsbyConfig } from "gatsby";
import { plugins } from "./plugins";
import { siteMetadata } from "./site-metadata";

const config: GatsbyConfig = {
  siteMetadata,
  trailingSlash: `always`,
  plugins,
};

export default config;
