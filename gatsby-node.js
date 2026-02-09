const ESLINT_PLUGIN_NAME = "ESLintWebpackPlugin";

exports.onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
  const shouldFilterPlugin = [
    "develop",
    "develop-html",
    "build-javascript",
    "build-html",
  ].includes(stage);

  if (!shouldFilterPlugin) {
    return;
  }

  const config = getConfig();

  config.plugins = config.plugins.filter(
    (plugin) => plugin?.constructor?.name !== ESLINT_PLUGIN_NAME,
  );

  actions.replaceWebpackConfig(config);
};

// Define GraphQL schema for custom siteMetadata fields
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type SiteSiteMetadata {
      siteTitle: String
      siteTitleAlt: String
      siteHeadline: String
      siteUrl: String
      siteDescription: String
      siteImage: String
      siteLanguage: String
      author: String
    }
  `;

  createTypes(typeDefs);
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path === "/store/") {
    page.matchPath = "/store/*";
    createPage(page);
  }
};
