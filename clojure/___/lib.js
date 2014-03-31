exports.context = {
  name: "",
  name_for_file: null,
  desc: "",
  year: function() {
    return (new Date()).getFullYear();
  },
};

exports.postProcess = function(context, callback) {
  context.name_for_file = context.name.replace("-", "_");
}
