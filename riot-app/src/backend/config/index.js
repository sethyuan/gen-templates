import * as dev from "./dev";
import * as prod from "./prod";

export default (process.env.NODE_ENV === "prod" ? prod : dev);
