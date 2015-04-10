var gulp = require("gulp"),
    del = require("del"),
    sourcemaps = require("gulp-sourcemaps"),
    changed = require("gulp-changed"),
    babel = require("gulp-babel");

gulp.task("clean", function(cb) {
  del(["./lib", "./test"], cb);
});

gulp.task("babel", function() {
  return gulp.src("./src/main/**/*.js")
    .pipe(changed("./lib"))
    .pipe(sourcemaps.init())
    .pipe(babel({
      experimental: true,
      optional: ["runtime"],
      loose: ["es6.forOf", "es6.properties.computed"]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./lib"));
});

gulp.task("watch", function() {
  gulp.watch("./src/**/*.js", ["babel"]);
});

gulp.task("default", ["babel", "watch"]);
