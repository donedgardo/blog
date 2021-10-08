---
path: /clojure-hiccup-reagent
date: 2021-10-07T01:22:55.506Z
title: HTML Server Generation in Clojure
description: Generating HTML on the server using clojure JVM.
---

👋 Hello there!!

Our original story was **Be able to generate the html on the server-side using reagent so that I can reuse code.**
But after some research I came about some limitation on using reagent on the clojure jvm as explained in 
[this github issue.](https://github.com/reagent-project/reagent/issues/247)

In the ticket the author mentions the [hiccup](https://github.com/weavejester/hiccup) library which is exactly what we 
need.
> Hiccup is a library for representing HTML in Clojure. It uses vectors to represent elements, and maps to represent an
> element's attributes.

The great thing about hiccup is that it has very similar to reagent syntax, so we'll be looking into reusing some code.

#### Tic tac toe Clojure Server Package

So in our tic-tac-toe project we have serveral modules.
* Core module (Where all the rules for our tic tac toe game live)
* CLI module (Where all the code for the cli ui live)
* Web module (Where all the code for the reagent app live)

Today we'll create a new one for our server called `tic-tac-toe-server`.

Here is the start to our new server module.

core.clj:
```clojure
(ns tic-tac-toe-server.core
  (:require [hiccup.core :refer [html]])
  (:import (java.util HashMap)))

(def html-content
  (html [:span "hello world!"]))

(def home (clean.socket.HTMLRequestHandler. html-content))

(def files (clean.socket.FileRequestHandler. "/Users/ecarreras/tic-tac-toe-web/resources/public" ))

(def server (clean.socket.CleanServer.))

(def routes (HashMap. {"/" home
                       "*" files}))

(defn start []
  (.start server 3000 routes))
```


Next step I want to be able to reuse some web module code that uses reagent and use it with our hiccup library to 
generate the html at the server. That means we need to separate state management from the html generation. 

So let's create another module that will contain our html code in cljc, so we can share it across our reagent and server
modules.

Here is our menu-options.cljc module:
```clojure
(ns tic-tac-toe-html.menu-options
  (:require
    [tic-tac-toe-core.intl :refer [INTL]]
    [tic-tac-toe-core.play_options :refer [play-mode-options]]
    ))

(defn menu-options [title options on-select]
  [:div
   [:h2 title]
   (for [{:keys [label value aria-label]} options]
     [:button
      {:key        aria-label
       :aria-label aria-label
       :on-click   #(on-select value)} label])])

(defn play-mode-menu [on-select]
  (menu-options (:play-mode-options-title INTL)
   (for [option play-mode-options]
     (merge option {:aria-label (str (:value option) "-mode")}))
   on-select))
```

And our updated server module core.clj
```clojure
(ns tic-tac-toe-server.core
  (:require [hiccup.core :refer [html]]
            [tic-tac-toe-html.menu-options :refer [play-mode-menu]])
  (:import (java.util HashMap)))

(def html-content
  (html (play-mode-menu #("thing"))))

(def home (clean.socket.HTMLRequestHandler. html-content))

(def files (clean.socket.FileRequestHandler. "/Users/ecarreras/tic-tac-toe-web/resources/public" ))

(def server (clean.socket.CleanServer.))

(def routes (HashMap. {"/" home
                       "*" files}))

(defn start []
  (.start server 3000 routes))
```

Now we got some reusable code for both the server and reagent 🎉!~

❤️

