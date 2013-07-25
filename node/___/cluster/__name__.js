"use strict";

var cluster = require("cluster");

var NUM_WORKERS = {{{#workers}}};

function handleMessage(m) {
  switch (m.cmd) {
  }
}

cluster.setupMaster({
  exec: path.join(__dirname, "../lib/{{{worker name}}}.js")
});

cluster.on("online", function(worker) {
  worker.on("message", handleMessage);
});

cluster.on("listening", function(worker) {
  console.info("worker %d is listening now.", worker.id);
});

cluster.on("exit", function(worker, code, signal) {
  console.warn("worker %d is died.", worker.id);
  worker.removeAllListeners();
  cluster.fork();
});

for (var i = 0; i < NUM_WORKERS; i++) {
  cluster.fork();
}
