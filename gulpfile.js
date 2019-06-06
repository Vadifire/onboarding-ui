var gulp = require("gulp");
var sass = require("gulp-sass");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
 
sass.compiler = require("node-sass");
 
gulp.task("sass", function () {
	return gulp.src("./src/css/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./dist/css"));
});

gulp.task("dev", function() {
	gulp.watch("./src/css/*.scss", gulp.series("sass"));

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer)
			.listen(webpackConfig.devServer.port, "localhost", function(err) {
				if(err) {
					console.log(err);
				}
			});
});

gulp.task("hello", function(done) {
	console.log("Hello World!");
	done();
});