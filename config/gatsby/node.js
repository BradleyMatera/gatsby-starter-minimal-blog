const ESLINT_PLUGIN_NAME = "ESLintWebpackPlugin";

// Build-time cache-busting for the ProjectHub widget. We want the recruiter
// site to load the exact released ProjectHub.js, not a stale cached copy.
// Try to resolve the current ProjectHub master commit SHA from GitHub; fall
// back to an explicit env var set by the release process.
async function resolveProjectHubVersion() {
  if (process.env.GATSBY_PROJECTHUB_VERSION) {
    return process.env.GATSBY_PROJECTHUB_VERSION;
  }
  try {
    const res = await fetch('https://api.github.com/repos/BradleyMatera/ProjectHub/commits/master', {
      headers: { 'Accept': 'application/vnd.github.sha' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const sha = (await res.text()).trim();
    return sha.slice(0, 8);
  } catch (error) {
    console.warn('Could not resolve ProjectHub master SHA for cache-busting:', error.message);
    return process.env.GATSBY_PROJECTHUB_VERSION || '';
  }
}

exports.onPreInit = async () => {
  const version = await resolveProjectHubVersion();
  if (version) {
    process.env.GATSBY_PROJECTHUB_VERSION = version;
    console.log('ProjectHub widget cache version:', version);
  }
};

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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
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
  `);
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path === "/store/") {
    page.matchPath = "/store/*";
    createPage(page);
  }
};
