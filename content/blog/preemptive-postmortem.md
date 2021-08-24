---
path: /preemptive-postmortem
date: 2021-08-23T01:22:55.506Z
title: Preemptive Postmortem
description: 
---

Last week we met with our 'client' to plan the deliverables for the upcoming sprint (1 week).
We created a few stories.
* As a player I want to be able to play tic tac toe against another player locally through the CLI.
* As a player I want to be able to play again an AI who has an easy, medium and hard mode.

I had another few stories related to the coin changer kata but in general I overconfidently and optimistically
promised to have all these stories ready over the week. 🤦

Undoubtedly, I over promised and under delivered! What a terrible feeling.

So what happened?!

A couple of things I over estimated.
I thought that going with the CLI as the UI would have fewer complications, but it had its complexity on its own.
Dealing with input got complicated quick. Having to validate the input, having to instruct the user on how to play the game 
through the cli, adding unit test for reading input through the cli, these where all overseen as I estimated the stories. 

So I had to go to the painstaking process of telling the client that I didn't deliver on these promises, I don't want to go over that again.
We've probably all been here. So how do we do better? What did we do wrong? 

Looking back at the stories they seem very big or at least they can be easily break them down into smaller ones.
The playing against a local player story would break into these:
* Create a tic tac toe game that detects if the game is over. 
* Create A CLI that allows players to input plays.
* Create A CLI that displays the board state. When the board position is empty show the input value for that position,
 (1-9) otherwise show the 'X' or  'O'. Looks as real as a tic-tac-toe game.
* CLI should prompt the current player to take their turn until game is over.

Being able to play against an AI (easy, medium and unbeatable mode) can be broken down into each difficulty of its own story. 

So we broke up the stories into smaller ones, interesting thing happened here.
The effort points to the broken up stories added up to more than the original story points had.

Another thing I learned today that will help me avoid this painful situation, it's called Preemptive Postmortem.
Preemptive Postmortem starts by creating a list of worst-case scenarios and its outcomes.
For example:
* (Scenario) The scoring of a play is wrong.
- (Outcome) The Hard Ai allows player to win.

* (Scenario) Iteration on getting the scoring right takes more than 4 days.
- (Outcome) The Hard AI allows player to win.
- (Outcome) No AI to play against.

* (Scenario) Process of getting the UI to look just right might take longer as we implement new features and refactor design of the code implementation.
- (Outcome) Not Ai to play against.
- (Outcome) No working UI to play on.

* (Scenario) Higher priority Items take over the iteration.
- (Outcome) Not Ai to play against.
- (Outcome) No working UI to play on.

* (Scenario) Key-man risk (getting sick/ getting struck by lightning etc.)
- (Outcome) No Ai to play against.
- (Outcome) No working UI to play on.

Looking at this its very transparent what would be the worst case outcome out of all this would be not having being able to play against the AI.
This also helps us navigate around the worst case scenario. Let's say we instead of promising the hardest AI difficulty
with all the other stories for the next sprint, we could trade the Hard AI with the easy AI and add some smaller items. 
This way with even on worst case scenarios our client would still be able to play the game against an AI.
 
PS: Some refactoring on the coin changer problem. 

```clojure
(defn coin-changer [amount]
  (loop [change empty-coins
         amount-remaining (* amount  100)]
    (cond
      (should-add-coin? :quarter amount-remaining)
      (recur
        (add-coin :quarters change)
        (subtract-coin-amount :quarter amount-remaining))
      (should-add-coin? :dime amount-remaining)
      (recur
        (add-coin :dimes change)
        (subtract-coin-amount :dime amount-remaining))
      (should-add-coin? :nickle amount-remaining)
      (recur
        (add-coin :nickles change)
        (subtract-coin-amount :nickle amount-remaining))
      (should-add-coin? :penny amount-remaining)
      (recur
        (add-coin :pennies change)
        (subtract-coin-amount :penny amount-remaining))
      :else change)))
```

Notice the any duplication code? Yea these recurs for  `:quarter :dimes :nickles :pennies`

```clojure
(defn should-add-coin? [coin amount]
  (>= (- amount coin) 0))

(def denominations [25 10 5 1])

(defn coin-changer [amount]
  (loop [amount amount
         coins []
         denominations denominations]
    (let [coin (first denominations)]
      (cond
        (zero? amount)
        coins
        (should-add-coin? coin amount)
        (recur (- amount coin) (conj coins coin) denominations)
        :else
        (recur amount coins (drop 1 denominations))))))
```

Also instead of using a map for denominations using the array of values for them  turned the code to be less verbose.

Yay for refactoring!

Next up more tic-tac-toe and with even more refactoring <3
 

 



