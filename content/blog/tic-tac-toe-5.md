---
path: /tic-tac-toe-5
date: 2021-08-27T01:22:55.506Z
title: Tic Tac Toe in Clojure - Part 5 Performance Optimization 
---

Yesterday we looked at applying the minimax algorithm to our unbeatable tic tac toe in clojure.

We hit a performance issue where our AI would take **150** seconds to play the first move on an empty board.
So today we'll look at our code and look for performance optimizations.

As I've analyzed with `time` on our functional code I noticed most of the time it takes is detecting a winning play.

```clojure
(defn game-has-wining-play?
  ([board player]
   (loop [board-indexes (keys board)]
     (cond
       (empty? board-indexes)
       false
       (#(winning-play? board (first board-indexes) %) player)
       true
       :else (recur (drop 1 board-indexes))))))
```

So here we are looping over **ALL** board spaces and detect if the player has a winning play.
Let's fix this by only checking where the player has played! This will improve our detecting game has winning play!

```clojure
(defn get-player-plays [board player]
  (filter
    #(and
       (not (index-empty? % board))
       (= player (board %)))
    (keys board)))

(defn game-has-wining-play? [board player]
  (let [player-plays (get-player-plays board player)]
    (loop [board-indexes player-plays]
      (cond
        (empty? board-indexes)
        false
        (#(winning-play? board (first board-indexes) %) player)
        true
        :else (recur (drop 1 board-indexes)))))
```

Ok lets see where this gets us:
```clojure
(it "should return best move"
  (should= [2 2] (time (get-best-move
                           empty-board
                            X)))))
"Elapsed time: 47045.398918 msecs"
```

Alright, well that's an improvement, but waiting 47 seconds for the computer to play, not enough.
Let's think about this a bit more. So when do we need to detect a game is over?
* When a player either our human or ai plays.
* We can save some checks if we only check if the game has at least 5 moves.

So lets refactor this a bit. Lets save the game wininng state somewhere.

I'm thinking something like this:
```clojure
{
  :board ;...board state
  :winner nil
  :over? false
}
```

This will take a bit of refactoring so lets make sure our test pass we commit, and we start braking things apart.

After 30 min of refactoring and fixing failing test this is what our new play function looks like:
```clojure
(defn play [game index player]
  (let [board (:board game)
        new-board (assoc board index player) ]
    (cond
      (not (index-empty? index board))
      game
      (game-has-wining-play? new-board player)
      (assoc game :board new-board  :winner player :over? true)
      (board-full? new-board)
      (assoc game :board new-board :over? true)
      :else
      (assoc game :board new-board))))
```

Since we now set the winning player (if there is one) on each play the minimax algorithm doesn't have to do all the lookups
it used to. So what improvements this change made?

Well from an empty board perspective.
From 150 seconds to 27 seconds!

For the second move.
From 870 msecs to 461 msecs!

Although 27 might be too much for the first move the rest of the ai turns are acceptably fast.
So for user experience I will make the unbeatable AI picks a random spot in the board if it goes first!

🚀



