(defproject {{{name}}} "0.1.0-SNAPSHOT"
  :description "{{{desc}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/core.match "0.2.1"]
                 [org.clojure/core.async "0.1.278.0-76b25b-alpha"]
                 [clj-cav "0.1.0"]]
  :profiles {:dev {:global-vars {*warn-on-reflection* true}
                   :dependencies [[org.clojure/tools.trace "0.7.6"]]
                   :plugins [[com.keminglabs/cljx "0.3.2"]]
                   :hooks [cljx.hooks]}}
  :cljx {:builds [{:source-paths ["src-cljx"]
                   :output-path "target/classes"
                   :rules :clj}
                  {:source-paths ["src-cljx"]
                   :output-path "target/classes"
                   :rules :cljs}]} 
  ;; :jvm-opts ^:replace []
  )
