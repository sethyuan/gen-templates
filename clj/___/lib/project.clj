(defproject cav/{{{name}}} "0.1.0"
  :description "{{{desc}}}"
  :url "https://github.com/sethyuan/{{{name}}}"
  :license {:name "MIT"}
  :dependencies [[org.clojure/clojure "1.6.0"]]
  :global-vars {*warn-on-reflection* true}
  :target-path "target/%s"
  :profiles {:jar {:aot :all}}
  :jvm-opts ^:replace []
  :plugins [[codox "0.8.10"]]
  :codox {:language :clojure
          :src-dir-uri "https://github.com/sethyuan/{{{name}}}/blob/master/"
          :src-linenum-anchor-prefix "L"})
