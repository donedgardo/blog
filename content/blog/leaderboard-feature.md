---
path: /leaderboard-feature
date: 2021-10-29T01:22:55.506Z
title: Tic-tac-toe Leaderboards!
description: Lets implement a Leaderboard feature to our tic-tac-toe game.
---

👋 Well hello there!

Today we'll add the leader board feature to our tic-tac-toe game.

Here is the work on a high level, we'll need to:
* let players set a username before they start playing.
* store the players' username into the game state when a game gets created. 
* store the winning players' username on game state when they win.
* store the new attribute into our persistence layer. This implies updating the database schema model.
* add a new method to our persistence protocol to get the top `n` players.
* implement the get our top players method for both our file persistence and datomic implementations.

#### Let players set a username before they start playing.

So for this we will create a simple form for now and set that session username in the cookies.
Let's start with a test, now our first screen should be the login.
```clojure
  (it "shows username form"
    (should=
      false
      (nil?
        (re-find
          #"Login"
          (:body (http-client/get "http://localhost:3000"))))))
```

We make this pass by adding a new page to our html module
```clojure
(ns tic-tac-toe-html.username-form
  (:require
    [tic-tac-toe-core.intl :refer [INTL]]))

(defn username-form
  ([]
   [:form  {:action "/login" :method "POST"}
    [:label {:for "username"} "Username"]
    [:input {:type "text" :name "username"}]
    [:button
     {:aria-label "login"}
     "Login"]]))
```
Also, using it in our render logic.
```clojure
(defn render-application [{:keys [options game]}]
  (let [{:keys [play-mode ai-difficulty first-player]} options
        ai-mode? (= "ai" play-mode)]
    (cond
      (empty? (:players game))
      (username-form)
      (nil? (:play-mode options))
      (play-mode-menu)
      (and ai-mode?
           (nil? ai-difficulty))
      (difficulty-ai-menu)
      (and ai-mode?
           (nil? first-player))
      (goes-first-menu)
      :else
      (tic-tac-toe-board game))))
```
Our server routes now set a user-id cookie after logging in and sending the username to our game factory.
Our new game factory accepts players as parameter to initialize the usernames of our players including our ai.
We'll see that next.

#### Store the players usernames into the game state when a game gets created.
So here I want our game factory to be able to handle this responsibility, I believe it's a business rule or a higher modules.

Let's write some test for these to ease us into thinking about the design of the implementation.

```clojure
(describe
  "playing with username"
  (let [persistence-options
        {:persistence game-persistence :id "test-game"
         :players     ["username-x" "username-o"]}
        game-options
        {:play-mode (:local play-modes)}]
    (it "should not store winning-username on cats game"
      (should= nil
               (-> (create-game-factory
                     game-options
                     persistence-options)
                   (play [2 1] persistence-options)
                   (play [0 1] persistence-options)
                   (play [0 0] persistence-options)
                   (play [1 1] persistence-options)
                   (play [0 2] persistence-options)
                   (play [1 2] persistence-options)
                   (play [1 0] persistence-options)
                   (play [2 0] persistence-options)
                   (play [2 2] persistence-options)
                   :winner-username)))
    (it "should store winning-player on x win"
      (should= (first (:players persistence-options))
               (-> (create-game-factory
                     game-options
                     persistence-options)
                   (play [0 0] persistence-options)
                   (play [1 1] persistence-options)
                   (play [1 0] persistence-options)
                   (play [2 2] persistence-options)
                   (play [2 0] persistence-options)
                   :winner-username)))))
```

Here we are testing that once we create a game with players it will properly assign the winning player to the 
`winner-username` new game attribute.

Here is the code that made this work.
```clojure
(defn get-ordered-players [players first-player play-mode]
  (let [ai (:ai play-modes)]
    (cond
      (not (= ai play-mode))
      players
      (= ai first-player)
      [ai (first players)]
      (= ai first-player)
      [(first-player) ai])))

(defn get-game-with-ai [ai-difficulty first-player]
  (let [ai (:ai play-modes)
        ai-play (get-ai-command ai-difficulty)]
    (if
      (and
        (= ai first-player)
        (not (nil? ai-play)))
      (assoc (play new-game (ai-play new-game)) :ai-play ai-play)
      (assoc new-game :ai-play ai-play))))

(defn create-game [options]
  (let [{:keys [ai-difficulty first-player play-mode players]} options
        game-with-ai (get-game-with-ai ai-difficulty first-player)
        players-ordered (get-ordered-players players first-player play-mode)]
    (assoc game-with-ai :players players-ordered)))

(defn create-game-factory
  ([] new-game)
  ([options] (create-game options))
  ([options {:keys [persistence id players]}]
   (let [options-with-players (assoc options :players players)
         game (create-game options-with-players)]
     (do
       (.save-game-options persistence id options)
       (.save-game persistence id game)
       game))))
```

