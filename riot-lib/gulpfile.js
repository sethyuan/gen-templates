var gulp = require("gulp");
var del = require("del");
var browserSync = require("browser-sync");
var execSync = require("child_process").execSync;
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require("fs");
var path = require("path");

var libName = "{{{name}}}";
var babelOpts = {
  stage: 1,
  optional: "runtime",
  loose: ["es6.classes", "es6.forOf", "es6.properties.computed"]
};
var DEV = 0, PROD = 1, PROD_MIN = 2;

gulp.task("default", ["dev"]);

gulp.task("clean", function() {
  del(["dist"]);
});

gulp.task("dev", ["generate-lib"], function() {
  bundle(DEV, true);
});

gulp.task("watch", ["generate-lib", "browser-sync"], function() {
  bundle(DEV, false);
});

gulp.task("prod", ["generate-lib"], function() {
  bundle(PROD, true);
});

gulp.task("prod-custom", function() {
  bundle(PROD, true);
});

gulp.task("generate-lib", function(done) {
  var writer = fs.createWriteStream(
    "src/lib.js",
    {flags: "w", encoding: "utf8"});
  var components =
    fs.readdirSync("src/components")
      .filter(function(entry) {
        return fs.statSync(path.join("src/components", entry)).isDirectory();
      });
  for (var i = 0; i < components.length; i++) {
    var component = components[i];
    writer.write('require("./components/');
    writer.write(component);
    writer.write('");\n');
  }
  writer.once("finish", done);
  writer.end();
});

function bundle(mode, once) {
  var outJsFileName, outCssFileName, cssLoaderString;
  switch (mode) {
    case DEV:
      outJsFileName = libName + ".js";
      outCssFileName = "../css/" + libName + ".css";
      cssLoaderString = "css?sourceMap!autoprefixer?{browsers:['last 2 versions', 'ie 9']}!less";
      break;
    case PROD:
      outJsFileName = libName + ".[hash].js";
      outCssFileName = "../css/" + libName + ".[contenthash].css";
      cssLoaderString = "css!autoprefixer?{browsers:['last 2 versions', 'ie 9']}!less";
      break;
    case PROD_MIN:
      outJsFileName = libName + ".min.[hash].js";
      outCssFileName = "../css/" + libName + ".min.[contenthash].css";
      cssLoaderString = "css?minimize!autoprefixer?{browsers:['last 2 versions', 'ie 9']}!less";
      break;
  }

  var opts = {
    entry: {
      app: "./src/lib.js"
    },
    output: {
      path: "dist/js",
      filename: outJsFileName
    },
    module: {
      preLoaders: [
        {test: /\.tag$/, exclude: /node_modules/, loader: "riotjs"}
      ],
      loaders: [
        {test: /\.(js|tag)$/, exclude: /node_modules/, loader: "babel?{stage: 1, optional: 'runtime', loose: ['es6.classes', 'es6.forOf', 'es6.properties.computed']}"},
        {test: /\.(png|jpg|gif)$/, loader: "url?limit=4096"},
        {test: /\.less$/, loader: ExtractTextPlugin.extract(cssLoaderString)}
      ]
    },
    resolve: {
      extensions: ["", ".js", ".tag"],
      modulesDirectories: ["node_modules"]
    },
    plugins: [
      new ExtractTextPlugin(outCssFileName, {allChunks: true}),
      new webpack.DefinePlugin({DEV: mode === DEV})
    ]
  };

  switch (mode) {
    case DEV:
      opts.watch = !once;
      opts.devtool = "source-map";
      break;
    case PROD:
      opts.plugins = opts.plugins.concat([
        new webpack.optimize.OccurenceOrderPlugin()
      ]);
      break;
    case PROD_MIN:
      opts.plugins = opts.plugins.concat([
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
      ]);
      break;
  }

  webpack(opts, function(err, stats) {
    console.log(stats.toString({colors: true}));

    if (mode === PROD) {
      console.log();
      bundle(PROD_MIN, false);
    }
  });
}

gulp.task("browser-sync", function() {
  browserSync({
    server: {baseDir: "."},
    files: ["dist/**/*", "demos/**/*"],
    startPath: "/demos/"
  });
});
