---
path: /tic-tac-toe-2
date: 2021-08-25T01:22:55.506Z
title: Tic Tac Toe in Clojure - Part 3 AI
---

Let's build an unbeatable AI for the game tic-tac-toe! Let's use the [minimax algorithm](https://en.wikipedia.org/wiki/Minimax)
commonly used in AI applications for zero-sum games.

This is the pseudocode for Minimax Algorithm

```
function minimax(node, depth, maximizingPlayer) is
    if depth = 0 or node is a terminal node then
        return the heuristic value of node
    if maximizingPlayer then
        value := −∞
        for each child of node do
            value := max(value, minimax(child, depth − 1, FALSE))
        return value
    else (* minimizing player *)
        value := +∞
        for each child of node do
            value := min(value, minimax(child, depth − 1, TRUE))
        return value
```

So lets start with determining if the node(board state), is terminal (game over). Well, we already have
`game-over?` method, but we need to score the game for each player. In other words we want to score the game state
for each player, we'll return 10 for the player if they won, 0 if they haven't, and -10 if they lost.

This is how the test look:
```clojure
(describe "score"
          (it "scores 0"
            (should= 0 (score empty-board O))
            (should= 0 (score empty-board X))
            (should= 0 (score (assoc
                                empty-board
                                [0 0] O [0 1] O [0 2] X
                                [1 0] X [1 1] X [1 2] O
                                [2 0] O [2 1] X [2 2] O)
                              O)))
          (it "scores 10"
            (should= 10 (score (assoc
                                empty-board
                                [0 2] O [1 1] O [2 0] O)
                               O))
            (should= 10 (score (assoc
                                empty-board
                                [0 0] X [0 1] X [0 2] X)
                              X)))
          (it "scores -10"
            (should= -10 (score (assoc
                                 empty-board
                                 [0 2] O [1 1] O [2 0] O)
                               X))
            (should= -10 (score (assoc
                                 empty-board
                                 [0 0] X [0 1] X [0 2] X)
                               O)))
```

```clojure
(defn score [board player]
  (cond
    (= player (get-winning-player board))
    10
    (= (get-opponent player) (get-winning-player board))
    -10
    :else
    0)
```

It took a few iterations to get to implement the score. We were missing a lot of pieces of the
puzzle for the score function to work. We needed a function to tell who was the winning player, and another
function that return the opposing player.

Test and implementation of these utility functions.

```clojure
(describe "get-winning-player"
          (it "should return X"
            (should= X (get-winning-player (assoc
                                             empty-board
                                             [0 0] X [0 1] X [0 2] X))))
          (it "should return O"
            (should= O (get-winning-player (assoc
                                             empty-board
                                             [0 0] O [0 1] O [0 2] O))))
          (it "should return nil"
            (should= nil (get-winning-player empty-board)))

(describe "get-opponent"
          (it "O"
            (should= O (get-opponent X)))
          (it "X"
            (should= X (get-opponent O)))
```

```clojure
(defn get-winning-player [board]
  (->> player-symbols
       (map #(if (game-has-wining-play? board %) % nil))
       (filter identity)
       first)

(defn get-opponent [player]
  (->> player-symbols
       (filter #(not (= player %)))
       first)
```

All right, so now we have a first implementation of the scoring function, and some very helpful utility functions.
Next we'll implement the Minimax function.







