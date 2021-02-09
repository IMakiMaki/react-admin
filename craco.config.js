/* craco.config.js */
const RenameBuildDirectoryPlugin = require("./scripts/rename");

/**
 * Custom Environment Variables Map
 * Q: Why not adding environment variables in .env files?
 * A: Maybe this file running before the environment variables embedded, can not get the variables.
 */
const ENV_MAP = {
  // 预发布环境
  pre: {
    outputDirectory: "pre",
  },
  DEV: {}, // 开发环境
  prod: {
    outputDirectory: "dist",
  }, // 生产环境
};
const ENV_CONFIG = ENV_MAP[process.env.REACT_APP_BUILD_MODE] || {};

module.exports = {
  // ...
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
      };
      if (env === "production") {
        webpackConfig.plugins.push(
          new RenameBuildDirectoryPlugin({ source: "build", target: ENV_CONFIG.outputDirectory })
        );
      }
      return webpackConfig;
    },
  },
};
