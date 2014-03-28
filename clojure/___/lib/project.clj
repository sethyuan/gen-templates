(defproject {{{name}}} "0.1.0-SNAPSHOT"
  :description "{{{desc}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :license {:name "The MIT License"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/core.match "0.2.1"]]
  :profiles {:dev {:global-vars {*warn-on-reflection* true}
                   :dependencies [[org.clojure/tools.trace "0.7.6"]]}}
  ;; :jvm-opts ^:replace []
  )
