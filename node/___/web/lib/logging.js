"use strict";

var winston = require("winston");
var path = require("path");

exports.appLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: false,
      level: "info",
      silent: false,
    }),
    new winston.transports.File({
      colorize: false,
      level: "info",
      timestamp: true,
      filename: path.join(__dirname, "../log/app.log"),
      maxsize: 10 * 1024 * 1024,
      maxFiles: 10,
      json: false
    })
  ],
  emitErrs: false,
  exitOnError: false
});

exports.serverLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: false,
      level: "verbose",
      silent: true,
    }),
    new winston.transports.File({
      colorize: false,
      level: "verbose",
      timestamp: true,
      filename: path.join(__dirname, "../log/server.log"),
      maxsize: 10 * 1024 * 1024,
      maxFiles: 30,
      json: false
    })
  ],
  emitErrs: false,
  exitOnError: false
});
