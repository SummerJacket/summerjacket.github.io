const merge = require("webpack-merge");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  homepage: "https://jasonliang512.github.io/",
  configureWebpack: (config, env) => {
    return merge(config, {
      module: {
        rules: [
          {
            test: /\.css/,
            use: [
              {
                loader: require.resolve("postcss-loader"),
                options: {
                  plugins: () => [
                    require("tailwindcss"),
                    ...(env === "production"
                      ? [
                          purgecss({
                            content: ["./public/index.html", "./src/**/*.elm"],
                            defaultExtractor: content =>
                              content.match(/[\w-/:]+(?<!:)/g) || []
                          })
                        ]
                      : [])
                  ]
                }
              }
            ]
          },
          {
            test: /\.yaml$/,
            loader: "raw-loader"
          }
        ]
      }
    });
  }
};
