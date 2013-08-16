"use strict";

var path = require("path");

var streamlinePatterns = ["lib/**/*._js"];

module.exports = function(grunt) {
  grunt.option.init({
    version: "0.1.0"
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    streamline: {
      all: streamlinePatterns
    },

    jshint: {
      options: {
        jshintrc: path.join(process.env.HOME, ".jshintrc"),
        force: true,
        ignores: ["**/*.min.js"].concat(grunt.file.expandMapping(
          streamlinePatterns, null,
          {ext: ".js"}
        ).map(function(f) {return f.dest})),
      },
      all: ["Gruntfile.js", "lib/**/*.{_j,j}s", "test/**/*.{_j,j}s"],
    },

    browserify: {
      all: {
        src: [],
        dest: "lib/public/js/all-<%= grunt.option('version') %>.js",
        options: {
          alias: [
            "lib/public/js/all_xxx.js:all-xxx",
          ]
        },
      }
    },

    uglify: {
      all: {
        src: ["<%= browserify.all.dest %>"],
        dest: "lib/public/js/all-<%= grunt.option('version') %>.min.js",
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
          cwd: "lib/public/css/",
          src: ["*.styl"],
          dest: "lib/public/css/",
          ext: ".css",
        }]
      }
    },

    concat: {
      css: {
        src: ["lib/public/css/*.css", "!lib/public/css/site.css"],
        dest: "lib/public/css/site.css",
      }
    },
  });

  grunt.loadNpmTasks("grunt-contrib-stylus");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadTasks("tasks");

  // Specify the default task.
  grunt.registerTask("default", [
    "streamline", "jshint", "browserify", "uglify",
    "stylus", "concat"
  ]);
};
