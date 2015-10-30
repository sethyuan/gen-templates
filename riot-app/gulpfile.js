"use strict";

var gulp = require("gulp");
var runSeq = require("run-sequence");
var del = require("del");
var babel = require("gulp-babel");
var changed = require("gulp-changed");
var sourcemaps = require("gulp-sourcemaps");
var less = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");
var minifyCss = require("gulp-minify-css");
var minifyHtml = require("gulp-minify-html");
var inject = require("gulp-inject");
var hash = require("gulp-hash");
var bs = require("browser-sync").create();
var exec = require("child_process").exec;
var webpack = require("webpack");

var babelOpts = {
  stage: 1,
  optional: "runtime",
  loose: ["es6.classes", "es6.forOf", "es6.properties.computed"]
};

gulp.task("default", ["watch"]);

gulp.task("clean", function(done) {
  return del(["dist"], done);
});

gulp.task("dev", ["devFrontend", "devBackend"]);

gulp.task("prod", function(done) {
  return runSeq("clean", ["prodFrontend", "prodBackend"], done);
});

gulp.task("watch", ["watchFrontend", "watchBackend"]);

gulp.task("devFrontend", function(done) {
  return runSeq(["devJs", "devLess"], "copyFrontendFiles", done);
});

gulp.task("prodFrontend", function(done) {
  return runSeq(["prodJs", "prodLess"], "copyFrontendFiles", done);
});

gulp.task("watchFrontend", function(done) {
  return runSeq(["watchJs", "watchLess"], "copyFrontendFiles", done);
});

gulp.task("devBackend", ["transpileDevJs", "copyBackendFiles"]);

gulp.task("prodBackend", ["transpileProdJs", "copyBackendFiles"]);

gulp.task("watchBackend", ["devBackend"], function() {
  gulp.watch("src/backend/**/*.js", ["transpileDevJs"]);
});

gulp.task("devJs", function(done) {
  return buildJs(true, true, done);
});

gulp.task("prodJs", function(done) {
  return buildJs(false, true, done);
});

gulp.task("watchJs", function(done) {
  var isRunning = false;
  buildJs(true, false, function() {
    if (!isRunning) {
      runSeq("browserSync");
      isRunning = true;
      done();
    }
  });
});

gulp.task("devLess", function() {
  return gulp.src("src/frontend/app.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ["last 2 versions", "ie 9"],
      cascade: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/public/css"));
});

gulp.task("prodLess", function() {
  return gulp.src("src/frontend/app.less")
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ["last 2 versions", "ie 9"],
      cascade: false
    }))
    .pipe(minifyCss({advanced: false}))
    .pipe(hash())
    .pipe(gulp.dest("dist/public/css"));
});

gulp.task("watchLess", ["devLess"], function() {
  gulp.watch(["src/frontend/**/*.less"], ["devLess"]);
});

gulp.task("transpileDevJs", function() {
  return gulp.src("src/backend/**/*.js")
    .pipe(changed("dist"))
    .pipe(sourcemaps.init())
    .pipe(babel(babelOpts))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"));
});

gulp.task("transpileProdJs", function() {
  return gulp.src("src/backend/**/*.js")
    .pipe(babel(babelOpts))
    .pipe(gulp.dest("dist"));
});

gulp.task("copyFrontendFiles", function() {
  return gulp.src("src/frontend/index.html")
    .pipe(gulp.dest("dist/public"))
    .pipe(inject(gulp.src([
      "dist/public/css/*.css",
      "dist/public/js/*.js"
    ], {read: false}), {relative: true}))
    .pipe(minifyHtml({conditionals: true}))
    .pipe(gulp.dest("dist/public"));
});

gulp.task("copyBackendFiles", function() {
  gulp.src("package.json").pipe(gulp.dest("dist"));
  return gulp.src("src/backend/log/.gitignore").pipe(gulp.dest("dist/log"));
});

gulp.task("browserSync", function() {
  exec("node dist/app.js");
  bs.init({
    proxy: "localhost:{{{port}}}",
    files: ["dist/**/*"]
  });
});

function buildJs(isDev, once, cb) {
  var opts = {
    entry: {
      app: "./src/frontend/app.js"
    },
    output: {
      path: "dist/public/js",
      filename: (isDev ? "[name].js" : "[name].[hash].js")
    },
    module: {
      preLoaders: [
        {test: /\.tag$/, exclude: /node_modules/, loader: "riotjs?brackets=@{ }"}
      ],
      loaders: [
        {test: /\.(js|tag)$/, exclude: /node_modules/, loader: "babel?{stage: 1, optional: 'runtime', loose: ['es6.classes', 'es6.forOf', 'es6.properties.computed']}"},
      ]
    },
    resolve: {
      extensions: ["", ".js", ".tag"]
    },
    plugins: [
      new webpack.ProvidePlugin({
        riot: "riot",
        RiotControl: "riotcontrol"
      }),
      new webpack.DefinePlugin({DEV: isDev})
    ]
  };

  if (isDev) {
    opts.watch = !once;
    opts.devtool = "source-map";
  } else {
    opts.plugins = opts.plugins.concat([
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]);
  }

  webpack(opts, function(err, stats) {
    console.log(stats.toString({colors: true}));
    if (!err && cb) cb();
  });
}
