var gulp = require("gulp");
var sass = require("gulp-sass");
 
sass.compiler = require("node-sass");
 
gulp.task("sass", function () {
	return gulp.src("./src/css/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./dist/css"));
});
 
gulp.task("watch", function () {
	gulp.watch("./src/css/*.scss", gulp.series("sass"));
});