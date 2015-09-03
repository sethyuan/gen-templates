import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";
import FileStreamRotator from "file-stream-rotator";
// import favicon from "serve-favicon";
import cookieParser from "cookie-parser";
import errorHandler from "errorhandler";
import {port} from "./config";
import routes from "./routes";

const app = express();

app.disable("x-powered-by");

app.use(compression());
// app.use(favicon(__dirname + "/favicon.ico"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

if (app.get("env") === "production") {
  const accessLogStream = FileStreamRotator.getStream({
    filename: __dirname + "/log/access-%DATE%.log",
    frequency: "daily",
    verbose: false,
    date_format: "YYYYMMDD"
  });
  app.use(morgan("short", {stream: accessLogStream}));
} else {
  app.use(morgan("dev"));
}

routes(app);

if (app.get("env") !== "production") {
  app.use(errorHandler());
}

app.listen(port, () => {
  console.log(`Listening on ${port}.`);
});
