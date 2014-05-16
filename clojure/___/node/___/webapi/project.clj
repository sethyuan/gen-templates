(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/{{{user.name}}}/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [clj-cav "0.4.0"]
                 [org.bodil/pylon "0.3.0"]
                 [org.clojure/clojurescript "0.0-2202"]]
  :plugins [[lein-cljsbuild "1.0.3"]]
  :hooks [leiningen.cljsbuild]
  :cljsbuild {:builds [{:source-paths ["src"]
                        :compiler {:output-to "lib/main.js"
                                   :optimizations :simple
                                   :target :nodejs
                                   :closure-warnings {:externs-validation :off
                                                      :non-standard-jsdoc :off}
                                   :pretty-print false}}]})
