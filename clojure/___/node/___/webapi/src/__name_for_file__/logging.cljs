(ns {{{name}}}.logging)

(def winston (js/require "winston"))
(def path (js/require "path"))
(def Logger (-> winston .-Logger))
(def Console (-> winston .-transports .-Console))
(def File (-> winston .-transports .-File))

(def app (Logger.
           #js {"transports" #js [(Console. #js {"colorize" false
                                                 "level" "info"
                                                 "silent" false})
                                  (File. #js {"colorize" false
                                              "level" "info"
                                              "timestamp" true
                                              "filename" (.join path js/__dirname "../log/app.log")
                                              "maxsize" (* 10 1024 1024)
                                              "maxFile" 30
                                              "json" false})]
                "emitErrs" false
                "exitOnError" false}))

(def server (Logger.
           #js {"transports" #js [(Console. #js {"colorize" false
                                                 "level" "verbose"
                                                 "silent" false})
                                  (File. #js {"colorize" false
                                              "level" "verbose"
                                              "timestamp" true
                                              "filename" (.join path js/__dirname "../log/server.log")
                                              "maxsize" (* 10 1024 1024)
                                              "maxFile" 30
                                              "json" false})]
                "emitErrs" false
                "exitOnError" false}))
