(ns {{{name}}}.core
  #_(:require-macros [{{{name}}}.macros]))

(defn -main [& args]
  (println "Hello ClojureScript"))

(set! *main-cli-fn* -main)
