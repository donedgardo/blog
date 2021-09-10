---
path: /tic-tac-toe-cli-web
date: 2021-09-09T03:02:47.546Z
title: Tic-Tac-Toe - Supporting CLI and Web!
---

Up to this point we've been keeping iterating on our web version, our tic-tac-toe core by optimizing and adding new features.
In doing so we've broken some CLI feature interfaces.  

How so?

We've been improving our separation of tic-tac-toe rules, and our ui rules and refactored the core and web versions, but we haven't 
had much test to the cli version, so we broke it without knowing!
CLI code still was handling taking turns and showing whos turn is it, so we need to refactor it too. 
But first, lets add some test to the cli play mode, and make sure all our features work for both web and cli.


Lets add test for input validation on the cli
```clojure
(describe "invalid play message"
          (it "returns when the space is occupied"
            (should= "\n0 is not a valid input because the board space is not empty."
                     (get-error-message [0 0] (:board (play new-game [0 0])) "0")))
          (it "returns when the space is not a number."
            (should= "\nX is not a valid input because the input is not a number."
                     (get-error-message nil (:board new-game) "X")))
          (it "returns when the input is not between 0 and 9"
            (should= "\n-1 is not valid input because its outside the 1 - 9 range."
                     (get-error-message nil (:board new-game) "-1")))
          (it "returns when the input is empty"
            (should= "\nEmpty space is not valid input."
                     (get-error-message nil (:board new-game) "   ")))
```
The production code:
```clojure
(defn get-error-message [index board input]
  (cond
    (blank? input)
    (str "\nEmpty space is not valid input.")
    (not (re-matches #"^-?\d+" input))
    (str "\n" input " is not a valid input because the input is not a number.")
    (nil? index)
    (str "\n" input " is not valid input because its outside the 1 - 9 range.")
    (not (index-empty? index board))
    (str "\n"
         input
         " is not a valid input because the board space is not empty.")
    :else
    nil)
```

Ok now lets add a test for our `play-cli` function:
```
(describe "local play"
          (it "plays a cats game"
            (should= nil
                     (with-in-str
                       "1\n2\n3\n5\n4\n6\n9\n7\n8"
                       (play-cli))))
          (it "X wins"
            (should= X
                     (with-in-str
                       "1\n5\n3\n4\n2"
                       (play-cli))))
          (it "O wins"
            (should= O
                     (with-in-str
                       "1\n5\n2\n3\n4\n7"
                       (play-cli))))
```

On the production code for `play-cli` we now return nill on cats game and X or O for the th winning player. 

Also, I noticed that the `play-options` is code that I have in the web version but its a feature I also want
for the cli version. So I move it to the core to share it accross uis


```
(ns tic-tac-toe-core.play_options
  (:require [tic-tac-toe-core.intl :refer [INTL]]
            [tic-tac-toe-core.ai :refer [get-best-move get-random-move]]))

(def difficulty-options [{:label (:easy-label INTL) :value get-random-move}
                         {:label (:hard-label INTL) :value get-best-move}])

(def play-mode-options
  [{:label (:local-mode INTL) :value :local}
   {:label (:ai-mode INTL) :value :ai}])

(def goes-first-menu-options
  [{:label (:player-first-label INTL)
    :value :player}
   {:label (:ai-first-label INTL)
    :value :ai}])
```

Also notice that I've created an`intl` module where I keep my Internationalization so I can share even more code between
CLI and web. Now maintaining will be a lot easier.

I also feel like the logic of taking turn who goes first hast to be refactored out of the UI so I can share it between libraries.

Especially when we implement the PVP feature Lets do that tomorrow!
We will refactor our game to handle turns for the ai player based on options, and integrate [js-IPFS'](https://js.ipfs.io/)
Super excited about this!




