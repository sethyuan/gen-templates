const express = require("express"),
  compression = require("compression"),
  app = express();

app.use(compression());
app.use(express.static("public"));

app.listen(8000, () => console.log("Listening on 8000"));
