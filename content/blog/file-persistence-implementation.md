---
path: /file-persistence-implementation
date: 2021-10-25T01:22:55.506Z
title: Polymorphic Interface File Persistence Implementation
description: Lets implement our file persistence using our polymorphic interface.
---

👋 Hello there!!

Today we are going to implement our file persistence using our polymorphic interface.

This is our protocol that we defined in our tic-tac-toe core module:
```clojure
(ns tic-tac-toe-core.persistable)

(defprotocol Persistable
  (get-session-game-options [this  game-id])
  (get-session-game [this game-id])
  (save-game [this game-id game])
  (save-game-options [this game-id options]))
```

Now lets refactor our file persistence to use this abstraction:

```clojure
(deftype FilePersistence []
  Persistable
  (get-session-game-options [_ game-id]
    (let [game (get @sessions game-id)]
      (:options game)))
  (get-session-game [_ game-id]
    (:game (get @sessions game-id)))
  (save-game-options [_ game-id options]
    (let [new-game {:options options :game nil}]
      (do
        (swap! sessions assoc game-id new-game)
        (save-sessions @sessions))))
  (save-game [this game-id game]
    (let [options (p/get-session-game-options this game-id)
          new-game {:options options :game game}]
      (do
        (swap! sessions assoc game-id new-game)
        (save-sessions @sessions)))))
```

Now we have a FilePersistence class lets start using it higher up in our game rules module, and by using it I mean only
using the interface, our game rules module will not depend on the FilePersistence implementation. The FilePersistence 
should be a lower level module since its closer to our input and outputs. 

We want to be able to create our game and pass in the implementation of our persistence layer.

Let's look at our current game-factory:
```clojure
(defn create-game-factory
  ([] new-game)
  ([options]
  (let [{:keys [ai-difficulty first-player]} options
        ai-play (get-ai-command ai-difficulty)
        game (if (not (= "ai" first-player))
               new-game
               (play new-game (ai-play new-game)))]
    (assoc game :ai-play ai-play))))
```

Let's add some runtime polymorphism to our create-game-factory so when we pass in the persistence implementation
we then persist the game on creation. 

```clojure
(defn get-game-with-ai [options]
  (let [{:keys [ai-difficulty first-player]} options
        ai-play (get-ai-command ai-difficulty)
        game (if (or (not (= "ai" first-player)) (nil? ai-play))
               new-game
               (play new-game (ai-play new-game)))]
    (assoc game :ai-play ai-play)))

(defn create-game-factory
  ([] new-game)
  ([options] (get-game-with-ai options))
  ([options {:keys [persistence id]}]
   (let [game (assoc (get-game-with-ai options) :persistence persistence :id id)]
     (do
       (.save-game-options persistence id options)
       (.save-game persistence id game)
       game))))
```

In order to remove duplication of code we create the `get-game-with-ai` so we can reuse it in more than one of our
runtime polymorphic signatures of `create-game-factory`. To save the game we just call the methods we defined in our 
`Persistable` interface! Notice that our game factory doesn't know or care about the implementation. This is key for 
the Dependency Inversion principle!

So now we persist on creation, but we also want to persist also when we play the game!

Let's do something similar to our `play` function.

Our current play implementation:
```clojure
(defn play [game index]
  (let [{:keys [board active-player ai-play]} game
        new-board (assoc board index active-player)
        new-game (assoc game :board new-board)
        opponent (get-opponent active-player)]
    (cond
      (invalid-move? game index)
      game
      (game-has-wining-play? new-board active-player)
      (assoc new-game :winner active-player :over? true)
      (board-full? new-board)
      (assoc new-game :over? true)
      (nil? ai-play)
      (assoc new-game :active-player opponent)
      :else
      (let [ai-disabled-game (assoc new-game :ai-play nil :active-player opponent)
            ai-move (ai-play ai-disabled-game)
            game-after-ai (play ai-disabled-game ai-move)]
        (assoc game-after-ai :ai-play ai-play)))))
```
Our new play implementation:
```clojure
(defn get-new-game-state [game index]
  (let [{:keys [board active-player ai-play]} game
        new-board (assoc board index active-player)
        new-game (assoc game :board new-board)
        opponent (get-opponent active-player)]
    (cond
      (invalid-move? game index)
      game
      (game-has-wining-play? new-board active-player)
      (assoc new-game :winner active-player :over? true)
      (board-full? new-board)
      (assoc new-game :over? true)
      (nil? ai-play)
      (assoc new-game :active-player opponent)
      :else
      (let [ai-disabled-game (assoc new-game :ai-play nil :active-player opponent)
            ai-move (ai-play ai-disabled-game)
            game-after-ai (get-new-game-state ai-disabled-game ai-move)]
        (assoc game-after-ai :ai-play ai-play)))))

(defn play
  ([game index]
   (get-new-game-state game index))
  ([game index {:keys [persistence id]}]
   (let [game-state (get-new-game-state game index)]
     (do
       (.save-game persistence id game-state)
       game-state))))
```

Same as above we refactor to avoid duplication, and we have a new signature of the play method to accept the persistence
implementation and call `save-game` each time we use the `play` function.

So this works, but I don't like the idea that I have to pass the persistence argument to both the `play` and the 
`create-game-factory` function.

_____

Tomorrow we'll look into implementing a new implementation of our persistence with a database called datomic instead and
moving our play function to be part of the game using object oriented pattern with `defrecord`.

❤️

