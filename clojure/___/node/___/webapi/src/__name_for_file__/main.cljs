(ns {{{name}}}.main
  (:require [cljs.nodejs :as nodejs]
            [{{{name}}}.server :as server]
            [{{{name}}}.logging]
            [{{{name}}}.commands :as cmd]
            [{{{name}}}.conf :refer [conf]])
  (:require-macros [{{{name}}}.macros :refer [deflogs]]))

(def cluster (js/require "cluster"))

(deflogs {{{name}}}.logging/app)

(defn- handle-command [worker command]
  ;; (case command
  ;;   )
  )

(defn- master []
  (doto cluster
    (.on "online" (fn [worker]
                    (.on worker "message" (partial handle-command worker))))
    (.on "listening" (fn [worker addr]
                       (info (str "A worker server is listening on " (.-port addr)))))
    (.on "exit" (fn [worker]
                  (warn (str "Worker " (.-id worker) " is died."))
                  (.removeAllListeners worker)
                  (.fork cluster))))
  (dotimes [i (:num-of-workers conf)]
    (.fork cluster)))

(defn- workers []
  (server/start))

(defn -main [& args]
  (if (.-isMaster cluster)
    (master)
    (workers)))

(nodejs/enable-util-print!)
(set! *main-cli-fn* -main)
