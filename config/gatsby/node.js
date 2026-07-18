const ESLINT_PLUGIN_NAME = "ESLintWebpackPlugin";
const fs = require("fs");
const path = require("path");

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

// Post-build fix: ensure tag pages have correct canonical and meta description.
// This is a safety net in case Gatsby component shadowing doesn't work in CI.
exports.onPostBuild = ({ store }) => {
  const { program, site } = store.getState();
  const publicDir = program.directory
    ? path.join(program.directory, "public")
    : "public";
  const siteUrl = site?.siteMetadata?.siteUrl || "https://bradleymatera.dev";
  const defaultDesc =
    site?.siteMetadata?.siteDescription ||
    "Portfolio and case studies from Bradley Matera.";

  const tagsDir = path.join(publicDir, "tags");
  if (!fs.existsSync(tagsDir)) return;

  const tagDirs = fs
    .readdirSync(tagsDir)
    .filter((f) => fs.statSync(path.join(tagsDir, f)).isDirectory());

  tagDirs.forEach((tag) => {
    const htmlPath = path.join(tagsDir, tag, "index.html");
    if (!fs.existsSync(htmlPath)) return;
    let html = fs.readFileSync(htmlPath, "utf8");
    const canonical = `${siteUrl}/tags/${tag}/`;
    const tagName = tag.replace(/-/g, " ");
    const description = `Browse all articles tagged "${tagName}" on Bradley Matera's portfolio — web development, AI projects, cloud engineering, and career insights from Northwest Illinois.`;

    // Fix canonical
    html = html.replace(
      /<link rel="canonical" href="[^"]*"/g,
      `<link rel="canonical" href="${canonical}"`,
    );
    // Fix meta description
    html = html.replace(
      /<meta name="description" content="[^"]*"/g,
      `<meta name="description" content="${description.replace(/"/g, "&quot;")}"`,
    );
    // Fix og:url
    html = html.replace(
      /<meta property="og:url" content="[^"]*"/g,
      `<meta property="og:url" content="${canonical}"`,
    );
    // Fix twitter:url
    html = html.replace(
      /<meta name="twitter:url" content="[^"]*"/g,
      `<meta name="twitter:url" content="${canonical}"`,
    );

    fs.writeFileSync(htmlPath, html);
  });

  // Also fix the /tags/ index page
  const tagsIndexPath = path.join(tagsDir, "index.html");
  if (fs.existsSync(tagsIndexPath)) {
    let html = fs.readFileSync(tagsIndexPath, "utf8");
    const canonical = `${siteUrl}/tags/`;
    const description =
      "All topic tags from Bradley Matera's portfolio — explore articles by tag covering web development, AI, cloud engineering, React, AWS, DevOps, and more.";

    html = html.replace(
      /<link rel="canonical" href="[^"]*"/g,
      `<link rel="canonical" href="${canonical}"`,
    );
    html = html.replace(
      /<meta name="description" content="[^"]*"/g,
      `<meta name="description" content="${description.replace(/"/g, "&quot;")}"`,
    );
    html = html.replace(
      /<meta property="og:url" content="[^"]*"/g,
      `<meta property="og:url" content="${canonical}"`,
    );
    html = html.replace(
      /<meta name="twitter:url" content="[^"]*"/g,
      `<meta name="twitter:url" content="${canonical}"`,
    );

    fs.writeFileSync(tagsIndexPath, html);
  }
};
