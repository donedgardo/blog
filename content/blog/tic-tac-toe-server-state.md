---
path: /tic-tac-toe-server-state
date: 2021-10-14T01:22:55.506Z
title: Tic-Tac-Toe Server State Management in Clojure
description: Managing our state of our tic-tac-toe clojure server implementation.
---

👋 Hello there!!

Last we looked into doing some test driven development as we added state and rendering logic to our tic tac toe server.
Today we will look into moving our state management from the client to the server so its properly handles render the
application.


#### Sending messages using POST request

The first step in to managing state in the server is being able to change the state from the client.
Our client side tic tac toe game made in reagent handled these via clojurescript on click events. In our
server side game we will update state using HTTP post messages. 

Let's start with a test:
```clojure
(def session-id "test-id")

(defn select-ai-mode []
  (http-client/post "http://localhost:3000/ai"
                    {:form-params {:mode "ai-mode"}
                     :headers     {"Cookie" (str "session-id=" session-id)}}))
(describe "tic-tac-toe server application"
          (before-all (future (start)))
          ...
          (it "shows difficulty options after clicking ai-mode"
            (should= false
                     (nil? (re-find
                             #"-ai-difficulty"
                             (:body (select-ai-mode)))))))

```
Here I'm testing that when a form submission send a post request to our /ai endpoint the application renders
the difficulty menu options. I'm also setting a test session id in our cookies header, so 
we are able to test our rendering logic throughout our test session.


Here is our production code:
```clojure
(def sessions (atom {}))
(def session-key "session-id")

(defn get-session-id [cookies]
  (if (or
        (nil? cookies)
        (not (.containsKey cookies session-key)))
    (str (. UUID randomUUID))
    (.get cookies session-key)))

(def play-ai-handler
  (proxy
    [clean.socket.RequestHandler]
    []
    (handle [request out]
      (let [cookies (.getCookies request)
            session-id (get-session-id cookies)
            game-options (assoc default-game-options :play-mode :ai)]
        (do
          (swap! sessions assoc session-id game-options)
          (.setCookies this (str session-key "=" session-id))
          (.setBody this (layout (render-game game-options)))
          (.send this out))))))


(def routes (HashMap. {"/"   app-handler
                       "/ai" play-ai-handler
                       "*"   files-route}))
```

Our test now pass, and now we keep the game options saved in our server using an atom and a cookie, we just render the 
application again with the new options and tada 🎉!


Next we'll start working with moving the board state to the server! 

❤️

