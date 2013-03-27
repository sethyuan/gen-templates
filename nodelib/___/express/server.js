var express = require("express"),
    routes = require("./routes"),
    http = require("http");

var app = express();

app.configure(function(){
  app.set("port", {{{port}}});
  app.set("views", __dirname + "/views");
  app.set("view engine", "hjs");
  app.use(express.logger("dev"));
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(require("stylus").middleware(__dirname + "/public"));
  app.use(express.static("public"));
});

app.configure("development", function(){
  app.use(express.errorHandler());
});

app.get("/", routes.index);

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
