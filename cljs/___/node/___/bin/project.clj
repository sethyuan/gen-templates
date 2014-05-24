(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/{{{user.name}}}/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2202"]
                 [clj-cav "0.4.0"]
                 [org.bodil/pylon "0.3.0"]]
  :plugins [[lein-cljsbuild "1.0.3"]
            [com.cemerick/clojurescript.test "0.3.0"]]
  :cljsbuild {:builds [{:id "{{{name}}}"
                        :source-paths ["src"]
                        :compiler {:output-to "bin/{{{name}}}.js"
                                   :output-dir "target/{{{name}}}-out"
                                   :source-map "bin/{{{name}}}.js.map"
                                   :optimizations :none
                                   :target :nodejs
                                   :pretty-print true}}
                       {:id "{{{name}}}-release"
                        :source-paths ["src"]
                        :compiler {:output-to "bin/{{{name}}}.js"
                                   :output-dir "bin/{{{name}}}-out"
                                   :source-map "bin/{{{name}}}.js.map"
                                   :optimizations :simple
                                   :target :nodejs
                                   :pretty-print false}}
                       {:id "{{{name}}}-test"
                        :source-paths ["src" "test"]
                        :compiler {:output-to "test/{{{name}}}-test.js"
                                   :output-dir "test/{{{name}}}-out"
                                   :source-map "test/{{{name}}}.js.map"
                                   :optimizations :simple
                                   :target :nodejs
                                   :pretty-print true}}]
              :test-commands {"unit-tests" ["node" "test/node_runner.js"
                                            "test/{{{name}}}-test.js"]}})
