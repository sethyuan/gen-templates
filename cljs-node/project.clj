(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :license "{{{license}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-3126"]
                 [org.clojure/tools.cli "0.3.1"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]]
  :plugins [[lein-cljsbuild "1.0.5" :exclusions [org.clojure/clojure]]]
  :cljsbuild {:builds [{:id "dev"
                        :source-paths ["src"]
                        :compiler {:main {{{name}}}.core
                                   :output-to "lib/{{{name}}}.js"
                                   :output-dir "target/dev"
                                   :target :nodejs
                                   :source-map true
                                   :optimizations :none
                                   :pretty-print true}}
                       {:id "release"
                        :source-paths ["src"]
                        :compiler {:main {{{name}}}.core
                                   :output-to "lib/{{{name}}}.js"
                                   :output-dir "target/release"
                                   :target :nodejs
                                   :optimizations :simple
                                   :pretty-print false}}]})
