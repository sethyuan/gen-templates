var execSync = require("child_process").execSync;

// Define all properties needed by the templates, a value of
// "" means this property is a string
// 0 means this property is a number
// false means this property is a boolean
// null means this property's value is given in postProcess
// function means this property is a lambda that gets called
exports.context = {
  name: "",
  desc: "",
  license: "internal",
  "is app": false,
  year: function() {
    return (new Date()).getFullYear();
  },
  user: {
    name: function() {
      return execSync("git config --get user.name", {encoding: "utf8"}).trim();
    },
    email: function() {
      return execSync("git config --get user.email", {encoding: "utf8"}).trim();
    }
  }
};
