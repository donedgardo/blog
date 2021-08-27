---
path: /tic-tac-toe-4
date: 2021-08-26T01:22:55.506Z
title: Tic Tac Toe in Clojure - Part 4 MiniMax Algorithm
---

Yesterday we started looking into implementing the Minimax Algorithm.
We started with the scoring algorithm

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
But our scoring algorithm should return `nil` if the game isn't over yet so we can keep recursing the minimax
until the game is over.

```clojure
(defn score-board [board player]
  (let [winning-player (get-winning-player board)]
    (cond
      (= player winning-player)
      10
      (= (get-opponent player) winning-player)
      -10
      (game-over? board)
      0
      :else
      nil)))
```

Ok now we have a proper scoring function. Let's move ahead with the minimax implementation.

Looking again at the minimax pseudocode:
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

Ok, so it took me a while to wrap my head around this recursive algorithm.
My initial algorithm didn't implement the depth of the recursion as I was trying to figure out
the requirement of depth I found out the hard way. Say the algorithm finds a winning play in the next play,
without the depth implementation the minimax would score the immediate winning play the same as a potential winning play
down the line.

Ok so let's write some test for this.
```clojure
(describe "minmax"
          (it "returns 10"
            (should= 10 (minimax
                          (assoc
                            empty-board
                            [0 1] X [0 2] X)
                          X
                          0
                          true)))
          (it "returns -10"
            (should= -10 (minimax
                           (assoc
                             empty-board
                             [0 0] nil [0 1] X [0 2] X
                             [1 0] O [1 1] O [1 2] X
                             [2 0] X [2 1] O [2 2] O)
                           X
                           0
                           false)))
          (it "returns -9"
            (should= -9 (minimax
                          (assoc
                            empty-board
                            [0 0] X [0 1] nil [0 2] O
                            [1 0] nil [1 1] O [1 2] nil
                            [2 0] X [2 1] nil [2 2] X)
                          O
                          0
                          true))))
```

Notice that if we score the board where X is about to lose we get a -10, if we score a board where X is about to win
we get a 10. We also test that we score a -9 when O is about to lose in the next two turns.

Here's our minimax code:
```clojure
(defn minimax [board player depth maximizing?]
  (let [score (score-board board player)
        moves (get-empty-indexes board)]
    (cond
      (not (nil? score))
      score
      (true? maximizing?)
      (->> moves
           (map #(play board % player))
           (map #(minimax % player (inc depth) false))
           (apply max)
           (#(- % depth)))
      :else
      (->> moves
           (map #(play board % (get-opponent player)))
           (map #(minimax % player (inc depth) true))
           (apply min)
           (#(+ % depth))))))
```

Ok lets now create a function that allows us to use this function lets call it `get-best-move`.

Lets start with some sensible tests:
```
(describe "get-best-move"
          (it "should return best move"
            (should= [0 0] (get-best-move
                             (assoc
                               empty-board
                               [0 0] nil [0 1] X [0 2] X
                               [1 0] O [1 1] O)
                             X)))
          (it "should return best move"
            (should= [2 2] (get-best-move
                             (assoc
                               empty-board
                               [0 0] X [1 1] O)
                             X)))
          (it "should return best move"
            (should= [2 2] (time (get-best-move
                             empty-board
                             X)))))
```
In the test I check that the `get-best-move` not only returns the winning play plus the best defensive play.

Here is the implementation:
```clojure
(defn get-best-move [board player]
  (loop [moves (get-empty-indexes board)
         scores {}]
    (cond
      (empty? moves)
      (key (apply max-key val scores))
      :else
      (recur
        (drop 1 moves)
        (assoc scores
          (first moves)
          (minimax
            (play board (first moves) player)
            player
            0
            false))))))
```
For each move available I score them and return the key with the maximum value. 
I really love how `max-key` made this so much easier.

So our algorithm works but... It is really slow when the board has a lot of empty spaces!
```clojure
(time (get-best-move empty-board X))
;"Elapsed time: 154998.704009 msecs" 🤯🤯🤯🤯
```

Next we'll look into how to optimize our algorithm. 
We'll look at utility tree and [alpha-beta pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning).

<3







