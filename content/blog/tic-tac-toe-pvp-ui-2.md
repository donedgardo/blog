---
path: /tic-tac-toe-pvp-ui-2
date: 2021-09-20T01:22:55.506Z
title: Tic-Tac-Toe - Player vs Player UX/UI Part Deux
---

👋!!

![tic-tac-toe pvp ux](../assets/tic-pvp-flow.jpg)
Picking up from last week, today we'll start by implementing the missing specifications for our Player
vs Player user experience.
* <s>On the play options component we want to have a new option for `Online Vs Mode`</s>
* <s>On clicking the online vs option the player should see two options: join or host a new game.</s>
* <s>On clicking the `host a new game options` the user should see an input with the label `New Room Name`</s>
* <s>On clicking the `host a new game options` the user should see a disabled button with the label `Create Room`</s>
* <s>After typing the room name in the room name input the `Create Room` button becomes enabled.</s>
* After clicking the `Create Room` button the hosting player should see "waiting for opponent to join" on the screen.
* After clicking the `Create Room` button the hosting player should see "share this room address to your opponent!" on the screen.
* After a user clicks `Join Game` option it should show an input with the label `Room Addresss`.
* After a user clicks `Join Game` option it should show a disabled button with the label `Join Room`.
* After a user types in the 'Room Address' input it should enable the `Join Room` button.
* After clicking the `Join Game` button it should show the new game board.
-----
### Implementation
* After clicking the `Create Room` button the hosting player should see "waiting for opponent to join" on the screen.
* After clicking the `Create Room` button the hosting player should see "share this room address to your opponent!" on the screen.

Test
```clojure
 (testing "It should loading after host creates a room"
    (with-mounted-component
      [play-menu-factory]
      (fn [component]
        (click-element (.getByLabelText component ":online-vs-mode"))
        (click-element (.getByLabelText component "host-game"))
        (change-input (.getByLabelText component "new-room-input") "room")
        (click-element (.queryByLabelText component "create-room-button"))
        (is
          (label-component-in-dom? component "loading-room")))))
```
Production Code
```clojure
(defn loading-room [room-id]
  [:div {:aria-label "loading-room"}
   [:p "Waiting on opponent to join game"]
   [:p {:aria-label "room-id"} (str "Share this address with your opponent " room-id)]])

(defn play-menu-factory []
  (let [options (atom default-game-options)
        go-back-to-menu #(reset! options default-game-options)]
    (fn []
      (let [{:keys [play-mode ai-difficulty first-player online-mode room-id] } @options
            ai-mode? (= :ai play-mode)
            online-mode? (= :online-vs play-mode)
            hosting-game? (= :host-game online-mode)]
        (cond
          (nil? (:play-mode @options))
          [play-mode-menu #(swap! options assoc :play-mode %)]
          (and ai-mode?
               (nil? ai-difficulty))
          [difficulty-ai-menu #(swap! options assoc :ai-difficulty %)]
          (and ai-mode?
               (nil? first-player))
          [goes-first-menu #(swap! options assoc :first-player %)]
          (and online-mode?
               (nil? online-mode))
          [online-vs-menu #(swap! options assoc :online-mode %)]
          (and online-mode?
               hosting-game?
               (nil? room-id))
          [create-room-form #(swap! options assoc :room-id %)]
          (and online-mode?
               hosting-game?
               (not (nil? room-id)))
          [loading-room room-id]
          :else
          [tic-tac-toe-board go-back-to-menu @options])))))
```


* After a user clicks `Join Game` option it should show an input with the label `Room Addresss`.
* After a user clicks `Join Game` option it should show a disabled button with the label `Join Room`.
* After a user types in the 'Room Address' input it should enable the `Join Room` button.


Actually as I wrote this blog I found that these stories I want to replace them with this simpler one:

So for this I want to leverage a library that handles client side routing. 
So lets say the link might be: `http://localhost:3000/join-game/:multiaddrs/:room-name`
Where multiaddrs and room name would be parameters sent down to the application so that the joining player can connect 
to peer and join game.

* After a player who navigates the link the hosting player shares, they should able to see the loading the game. 

I spent all night on setting up client side routing and went to bed defeated, hopefully tomorrow will go better!


<3!


