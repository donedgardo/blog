---
path: /reagent-behaviour-driven-development
date: 2021-09-01T01:22:55.506Z
title: Reagent - Behaviour Driven Development Part II
---

Yesterday we worked on our tic tac toe web ui project to use reagent with behaviour driven development tools.

We left some failing test for our tic tac toe board component.

```clojure
(deftest board-component-test
  (testing "It should be empty if the board is empty"
    (with-mounted-component
      [tic-tac-toe-game]
      (fn [component]
        (is
          (= 9
             (-> component
                 (.queryAllByLabelText #"empty-board-space")
                 count))))))

  (testing "It should change board state when clicking on an empty index"
    (with-mounted-component
      [tic-tac-toe-game]
      (fn [component]
        (click-element (.getByLabelText component "empty-board-space-[0 0]"))
        (is
          (= X
             (-> component
                 (.queryByLabelText (str X "-play-" [0 0]))
                 (.-innerHTML)))))))
```

Here we are checking that the ui renders an empty board with 9 empty spaces, and that by clicking on an empty space it 
displays the X on it.

Here is the passing code:
```clojure
(defn tic-tac-toe-game []
  (let [game (atom new-game)]
    (fn []
      (let [board (:board @game)
            spaces (sort (keys board))]
        [:div
         (for [space spaces]
           (let [mark ((:board @game) space)]
             [:div.space
              {:key        space
               :id         space
               :on-click   #(swap! game play space X)
               :aria-label (if (nil? mark)
                             (str "empty-board-space-" space)
                             (str mark "-play-" space))}
              mark]))
         [game-over @game]]))))
```
So atoms are tricky here I had global atom but that made it hard to test, so I created a local atom state for the tic-tac-toe
game component. I've also added the game over component to our game component.

Ok lets add the feature to restart the game with out needing to refresh the page.
Let's add a failing test:
* It should reset the board when clicking the reset button.

The failing test:
```clojure
(testing "It should reset the board after clicking the reset button."
    (with-mounted-component
      [tic-tac-toe-game]
      (fn [component]
        (click-element (.getByLabelText component "reset-game"))
        (is
          (= 9
             (-> component
                 (.queryAllByLabelText #"empty-board-space")
                 count)))))))
```
The production code:
```clojure
(defn reset-button [on-reset]
  [:button {:aria-label "reset-game"
            :on-click   on-reset} "New Game"]

(defn tic-tac-toe-game []
  (let [game (atom new-game)]
    (fn []
      (let [board (:board @game)
            spaces (sort (keys board))]
        [:div
         (for [space spaces]
           (let [mark ((:board @game) space)]
             [:div.space
              {:key        space
               :id         space
               :on-click   #(swap! game play space X)
               :aria-label (if (nil? mark)
                             (str "empty-board-space-" space)
                             (str mark "-play-" space))}
              mark]))
         [game-over @game]
         [reset-button #(reset! game new-game)]])))
```
✅ 😎!

Btw, I prefer using `aria-label` instead of using `ids` as `aria-label` improves accessibility not only for our test but
for our vision impaired players 😊. 

Ok lets refactor, I see some duplicate code on the test and our tic-tac-toe-game component can be cleaned up. 
We can do this more confidently thanks to our test!

First lets refactor our test removing the duplicate code for checking if the board is empty.

```clojure
(defn expect-empty-board [component]
  (= 9
     (-> component
         (.queryAllByLabelText #"empty-board-space")
         count)))

(deftest board-component-test
  (testing "It should be empty if the board is empty"
    (with-mounted-component
      [tic-tac-toe-game]
      (fn [component]
        (is
          (expect-empty-board component)))))

  (testing "It should change board state when clicking on an empty index"
    (with-mounted-component
      [tic-tac-toe-game]
      (fn [component]
        (click-element (.getByLabelText component "empty-board-space-[0 0]"))
        (is
          (= X
             (-> component
                 (.queryByLabelText (str X "-play-" [0 0]))
                 (.-innerHTML)))))))
  (testing "It should reset the board after clicking the reset button."
    (with-mounted-component
      [tic-tac-toe-game]
      (fn [component]
        (click-element (.getByLabelText component "reset-game"))
        (is
          (expect-empty-board component))))))
```

Great now lets break the `tic-tac-toe-game` into smaller components:

```clojure
(defn board-space [board space on-space-click]
  (let [mark (board space)]
    [:div.space
     {:key        space
      :id         space
      :on-click   on-space-click
      :aria-label (if (nil? mark)
                    (str "empty-board-space-" space)
                    (str mark "-play-" space))}
     mark]))

(defn tic-tac-toe-game []
  (let [game (atom new-game)]
    (fn []
      (let [board (:board @game)
            spaces (sort (keys board))]
        [:div
         (for [space spaces]
           (board-space
             board
             space
             #(swap! game play space X)))
         [game-over @game]
         [reset-button #(reset! game new-game)]])))
```

Awesome all our test are passing ✅. Onward!

Something I noticed that we are missing in our core tic tac toe game in clojure is that the UI (cli and web)
where handling which player goes next, I believe this should be handled by the core code rather than the UI.

```clojure
(def new-game
  {:board empty-board
   :winner nil
   :over? false
   :active-player X})

(defn play [game index]
  (let [board (:board game)
        player (:active-player game)
        new-board (assoc board index player) ]
    (cond
      (or (:over? game)
          (not (index-empty? index board)))
      game
      (game-has-wining-play? new-board player)
      (assoc game :board new-board :winner player :over? true)
      (board-full? new-board)
      (assoc game :board new-board :over? true)
      :else
      (assoc game :board new-board :active-player (get-opponent player)))))
```

Ok now we only call play, and it will update active-player and rotate between them, X going always first!

Awesome, so we got our tic-tac-toe functionality mostly done, I think we are missing the feature where player picks if they
want to play against an AI, or a local player.
For the AI selection we have a few options to give the player, picking the difficulty and picking who goes first.

Before this I want to work on some styling. So tomorrow we'll work on styling and these new features!

👋









