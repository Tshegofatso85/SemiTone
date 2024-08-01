const path = require("path");

module.exports = {
  entry: "./src/dom_manipulation.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
};
