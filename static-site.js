var execSync = require("child_process").execSync;

exports.context = {
  name: "",
  port: 0,
  license: "",
  user: {
    name: function() {
      return execSync("git config --get user.name", {encoding: "utf8"}).trim();
    },
    email: function() {
      return execSync("git config --get user.email", {encoding: "utf8"}).trim();
    }
  }
}
