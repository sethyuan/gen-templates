(ns {{{name}}}.core
  (:require [cljs.nodejs :as nodejs]))

(defn -main [& args]
  (.log js/console "Hello ClojureScript"))

(nodejs/enable-util-print!)
(set! *main-cli-fn* -main)
