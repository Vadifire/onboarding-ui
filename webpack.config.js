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
    },

    module: {
        rules: [{
            test: /\.scss$/, // Rule to find resource
            use: [
                "style-loader", // Creates style nodes from JS strings
                "css-loader", // Translates CSS into CommonJS
                "sass-loader" // Compiles Sass to CSS
            ]
        }]
    }
}