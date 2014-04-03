"use strict";

// Number of worker processes.
exports.numOfWorkers = 2;

// Web server's port.
exports.port = {{{port}}};

// Web server's operation mode. Can be either:
//    development - For development and debugging.
//    production  - For production.
exports.serverMode = process.env.NODE_ENV || "development";
