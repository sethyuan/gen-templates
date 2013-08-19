"use strict"

exec = require("child_process").exec

module.exports = (grunt) ->
  grunt.registerMultiTask "streamline", "Compile streamline files.", ->
    filesSrc = this.filesSrc
    done = this.async()
    n = 0
    e = false

    for file in filesSrc
      exec "_coffee -c '#{file}'", (err) ->
        n++
        grunt.log.writeln "File #{file.cyan} streamlined."
        if err then e = true
        if n >= filesSrc.length then done(!e);

    undefined
