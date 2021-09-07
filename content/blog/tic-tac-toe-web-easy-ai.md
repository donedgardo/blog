---
path: /tic-tac-toe-web-ai
date: 2021-09-03T01:22:55.506Z
title: Tic-Tac-Toe Web - Play against the AI! 
---

👋!!
Let's pick up where we left of yesterday. We worked on getting a play menu,
asking the player if they want to play agains another player locally or play against
AI. I also want to ask the player if they go first or let the AI go first.


Classically we will start with our test. 
```clojure
  (testing "It show difficulty options after picking play against ai player player"
    (with-mounted-component
      [play-options]
      (fn [component]
        (click-element (.getByLabelText component "play-ai-player"))
        (is
          (label-component-in-dom? component "easy-ai-difficulty"))
        (is
          (label-component-in-dom? component "hard-ai-difficulty"))))
```

And here is our clojurscript reagent ui component to make this pass:
```clojure
(defn difficulty-menu []
  [:div
   [:h2 "Select AI difficulty"]
   [:button {:aria-label "easy-ai-difficulty"} "EASY"]
   [:button {:aria-label "hard-ai-difficulty"} "HARD"]])

(defn play-options []
  (let [options (atom {:play-mode nil})
        play-local #(swap! options assoc :play-mode :local)
        play-ai #(swap! options assoc :play-mode :ai)
        go-to-menu #(swap! options assoc :play-mode nil)]
    (fn []
      (cond
        (nil? (:play-mode @options))
        [play-mode-menu play-local play-ai]
        (= :ai (:play-mode @options))
        [difficulty-menu]
        :else
        [tic-tac-toe-board go-to-menu]))))

```
We refactored right after passing the test.

I want to keep a component that handles the play mode state and keep all the other components be what we call in the
React world, a dumb component. It just receives props and only responsibility is to render in the UI based on its props.

Lets keep this in mind as we work on our next component. I want players to select who goes first after selecting the ai
difficulty. Here is our tests:
```clojure
 (testing "It show who goes first options after picking ai difficulty"
    (with-mounted-component
      [play-options]
      (fn [component]
        (click-element (.getByLabelText component "play-ai-player"))
        (click-element (.getByLabelText component "easy-ai-difficulty"))
        (is
          (label-component-in-dom? component "player-goes-first"))
        (is
          (label-component-in-dom? component "ai-goes-first")))))
```

Getting our test passing pretty straight forward:

```clojure
(defn play-options []
  (let [options (atom {:play-mode nil :ai-difficulty nil :first-player nil })
        play-local #(swap! options assoc :play-mode :local)
        play-ai #(swap! options assoc :play-mode :ai)
        select-easy-mode #(swap! options assoc :ai-difficulty :easy)
        select-hard-mode #(swap! options assoc :ai-difficulty :hard)
        go-back-to-menu #(swap! options assoc :play-mode nil)]
    (fn []
      (cond
        (nil? (:play-mode @options))
        [play-mode-menu play-local play-ai]
        (and (= :ai (:play-mode @options))
              (nil? (:ai-difficulty @options)))
        [difficulty-menu select-easy-mode select-hard-mode]
        (and (= :ai (:play-mode @options))
             (nil? (:first-player @options)))
        [:div
         [:button {:aria-label "player-goes-first"} "I Go First!"]
         [:button {:aria-label "ai-goes-first"} "AI Goes First!"]]
        :else
        [tic-tac-toe-board go-back-to-menu]))))
```

