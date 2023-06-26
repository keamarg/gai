const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/gai/" : "/",

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.mode = "production";
      config.resolve.alias["@env"] = require("path").resolve(
        process.cwd(),
        ".env.production.local"
      );
    } else {
      config.mode = "development";
      config.resolve.alias["@env"] = require("path").resolve(
        process.cwd(),
        ".env.development.local"
      );
    }
  },
});
