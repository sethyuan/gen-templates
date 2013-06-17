exports.context = {
  name: "",
  prefix: "",
  PREFIX: null,
};

exports.postProcess = function(ctx, cb) {
  ctx.name = ctx.name.toLowerCase().replace(" ", "_");
  ctx.PREFIX = ctx.prefix.toUpperCase();
  cb();
};
