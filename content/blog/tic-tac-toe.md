---
path: /tic-tac-toe-1
date: 2021-08-18T01:22:55.506Z
title: Tic Tac Toe in Clojure (Part 1)
description: 
---

Today we are tackling the tic tac toe game in clojure!

Previously I did this game in javascript you can play against my unbeatable ai [here](https://tic-tac-toe.edgardocarreras.com)
It was done in object oriented and procedurally you can check the code [here](https//github.com/donedgardo/tic-tac-toe)

I was happy with it but now that I know more about clojure I'm curious.
How many lines of code will it take me to get to the same game with clojure?
Is it going to be easier to read and understand?

Let us find out!

So we begin with the most degenerate test. 
Lets test if the game is over by providing an empty board.
This forced me to think about the board representation.

I started with this:
```clojure
(def empty-board 
  { :x [] :o [] })
```
Where I would store all the x's in the `:x` map key as a vector of vectors. Eg `:x [ [0 0]]` would mean that a player
played the x symbol in the top left corner where the first value of the inner vector indicates the x coordinate and the second the y coordinate
Board indexes:
```
0 0 | 0 1 | 0 2 
1 0 | 1 1 | 1 2
2 0 | 2 1 | 2 2
```

But I quickly scrated that out because one of my requriments is to be able to quickly get a player symbol (either `:x :o`) on any given position.
So rather than having the keys be the player symbols we can use the board position index as the map keys and the value would be the player symbol!
I love how clojure allows you to pick whatever type to be the key (vectors, list, symbols, strings, numbers)!

So I ended up with this board representation:

```clojure
(def empty-board
  {[0 0] nil [0 1] nil [0 2] nil
   [1 0] nil [1 1] nil [1 2] nil
   [2 0] nil [2 1] nil [2 2] nil})
```

Allright lets start testing the `game-over?` function, this is what I ended up in my tests:

```clojure
(describe "tic-tac-toe game"
  (it "should not be game over with no plays"
    (should= false (game-over? empty-board)))
  (it "should not be game over with no winning plays"
    (should= false (game-over? (assoc empty-board [0 0] :x))))
  (it "should be game over with :x horizontal winning plays"
    (should= true (game-over?
                     (assoc
                       empty-board
                       [0 0] :x
                       [0 1] :x
                       [0 2] :x))))
  (it "should be game over with :x vertical winning plays"
    (should= true (game-over?
                    (assoc
                      empty-board
                      [0 0] :x
                      [1 0] :x
                      [2 0] :x))))
  (it "should be game over with :x vertical right winning plays"
    (should= true (game-over?
                    (assoc
                      empty-board
                      [0 2] :x
                      [1 2] :x
                      [2 2] :x))))
  (it "should be game over with :x diagonal down winning plays"
    (should= true (game-over?
                    (assoc
                      empty-board
                      [0 0] :x
                      [1 1] :x
                      [2 2] :x))))
  (it "should be game over with :x diagonal up winning plays"
    (should= true (game-over?
                    (assoc
                      empty-board
                      [0 2] :x
                      [1 1] :x
                      [2 0] :x)))))
```

With the first few test the code that made it pass was very straigt forward, very verbose as it just had a hardcode conditional
for each winning case

```clojure
(defn game-over? [board]
  (cond
    (and 
      (= :x (board [0 0])
      (= :x (board [0 1])
      (= :x (board [0 2]))
    true 
    ;more conditional like this

    :else false))))
```

I ended up with 4 `and` conditionals each for the vertical, horizontal, diagonal up and diagonal down win cases.

I wasn't happy with much of the same looking kind of code so we went to refactoring step after making the first few test pass.

I noticed that each and case had the formula for each vertical, horizontal, diagonal up and diagonal down case we just needed to replace the hardcoded indexes with `x and y` variables.

So first we needed to generate a list of the indexes to iterate.
```clojure
(loop [board-indexes (keys board)])
```

Great this lead to genralizing each conditional to something like this:
```clojure
(defn horizontal-win? [board x y]
  (every?
    #(= :x %)
    [(board [x y]) (board [x (inc y)]) (board [x (+ y 2)])]))

(defn vertical-win? [board x y]
  (every?
    #(= :x %)
    [(board [x y]) (board [(inc x) y]) (board [(+ x 2) y])]))

(defn diagonal-down-win? [board x y]
  (every?
    #(= :x %)
    [(board [x y]) (board [(inc x) (inc y)]) (board [(+ x 2) (+ y 2)])])

(defn diagonal-up-win? [board x y]
  (every?
    #(= :x %)
    [(board [x y]) (board [(inc x) (dec y)]) (board [(+ x 2) (- y 2)])])
```

Awsome that looks better!
But we had to also acount for `:o` plays not only `:x`
Lets add some failing test!
```clojure
  (it "should be game over with :y diagonal down winning plays"
    (should= true (game-over?
                    (assoc
                      empty-board
                      [0 0] :o
                      [1 1] :o
                      [2 2] :o))))
  (it "should be game over with :y diagonal up winning plays"
    (should= true (game-over?
                    (assoc
                      empty-board
                      [0 2] :o
                      [1 1] :o
                      [2 0] :o))))
 ```

so we added an argument to all those functions to also accept the symbol.
```clojure
(defn diagonal-up-win? [board x y symbol]
  (every?
    #(= symbol %)
    [(board [x y]) (board [(inc x) (dec y)]) (board [(+ x 2) (- y 2)])])
```

This is what the end result ended up looking like:
```clojure
(ns tic-tac-toe-clj.core)

(def empty-board
  {[0 0] nil [0 1] nil [0 2] nil
   [1 0] nil [1 1] nil [1 2] nil
   [2 0] nil [2 1] nil [2 2] nil})

(defn horizontal-win? [board x y symbol]
  (every?
    #(= symbol %)
    [(board [x y]) (board [x (inc y)]) (board [x (+ y 2)])]))

(defn vertical-win? [board x y symbol]
  (every?
    #(= symbol %)
    [(board [x y]) (board [(inc x) y]) (board [(+ x 2) y])]))

(defn diagonal-down-win? [board x y symbol]
  (every?
    #(= symbol %)
    [(board [x y]) (board [(inc x) (inc y)]) (board [(+ x 2) (+ y 2)])]))

(defn diagonal-up-win? [board x y symbol]
  (every?
    #(= symbol %)
    [(board [x y]) (board [(inc x) (dec y)]) (board [(+ x 2) (- y 2)])]))

(def player-symbols [:x :o])

(defn game-over? [board]
  (loop [board-indexes (keys board)]
    (let [[x y] (first board-indexes)]
      (cond
        (empty? board-indexes)
        false
        (some #(horizontal-win? board x y %) player-symbols)
        true
        (some #(vertical-win? board x y %) player-symbols)
        true
        (some #(diagonal-down-win? board x y %) player-symbols)
        true
        (some #(diagonal-up-win? board x y %) player-symbols)
        true
        :else (recur (drop 1 board-indexes))))))
```

So another tail recursion coming for the rescue here!

Next we'll add some player input handling to allow players to play against each other locally.





