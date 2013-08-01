"use strict";

var path = require("path");

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      all: ["Gruntfile.js", "bin/**/*.js", "lib/**/*.js", "test/**/*.js"],
      options: {
        jshintrc: path.join(process.env.HOME, ".jshintrc"),
        force: true,
        ignores: [],
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("default", ["jshint"]);
};
