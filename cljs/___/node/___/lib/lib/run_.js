"use strict";

require("source-map-support").install();

require("../target/{{{name}}}-out/goog/bootstrap/nodejs");
require("./{{{name}}}.js");
module.exports = require("../target/{{{name}}}-out/{{{name_for_file}}}/core");
