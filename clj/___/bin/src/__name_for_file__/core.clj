(ns {{{name}}}.core
  (:require [clojure.tools.cli :refer [parse-opts]])
  (:gen-class))

(defn -main [& args]
  (let [cli-options [[nil "--version" "Show version and exit"]
                     ["-h" "--help"]]
        {:keys [options arguments summary errors]} (parse-opts args cli-options)]
    (println "Hello, World!")))
