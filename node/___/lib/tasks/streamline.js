"use strict";

var exec = require("child_process").exec,
    util = require("util");

module.exports = function(grunt) {
  grunt.registerMultiTask("streamline", "Compile streamline files.", function() {
    var filesSrc = this.filesSrc;
    var done = this.async();
    var n = 0,
        e = false;

    for (var i = 0; i < filesSrc.length; i++) {
      var file = filesSrc[i];
      exec(util.format('_node -c "%s"', file), function(err) {
        n++;
        grunt.log.writeln("File " + file.cyan + " streamlined.");
        if (err) e = true;
        if (n >= filesSrc.length) return done(!e);
      });
    }
  });
};
