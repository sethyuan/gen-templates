"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var hbs = require("hbs");
var routes = require("./routes");
var config = require("./config");
var logger = require("./logging.js").serverLogger;
var app = express();

hbs.registerPartials(path.join(__dirname, "../views/partials"));

var blocks = {};

hbs.registerHelper("extend", function(name, context) {
  var block = blocks[name];
  if (!block) {
      block = blocks[name] = [];
  }
  block.push(context.fn(this));
});

hbs.registerHelper("block", function(name) {
  var val = (blocks[name] || []).join("\n");
  // clear the block
  blocks[name] = [];
  return val;
});

// equal helper
hbs.registerHelper("equal", function(x, y, options) {
  return (x === y) ? options.fn() : "";
});

app.set("env", config.serverMode);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.disable("x-powered-by");

if (app.get("env") === "development") {
  app.use(express.logger("dev"));
} else {
  app.use(express.logger({
    stream: {
      write: function(str) {
        logger.log("verbose", str);
      }
    }
  }));
}
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", routes.index);

if (app.get("env") === "development") {
  app.use(express.errorHandler());
}

http.createServer(app).listen(config.port);
