(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/core.match "0.2.1"]
                 [org.clojure/core.async "0.1.303.0-886421-alpha"]
                 [clj-cav "0.4.0"]]
  :profiles {:dev {:dependencies [[org.clojure/tools.trace "0.7.8"]
                                  [org.clojure/clojurescript "0.0-2202"]]
                   :plugins [[lein-cljsbuild "1.0.3"]
                             [com.cemerick/clojurescript.test "0.3.0"]]}}
  :cljsbuild {:builds [{:id "{{{name}}}-test"
                        :source-paths ["src" "test"]
                        :compiler {:output-to "target/{{{name}}}-test.js"
                                   :output-dir "target/{{{name}}}-out"
                                   :source-map "target/{{{name}}}.js.map"
                                   :optimizations :simple
                                   :target :nodejs
                                   :pretty-print true}}]
              :test-commands {"unit-tests" ["node" "test/node_runner.js"
                                            "target/{{{name}}}-test.js"]}} 
  :jvm-opts ^:replace [])
