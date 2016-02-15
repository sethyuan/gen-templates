import router from "router";
import flux from "simple-flux";

import "./todos/routes";

router.on("/landing.html", () => {
  flux.dispatch("goto.todos");
});

if (history.pushState) {
  router.init();
} else {
  router.init("/");
}
