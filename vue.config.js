const StyleLintPlugin = require("stylelint-webpack-plugin");
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: true
      });
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ["./src/**/*.{vue,scss}"],
        configFile: "stylelint.config.js",
        fix: true
      })
    ]
  }
};
