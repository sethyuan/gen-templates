var cluster = require("cluster"),
    numCPUs = {{{cpus}}};

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", function(worker, code, signal) {
    console.error("Worker %d died.", worker.process.pid);
    cluster.fork();
  });
} else {
  require("../{{{required_module}}}");
}
