---
path: /tic-tac-toe-pvp-ui-4
date: 2021-09-21T01:22:55.506Z
title: Tic-Tac-Toe - Player vs Player Network Messages
---

👋!!

Alright now lets get to the good stuff, lets make both peers interface with our game through our pubsub.

This is the message protocol I have in mind.

The first one to join will be the host opponent.

When playing on a board space.
```json
{ "type": "play",
  "board-space": "<space>"
}
```
When a player plays we want to update the game state on each peer.

We will only accept plays from the player who has turn active.

When resetting the board.
```json
{
 "type": "reset"
}
```

After a lot of refactoring here is the production code.

First our both join-game component:
```clojure
(defn join-game [peer-address room-id]
  (let [network-state (atom {:node nil :my-addresses [] :peer-ids [] :opponent nil})
        on-play #(handle-play (:node @network-state) room-id %)
        on-reset #(handle-reset (:node @network-state) room-id)
        on-join #(handle-connection network-state %1 %2 %3)]
    (reagent/create-class
      {:display-name
       "join-game"
       :component-did-mount
       (fn []
         (join-room peer-address room-id on-join))
       :component-will-unmount
       (fn []
         (unsubscribe-game (:node network-state) room-id))
       :reagent-render
       (fn []
         [:div
          (cond
            (nil? (:opponent @network-state))
            [:p {:aria-label "join-room-loading"} "Joining Room..."]
            :else
            [:div "Playing as O"
             [tic-tac-toe-board
              #(%)
              {:online
               {:play     on-play
                :reset    on-reset
                :player   O
                :node     (:node @network-state)
                :room-id  room-id}}]])])})))
```


First our both host-game component:
```clojure
(defn host-game [room-id go-back]
  (let [network-state (atom {:node nil :my-addresses [] :peer-ids [] :opponent nil})
        on-play #(handle-play (:node @network-state) room-id %)
        on-reset #(handle-reset (:node @network-state) room-id)
        on-host #(handle-connection network-state %1 %2 %3)]
    (reagent/create-class
      {:display-name
       "host-game"
       :component-did-mount
       (fn []
         (host-room room-id on-host))
       :component-will-unmount
       (fn []
         (unsubscribe-game (:node network-state) room-id))
       :reagent-render
       (fn []
         [:div {:aria-label "loading-room"}
          (cond
            (empty? (:my-addresses @network-state))
            [:p "Creating Room..."]
            (nil? (:opponent @network-state))
            [:div
             [:p "Waiting for opponent.."]
             [:p
              {:aria-label "room-id"}
              (str "Share this address with your opponent ")]
             [:span (create-join-link (first (:my-addresses @network-state)) room-id)]]
            :else
            [:div "Playing as X"
             [tic-tac-toe-board
              go-back
              {:online
               {:play    on-play
                :reset   on-reset
                :player  X
                :node    (:node @network-state)
                :room-id room-id}}]])])})))
```

They seem very similar we might just remove some duplication maybe with a strategy pattern.

Here is our board module:
```clojure
(defn on-play [online game space]
  (if (nil? online)
    (swap! game play space)
    (if (= (:active-player @game) (:player online))
      (do
        (swap! game play space)
        ((:play online) space)))))


(defn handle-reset [online reset-game]
  (do
    (if (not (nil? online))
      ((:reset online)))
    (reset-game)))


(defn reset-game [game new-game]
  (reset! game new-game))

(defn subscribe-to-game [online game new-game]
  (if (not (nil? online))
    (subscribe-to-topic
      (:node online)
      (:room-id online)
      (fn [msg]
        (let [payload (js->clj (.parse js/JSON (. (. msg -data) (toString)) :keywordize-keys true))]
          (js/console.log "payload" payload)
          (cond
            (= (payload "type") "reset")
            (reset-game game new-game)
            (= (payload "type") "play")
            (swap! game play (payload "board-space"))
            :else
            nil))))))

(defn tic-tac-toe-board [& [on-back options]]
  (let [{:keys [first-player ai-difficulty online]} options
        new-game (create-game-factory
                   {:first-player  first-player
                    :ai-difficulty ai-difficulty})
        game (atom new-game)
        handle-play #(on-play online game %)
        subscription (subscribe-to-game online game new-game)]
    (fn []
      [:div.game
       (let [board (:board @game)
             spaces (sort (keys board))]
         [:div.board
          (for [space spaces]
            (board-space board space #(handle-play space)))
          [:div
           [player-turn @game]
           [game-over @game]
           [reset-button #(handle-reset online reset-game)]
           [play-options-menu on-back]]])])))
```

