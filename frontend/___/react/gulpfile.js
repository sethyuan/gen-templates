var gulp = require("gulp");
var del = require("del");
var browserSync = require("browser-sync");
var webpack = require("webpack");
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
  del(["public/js"], cb);
});

gulp.task("dev", ["browser-sync"], function() {
  bundle(true);
});

gulp.task("prod", ["clean"], function() {
  bundle(false);
});

gulp.task("browser-sync", function() {
  browserSync({
    // proxy: "localhost:8000",
    server: {baseDir: "public"},
    files: ["public/*.html", "public/js/*.js"]
  });
});

gulp.task("default", ["dev"]);

function bundle(dev) {
  var opts = {
    entry: {
      app: "./src/app.jsx"
    },
    output: {
      path: "public/js",
      filename: "[name].js"
    },
    module: {
      loaders: [
        {test: /\.less$/, loader: "style!css?minimize!autoprefixer?{browsers:['last 2 versions', 'ie 9']}!less"},
        {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel?{experimental: true, optional: 'runtime', loose: ['es6.forOf', 'es6.properties.computed']}"},
        {test: /\.(png|jpg|gif)$/, loader: "url?limit=8192"},
        {test: /\.(otf|eot|svg|ttf|woff2?)$/, loader: 'url-loader?limit=8192'},
      ]
    },
    resolve: {
      modulesDirectories: ["bower_components/bootstrap/less", "node_modules"],
      extensions: ["", ".js", ".jsx"]
    },
    plugins: []
  };

  if (dev) {
    opts.watch = true;
    opts.plugins = opts.plugins.concat([
      new webpack.DefinePlugin({
        DEV: true
      }),
    ]);
    opts.devtool = "inline-source-map";
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
