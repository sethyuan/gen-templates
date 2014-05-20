(ns {{{name}}}.core-test
  (:require [{{{name}}}.core]
            #+clj [clojure.test :refer :all]
            #+cljs [cemerick.cljs.test])
  #+cljs (:require-macros [cemerick.cljs.test :refer [is deftest testing with-test]]))

(deftest a-test
  (testing "FIXME, I fail."
    (is (= 0 1))))
