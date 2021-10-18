---
path: /tic-tac-toe-server-tdd
date: 2021-10-13T01:22:55.506Z
title: Tic-Tac-Toe Server TDD
description: Developing our server side render application with TDD.
---

👋 Hello there!!

Last time we looked into making our request handling more generic, so we can make custom routes in our clojure project.
Today we will be looking into doing some test driven development to our server clojure rendered tic tac toe application.



#### Our first test 

So the first thing in our test is being able to run the server concurrently in a new thread as we run a suite of tests.
Today I learned about the `future` macro.

> clojure.core/future (macro) 
>
> [& body]
>
>  Takes a body of expressions and yields a future object that will invoke the body in another thread, and will cache the result and return it on all subsequent calls to deref/@. If the computation has not yet finished, calls to deref/@ will block, unless the variant of deref with timeout is used. See also - realized?.
>

This allowed me to create a thread to start the server before we stup our thes

Here is our test:
```clojure
(describe "tic-tac-toe server application"
          (before-all (future (start)))
          (it "shows ai option"
            (should= false
                     (nil?
                       (re-find
                         #":ai-mode"
                         (:body (http-client/get "http://localhost:3000")))))))
```
Here I test that the application shows the play against the ai option menu using a http get library against our application
that started on the `before-all` which runs before all test.


Here is our production code:
```clojure
(def app-handler
  (proxy
    [clean.socket.RequestHandler]
    []
    (handle [request out]
      (let [cookies (.getCookies request)
            sessionId (get-session-id cookies)
            play-options (@sessions sessionId)]
        (do
          (.setCookies this (str "session-id=" sessionId))
          (.setBody this (layout (render-game play-options)))
          (.send this out))))))

(def routes (HashMap. {"/"   app-handler
                       "*"   files-route}))
```

Rather than just create the html on each request we use this render application function which is very similar to our
reagent render logic but instead the state comes from an atom that lives in the server.

```clojure
(defn render-game [options]
  (let [{:keys [play-mode ai-difficulty first-player]} options
         ai-mode? (= :ai play-mode)]
    (cond
      (nil? (:play-mode options))
      (play-mode-menu)
      (and ai-mode?
           (nil? ai-difficulty))
      (difficulty-ai-menu)
      (and ai-mode?
           (nil? first-player))
      (goes-first-menu)
      :else
      nil)))
```
Our test now pass, tada 🎉!

Tomorrow we will look into how we can create a session data that lives in the server so we manage the rendering state 
of our application using cookies and atoms on the server.

❤️

