(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/{{{user.name}}}/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2173"]
                 [org.bodil/pylon "0.3.0"]]
  :plugins [[lein-cljsbuild "1.0.2"]]
  :hooks [leiningen.cljsbuild]
  :cljsbuild {:builds [{:source-paths ["src"]
                        :compiler {:output-to "lib/{{{name}}}.js"
                                   :optimizations :simple
                                   :pretty-print true}}
                       {:id "release"
                        :source-paths ["src"]
                        :compiler {:output-to "lib/{{{name}}}.js"
                                   :optimizations :simple
                                   :pretty-print false}}]})
