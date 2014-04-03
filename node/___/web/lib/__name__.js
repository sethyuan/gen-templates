"use strict";

var cluster = require("cluster");
var path = require("path");
var util = require("util");
var config = require("./config");
var logger = require("./logging").appLogger;
var cmd = require("./cmd");

function handleCommand(command) {
  switch (command) {
  // case cmd.requestApps:
  //   this.send({
  //     cmd: cmd.apps,
  //     apps: apps
  //   });
  //   break;
  }
}

cluster.setupMaster({
  exec: path.join(__dirname, "server.js")
});

cluster.on("online", function(worker) {
  worker.on("message", handleCommand.bind(worker));
});

cluster.on("listening", function(worker, addr) {
  logger.log("info", "A worker server is listening on " + addr.port);
});

cluster.on("exit", function(worker, code, signal) {
  logger.log("warn", "Worker %d is died.", worker.id);
  worker.removeAllListeners();
  cluster.fork();
});

for (var i = 0; i < config.numOfWorkers; i++) {
  cluster.fork();
}
