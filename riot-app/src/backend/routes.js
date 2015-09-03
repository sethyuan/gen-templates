export default function routes(app) {
  app.get("/", function(req, res) {
    res.send("OK");
  });
}
