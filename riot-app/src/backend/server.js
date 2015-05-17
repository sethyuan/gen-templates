import express from "express"
import compression from "compression"
import {port} from "./config"

const app = express();

app.use(compression());
app.use(express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Listening on ${port}.`);
});
