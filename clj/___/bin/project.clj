(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/core.match "0.2.1"]
                 [org.clojure/core.async "0.1.303.0-886421-alpha"]
                 [clj-cav "0.4.0"]]
  :profiles {:dev {:dependencies [[org.clojure/tools.trace "0.7.8"]]}
             :uberjar {:aot :all}}
  :main ^:skip-aot {{{name}}}.core
  :target-path "target/%s"
  :jvm-opts ^:replace [])
