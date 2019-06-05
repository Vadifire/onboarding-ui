path = require("path");

module.exports = {
    target: "web",
    mode: "development",

    entry: {
        app: ["./src/js/index.js"] // Main JS entry-point (dependencies are generated from here)
    },

    output: {
        path: path.resolve(__dirname, "src/public/js"), // Only applies for "webpack" command
        filename: "bundle.js" // Name of bundled JS
    },

    // "webpack-dev-server" configuration
    devServer: {
        contentBase: path.resolve(__dirname, "./src/public"), // Root directory served at localhost
        publicPath: "/js/", // Relative path bundled JS will be in
        watchContentBase: true, // Live reloading
        compress: true,
        port: 9000
    }
}