"use strict";

require("source-map-support").install();

require("../target/{{{name}}}-out/goog/bootstrap/nodejs");
require("./{{{name}}}");
require("../target/{{{name}}}-out/{{{name_for_file}}}/core");

{{{name_for_file}}}.core._main();
