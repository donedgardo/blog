---
path: /tic-tac-toe-state-persisting
date: 2021-10-19T01:22:55.506Z
title: Persisting Tic-Tac-Toe State on Server Restarts
description: So far we've been keeping state of the server tic-tac-toe game application in memory but no more, here we will implement saving the state in a file.
---

👋 Hello there!!

So far we've been keeping state of the server tic-tac-toe game application in memory but no more, here we will implement
saving the state in a file.

Thinking about the design of the state saving I need a way to deserialize our state in order to save it in a text file,
and a way to serialize it back in order to load it. My game state is mostly easily serializable using `clojure.edn/read-string`

> defn read-string
>
> "Reads one object from the string s. Returns nil when s is nil or empty.
> Reads data in the edn format (subset of Clojure data)

My main issue is our `:ai-play` which is a function and is not serializable so on saving and loading state I need to either,
remove the ai-play function before serializing it and adding it when deserializing.

So let's start with our test:

```clojure
(def test-sessions
  {"test"
   {:options
          {:play-mode     nil
           :ai-play       nil
           :first-player  nil
           :online-mode   nil
           :ai-difficulty nil
           }
    :game nil}})

(def test-sessions-2
  {"test2"
   {:options default-game-options
    :game    (create-game-factory default-game-options)}})

(def ai-game-options
  (assoc default-game-options :play-mode "ai" :ai-difficulty "easy" :first-player "ai"))

(def test-sessions-3
  {"test3"
   {:options ai-game-options
    :game    (create-game-factory ai-game-options)}})


(describe
  "sessions"
  (before (save-sessions test-sessions))
  (it "should load a new game session from file"
    (should= test-sessions (load-sessions)))
  (it "should save a default game session from file"
    (should=
      test-sessions-2
      (do
        (save-sessions test-sessions-2)
        (load-sessions))))
  (it "should save an ai game session from file"
    (should=
      test-sessions-3
      (do
        (save-sessions test-sessions-3)
        (load-sessions)))))
```

In our test we mock some sessions and have some function for saving and loading the state.

Lets look at the implementation:
```clojure
(defn load-sessions []
  (let [sessions-without-ai-play (clojure.edn/read-string (slurp "./sessions.txt"))]
    (reset!
      sessions
      (reduce-kv
        (fn [m k v]
          (let [game (:game v)
                options (:options v)
                ai-play (get-ai-command (:ai-difficulty options))
                game-with-ai-play (if (nil? game) nil (assoc game :ai-play ai-play))]
            (assoc m k (assoc v :game game-with-ai-play))))
        {}
        sessions-without-ai-play))))

(defn save-sessions [sessions]
  (spit
    "./sessions.txt"
    (str
      (reduce-kv
        (fn [m k v]
          (let [game (:game v)
                game-without-ai-play (if (nil? game) nil (assoc game :ai-play nil))]
            (assoc m k (assoc v :game game-without-ai-play))))
        {}
        sessions))))
```

Our hero function that I learned about is `reduce-kv`:

> (reduce-kv f init coll)
>
>  Reduces an associative collection. f should be a function of 3
>  arguments. Returns the result of applying f to init, the first key
>  and the first value in coll, then applying f to that result and the
>  2nd key and value, etc. If coll contains no entries, returns init
>  and f is not called. Note that reduce-kv is supported on vectors,
>  where the keys will be the ordinals.

It allowed us to easily reduce a map into a new map.

Our save function removes the :ai-play function from the state to be able to easily serialize it into a string that we 
can later easily load with our `read-str` function.

Our load function loads from the text file and adds the ai-play into it. 
Thankfully we had a function in our tic-tac-toe core library (business /use cases rules) to get this 
ai-play function.

I also found extremely intuitive and hilarious the function name for writing and reading files in clojure (spit/slurp)

❤️

