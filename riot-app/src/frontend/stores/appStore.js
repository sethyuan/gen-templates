const store = riot.observable();

// Store's data
let title = "App";

store.on("changeTitle", t => {
  title = t;
  store.trigger("titleChanged", title);
});

export default store;
