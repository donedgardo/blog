---
path: /tic-tac-toe-2
date: 2021-08-24T01:22:55.506Z
title: Tic Tac Toe in Clojure (Part 2)
description: 
---

Greetings 🖖!

Yesterday we talked about some pain points we encountered developing our Tic tac toe cli ui in Clojure.
Today we are going to talk about how we overcame those pain points. Let's start with printing the board.

This is the story:
> **Create a Tic-Tac-Toe Game** <br></br>
> Create A CLI that displays the board state. When the board position is empty show the input value for that position,
> (1-9) otherwise show the 'X' or  'O'. Looks as real as a tic-tac-toe game.

This is our test:
```clojure
(describe "printing-boards"
          (it "prints an empty board"
            (should= "\n | | \n | | \n | | \n"
                     (print-board empty-board)))
          (it "prints board with plays"
            (should= "\n:x| | \n | | \n | | \n"
                     (print-board (play empty-board [0 0] :x))))
```

Our empty board prints as expected!
Our printing doesn't pass the test when there are values.

Let's look at what the outcome looks like
```bash
 1) printing-boards prints the board
     Expected: "\n:x| | \n | | \n | | \n"
          got: "\n |:x| \n | | \n | | \n" (using =)
```
And here is the code for that:
```clojure
(defn is-new-row? [indexes board]
  (and (= 0 (mod (dec (count indexes)) 3))
       (not (= (count (keys board)) (count indexes)))))

(defn add-value-and-new-line [value board-print]
  (str board-print (print-index value) "\n"))

(defn add-value-and-divisor [value board-print]
  (str board-print (print-index value) "|")

(defn print-board [board]
  (loop [indexes (keys board)
         board-print "\n"]
    (cond
      (empty? indexes)
      board-print
      (is-new-row? indexes board)
      (recur
        (drop 1 indexes)
        (add-value-and-new-line (board (first indexes)) board-print))
      :else
      (recur
        (drop 1 indexes)
        (add-value-and-divisor (board (first indexes)) board-print)))))
```
Hmmmm 🤔

The `indexes` might not be sorted as I expect them. Let us print them out and see what's going on.
`(println indexes)` = `([2 2] [0 0] [1 0] [1 1] [0 2] [2 0] [2 1] [1 2] [0 1])`
Great so at least we know what's wrong, we just need to fix this by sorting them, but will using `sort` on the indexes work.

`(sort (indexes)` = `([0 0] [0 1] [0 2] [1 0] [1 1] [1 2] [2 0] [2 1] [2 2])` 🤯
What the hell! It just worked! I need to know why this just worked. Lets check out the source code for this!

`(source sort)`

```clojure
(defn sort
  "Returns a sorted sequence of the items in coll. If no comparator is
  supplied, uses compare.  comparator must implement
  java.util.Comparator.  Guaranteed to be stable: equal elements will
  not be reordered.  If coll is a Java array, it will be modified.  To
  avoid this, sort a copy of the array."
  {:added "1.0"
   :static true}
  ([coll]
   (sort compare coll))
  ([^java.util.Comparator comp coll]
   (if (seq coll)
     (let [a (to-array coll)]
       (. java.util.Arrays (sort a comp))
       (with-meta (seq a) (meta coll)))
     ())))
```

Honestly that didn't help much, but a key thing I picked up is that probably
vectors have a built in `java.util.Comparator` ¯\\\_(ツ)\_/¯.

All right, onward!

Ok lets tackle the X and O as display values vs `:x` `:o`

I've updated the print board test to make it pass then we move on making it pass.

From:
```clojure
(def player-symbols [:x :o])
```
To:
```clojure
(def player-symbols ["X" "O"])
```

And we broke a lot of other test which that had the `:x` or `:o` hardcoded like:
```clojure
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
```
So I started going one by one replacing them with "O" or "X". It felt a bit dirty and I wanted to avoid doing this all over
in the case we changed the player marks again in the future.

So I did this instead:
```clojure
(def X "X")
(def O "O")
(def player-symbols [X O]
```
Replaced the test with the variable `X` or `O`, and in case we switch the symbols at least we only have to modify this once!

Great, all test passing thanks to the refactoring! 

Lets get the 1-9 to display instead of empty spaces!
Lets update this code:
```clojure
(defn add-value-and-new-line [value board-print]
  (str board-print (print-index value) "\n"))

(defn add-value-and-divisor [value board-print]
  (str board-print (print-index value) "|")

;further down in the print board function
(add-value-and-new-line (board (first indexes)) board-print))
(add-value-and-divisor (board (first indexes)) board-print))))
```

Lets replace the `(board (first indexes))` with 
```clojure
(defn get-display-value [board indexes]
  (or
    (board (first indexes))
    (- (inc (count board)) (count indexes)))
```

Here we return whatever is thruty first, the value of the board at the index or the index value.
To be fair to get the index value in this context I'm doing something that looks a bit weird.
The count of `indexes` starts at 10 and goes down to 0, so it isn't enough to display the index values from 1 - 9.
So we have to subtract the total count of board indexes to the count of indexes. What I like about this though is that
no matter how big the board gets this will continue to work. 

-----
Last thing for today I had a bug on one of our stories.

> Create a tic tac toe game that detects if the game is over.

From our [fist tic-tac-toe blog](/blog/tic-tac-toe-1) we thought we had this done.

Notice anything wrong with this test
```clojure
  (it "should not be game over with a tie"
            (should= false (game-over?
                             (assoc
                               empty-board
                               [0 0] O [0 1] X [0 2] O
                               [1 0] O [1 1] X [1 2] X
                               [2 0] X [2 1] O [2 2] O)))))
```

Right! A tied game should be over, so it should be `true` instead of `false`.

Our code with failing test:
```clojure
(defn game-over? [board]
  (loop [board-indexes (keys board)]
    (let [[x y] (first board-indexes)]
      (cond
        (empty? board-indexes)
        false
        (some #(winning-play? board x y %) player-symbols)
        true
        :else (recur (drop 1 board-indexes)))))
```
Our code with passing test:
```clojure
(defn game-over? [board]
  (if (every? identity (vals board))
    true
    (loop [board-indexes (keys board)]
        (let [[x y] (first board-indexes)]
          (cond
            (empty? board-indexes)
            false
            (some #(winning-play? board x y %) player-symbols)
            true
            :else (recur (drop 1 board-indexes))))))
```
Too hard to read and follow.

Our code after the refactor:
```clojure
(defn board-full? [board]
  (every? identity (vals board))

(defn game-has-wining-play? [board]
  (loop [board-indexes (keys board)]
    (let [[x y] (first board-indexes)]
      (cond
        (empty? board-indexes)
        false
        (some #(winning-play? board x y %) player-symbols)
        true
        :else (recur (drop 1 board-indexes))))))

(defn game-over? [board]
  (if (board-full? board)
    true
    (game-has-wining-play? board))
```

Tomorrow we'll talk on how we implement this story:
> ****As a player I want to play against an AI ****<br></br>
> Hard AI - Be able to play against (Unbeatable).

<3





