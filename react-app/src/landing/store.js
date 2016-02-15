import {Store, addStore} from "simple-flux";
import React from "react";
import ReactDOM from "react-dom";
import immutable from "immutable";

import Root from "./Root";
import Todos from "./todos/components/Todos";

import todosStore from "./todos/store";

const store = new Store();

store.data = immutable.fromJS({
  view: Todos,
});

function renderApp() {
  ReactDOM.render(<Root view={store.data.get("view")} data={store.data}/>, document.getElementById("root"));
}

store.on("render.app", () => {
  renderApp();
});

store.on("goto.todos", () => {
  store.data = store.data.set("view", Todos);
  renderApp();
});

todosStore(store);

addStore(store);
