---
path: /leaderboard-feature-file
date: 2021-11-02T01:22:55.506Z
title: Tic-tac-toe Leaderboards - Datomic Implementation
description: Lets implement a Leaderboard feature to our tic-tac-toe game using our datomic persistence.
---


👋 Well hello there!

Today we'll look at adding our leaderboard feature using our datomic persistence storage.

Lets start with some failing test:

```clojure
(def winner-username "winner")
(def looser-username "looser")
(def players [winner-username looser-username])

(def game-persistence (DatomicPersistence.))
(def datomic-persistence-options {:persistence game-persistence :id "test-id"})

(defn reset-datomic-test []
  (doall (map #(set-user-score % 0.0) players)))

(describe
    "with Datomic Persistence"
    (before
      (do
        (reset-datomic-test)
        (-> (create-game-factory
              {:play-mode (:local play-modes)}
              (assoc datomic-persistence-options :players players))
            (play [0 0] datomic-persistence-options)
            (play [1 1] datomic-persistence-options)
            (play [1 0] datomic-persistence-options)
            (play [2 2] datomic-persistence-options)
            (play [2 0] datomic-persistence-options))))
    (it "should return top players after winner wins"
      (should= [[winner-username 1.0] [looser-username -1.0]]
               (.top-players game-persistence 10)))
    (it "should return top players after cats game"
      (should= [[winner-username 1.5] [looser-username -0.5]]
               (do
                 (-> (create-game-factory
                       {:play-mode (:local play-modes)}
                       (assoc datomic-persistence-options :players players))
                     (play [2 1] datomic-persistence-options)
                     (play [0 1] datomic-persistence-options)
                     (play [0 0] datomic-persistence-options)
                     (play [1 1] datomic-persistence-options)
                     (play [0 2] datomic-persistence-options)
                     (play [1 2] datomic-persistence-options)
                     (play [1 0] datomic-persistence-options)
                     (play [2 0] datomic-persistence-options)
                     (play [2 2] datomic-persistence-options))
                 (.top-players game-persistence 10)))))
```

As last time here I'm testing that when a player wins he gets 1 points and on loss they loose one point, and on a cats game 
we give each player 0.5 points.

We did most of the core work on our last blog and today we will implement the missing methods of our updated protocol:
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

Now our play function handles recording wins, losses and ties but our implementations haven't been written yet.


Here is our new schema:
```clojure
(def leaderboard-schema
  [{:db/ident       :leaderboard/username
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/one
    :db/unique      :db.unique/identity
    :db/doc         "Player username"}
   {:db/ident       :leaderboard/score
    :db/valueType   :db.type/float
    :db/cardinality :db.cardinality/one
    :db/doc         "Score for player"}])
```

To finally make our test pass we write our new protocol method implementations:

```clojure
(defn get-current-score [db username]
  (or
    (second
      (first
        (d/pull
          db
          [:leaderboard/score]
          [:leaderboard/username username]))) 0))

(defn set-user-score [username score]
  (d/transact
    connection
    {:tx-data [{:leaderboard/username username
                :leaderboard/score    score}]}))
(deftype DatomicPersistence []
  Persistable
  ...
  (top-players [this limit]
    (let [db (d/db connection)]
      (->> (d/q '[:find ?username ?score
                  :where [?e :leaderboard/score ?score]
                         [?e :leaderboard/username ?username]]
                db)
           (sort-by second)
           (reverse)
           (take limit))))

  (record-win [this game]
    (let [db (d/db connection)
          winner (:winner-username game)
          looser (first (filter #(not (= %1 winner)) (:players game)))
          winner-current-score (get-current-score db winner)
          looser-current-score (get-current-score db looser)]
      (do
        (set-user-score winner (add-winning-points winner-current-score))
        (set-user-score looser (add-loosing-points looser-current-score)))))

  (record-tie [this game]
    (let [db (d/db connection)
          players (:players game)
          first-player (first players)
          second-player (second players)
          first-current-score (get-current-score db first-player)
          second-current-score (get-current-score db second-player)]
      (do
        (set-user-score first-player (add-tie-points first-current-score))
        (set-user-score second-player (add-tie-points second-current-score))))))
```


With this new implementation now are test pass!
_____

Cheers.
❤️

