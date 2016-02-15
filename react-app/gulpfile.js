"use strict";

const gulp = require("gulp");
const del = require("del");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const path = require("path");
const fs = require("fs");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackDevServer = require("webpack-dev-server");

const DEV = 1, PROD = 2;
const host = "localhost";
const port = {{{port}}};

function opts(mode) {
  function generateEntries(pages, entry) {
    for (let page of pages) {
      entry[page] = mode === DEV
        ? [
          `webpack-dev-server/client?http://${host}:${port}`,
          "webpack/hot/only-dev-server",
          `./src/${page}/app.js`
        ]
        : `./src/${page}/app.js`;
    }
  }

  function generateHtmls(pages, plugins) {
    for (let page of pages) {
      plugins.push(
        new HtmlWebpackPlugin({
          filename: `${page}.html`,
          template: `src/${page}/index.html`,
          inject: true,
          chunks: ["vendor", page],
        })
      );
    }
  }

  let options = {
    entry: {
      vendor: ["react", "react-dom", "react-addons-pure-render-mixin", "immutable", "simple-flux", "director"],
    },
    output: {
      path: path.resolve("dist"),
      filename: mode === DEV ? "js/[name].js" : "js/[name].[chunkhash:8].js",
      publicPath: `http://${host}:${port}/`
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: `react-hot!babel?${JSON.stringify({
            presets: ["es2015", "stage-2", "react"],
            cacheDirectory: true
          })}`,
          include: [path.resolve("src"), path.resolve("node_modules/react-aaui"), path.resolve("node_modules/func.js")]
        },
        {
          test: /\.less$/,
          loader: mode === DEV
            ? "style!css?-minimize&sourceMap!postcss!less?sourceMap"
            : ExtractTextPlugin.extract("css?minimize!postcss!less"),
          include: [path.resolve("src"), path.resolve("node_modules/react-aaui"), path.resolve("node_modules/func.js")]
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: "file?name=images/[name].[ext]",
          include: [path.resolve("src"), path.resolve("node_modules/react-aaui"), path.resolve("node_modules/func.js")]
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/,
          loader: "file?name=fonts/[name].[ext]",
          include: [path.resolve("src"), path.resolve("node_modules/react-aaui"), path.resolve("node_modules/func.js")]
        },
      ]
    },
    postcss() {
      return [autoprefixer({
        browsers: ["last 2 versions", "ie 9"]
      })];
    },
    resolve: {
      root: [
        path.resolve("src/shared/components"),
        path.resolve("src/shared/libs"),
      ]
    },
    plugins: [
      new ExtractTextPlugin(
        mode === DEV ? "css/[name].css" : "css/[name].[contenthash:8].css",
        {allChunks: true}
      ),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: mode === DEV
          ? "js/vendor.js"
          : "js/vendor.v1.js",
      }),
    ]
  };

  const pages = fs.readdirSync("src")
    .filter(page => page !== "shared");
  generateEntries(pages, options.entry);
  generateHtmls(pages, options.plugins);

  switch (mode) {
  case DEV:
    options.debug = true;
    options.devtool = "eval-cheap-module-source-map";
    options.plugins = options.plugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ]);
    break;
  case PROD:
    options.plugins = options.plugins.concat([
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    ]);
    break;
  }

  return options;
}

const devOpts = opts(DEV);

const prodOpts = opts(PROD);

gulp.task("default", ["dev"]);

gulp.task("clean", (done) => {
  return del(["dist"], done);
});

gulp.task("dev", ["clean"], (done) => {
  new WebpackDevServer(webpack(devOpts), {
    contentBase: "dist",
    hot: true,
    publicPath: "/",
    historyApiFallback: true,
    stats: {colors: true},
  }).listen(port, host, (err) => {
    if (err) return console.error(err);
    console.log(`Listening at http://${host}:${port}`);
  });
});

gulp.task("prod", ["clean"], (done) => {
  return webpack(prodOpts, (err, stats) => {
    console.log(stats.toString({colors: true}));
    done();
  });
});
