"use strict";

var cmd = require("./cmd");
var config = require("./config");
var logger = require("./logging").appLogger;
var flow = require("asyncflow");

exports.index = function(req, res) {
  res.send("OK");
};
