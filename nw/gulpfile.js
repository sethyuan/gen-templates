var del = require("del"),
    gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    less = require("gulp-less"),
    babel = require("gulp-babel"),
    bower = require("gulp-bower-deps")({
      deps: {
        bootstrap: {
          version: "3.x",
          files: ""
        },
        react: {
          version: ">=0.12",
          files: ""
        }
      }
    });

bower.installtask(gulp);

gulp.task("clean", function(cb) {
  return del(["./bundle/js", "./bundle/css"], cb);
});

gulp.task("css-dev", function() {
  return gulp.src("./src/app.less")
    .pipe(sourcemaps.init())
    .pipe(less({paths: ["./src/less", "./bower_components/bootstrap/less"]}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./bundle/css"));
});

gulp.task("css-prod", function() {
  return gulp.src("./src/app.less")
    .pipe(less({paths: ["./src/less", "./bower_components/bootstrap/less"]}))
    .pipe(gulp.dest("./bundle/css"));
});

gulp.task("js-dev", function() {
  gulp.src("./bower_components/react/react-with-addons.min.js")
    .pipe(gulp.dest("./bundle/js"));

  return gulp.src("./src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel({
      experimental: true,
      optional: ["runtime"],
      loose: ["es6.forOf", "es6.properties.computed"]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./bundle/js"));
});

gulp.task("js-prod", function() {
  gulp.src("./bower_components/react/react-with-addons.min.js")
    .pipe(gulp.dest("./bundle/js"));

  return gulp.src("./src/**/*.js")
    .pipe(babel({
      experimental: true,
      optional: ["runtime"],
      loose: ["es6.forOf", "es6.properties.computed"]
    }))
    .pipe(gulp.dest("./bundle/js"));
});

gulp.task("dev", ["css-dev", "js-dev"]);

gulp.task("prod", ["css-prod", "js-prod"]);

gulp.task("default", ["dev"], function() {
  gulp.watch("./src/**/*.less", ["css-dev"]);
  gulp.watch("./src/**/*.js", ["js-dev"]);
});
