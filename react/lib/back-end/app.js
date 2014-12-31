"use strict";

var traceur = require("traceur");
require("traceur-source-maps").install(traceur);
traceur.require.makeDefault(function(filename) {
  return filename.indexOf("node_modules") === -1;
});

require("./server");
