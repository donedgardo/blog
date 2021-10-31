---
path: /datomic-persistence-implementation-2
date: 2021-10-27T01:22:55.506Z
title: Datomic Persistence Implementation - Queries!
description: Lets implement our datomic persistence queries four our polymorphic interface.
---

👋 Hello there!!

Today we are going to implement our datomic persistence queries `get-game` `get-game-options`.

As a recap here is our Persistence Protocol: 
```clojure
(ns tic-tac-toe-core.persistable)

(defprotocol Persistable
  (get-session-game-options [this  game-id])
  (get-session-game [this game-id])
  (save-game [this game-id game])
  (save-game-options [this game-id options]))
```

We implemented `save-game` and `save-game-options` yesterday and today as I've learned more of datomic
we are implementing the query functions.

Datomic has a few ways to read from the database, two common ones are `pull` and `q`(query) methods.
Initially I tried using `q` method but as I've learned the `pull` method it just clicked for me, 
so we'll see our implementation of our queries using the `pull` method.


As another recap here is our database schema again.
```clojure
(def game-options-schema
  [{:db/ident       :option/play-mode
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc         "Play mode for local, ai, or online mode"}
   {:db/ident       :option/online-mode
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc         "Host or joiner mode"}
   {:db/ident       :option/ai-difficulty
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc         "Difficulty of ai mode, easy or hard"}
   {:db/ident       :option/first-player
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc         "Who goes first player or ai"}])

(def game-schema
  [{:db/ident       :game/uuid
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/one
    :db/unique      :db.unique/identity
    :db/doc         "UUID of game"}
   {:db/ident       :game/options
    :db/valueType   :db.type/ref
    :db/cardinality :db.cardinality/one
    :db/doc         "Game options reference"}
   {:db/ident       :game/board
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/one}
   {:db/ident       :game/winner
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc         "The winner of the game"}
   {:db/ident       :game/over?
    :db/valueType   :db.type/boolean
    :db/cardinality :db.cardinality/one
    :db/doc         "Is the game over?"}
   {:db/ident       :game/active-player
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc         "Player who's turn is active"}
   ])
```

Ok lets look at our queries implementation!

First we need our current database state so here we use `d/db` and pass in our connection as argument to get our db.
Once we have our database state we can query thing to it.
```clojure
let [db (d/db connection)]
```

Next we'll look at the actual query with `pull`:
```clojure
let [serialized-game (d/pull db
                                  [{:game/options
                                    [:option/play-mode
                                     :option/first-player
                                     :option/online-mode
                                     :option/ai-difficulty]}]
                                  [:game/uuid game-id])]
```
Here we query are saying, get me the game options for the game with uuid `game-id` and return the play-mode, first-player,
online-mode and ai-difficulty. The return of this query is a map with the key `:game/options`. After having the options
its just a matter of massaging the db data to conform to the structure the `get-session-game-options` return value.

Ok 1 down, lets work on our  `get-session-game`.

In similar fashion we get the database state, and then our `pull` method:
```clojure
   ...
   serialized-game (d/pull db
                           [:game/board
                            :game/winner
                            :game/over?
                            :game/active-player
                            {:game/options [:option/ai-difficulty]}]
                           [:game/uuid game-id])
          option (:game/options serialized-game)]
   ...
```

Here our query reads, give us the game board, winner, over? active-player and game options difficulty where the game's
uuid is `game-id`. We need the ai-difficulty of the game options, so we can deserialize the game to include the ai move
function. 

Notice how easy it was to traverse between entities thanks to our reference in our game schema to our options schema!

![Nice](../assets/nice-smack.gif)


______
Putting it all together:
```clojure
(deftype DatomicPersistence []
  Persistable
  ...
  (get-session-game-options [_ game-id]
    (let [db (d/db connection)
          serialized-game (d/pull db
                                  [{:game/options
                                    [:option/play-mode
                                     :option/first-player
                                     :option/online-mode
                                     :option/ai-difficulty]}]
                                  [:game/uuid game-id])
          serialized-options (:game/options serialized-game)]
      {:play-mode (:option/play-mode serialized-options)
       :first-player (:option/first-player serialized-options)
       :online-mode (:option/first-player serialized-options)
       :ai-difficulty (:option/ai-difficulty serialized-options)}))

  (get-session-game [_ game-id]
    (let [db (d/db connection)
          serialized-game (d/pull db
                                  [:game/board
                                    :game/winner
                                    :game/over?
                                    :game/active-player
                                   {:game/options [:option/ai-difficulty]}]
                                  [:game/uuid game-id])
          option (:game/options serialized-game)]
      {:board (clojure.edn/read-string (:game/board serialized-game))
       :winner (:game/winner serialized-game)
       :over? (:game/over? serialized-game)
       :active-player (:game/active-player serialized-game)
       :ai-play (get-ai-command (:option/ai-difficulty option))})))
```
_____

Tomorrow we'll look into implementing a new leaderboard feature where players can keep track of their score and rank 
against other players.

Tootles.
❤️

