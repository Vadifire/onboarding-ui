var gulp = require("gulp");
var sass = require("gulp-sass");

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
 
sass.compiler = require("node-sass");
 
function dev() {
	// Start a webpack-dev-server
	new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer)
			.listen(webpackConfig.devServer.port, "localhost", function(err) {
				if(err) {
					console.log(err);
				}
			});
};

function hello(done) {
	console.log("Hello World!");
	done();
}

exports.hello = hello;
exports.dev = dev;