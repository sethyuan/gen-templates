(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [cav/core "0.1.0"]]
  :profiles {:uberjar {:aot :all}}
  :main ^:skip-aot {{{name}}}.core
  :target-path "target/%s")
