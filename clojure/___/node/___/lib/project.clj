(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/{{{user.name}}}/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2173"]]
  :plugins [[lein-cljsbuild "1.0.2"]]
  :hooks [leiningen.cljsbuild]
  :source-paths ["src/clj"]
  :cljsbuild {:builds [{:source-paths ["src/cljs"]
                        :compiler {:output-to "lib/{{{name}}}.js"
                                   :optimizations :simple
                                   :pretty-print true}}
                       {:id "release"
                        :source-paths ["src/cljs"]
                        :compiler {:output-to "lib/{{{name}}}.js"
                                   :optimizations :advanced
                                   :pretty-print false}}]})
