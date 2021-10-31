---
path: /datomic-persistence-implementation
date: 2021-10-26T01:22:55.506Z
title: Polymorphic Interface Datomic Persistence Implementation
description: Lets implement our datomic persistence using our polymorphic interface.
---

👋 Hello there!!

Today we are going to implement our datomic persistence using our polymorphic interface.

Here again is our protocol that we defined in our tic-tac-toe core module that we now need 
datomic implementations:
```clojure
(ns tic-tac-toe-core.persistable)

(defprotocol Persistable
  (get-session-game-options [this  game-id])
  (get-session-game [this game-id])
  (save-game [this game-id game])
  (save-game-options [this game-id options]))
```

Let's start with the save methods and get some data in our database!
But before we do we need create a connection and a database.

```clojure
(def client (d/client {:server-type :dev-local
                       :system      "tic-tac-toe"}))
(d/create-database client {:db-name "games"})
(def connection (d/connect client {:db-name "games"}))
```

Easy enough! Now before we get to the implementation we actually need a schema. What I loved about datomic is that 
usually the database defines the schema, but in datomic the application define its! 

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

(d/transact connection {:tx-data game-options-schema})

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

(d/transact connection {:tx-data game-schema})
```
Here we don't only create the schema, but we also `transact` the schema with our datomic db!
Something peculiar is that we can have references to other entities and that's what I did here. 
Our games schema has a entity reference in its options attribute referencing the game options entities.
This will come in handy when we query our data.

Pretty awesome, it reminds me of [mongoose](https://mongoosejs.com/docs/) schema generation for the MongoDB. That was nice!


Alright it's time to implement our save implementations:

A key takeaway from this process was that datomic doesn't accept nil as database values, it either has a value, or the
attribute is not present. So my game and game options maps core schema had some nil posible values. So instead of
having a messy if/else chains to check for nil and setting or not setting the attribute in the db we are using this
helper function to remove nil attributes from our map:

```clojure 
(defn remove-nil [map]
  (into {} (remove (comp nil? second) map)))
```

This is how our save function ended up looking like:

```clojure
(deftype DatomicPersistence []
  Persistable
  (save-game [_ game-id game]
    (d/transact
      connection
      {:tx-data
       [(remove-nil {:db/id              game-id
                     :game/uuid          game-id
                     :game/board         (str (:board game))
                     :game/winner        (:winner game)
                     :game/over?         (:over? game)
                     :game/active-player (:active-player game)})]}))

  (save-game-options [_ game-id options]
    (d/transact
      connection
      {:tx-data [{:db/id        game-id
                  :game/uuid    game-id
                  :game/options (remove-nil
                                  {:db/id                game-id
                                   :option/play-mode     (:play-mode options)
                                   :option/first-player  (:first-player options)
                                   :option/online-mode   (:online-mode options)
                                   :option/ai-difficulty (:ai-difficulty options)})}]})))

```

Now we saved our game and game options in the datomic database 🎉!

_____

Alright we're almost there, tomorrow we'll look into implementing the query functions which ended being a bit hard for 
me to finally get as I learned more of the datomic library and its idioms. 

❤️

