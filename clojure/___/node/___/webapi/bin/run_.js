"use strict";

require("source-map-support").install();

require("../target/main-out/goog/bootstrap/nodejs");
require("../lib/main");
require("../target/main-out/{{{name_for_file}}}/core");

{{{name_for_file}}}.core._main();
