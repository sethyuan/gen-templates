var gulp = require("gulp");
var del = require("del");
var browserSync = require("browser-sync");
var less = require("gulp-less");
var sourcemaps = require("gulp-sourcemaps");
var webpack = require("webpack");
var AutoprefixPlugin = require("less-plugin-autoprefix");
var autoprefix = new AutoprefixPlugin({
  browsers: ["last 2 versions", "ie 8", "ie 9"]
});
var bower = require("gulp-bower-deps")({
  deps: {
    "bootstrap": {
      version: "3.3.x",
      files: ""
    }
  }
});

bower.installtask(gulp);

gulp.task("clean", function(cb) {
  del(["js", "css"], cb);
});

gulp.task("default", ["css-dev", "browser-sync"], function() {
  gulp.watch("src/less/**/*.less", ["css-dev"]);
  webpack({
    entry: "./src/js/app.js",
    output: {
      path: "js",
      filename: "app.js"
    },
    cache: true,
    watch: true,
    devtool: "eval-source-map",
  }, function(err, stats) {
    console.log(stats.toString({colors: true}));
  });
});

gulp.task("prod", ["clean", "css", "js"]);

gulp.task("browser-sync", function() {
  browserSync({
    // proxy: "localhost:8000",
    server: {baseDir: "."},
    files: ["*.html", "css/**/*.css", "js/**/*.js"]
  });
});

gulp.task("css-dev", function() {
  return gulp.src("src/less/*.less")
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: ["bower_components/bootstrap/less", "src/less/include"],
      plugins: [autoprefix]
    }))
    .on("error", function(err) {
      console.error(err);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"));
});

gulp.task("css", function() {
  return gulp.src("src/less/*.less")
    .pipe(less({
      paths: ["bower_components/bootstrap/less", "src/less/include"],
      compress: true,
      plugins: [autoprefix]
    }))
    .on("error", function(err) {
      console.error(err);
    })
    .pipe(gulp.dest("css"));
});

gulp.task("js", function() {
  webpack({
    entry: "./src/js/app.js",
    output: {
      path: "js",
      filename: "app.js"
    },
    cache: true,
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
    ]
  }, function(err, stats) {
    console.log(stats.toString({colors: true}));
  });
});