#### Store the winning players' username in game state when they win.

In order to make the tests pass we need to add the active players' username to the winner-username property
so here is the new code for our play method.

```clojure
(defn get-active-player-username [players board]
  (let [empty-indexes (get-empty-indexes board)
        play-count (- (count board) (count empty-indexes))]
    (if (nil? players)
      nil
      (nth players (rem play-count (count players))))))

(defn get-new-game-state
  ([{:keys [game index]}]
   (let [{:keys [board active-player ai-play players]} game
         new-board (assoc board index active-player)
         new-game (assoc game :board new-board)
         opponent (get-opponent active-player)]
     (cond
       (invalid-move? game index)
       game
       (game-has-wining-play? new-board active-player)
       (assoc new-game :winner active-player
                       :over? true
                       :winner-username (get-active-player-username players board))
       (board-full? new-board)
       (assoc new-game :over? true)
       (nil? ai-play)
       (assoc new-game :active-player opponent)
       :else
       (let [ai-disabled-game (assoc new-game :ai-play nil :active-player opponent)
             ai-move (ai-play ai-disabled-game)
             game-after-ai (get-new-game-state
                             {:game ai-disabled-game
                              :index ai-move
                              :username (:ai play-modes)})]
         (assoc game-after-ai :ai-play ai-play))))))

(defn play
  ([game index]
   (get-new-game-state {:game game :index index}))
  ([game index {:keys [persistence id]}]
   (let [game-state (get-new-game-state {:game game :index index})]
     (do
       (.save-game persistence id game-state)
       game-state))))
```

Main change here is where we get the new game state if there is a winning play on the new board state then we call the 
new utility function to get the active players and assign it to the `winner-username` attribute of the game.

#### store the new attribute into our persistence layer. 

For our persistence of the new properties our file persistence implementation doesn't need any changes as it stores the 
game object as is, including our new players and winner-username. 

In the other hand our datomic implementation needs to know about the change of the schema. So let's fix that.

For our schema just two simple update to our game schema we just added two edn configurations:
```clojure
   {:db/ident       :game/winner-username
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc         "Winners' username"}
   {:db/ident       :game/players
    :db/valueType   :db.type/string
    :db/cardinality :db.cardinality/many
    :db/doc         "Player usernames"}
```

Also, updates needed on our get and save game methods:
```clojure
(get-session-game [_ game-id]
    (let [db (d/db connection)
          serialized-game (d/pull db
                                  [:game/board
                                   :game/winner
                                   :game/over?
                                   :game/:winner-username
                                   :game/active-player
                                   :game/players
                                   {:game/options [:option/ai-difficulty]}]
                                  [:game/uuid game-id])
          option (:game/options serialized-game)]
      {:board           (clojure.edn/read-string (:game/board serialized-game))
       :winner          (:game/winner serialized-game)
       :winner-username (:game/winner-username serialized-game)
       :over?           (:game/over? serialized-game)
       :active-player   (:game/active-player serialized-game)
       :players         (:game/players serialized-game)
       :ai-play         (get-ai-command (:option/ai-difficulty option))}))

  (save-game [_ game-id game]
    (d/transact
      connection
      {:tx-data
       [(remove-nil {:db/id                 game-id
                     :game/uuid             game-id
                     :game/board            (str (:board game))
                     :game/winner           (:winner game)
                     :game/:winner-username (:winner-username game)
                     :game/over?            (:over? game)
                     :game/players          (filter identity (:players game))
                     :game/active-player    (:active-player game)})]}))
```

Here on the save we needed to filter for nils as datomic doesn't accept nils in tuple schemas.

#### New method to our persistence protocol to get the top `n` players.
```clojure
(defprotocol Persistable
  (get-session-game-options [this  game-id])
  (get-session-game [this game-id])
  (save-game [this game-id game])
  (save-game-options [this game-id options])
  (top-players [this play-mode limit skip]))
```

Our new method top-players accepts the play-mode since I want leaderboards for each play-mode.
The `limit` parameter is to limit how many top players we want to get, and our `skip` parameter will help us paginate if
ever need to. We might just create a different polymorphic method for the skip, but it will do for now.

_____

Next we'll look into implementing our leaderboard feature using by implementing the top-players method in both our file 
and datomic types.

Tootles.
❤️

