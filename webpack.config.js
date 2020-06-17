const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.js",
    homepage: "./src/homepage.js"
  },
  output: {
    path: path.resolve(__dirname, "static")
  },
  plugins: [
    new AssetsPlugin({
      path: path.resolve(__dirname, "data"),
      filename: "webpackAssets.json"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, "static")
            }
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader"
        ]
      }
    ]
  }
};
