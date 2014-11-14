var gulp = require("gulp");
var sass = require("gulp-ruby-sass");
var prefixer = require("gulp-autoprefixer");
var webpack = require("webpack");
var path = require("path");
var del = require("del");
var bower = require("gulp-bower-deps")({
  deps: {
    "bootstrap-sass-official": {
      version: "3.3.x",
      files: ""
    },
    "angular": {
      version: "1.2.x",
      files: ""
    }
  }
});

bower.installtask(gulp);

function css(debug) {
  return gulp.src("sass/*.scss")
    .pipe(sass(debug ? {
      sourcemap: true,
      sourcemapPath: "../../sass/",
      style: "expanded",
    } : {
      "sourcemap=none": true,
      style: "compressed"
    }))
    .on("error", function(err) {
      console.log(err.message);
    })
    .pipe(prefixer())
    .pipe(gulp.dest("public/css"));
}

function pack(debug, watch) {
  webpack({
    entry: "./js/app.js",
    output: {
      path: path.join(__dirname, "public/js"),
      filename: "app.js",
    },
    cache: true,
    watch: watch,
    devtool: debug ? "source-map" : "",
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
    ]
  }, function(err, stats) {
    err && console.error(err);
  });
}

gulp.task("clean", function(cb) {
  del(["public/js", "public/css"], cb);
});

gulp.task("css-debug", css.bind(null, true));
gulp.task("css", css.bind(null, false));

gulp.task("js-debug", pack.bind(null, true, false));
gulp.task("js", pack.bind(null, false, false));

gulp.task("watch", ["css-debug"], function() {
  gulp.watch("sass/*.scss", ["css-debug"]);
  pack(true, true);
});

gulp.task("release", ["clean", "css", "js"]);
