const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("./webpack.config.js");

module.exports = merge(config, {
  mode: "production",
  output: {
    filename: "[name]-[hash].dist.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].dist.css"
    })
  ]
});
