---
path: /leaderboard-feature-file
date: 2021-11-01T01:22:55.506Z
title: Tic-tac-toe Leaderboards Interface Implementation!
description: Lets implement a Leaderboard feature to our tic-tac-toe game using our file persistence.
---

👋 Well hello there!

Today we'll look at adding our leaderboard feature using our file persistence storage.
First lets add some failing test:

```clojure
(ns tic-tac-toe-leaderboard.core-spec
  (:require [speclj.core :refer :all]
            [tic-tac-toe-server.file_persistence :refer [reset-db]]
            [tic-tac-toe-core.constants :refer [play-modes ai-difficulties]]
            [tic-tac-toe-core.rules :refer [play]]
            [tic-tac-toe-core.core :refer [create-game-factory]])
  (:import (tic_tac_toe_server.file_persistence FilePersistence)))

(def game-persistence (FilePersistence. "test"))
(def persistence-options {:persistence game-persistence :id "test-id"})

(describe
  "Leaderboard"
  (describe
    "with File Persistence"
    (before (let []
              (do
                (reset-db)
                (-> (create-game-factory
                      {:play-mode (:local play-modes)}
                      (assoc persistence-options :players ["winner" "looser"]))
                    (play [0 0] persistence-options)
                    (play [1 1] persistence-options)
                    (play [1 0] persistence-options)
                    (play [2 2] persistence-options)
                    (play [2 0] persistence-options)))))
    (it "should return top players after winner wins"
      (should= [["winner" 1] ["looser" -1]]
               (.top-players game-persistence 10)))
    (it "should return top players after cats game"
      (should= [["winner" 1.5] ["looser" -0.5]]
               (do
                 (-> (create-game-factory
                       {:play-mode (:local play-modes)}
                       (assoc persistence-options :players ["winner" "looser"]))
                     (play [2 1] persistence-options)
                     (play [0 1] persistence-options)
                     (play [0 0] persistence-options)
                     (play [1 1] persistence-options)
                     (play [0 2] persistence-options)
                     (play [1 2] persistence-options)
                     (play [1 0] persistence-options)
                     (play [2 0] persistence-options)
                     (play [2 2] persistence-options))
                 (.top-players game-persistence 10))))
    ))
```

Here I'm testing that when a player wins he gets 1 points and on loss they loose one point, and on a cats game 
we give each player 0.5 points.

What's new is the `top-players` method from our persistence protocol.

`top-players` is only to get the information but instead of querying the database and looking for game state of winners,
losers, cats games I rather have a separate data collection to manage the leaderboard, and update when we detect a win, 
loss or draw. To manage this we will create a `record-win` and `record-tie` methods on our persistence protocol, and we'll
use them on our rules module. Since this is an interface our rules don't know anything about the details of these new methods
they just know it exists.

This is our updated protocol:
```clojure
(ns tic-tac-toe-core.persistable)


(defprotocol Persistable
  (get-session-game-options [this  game-id])
  (get-session-game [this game-id])
  (save-game [this game-id game])
  (save-game-options [this game-id options])
  (top-players [this limit])
  (record-win [this game])
  (record-tie [this game]))
```

This how our business rules uses it on the `play` function.

```clojure
(defn get-new-game-state
  ([{:keys [game index persistence]}]
   (let [{:keys [board active-player ai-play players]} game
         new-board (assoc board index active-player)
         new-game (assoc game :board new-board)
         opponent (get-opponent active-player)]
     (cond
       (invalid-move? game index)
       game
       (game-has-wining-play? new-board active-player)
       (let [win-game-state
             (assoc new-game
               :winner active-player
               :over? true
               :winner-username (get-active-player-username players board))]
         (do
           (if (not (nil? persistence))
             (.record-win persistence win-game-state))
           win-game-state))
       (board-full? new-board)
       (let [tie-game-state (assoc new-game :over? true)]
         (do
           (if (not (nil? persistence))
             (.record-tie persistence tie-game-state))
           tie-game-state))
       (nil? ai-play)
       (assoc new-game :active-player opponent)
       :else
       (let [ai-disabled-game (assoc new-game :ai-play nil :active-player opponent)
             ai-move (ai-play ai-disabled-game)
             game-after-ai (get-new-game-state
                             {:game     ai-disabled-game
                              :index    ai-move
                              :username (:ai play-modes)})]
         (assoc game-after-ai :ai-play ai-play))))))
```

Now our play function handles recording wins, losses and ties but our implementations haven't been written yet.

To finally make our test pass we write our new protocol method implementations:

```clojrue
(def leaderboard (atom {}))
(deftype FilePersistence [file-suffix]
  Persistable
  ...
  (top-players [this limit]
    (->> (seq @leaderboard)
         (sort-by second)
         (reverse)
         (take limit)))
  (record-win [this game]
    (let [winner (:winner-username game)
          looser (first (filter #(not (= %1 winner)) (:players game)))
          winner-current-score (or (get @leaderboard winner) 0)
          looser-current-score (or (get @leaderboard looser) 0)]
      (do
        (swap! leaderboard assoc winner (add-winning-points winner-current-score))
        (swap! leaderboard assoc looser (add-loosing-points looser-current-score))
        (save-leaderboard-file @leaderboard file-suffix))))
  (record-tie [this game]
    (let [first-player (first (:players game))
          second-player (second (:players game))
          first-current-score (or (get @leaderboard first-player) 0)
          second-current-score (or (get @leaderboard second-player) 0)]
      (do
        (swap! leaderboard assoc first-player (add-tie-points first-current-score))
        (swap! leaderboard assoc second-player (add-tie-points second-current-score))
        (save-leaderboard-file @leaderboard file-suffix)))))
```
Gotta love how the syntax for transducers come to play in our `top-players` function.

Our adding/subtracting points rules are business rules, so they are located in our core module.
```clojure
(ns tic-tac-toe-core.leaderboard)

(defn add-tie-points [current-score]
  (+ current-score 0.5))

(defn add-winning-points [current-score]
  (inc current-score))

(defn add-loosing-points [current-score]
  (dec current-score))
```

With this implementation now are test pass!
_____

Next we'll look into implementing our leaderboard feature using by implementing the new methods but for our datomic 
implementation.

Cheers.
❤️

