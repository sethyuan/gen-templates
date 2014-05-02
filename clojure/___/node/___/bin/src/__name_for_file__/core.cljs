(ns {{{name}}}.core
  #_(:require-macros [{{{name}}}.macros]))

(defn -main [& args]
  (.log js/console "Hello ClojureScript"))

(set! *main-cli-fn* -main)