Here's our network util function:
```clojure
(def room-state (atom {:node nil :my-addresses [] :peer-ids [] :opponent-address nil :msg-input nil}))

(defn get-peer-ids [node topic]
  (. (. node -pubsub) (peers topic)))

(defn create-ipfs-node []
  (.create js/Ipfs
           (clj->js {:config
                     {:Addresses
                      {:Swarm
                       ["/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star"
                        "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star"]}}
                     })))


(defn connect-to-peer [node multiaddr]
  (. (. node -swarm) (connect multiaddr)))

(defn subscribe-to-topic [node topic handle-message]
  (. (. node -pubsub) (subscribe topic handle-message)))

(defn publish-msg [node topic msg]
  (. (. node -pubsub) (publish topic msg)))

(defn create-join-link [address room-id]
  (str (.. js/window -location -href) "#join-game/" room-id "?address=" address))

(defn handle-play [node room-id space]
  (publish-msg node room-id (js/JSON.stringify (clj->js {:type "play" :board-space space }))))

(defn handle-reset [node room-id]
  (publish-msg node room-id (js/JSON.stringify (clj->js {:type "reset" }))))

(defn log-messages [msg]
  (js/console.log (. (. msg -data) (toString))))

(defn get-my-addresses [id]
  (map #(.toString %) (. id -addresses)))

(defn create-ipfs-util [topic handle-messages]
  (go
    (let [node (<p! (create-ipfs-node))
          my-addresses (get-my-addresses (<p! (.id node)))
          subscription (<p! (subscribe-to-topic node topic handle-messages))
          interval (js/setInterval #(do
                                      (go
                                        (let [peer-ids (<p! (get-peer-ids node topic))]
                                          (swap! room-state assoc :node node :my-addresses my-addresses :peer-ids peer-ids))))
                                   3000)]
      node)))

(defn connect-to-peer-form [node address]
  (fn []
    [:div
     [:label "Opponents Address"]
     [:input {:type        "text"
              :value       (:opponent-address @room-state)
              :on-change   #(swap! room-state assoc :opponent-address (-> % .-target .-value))
              :placeholder "Opponents Address"}]
     [:button {:on-click #(connect-to-peer node address)} "Connect to Opponent"]]))

(defn send-msg-form [topic]
  (fn []
    [:div
     [:label "Send Message"]
     [:input {:type        "text"
              :value       (:msg-input @room-state)
              :on-change   #(swap! room-state assoc :msg-input (-> % .-target .-value))
              :placeholder "Chat..."}]
     [:button {:on-click #(publish-msg (:node @room-state) topic (:msg-input @room-state))} "Send Message"]]))

(defn peers-list [peer-ids]
  [:ul
   (for [peer peer-ids]
     [:li {:key peer} peer])])

(defn network-utils []
  (let [topic "clean-tic-tac-toe"
        node (create-ipfs-util topic log-messages)]
    (fn []
      [:div
       [:div "My Address: "
        [:ul
         (for [address (:my-addresses @room-state)]
           [:li {:key address} address])]
        [:div "Connected Peers: "
         [peers-list (:peer-ids @room-state)]
         [:div [connect-to-peer-form node (:opponent-address @room-state)]]
         [:div [(send-msg-form topic)]]]]])))

(defn handle-connection [network-state node my-addresses peer-ids]
  (cond
    (empty? peer-ids)
    (swap! network-state assoc :node node :my-addresses my-addresses :peer-ids [] :opponent nil)
    (nil? (:opponent @network-state))
    (swap! network-state assoc :node node :my-addresses my-addresses :peer-ids peer-ids :opponent (first peer-ids))
    :else
    (swap! network-state assoc :node node :my-addresses my-addresses :peer-ids peer-ids)))


(defonce interval (atom 0))


(defn unsubscribe-game [node room-id]
  (go
    (try
      (js/clearInterval @interval)
      (<p! (.stop node))
      (<p! (. (. node -pubsub) (unsubscribe room-id))))))

(defn join-room [peer-address room-name on-join]
  (go
    (let [node (<p! (create-ipfs-node))
          peer-connection (<p! (connect-to-peer node peer-address))
          subscription (<p! (subscribe-to-topic node room-name log-messages))]
      (reset!
        interval
        (js/setInterval
          #(do
             (go
               (let [peer-ids (<p! (get-peer-ids node room-name))
                     my-addresses (get-my-addresses (<p! (.id node)))]
                 (on-join node my-addresses peer-ids))))
          2000)))))

(defn host-room [room-name on-host]
  (go
    (let [node (<p! (create-ipfs-node))]
      (reset!
        interval
        (js/setInterval
          #(do
             (go
               (let [peer-ids (<p! (get-peer-ids node room-name))
                     my-addresses (get-my-addresses (<p! (.id node)))]
                 (on-host node my-addresses peer-ids))))
          2000)))))

```

I feel like this should be a class.
Next we'll look on how to make this code easier to maintain, by creating the class implementing strategy pattern for 
crating networked gamed, and mocking our network util for use of tests.

<3!


