"use strict";

exports.index = function(req, res) {
  res.writeHead(200, {"Content-Type": "text/plain", "Content-Length": 2});
  res.send("OK");
};
