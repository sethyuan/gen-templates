import flux, {Store, addStore} from "simple-flux";
import immutable, {OrderedMap, Map} from "immutable";

let ind = 0;

export default function init(appStore) {
  const store = new Store();

  appStore.data = appStore.data.set("todos", immutable.fromJS({
    items: OrderedMap(),
  }));

  store.on("todos.add", ({text}) => {
    appStore.data = appStore.data.setIn(
      ["todos", "items", ind++],
      Map({text, completed: false})
    );
    flux.dispatch("render.app");
  });

  store.on("todos.toggle", ({id}) => {
    appStore.data = appStore.data.updateIn(
      ["todos", "items", id],
      item => item.update("completed", val => !val)
    );
    flux.dispatch("render.app");
  });

  store.on("todos.remove", ({id}) => {
    appStore.data = appStore.data.deleteIn(
      ["todos", "items"],
      id
    );
    flux.dispatch("render.app");
  });

  addStore(store);
}
