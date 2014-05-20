(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/{{{user.name}}}/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2202"]
                 [clj-cav "0.4.0"]
                 [org.bodil/pylon "0.3.0"]]
  :plugins [[lein-cljsbuild "1.0.3"]]
  :cljsbuild {:builds [{:id "{{{name}}}"
                        :source-paths ["src"]
                        :compiler {:output-to "lib/{{{name}}}.js"
                                   :output-dir "target/{{{name}}}-out"
                                   :source-map "lib/{{{name}}}.js.map"
                                   :optimizations :none
                                   :target :nodejs
                                   :closure-warnings {:externs-validation :off
                                                      :non-standard-jsdoc :off}
                                   :pretty-print true}}
                       {:id "{{{name}}}-release"
                        :source-paths ["src"]
                        :compiler {:output-to "lib/{{{name}}}.js"
                                   :output-dir "lib/{{{name}}}-out"
                                   :source-map "lib/{{{name}}}.js.map"
                                   :optimizations :simple
                                   :closure-warnings {:externs-validation :off
                                                      :non-standard-jsdoc :off}
                                   :pretty-print false}}]})
