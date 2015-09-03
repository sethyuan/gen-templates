export default function(opts) {
  this.title = "App";

  RiotControl.on("titleChanged", t => {
    this.title = t;
    this.update();
  });

  RiotControl.trigger("changeTitle", "WAHAHA");
}
