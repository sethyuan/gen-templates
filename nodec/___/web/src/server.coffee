"use strict"

express = require "express"
http = require "http"
routes = require "./routes"
path = require "path"
hbs = require "hbs"
app = require("streamline-express")(express())

hbs.registerPartials(path.join(__dirname, "../views/partials"))

blocks = {}

hbs.registerHelper("extend", (name, context) ->
  block = blocks[name]
  if !block
      block = blocks[name] = []
  block.push(context.fn(this))
  ""
)

hbs.registerHelper("block", (name) ->
  val = (blocks[name] || []).join("\n")
  # clear the block
  blocks[name] = []
  val
)

# equal helper
hbs.registerHelper("equal", (x, y, options) ->
  if x == y then options.fn() else ""
)

app.set("port", 8080)
app.set("views", path.join(__dirname, "../views"))
app.set("view engine", "hbs")
app.disable("x-powered-by")
app.use(express.logger("dev"))
app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, "../public")))

app.configure("development", ->
  app.use(express.errorHandler())
)

app.get("/", routes.index)

http.createServer(app).listen(app.get("port"), ->
  console.log("Report portal listening on port " + app.get("port"))
)
