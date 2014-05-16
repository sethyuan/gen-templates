(ns {{{name}}}.server
  (:require [{{{name}}}.routes :as routes]
            [{{{name}}}.conf :refer [conf]]
            [{{{name}}}.logging])
  (:require-macros [{{{name}}}.macros :refer [deflogs]]))

(defn start []
  (deflogs {{{name}}}.logging/server)

  (def express (js/require "express"))
  (def morgan (js/require "morgan"))
  (def body-parser (js/require "body-parser"))
  (def errorhandler (js/require "errorhandler"))
  (def http (js/require "http"))
  (def path (js/require "path"))
  (def app (express))

  (doto app
    (.set "env" (:server-mode conf))
    (.disable "x-powered-by"))

  (if (= "development" (.get app "env"))
    (.use app (morgan "dev"))
    (.use app (morgan #js {"stream" #js {"write" #(verbose %)}})))

  (doto app
    (.use (.static express (.join path js/__dirname "../public")))
    (.use (body-parser)))

  (doto app
    (.get "/" routes/index)
    (.get "/faq" routes/faq))

  (if (= "development" (.get app "env"))
    (.use app (errorhandler)))

  (-> http (.createServer app) (.listen (:port conf))))
