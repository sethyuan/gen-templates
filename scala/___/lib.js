var exec = require("child_process").exec;

exports.context = {
  group: "",
  name: "",
  desc: "",
  year: function() {
    return (new Date()).getFullYear();
  },
  user: {
    name: null,
    email: null
  }
};

exports.postProcess = function(context, callback) {
  // Because of exec's async nature, we have to call them here.
  // Hogan does not support async lambdas.
  exec("git config --get user.name", function(err, stdout, stderr) {
    context.user.name = (err ? "" : stdout.trim());
    exec("git config --get user.email", function(err, stdout, stderr) {
      context.user.email = (err ? "" : stdout.trim());
      callback();
    });
  });
};
