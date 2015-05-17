if (process.env.NODE_ENV !== "prod") {
  require("source-map-support").install();
}

require("./server");