Let's refactor I see some duplication of code int he setting of play mode and difficulty mode.
Also, the component for each menu selection is also duplicated: 
```clojure

(defn menu-option [title options on-select]
  [:div
   [:h2 title]
   (for [{:keys [label value aria-label]} options]
     [:button
      {:aria-label aria-label
       :on-click   #(on-select value)} label])])

(defn difficulty-ai-menu [on-select]
  [menu-option  "Select AI difficulty"
   [{:label "EASY"
     :value :easy
     :aria-label "easy-ai-difficulty" }
    {:label "HARD"
     :value :hard
     :aria-label "hard-ai-difficulty"}]
   on-select])

(defn play-mode-menu [on-select]
  [menu-option "Select Play Mode!"
   [{:label      "Play Against Local Player"
     :aria-label "play-local-player"
     :value      :local}
    {:label      "Play Against AI Player"
     :aria-label "play-ai-player"
     :value      :ai}]
   on-select])

(defn goes-first-menu []
  [:div
   [:button {:aria-label "player-goes-first"} "I Go First!"]
   [:button {:aria-label "ai-goes-first"} "AI Goes First!"]])

(defn play-menu []
  (let [options (atom {:play-mode nil :ai-difficulty nil :first-player nil})
        go-back-to-menu #(swap! options assoc :play-mode nil)]
    (fn []
      (cond
        (nil? (:play-mode @options))
        [play-mode-menu #(swap! options assoc :play-mode %)]
        (and (= :ai (:play-mode @options))
             (nil? (:ai-difficulty @options)))
        [difficulty-ai-menu #(swap! options assoc :ai-difficulty %)]
        (and (= :ai (:play-mode @options))
             (nil? (:first-player @options)))
        [goes-first-menu]
        :else
        [tic-tac-toe-board go-back-to-menu]))))
```

So I create a component to render a menu options with different options and customizable title. All Test pass!

Ok, lets finish up the feature for allowing players to play against the ai.
Let's add a test if the player selects the ai to go first there is a x played in the board.
Here are the tests:
```clojure
(testing "It show board with x played when player selects ai to go first"
    (with-mounted-component
      [play-menu]
      (fn [component]
        (click-element (.getByLabelText component "play-ai-player"))
        (click-element (.getByLabelText component "easy-ai-difficulty"))
        (click-element (.getByLabelText component "ai-goes-first"))
        (is
          (label-component-in-dom? component #"X-play-")
```

Refelcting on how to implement I keep thinking of the Design Patter called strategy.  
Using this design patter we can set what happens when the player clicks an empty space.
In the case of playing against the ai, the play strategy has to play for the player then play for the ai.
If the play mode is agains another player then the play function passed with the strategy pattern is just our regular play method.


```clojure
(defn difficulty-ai-menu [on-select]
  [menu-option "Select AI difficulty"
   [{:label      "EASY"
     :value      get-random-move
     :aria-label "easy-ai-difficulty"}
    {:label      "HARD"
     :value      get-best-move
     :aria-label "hard-ai-difficulty"}]
   on-select]

(defn handle-user-play [space on-play game game-options]
  (let [{:keys [play-mode ai-move]} game-options]
    (cond
      (= :ai play-mode)
      (do
        (on-play space)
        (on-play (ai-move (play game space))))
      :else
      (on-play space))))


(defn tic-tac-toe-board [& [on-back options]]
  (let [{:keys [first-player play-mode ai-move]} options
        game (if
               (and (= :ai play-mode)
                    (= :ai first-player))
               (atom (play new-game (ai-move new-game)))
               (atom new-game))
        on-play #(swap! game play %)]
    (fn []
      [:div.game
       (let [board (:board @game)
             spaces (sort (keys board))]
         [:div.board
          (for [space spaces]
            (board-space board space #(handle-user-play space on-play @game options)))
          [:div
           [player-turn @game]
           [game-over @game]
           [reset-button #(reset! game new-game)]
           [play-options-menu on-back]]])]))

(defn play-menu []
  (let [options (atom {:play-mode nil :ai-play nil :first-player nil})
        go-back-to-menu #(swap! options assoc :play-mode nil :ai-play nil :first-player nil)]
    (fn []
      (cond
        (nil? (:play-mode @options))
        [play-mode-menu #(swap! options assoc :play-mode %)]
        (and (= :ai (:play-mode @options))
             (nil? (:ai-difficulty @options)))
        [difficulty-ai-menu #(swap! options assoc :ai-play %)]
        (and (= :ai (:play-mode @options))
             (nil? (:first-player @options)))
        [goes-first-menu #(swap! options assoc :first-player %)]
        :else
        [tic-tac-toe-board go-back-to-menu @options])))
```

Quite a bit of refactoring but here we implement the Strategy Design Pattern and makes it a lot easier to manage diffrent
difficulties.

<3!




