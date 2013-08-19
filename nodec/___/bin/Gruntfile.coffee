"use strict"

path = require("path")

streamlinePatterns = ["src/**/*._coffee"]

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    coffee:
      options:
        bare: true
      all:
        expand: true
        cwd: "src"
        src: ["**/*.coffee"]
        dest: "lib"
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

  grunt.loadNpmTasks("grunt-contrib-coffee")
  grunt.loadNpmTasks("grunt-contrib-copy")
  grunt.loadNpmTasks("grunt-contrib-clean")
  grunt.loadTasks("tasks")

  # Specify the default task.
  grunt.registerTask("default", [
    "coffee", "streamline", "copy:streamline", "clean:streamline"
  ])
