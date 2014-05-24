(ns {{{name}}}.core
  (:require [compojure.core :refer [defroutes GET POST PUT DELETE HEAD ANY]]
            [compojure.route :as route]
            [compojure.handler :as handler]
            [org.httpkit.server :as httpkit]
            [ring.middleware.reload :as reload]
            [{{{name}}}.config :refer [config]]
            [{{{name}}}.routes :as routes])
  (:gen-class))

(defroutes main-routes
  (GET "/" [] routes/index)
  (GET "/faq" [] routes/faq)
  (route/not-found "Not Found"))

(def all-routes (handler/api main-routes))

(defn -main [& args]
  (httpkit/run-server (if (System/getenv "DEV")
                        (reload/wrap-reload all-routes)
                        all-routes)
                      {:port (:port config)})
  (println "Server listening on" (:port config)))
