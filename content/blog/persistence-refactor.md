---
path: /persistence-refactor
date: 2021-10-21T01:22:55.506Z
title: Persistence Refactoring - Polymorphic Interface
description: Lets look into applying some Dependency Inversion Principle to our persistence feature in tic-tac-toe.
---

👋 Hello there!!

Today we are going to improve our code by applying some Solid Principles.

Let's take a look at our current code:
```clojure
(ns tic-tac-toe-server.render
  (:require [tic-tac-toe-server.sessions :refer [set-cookies set-game-options set-game]]))
...
(defn send-game-response [handler request out game-session]
  (do
    (set-cookies request handler)
    (set-game-options request (:options game-session))
    (set-game request (:game game-session))
    (set-html-game-body handler game-session)
    (.send handler out)))
```
In the code above the `send-game-response` is responsible to generating the html for the game and sending the response.
But instead, its doing a lot of things: its setting cookies, its persisting the game options and game, and its also 
generating and sending the html. Here we are violating the Single Responsibility principle. 

The fact that we are persisting the game on the output html logic, is rather odd. 
Once we want to add persistence to another output we would need to repeat all of this.

So to clean this up we move the `set-cookie` closer to our main, and we move all our persistence logic closer to our
entities/business rules modules.

```clojure
(ns tic-tac-toe-server.render
  (:require [tic-tac-toe-server.sessions :refer [set-cookies set-game-options set-game]]))
...
(defn send-game-response [handler request out game-session]
  (do
    (set-html-game-body handler game-session)
    (.send handler out)))
```

If you noticed our persistence game and options function signature depended on request. We'll have to fix that if we want to move 
that up closer to our business rules layers. We would like that the persistence would only require the id of the game, 
and the data to be saved. 

From: 
```clojure
(defn set-game [request game]
  (let [session-id (get-session-id request)
        options (get-session-game-options request)]
    (do
      (swap! sessions assoc session-id {:options options :game game})
      (save-sessions @sessions))))

(defn set-game-options [request options]
  (let [session-id (get-session-id request)]
    (do
      (swap! sessions assoc session-id {:options options :game nil})
      (save-sessions @sessions))))
```
To ->
```clojure
(save-game-options [game-id options]
  (let [new-game {:options options :game nil}]
    (do
      (swap! sessions assoc game-id new-game)
      (save-sessions @sessions))))
(save-game [game-id game]
  (let [options (get-session-game-options game-id)
        new-game {:options options :game game}]
     (do
       (swap! sessions assoc game-id new-game)
       (save-sessions @sessions)))))
```

Ok so now that we fix our Single Responsibility Principle we now have to deal with moving the persistence logic
closer to our business rules so that we can leverage it no matter the output (server/client side ect...).

For this we will create a polymorphic interface our higher level module can use to call the persistence layer.

Let's look at how we can create a polymorphic interface in clojure.

So to create an interface in clojure we are going to use [defprotocol](https://clojuredocs.org/clojure.core/defprotocol)

```clojure
(ns tic-tac-toe-core.persistable)

(defprotocol Persistable
  (get-session-game-options [this  game-id])
  (get-session-game [this game-id])
  (save-game [this game-id game])
  (save-game-options [this game-id options]))
```

With this protocol we can use it to create different types of implementations of a perishable game. Eg in our case we
can start by creating an implementation for our persistence implantation using a simple file. Later we will implement different
types of persistence implementations using databases. 

_____

Next we'll look into implementing our file game persistence using this protocol and have our rules control the flow 
through the abstract interface

❤️

