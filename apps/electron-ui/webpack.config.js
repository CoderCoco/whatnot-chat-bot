const {composePlugins, withNx} = require('@nrwl/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  (config, { options, context }) => {
    // Update the webpack config as needed here.
    // e.g. config.plugins.push(new MyPlugin())
    config.experiments.topLevelAwait = true;
    return config
  }
);
