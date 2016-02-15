import router from "router";
import flux from "simple-flux";

router.path("/todos", function() {
  this.on("/", () => {
    flux.dispatch("goto.todos");
  });
});
