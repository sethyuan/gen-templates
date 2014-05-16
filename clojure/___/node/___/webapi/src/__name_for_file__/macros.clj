(ns {{{name}}}.macros)

(defmacro deflogs
  "Generate log functions: info, verbose, warn, error, debug."
  [logger]
  `(do
     (def ~'info (partial (.bind (.-log ~logger) ~logger) "info"))
     (def ~'verbose (partial (.bind (.-log ~logger) ~logger) "verbose"))
     (def ~'warn (partial (.bind (.-log ~logger) ~logger) "warn"))
     (def ~'error (partial (.bind (.-log ~logger) ~logger) "error"))
     (def ~'debug (partial (.bind (.-log ~logger) ~logger) "debug"))))
