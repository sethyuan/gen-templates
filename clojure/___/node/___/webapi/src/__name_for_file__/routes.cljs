(ns {{{name}}}.routes
  (:require [{{{name}}}.logging]
            [cljs.core.async])
  (:require-macros [{{{name}}}.macros :refer [deflogs]]
                   [cav.macros.cljs :refer [async]]))

(deflogs {{{name}}}.logging/app)

(defn index [req res]
  (async
    !(js/setTimeout ... 1000)
    (.send res "OK")))

(defn faq [req res]
  (.send res "OK"))
