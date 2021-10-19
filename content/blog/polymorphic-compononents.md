---
path: /polymorphic-components
date: 2021-10-18T01:22:55.506Z
title: Polymorphic Components 
description: Making the most out of our ui components using polymorphism at runtime with hiccup.
---

👋 Hello there!!

Last time we will look into moving our state management from the client to the server and created some new `POST` 
endpoints to manage state. Today we'll be refactoring some of our UI components to send form data via `POST` request
rather than doing javascript/clojurescript to handle the state change.

#### Polymorphism at Runtime with our Hiccup Components

> Runtime polymorphism or Dynamic Method Dispatch is a process in which a call to an overridden method gets resolved at runtime rather than compile-time.
> 
> -- www.javapoint.com

Most of our UI components have an on-click parameter we send to handle and interaction from the user, usually this on click 
event triggered and event change in the UI, but we no longer want to do that with our server side application.
Our server side tic-tac-toe game handles state change on the server, and most components that changed state now are 
forms that are sent to the server via a `POST` request.

We'll be using runtime polymorphism to change the behaviour of the component based on if the functional component receives
the on click event via a parameter or not. 

Let's start looking at basic example, our reset button:
```clojure
(defn play-options-menu
  ([]
   [:form {:action "/reset" :method "POST"}
    [:button
     {:aria-label "play-options-menu"
      :name "reset" :value true} "Play Options"]])
  ([on-back]
   [:button
    {:aria-label "play-options-menu"
     :on-click   on-back} "Play Options"]))
```

From our server html generation code we call this component without arguments to get the form post behaviour and from our 
client side application we call it with the on-back parameter to get the client stateful component behaviour. Notice here
that since the button is now inside a form, and we don't have any form inputs, we need the `name` and `value` attributes 
on the button to send as form data to our restful endpoint. 

Thanks to our test we wrote we can still see this working at runtime on both our client and server apps.

Here is another interesting example, our board space component:
```clojure
(defn board-space
  ([board space]
   (let [mark (board space)]
     [:button.space
      {:key        space
       :id         space
       :name       "space"
       :value      space
       :aria-label (if (nil? mark)
                     (str "empty-board-space-" space)
                     (str mark "-play-" space))}
      mark]))
  ([board space on-space-click]
   (let [mark (board space)]
     [:div.space
      {:key        space
       :id         space
       :on-click   on-space-click
       :aria-label (if (nil? mark)
                     (str "empty-board-space-" space)
                     (str mark "-play-" space))}
      mark])))
```

This one is more interesting as you'll notice there is not form wrapper on the method without the on-click event.

This is because we wanted all our buttons to be under the form that handles the board rather than a form for each button.
This UI component gets called with map function across all board spaces of our tic-tac-toe board. Our tic-tac-toe board
component is quite different from our client and our server implementation, so we wrote a new component specifically for
the server.

Server tic-tac-toe board component:
```clojure
(defn tic-tac-toe-board [game]
  [:div.game
   (let [board (:board game)
         spaces (sort (keys board))]
     [:form.board {:action "/play" :method "POST"}
      (for [space spaces]
        (board-space board space))
      ])
   [:div
    (player-turn game)
    (game-over game)
    (reset-button)
    (play-options-menu)]])
```


Great, we were able to reuse some UI components while keeping our components adhere to the Open/Closed principle !


Next we'll start looking into how we managed to persisting game sessions through server restarts! 
❤️

