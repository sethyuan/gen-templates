(defproject {{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/core.match "0.2.1"]
                 [org.clojure/core.async "0.1.303.0-886421-alpha"]
                 [clj-cav "0.4.0"]]
  :profiles {:dev {:dependencies [[org.clojure/tools.trace "0.7.8"]
                                  [org.clojure/clojurescript "0.0-2202"]]}}
  :plugins [[com.keminglabs/cljx "0.3.2"]
            [lein-cljsbuild "1.0.3"]
            [com.cemerick/clojurescript.test "0.3.0"]
            [codox "0.8.9"]]
  :codox {:language :clojure
          :src-dir-uri "https://github.com/sethyuan/{{{name}}}/blob/master/"
          :src-linenum-anchor-prefix "L"
          :src-uri-mapping {#"target/classes" #(str "src/" % "x")}}
  :cljx {:builds [{:source-paths ["src-cljx"]
                   :output-path "target/classes"
                   :rules :clj}
                  {:source-paths ["src-cljx"]
                   :output-path "target/classes"
                   :rules :cljs}
                  {:source-paths ["test"]
                   :output-path "test"
                   :rules :clj}
                  {:source-paths ["test"]
                   :output-path "target/test"
                   :rules :cljs}]} 
  :cljsbuild {:builds [{:id "{{{name}}}-test"
                        :source-paths ["target/classes" "target/test"]
                        :compiler {:output-to "target/{{{name}}}-test.js"
                                   :output-dir "target/{{{name}}}-out"
                                   :source-map "target/{{{name}}}.js.map"
                                   :optimizations :simple
                                   :target :nodejs
                                   :pretty-print true}}]
              :test-commands {"unit-tests" ["node" "test/node_runner.js"
                                            "target/{{{name}}}-test.js"]}} 
  :aliases {"test!" ["do" ["cljx"] ["test"]]}
  :jvm-opts ^:replace [])
