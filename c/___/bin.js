exports.context = {
  name: "",
  NAME: null,
};

exports.postProcess = function(ctx, cb) {
  ctx.name = ctx.name.toLowerCase().replace(" ", "_");
  ctx.NAME = ctx.name.toUpperCase();
  cb();
};
