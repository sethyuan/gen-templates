"use strict";

var path = require("path");

module.exports = function(grunt) {
  grunt.option.init({
    version: "0.1.0"
  });

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

    browserify: {
      vis: {
        src: ["lib/public/scripts/vis*.js"],
        dest: "lib/public/scripts/vis-<%= grunt.option('version') %>.js",
        options: {
          ignore: ["lib/public/scripts/vis.js"]
        }
      }
    },

    uglify: {
      all: ["<%= browserify.vis.dest %>"],
      options: {
        compress: true,
        mangle: {
          except: ["jQuery", "d3"]
        }
      }
    },
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["jshint", "browserify", "uglify"]);
};
