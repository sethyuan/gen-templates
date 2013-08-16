"use strict";

var path = require("path");

var streamlinePatterns = ["bin/**/*._js", "lib/**/*._js"];

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    streamline: {
      all: streamlinePatterns
    },

    jshint: {
      options: {
        jshintrc: path.join(process.env.HOME, ".jshintrc"),
        force: true,
        ignores: grunt.file.expandMapping(
          streamlinePatterns, null,
          {ext: ".js"}
        ).map(function(f) {return f.dest}),
      },
      all: ["Gruntfile.js", "bin/**/*.{_j,j}s", "lib/**/*.{_j,j}s", "test/**/*.{_j,j}s"],
    },
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadTasks("tasks");

  // Specify the default task.
  grunt.registerTask("default", ["streamline", "jshint"]);
};
