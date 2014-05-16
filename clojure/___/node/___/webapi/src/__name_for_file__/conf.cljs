(ns {{{name}}}.conf
  (:require [cljs.reader :as edn]))

(def fs (js/require "fs"))
(def path (js/require "path"))

(def conf (->> (.readFileSync fs (.join path js/__dirname "../config/site.edn") "utf8")
               (edn/read-string)))
