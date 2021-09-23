---
path: /tic-tac-toe-pvp-ui-3
date: 2021-09-20T01:22:55.506Z
title: Tic-Tac-Toe - Player vs Player UX/UI Part Deux
---

👋!!

Picking up from yesterday, we where adding test to our player vs player UI expereince.
I've notice we wanted to add the feature to allow the joining player just to click a link to join a game rather than go
the app and click few buttons and pasting some inputs.

Fort this feature we needed some client side routing so I had a lot of research to do on how to go about it.
I've stumbled upon a lot of templates and solutions with different pacakges. Most of them where for server side rendering and 
required a bit of dependencies, different project stucture, and or where server side applications.

I've landed on `secretary` as it was easy to setup, boilerplate code was minimum and dependencies where very few.
A big win with a secretary is keeping the app client side. I really would like to avoid a server and save a tree or two.

**Implementation:**
```clojure
(ns ^:figwheel-hooks tic-tac-toe-web.core
  (:require
    [tic-tac-toe-web.pages :refer [home-page join-game-page]]
    [tic-tac-toe-web.create-game :refer [create-game]]
    [secretary.core :as secretary :include-macros true]
    [accountant.core :as accountant]
    [goog.dom :as gdom]
    [goog.events :as events]
    [reagent.core :as reagent :refer [atom]]
    [reagent.dom :as rdom])
  (:import [goog History]
           [goog.History EventType]))

(def selected-page (atom join-game-page))

(defn page []
  [@selected-page])

;; -------------------------
;; History
;; must be called after routes have been defined

(defn hook-browser-navigation! []
  (doto (History.)
    (events/listen EventType.NAVIGATE #(secretary/dispatch! (.-token %)))
    (.setEnabled true)))


;; -------------------------
;; Routes

(defn app-routes []
  (hook-browser-navigation!)
  (secretary/set-config! :prefix "#")
  (secretary/defroute "/" []
                      (reset! selected-page home-page))
  (secretary/defroute "/join-game/:address/:room-name" [address room-name]
                      (reset! selected-page #(join-game-page address room-name))))

;; -------------------------
;; Initialize app

(defn mount-root []
  (rdom/render [page] (.getElementById js/document "app")))

(defn init! []
  (accountant/configure-navigation!
    {:nav-handler
     (fn [path]
       (secretary/dispatch! path))
     :path-exists?
     (fn [path]
       (secretary/locate-route path))})
  (accountant/dispatch-current!)
  (mount-root))


(defn ^:export main []
  (app-routes)
  (init!))

(main)

;; specify reload hook with ^;after-load metadata
(defn ^:after-load on-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
  )
```

Story To implement now
* After a player who navigates the link the hosting player shares, they should able to see the loading the game. 

Test
```clojure
(deftest join-game-test
  (testing "It should loading screen when joining game"
    (with-mounted-component
      [join-game 1 2]
      (fn [component]
        (is
          (label-component-in-dom? component "join-room-loading"))))))
```

Implementation code
```clojure
(defn join-game [peer-address room-id]
  (let [network-state (atom {:node nil :peer-ids [] :opponent nil})
    (fn []
      [:div
         [:p {:aria-label "join-room-loading"} "Joining Room..."])])))
```

Alright that's routing and rooms ui, next we'll start with the fun part, making the game playable over the network.

<3!


