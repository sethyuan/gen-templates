var gulp = require("gulp");
var del = require("del");
var babel = require("gulp-babel");
var changed = require("gulp-changed");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync");
var execSync = require("child_process").execSync;
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var babelOpts = {
  stage: 1,
  optional: "runtime",
  loose: ["es6.classes", "es6.forOf", "es6.properties.computed"]
};

gulp.task("default", ["watch"]);

gulp.task("clean", function() {
  del(["dist"]);
});

gulp.task("dev", ["dev-frontend", "dev-backend"]);

gulp.task("watch", ["dev", "browser-sync"], function() {
  gulp.watch("src/backend/**/*.js", ["dev-backend"]);
  bundle(true, false);
});

gulp.task("prod", ["prod-frontend", "prod-backend"]);

gulp.task("dev-frontend", function() {
  gulp.src("src/frontend/index.html").pipe(gulp.dest("dist/public"));
  bundle(true, true);
});

gulp.task("dev-backend", function() {
  return gulp.src("src/backend/**/*.js")
    .pipe(changed("dist"))
    .pipe(sourcemaps.init())
    .pipe(babel(babelOpts))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"));
});

gulp.task("prod-frontend", function() {
  bundle(false, true);
});

gulp.task("prod-backend", function() {
  return gulp.src("src/backend/**/*.js")
    .pipe(babel(babelOpts))
    .pipe(gulp.dest("dist"));
});

function bundle(isDev, once) {
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
        {test: /\.tag$/, exclude: /node_modules/, loader: "riotjs"}
      ],
      loaders: [
        {test: /\.(js|tag)$/, exclude: /node_modules/, loader: "babel?{stage: 1, optional: 'runtime', loose: ['es6.classes', 'es6.forOf', 'es6.properties.computed']}"},
        {test: /\.(png|jpg|gif)$/, loader: "url?limit=4096"},
        {
          test: /\.less$/,
          loader: isDev ?
            ExtractTextPlugin.extract("css?sourceMap!autoprefixer?{browsers:['last 2 versions', 'ie 9']}!less") :
            ExtractTextPlugin.extract("css?minimize!autoprefixer?{browsers:['last 2 versions', 'ie 9']}!less")
        }
      ]
    },
    resolve: {
      extensions: ["", ".js", ".tag"],
      modulesDirectories: ["node_modules"]
    },
    plugins: [
      new webpack.ProvidePlugin({
        riot: "riot"
      }),
      new ExtractTextPlugin(
        isDev ?
          "../css/[name].css" :
          "../css/[name].[hash].css",
        {allChunks: true}
      )
    ]
  };

  if (isDev) {
    opts.watch = !once;
    opts.plugins = opts.plugins.concat([
      new webpack.DefinePlugin({
        DEV: true
      }),
    ]);
    opts.devtool = "source-map";
  } else {
    opts.plugins = opts.plugins.concat([
      new webpack.DefinePlugin({
        DEV: false
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
    ]);
  }

  webpack(opts, function(err, stats) {
    console.log(stats.toString({colors: true}));
  });
}

gulp.task("browser-sync", function() {
  browserSync({
    proxy: "localhost:{{{port}}}",
    files: ["dist/**/*"]
  });
});

gulp.task("run", function() {
  execSync("node dist/app.js");
});
