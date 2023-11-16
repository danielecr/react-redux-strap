const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

const path = require("path");

module.exports = {
  output: {
    path: path.resolve("dist"),
    filename: "index.bundle.js",
  },
  resolve: {
      alias: {
          actionTypes: path.resolve(__dirname, 'src/actionTypes.js'),
          epicPatterns: path.resolve(__dirname, 'src/redux/epic-patterns/index.js'),
      }
  },
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [htmlWebpackPlugin],
};
