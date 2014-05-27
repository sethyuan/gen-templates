(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/core.match "0.2.1"]
                 [org.clojure/core.async "0.1.303.0-886421-alpha"]
                 [clj-cav "0.4.0"]]
  :profiles {:dev {:dependencies [[org.clojure/clojurescript "0.0-2202"]]
                   :plugins [[lein-cljsbuild "1.0.3"]]}}
  :cljsbuild {:builds [{:id "{{{name}}}"
                        :source-paths ["src"]
                        :compiler {:output-to "target/{{{name}}}.js"
                                   :output-dir "target/{{{name}}}-out"
                                   :source-map "target/{{{name}}}.js.map"
                                   :optimizations :none
                                   :pretty-print true}}
                       {:id "{{{name}}}-release"
                        :source-paths ["src"]
                        :compiler {:output-to "target/{{{name}}}.js"
                                   :output-dir "target/{{{name}}}-release-out"
                                   :optimizations :advanced
                                   :pretty-print false}}]})
