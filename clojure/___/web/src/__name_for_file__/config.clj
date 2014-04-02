(ns {{{name}}}.config
  (:require [clojure.edn :as edn]
            [clojure.java.io :as io]))

(defonce config
  (merge {:port 8090}
         (let [file (io/file "config.edn")]
           (when (.exists file)
             (edn/read-string (slurp file))))))
