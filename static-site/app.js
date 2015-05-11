var express = require("express");
var path = require("path");
var app = express();
var port = {{{port}}};

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, function() {
  console.log("Listening on port %d.", port);
});
