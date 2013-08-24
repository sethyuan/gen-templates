"use strict"

path = require "path"

streamlinePatterns = ["src/**/*._coffee"]

module.exports = (grunt) ->
  grunt.option.init
    version: "0.1.0"

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffee:
      options:
        bare: true
      backend:
        expand: true
        cwd: "src"
        src: ["**/*.coffee"]
        dest: "lib"
        ext: ".js"
      frontend:
        expand: true
        cwd: "public_src/js"
        src: ["**/*.coffee"]
        dest: "public/js"
        ext: ".js"

    streamline:
      all: streamlinePatterns

    copy:
      streamline:
        expand: true
        cwd: "src"
        src: ["**/*.js"]
        dest: "lib"

    clean:
      streamline: ["src/**/*.js"]

    stylus:
      all:
        files: [{
          expand: true
          cwd: "public_src/css"
          src: ["*.styl"]
          dest: "public_src/css"
          ext: ".css"
        }]

    concat:
      css:
        src: ["public_src/css/*.css"]
        dest: "public/css/site.css"

    # browserify:
    #   vis:
    #     src: []
    #     dest: "public/js/vis-<%= grunt.option('version') %>.js"
    #     options:
    #       alias: [
    #         "public/js/vis_summary.js:vis-summary"
    #       ]

    # uglify:
    #   all:
    #     src: ["<%= browserify.vis.dest %>"]
    #     dest: "public/js/vis-<%= grunt.option('version') %>.min.js"
    #   options:
    #     compress: true
    #     mangle:
    #       except: ["jQuery", "d3"]

  grunt.loadNpmTasks("grunt-contrib-coffee")
  grunt.loadNpmTasks("grunt-contrib-copy")
  grunt.loadNpmTasks("grunt-contrib-clean")
  grunt.loadNpmTasks("grunt-contrib-stylus")
  grunt.loadNpmTasks("grunt-contrib-concat")
  grunt.loadNpmTasks("grunt-browserify")
  grunt.loadNpmTasks("grunt-contrib-uglify")
  grunt.loadTasks("tasks")

  # Specify the default task.
  grunt.registerTask("default", [
    "coffee", "streamline", "copy:streamline", "clean:streamline",
    "stylus", "concat",
  ])
