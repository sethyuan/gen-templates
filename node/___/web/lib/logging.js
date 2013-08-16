"use strict";

var winston = require("winston"),
    path = require("path");

exports.portalLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: "verbose",
      silent: false,
    }),
    new winston.transports.File({
      colorize: false,
      level: "debug",
      timestamp: true,
      filename: path.join(__dirname, "../log/portal.log"),
      maxsize: 10 * 1024 * 1024,
      json: false
    })
  ],
  emitErrs: false,
  exitOnError: false
});
