path = require("path");
webpack = require("webpack");

module.exports = {

    mode: "development",

    entry: {
        app: ["./src/js/index.js"] // Main JS entry-point (dependencies are generated from here)
    },

    output: {
        filename: "bundle.js" // Name of bundled JS
    },

    // "webpack-dev-server" configuration
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"), // Root directory served at localhost
        publicPath: "/js/", // Relative path bundled JS will be in
        watchContentBase: true, // Live reloading
        compress: true,
        port: 9000
    }
}