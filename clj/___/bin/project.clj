(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :license {:name "MIT"}
  :global-vars {*warn-on-reflection* true
                *unchecked-math* true}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/tools.cli "0.3.1"]]
  :profiles {:uberjar {:aot :all
                       :omit-source true}}
  :main ^:skip-aot {{{name}}}.core
  :target-path "target/%s")
