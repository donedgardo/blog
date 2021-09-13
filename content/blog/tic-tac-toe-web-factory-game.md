---
path: /tic-tac-toe-web-ai
date: 2021-09-10T01:22:55.506Z
title: Tic-Tac-Toe Web - Game Factory  
---

👋!!
Today I want to remove duplication of the code I have in both our web and cli versions where possible.

It seems both of them have a say on how to deal with turns, the UI is also playing for the AI, and setting up the ai-difficulty
to the play options. If we do this right, we then can make sure the cli and web support the same features for play settings,
ai playing, and it will allow us to do better validation on who is playing.

So I will use the Factory Pattern to create the initial game map in our `core` library so that the UI doesn't it will consider all game
options so that I can share the code and remove that responsibility away from the UI.

```clojure
(describe "create game"
          (it "should return a game"
            (should-not (nil? (create-game nil))))
          (it "should of played game when ai goes first"
            (should= 8
                     (-> (create-game
                           {:ai-difficulty :easy :first-player :ai})
                         :board
                         get-empty-indexes
                         count)))
          (it "should of not played game when player goes first"
            (should= 9
                     (-> (create-game
                           {:ai-difficulty :easy :first-player :player})
                         :board
                         get-empty-indexes
                         count))))
```

Here is the production code to make this test pass!
```clojure
(defn create-game [options]
  (let [{:keys [ai-difficulty first-player]} options
        game (if (not (= :ai first-player))
               new-game
               (play new-game (ai-play new-game)))]
    game))
```

Here we consider the game options to see who goes first and if the ai goes first the game will be created with the ai move
already played

Next I want my game to take the turns for the ai after our player plays. 
Here the test:

```clojure
   (it "ai should play right after player plays"
            (should= 7
                     (-> (create-game
                           {:ai-difficulty :easy :first-player :player})
                         (play [0 0])
                         :board
                         get-empty-indexes
                         count)))
```

Here is the production code where we use the Strategy Design Pattern.
```clojure
(defn get-ai-move [ai-difficulty]
  (cond
    (nil? ai-difficulty)
    nil
    (= ai-difficulty :easy)
    get-random-move
    :else
    get-best-move))


(defn create-game [options]
  (let [{:keys [ai-difficulty first-player]} options
        ai-play (get-ai-move ai-difficulty)
        game (if (not (= :ai first-player))
               new-game
               (play new-game (ai-play new-game)))]
    (assoc game :ai-play ai-play)))

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
      (let [ai-move (ai-play (assoc new-game :active-player opponent))]
        (assoc new-game :board (assoc new-board ai-move opponent))))))
```
Awesome! Next I'll add our peer to peer library to work on our Player vs Player feature!

<3!




