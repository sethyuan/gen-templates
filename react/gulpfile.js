var gulp = require("gulp"),
    webpack = require("webpack"),
    browserSync = require("browser-sync"),
    del = require("del"),
    karma = require("karma").server,
    bower = require("gulp-bower-deps")({
      deps: {
        "bootstrap-sass-official": {
          version: "3.x",
          files: ""
        },
        react: {
          version: "0.x",
          files: ""
        }
      }
    });

bower.installtask(gulp);

gulp.task("clean", function() {
  del(["public/js", "public/css"]);
});

gulp.task("browser-sync", function() {
  browserSync({
    proxy: "localhost:8000",
    files: ["public/*.html", "public/css/*.css", "public/js/*.js"]
  });
});

gulp.task("dev", ["browser-sync"], function() {
  webpack({
    entry: {
      app: "./lib/front-end/js/app.jsx"
    },
    output: {
      path: "./public/js",
      filename: "[name].js"
    },
    cache: true,
    devtool: "inline-source-map",
    watch: true,
    module: {
      loaders: [
        {
          test: /^((?!(bower_components|node_modules)).)+\.js$/,
          loader: "traceur?runtime&arrayComprehension&generatorComprehension&asyncFunctions"
        },
        {
          test: /^((?!(bower_components|node_modules)).)+\.jsx$/,
          loader: "traceur?runtime&arrayComprehension&generatorComprehension&asyncFunctions!jsx?stripTypes"
        },
        {
          test: /\.scss$/,
          loader: "style!css!sass?{'includePaths': ['./bower_components', './node_modules']}"
        },
        {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=../font/[name].[ext]&limit=10000&minetype=application/font-woff"},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=../font/[name].[ext]&limit=10000&minetype=application/octet-stream"},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=../font/[name].[ext]"},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?name=../font/[name].[ext]&limit=10000&minetype=image/svg+xml"}
      ]
    },
    plugins: [
    ]
  }, function(err, stats) {
    console.log(stats.toString({colors: true}));
    if (err) console.error(err.toString());
  });
});

gulp.task("test", function(done) {
  karma.start({
    configFile: __dirname + "/karma.conf.js",
    singleRun: true
  }, done);
});

gulp.task("tdd", function() {
  karma.start({
    configFile: __dirname + "/karma.conf.js"
  });
});

gulp.task("default", ["dev"]);
