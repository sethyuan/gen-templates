"use strict";

var express = require("express"),
    routes = require("./routes"),
    http = require("http"),
    path = require("path"),
    {{#streamline}}
    app = require("streamline-express")(express());
    {{/streamline}}
    {{^streamline}}
    app = express();
    {{/streamline}}

app.set("port", {{{port}}});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(require("stylus").middleware(path.join(__dirname, "public")));
app.use(express.static("public"));

app.configure("development", function(){
  app.use(express.errorHandler());
});

app.get("/", routes.index);

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
