var express = require("express");
var compression = require("compression");
var path = require("path");
var app = express();
var port = {{{port}}};

app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, function() {
  console.log("Listening on port %d.", port);
});
