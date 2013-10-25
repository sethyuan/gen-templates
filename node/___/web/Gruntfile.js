"use strict";

var path = require("path");

module.exports = function(grunt) {
  grunt.option.init({
    version: "0.1.0"
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    browserify: {
      all: {
        src: [],
        dest: "public/js/all-<%= grunt.option('version') %>.js",
        options: {
          alias: [
            "public/js/all_xxx.js:all-xxx",
          ]
        },
      }
    },

    uglify: {
      all: {
        src: ["<%= browserify.all.dest %>"],
        dest: "public/js/all-<%= grunt.option('version') %>.min.js",
      },
      options: {
        compress: true,
        mangle: {
          except: ["jQuery", "d3"]
        }
      }
    },

    stylus: {
      all: {
        files: [{
          expand: true,
          cwd: "public/css/",
          src: ["*.styl"],
          dest: "public/css/",
          ext: ".css",
        }]
      }
    },

    concat: {
      css: {
        src: ["public/css/*.css", "!public/css/site.css"],
        dest: "public/css/site.css",
      }
    },
  });

  grunt.loadNpmTasks("grunt-contrib-stylus");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadTasks("tasks");

  // Specify the default task.
  grunt.registerTask("default", [
    "browserify", "uglify", "stylus", "concat"
  ]);
};
