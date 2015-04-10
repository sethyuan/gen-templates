(ns {{{name}}}.core
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [cljs.nodejs :as nodejs]
            [clojure.string :as string]
            [cljs.tools.cli :refer [parse-opts]]
            [cljs.core.async :refer [chan <! >!]]))

(nodejs/enable-util-print!)

(defn usage [summary]
  (->> ["Usage: {{{name}}} bundle [output]"
        "       {{{name}}} options"
        ""
        "Options:"
        summary]
       (string/join \newline)))

(defn print-version []
  (print (str "{{{name}}} v" (.-version (js/require "../package.json")))))

(defn -main [& argv]
  (let [{:keys [options arguments summary]}
        (parse-opts argv [["-V" "--version" "Version number"]
                          ["-h" "--help"]])]
    (cond
      (:version options) (print-version)
      :else (print (usage summary)))))

(set! *main-cli-fn* -main)
