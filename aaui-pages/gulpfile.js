"use strict";

var gulp = require("gulp");
var runSeq = require("run-sequence");
var changed = require("gulp-changed");
var del = require("del");
var bs = require("browser-sync").create();
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var DEV = 0, PROD = 1;

function bundle(mode, once, cb) {
  var outJsFileName, outCssFileName, cssLoaderString;

  switch (mode) {
    case DEV:
      outJsFileName = "[name].js";
      outCssFileName = "../css/{{{name}}}.css";
      cssLoaderString = "css?sourceMap!autoprefixer?{browsers:['last 2 versions', 'ie 9']}!less?sourceMap";
      break;
    case PROD:
      outJsFileName = "[name].js";
      outCssFileName = "../css/{{{name}}}.css";
      cssLoaderString = "css?-minimize!autoprefixer?{browsers:['last 2 versions', 'ie 9']}!less";
      break;
  }

  var opts = {
    entry: {
      {{{name}}}: "./src/{{{name}}}.js"
    },
    output: {
      path: "dist/js",
      filename: outJsFileName
    },
    module: {
      loaders: [
        {test: /\.tag$/, exclude: /node_modules/, loader: "riotjs"},
        {test: /\.(png|jpg|gif)$/, loader: "url?limit=4096&name=../images/[name].[ext]"},
        {test: /\.less$/, loader: ExtractTextPlugin.extract(cssLoaderString)},
        {test: /\.(eot|ttf|svg|woff|woff2)$/, exclude: /node_modules/, loader: "file?name=../fonts/[name].[ext]"}
      ]
    },
    resolve: {
      extensions: ["", ".js", ".tag"],
      modulesDirectories: ["node_modules"]
    },
    plugins: [
      new ExtractTextPlugin(outCssFileName, {allChunks: true})
    ]
  };

  switch (mode) {
    case DEV:
      opts.watch = !once;
      opts.devtool = "source-map";
      opts.plugins = opts.plugins.concat([
        new webpack.DefinePlugin({
          DEV: true
        })
      ]);
      break;
    case PROD:
      opts.plugins = opts.plugins.concat([
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
      ]);
      break;
  }

  webpack(opts, function(err, stats) {
    console.log(stats.toString({colors: true}));
    if (!err && cb) cb();
  });
}

gulp.task("default", ["watch"]);

gulp.task("clean", function(done) {
  del(["dist"], done);
});

gulp.task("dev", function(done) {
  runSeq(["devBundle", "copyStaticFiles"], done);
});

gulp.task("prod", function(done) {
  runSeq("clean", ["prodBundle", "copyStaticFiles"], done);
});

gulp.task("watch", function() {
  gulp.watch("src/*.html", ["copyStaticFiles"]);
  var isRunning = false;
  bundle(DEV, false, function() {
    if (!isRunning) {
      runSeq("copyStaticFiles", "browserSync");
      isRunning = true;
    }
  });
});

gulp.task("copyStaticFiles", function() {
  gulp.src("src/images/**/*")
    .pipe(changed("dist/images"))
    .pipe(gulp.dest("dist/images"));
  gulp.src("./bower_components/riot/riot.min.js")
    .pipe(changed("dist/js"))
    .pipe(gulp.dest("dist/js"));
  return gulp.src("src/*.html")
    .pipe(changed("dist"))
    .pipe(gulp.dest("dist"));
});

gulp.task("browserSync", function() {
  bs.init({
    server: {baseDir: "dist"},
    files: ["dist/**/*"],
    startPath: ""
  });
});

gulp.task("devBundle", function(done) {
  bundle(DEV, true, done);
});

gulp.task("prodBundle", function(done) {
  bundle(PROD, true, done);
});
