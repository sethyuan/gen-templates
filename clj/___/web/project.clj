(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/core.match "0.2.1"]
                 [org.clojure/core.async "0.1.303.0-886421-alpha"]
                 [cav/cljcav "0.1.1"] 
                 [ring/ring-core "1.2.2"]
                 [ring/ring-jetty-adapter "1.2.2"]
                 [ring/ring-devel "1.2.2"]
                 [compojure "1.1.6"]
                 [http-kit "2.1.16"]
                 [cheshire "5.3.1"]]
  :global-vars  {*warn-on-reflection* true}
  :main ^:skip-aot {{{name}}}.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
