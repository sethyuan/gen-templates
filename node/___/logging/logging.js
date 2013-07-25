"use strict";

var winston = require("winston"),
    path = require("path");

exports.{{{logger name}}}Logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: "verbose"
    }),
    new winston.transports.File({
      colorize: false,
      filename: path.join(__dirname, "../log/{{{logger name}}}.log"),
      maxsize: 10 * 1024 * 1024,
      json: false
    })
  ],
  emitErrs: false,
  exitOnError: false
});
