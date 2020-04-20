const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [
                  require("tailwindcss"),
                  require("autoprefixer"),
                  ...(process.env.NODE_ENV === "production"
                    ? [
                        purgecss({
                          content: [
                            "./public/index.html",
                            "./src/**/*.vue",
                            "./src/skills.yaml"
                          ],
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
          type: "json",
          use: "yaml-loader"
        }
      ]
    }
  }
};
