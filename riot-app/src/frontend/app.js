import "./components/app";

import appStore from "./stores/appStore";

RiotControl.addStore(appStore);

riot.mount("app");
