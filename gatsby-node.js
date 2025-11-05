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
