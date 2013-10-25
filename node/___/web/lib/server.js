"use strict";

var express = require("express");
var routes = require("./routes");
var http = require("http");
var path = require("path");
var hbs = require("hbs");
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

app.set("port", {{{port}}});
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hjs");
app.disable("x-powered-by");
app.use(express.logger("dev"));
app.use(express.bodyParser());
// app.use(require("stylus").middleware(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public")));

app.configure("development", function(){
  app.use(express.errorHandler());
});

app.get("/", routes.index);

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
