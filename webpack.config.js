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

    devtool: "source-map",

    module: {
        rules: [{
            test: /\.scss$/, // Regular expression rule to find SCSS files
            use: [
                "style-loader", // Injects <style> tags into DOM elements
                "css-loader", // Reads in CSS file as a String and resolves @imports
                "sass-loader" // Compiles Sass to CSS
            ]
        }, 
        {
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader', // Converts JSX to JS
                options: {
                    presets: ['@babel/preset-env'] // Used for browser compatability
                }
            }
        }]
    }
}