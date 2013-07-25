"use strict";

exports.logger = function(logger) {
  logger = logger || function(level, data) {
    switch (level) {
      case "info": console.info(data); break;
      case "warn": console.warn(data); break;
      case "error": console.error(data); break;
      default: console.log(data); break;
    }
  };

  return function(req, res, next) {
    var remoteAddr =
      req.socket &&
      (req.socket.remoteAddress ||
        (req.socket.socket && req.socket.socket.remoteAddress));
    logger.log("info",
      remoteAddr + ' - [' +
      new Date().toUTCString() + '] "' +
      req.method + ' ' +
      req.originalUrl + ' HTTP/' + req.httpVersionMajor + '.' + req.httpVersionMinor + '" ' +
      (req.headers.referer || req.headers.referrer) + ' "' +
      req.headers['user-agent'] + '"'
    );
    next();
  };
};
