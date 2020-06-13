const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("./webpack.config.js");

module.exports = merge(config, {
  mode: "development",
  watch: true,
  output: {
    filename: "[name].dist.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].dist.css"
    })
  ]
});
