---
path: /hiccup-reagent-reuse-code
date: 2021-10-11T01:22:55.506Z
title: Hiccup and Reagent Code Reuse. 
description:  Refactoring our menu options in our reagent code to be able to change behaviour of interactive elements.
---
👋 Hello there!!

Today we want to maximize reusable code between our server side rendered tic-tac-toe game and
our reagent app.

#### Hiccup and reagent code reuse
Our main issue with reusing the hiccup code with reagent, is that our component now 
is expected to behave differently between the server and the client app version.
The server version expect the menu options to be a link to a new url, while the app version
executes some clojurescript on a click when a user interacts with them. 

This is our current code:
```clojure
(defn menu-options [title options on-select]
  [:div
   [:h2 title]
   (for [{:keys [label value aria-label]} options]
     [:a.button
      {:key        aria-label
       :aria-label aria-label
       :on-click   #(on-select value)} label])])

(defn play-mode-menu [on-select]
  (menu-options
    (:play-mode-options-title INTL)
    (for [option play-mode-options]
      (merge option {:aria-label (str (:value option) "-mode")}))
    on-select))
  ...
```

What we are going to do is create a `menu-options-links` with the behaviour desired for the server
and a `menu-options-buttons` for our application.

We take use of polymorphic runtime for this:
```clojure
(defn menu-options-links [title options]
  [:div
   [:h2 title]
   (for [{:keys [href aria-label]} options]
     [:a.button
      {:key        aria-label
       :aria-label aria-label
       :href       href } label])])

(defn menu-options-buttons [title options on-select]
  [:div
   [:h2 title]
   (for [{:keys [label value aria-label]} options]
     [:a.button
      {:key        aria-label
       :aria-label aria-label
       :on-click   #(on-select value)} label])])

(defn play-mode-menu
  ([]
   (menu-options-links
     (:play-mode-options-title INTL)
     (for [option play-mode-options]
       (merge option {:aria-label (str (:value option) "-mode")}))))
  ([on-select]
  (menu-options-buttons
    (:play-mode-options-title INTL)
    (for [option play-mode-options]
      (merge option {:aria-label (str (:value option) "-mode")}))
    on-select)))
```

There is some duplication here, so we can refactor it even more like so:
```clojure
(def play-options-with-aria-label
  (for [option play-mode-options]
    (merge option {:aria-label (str (:value option) "-mode")})))

(defn play-mode-menu
  ([]
   (menu-options-links
     (:play-mode-options-title INTL)
     play-options-with-aria-label))
  ([on-select]
   (menu-options-buttons
     (:play-mode-options-title INTL)
     play-options-with-aria-label
     on-select)))
```

Next we'll look into dynamic routing to allow the server to hold state based on the url
Eg: `/ai/:difficulty` -> `/ai/hard` and `/ai/easy`. This way the server can keep some of the state using the
uri. 

❤️

