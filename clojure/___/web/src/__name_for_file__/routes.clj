(ns {{{name}}}.routes
  (:require [clojure.core.match :refer [match]]
            [clojure.core.async :as async :refer [go chan >! >!! <! <!!]]
            [cav.core :as cav]
            [cav.macros :refer :all]
            [org.httpkit.server :as server :refer [with-channel send!]]
            [cheshire.core :as cheshire]))

(defn index [req]
  "Index OK!")

(defn faq [req]
  (with-channel req channel
    (go
      (Thread/sleep 1000)
      (send! channel "Success")
      (println "after resp"))
    (println "before resp")))
