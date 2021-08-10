---
path: /tail-recursions
date: 2021-08-02T01:22:55.506Z
title: Tail Recursions
description: 
---
![Tail Recursion](../assets/tails.png "Tail recursion" )

Today I learned about loop and recursion in Clojure.
```clojure
(defn is-even? [n]
  (if (= n 0)
    true
    (not (is-even? (dec n)))))
```

This works fine with small numbers but, once you get big integers the stack fills up rather quickly.

```clojure
(time (is-even? 1999999999))
Execution error (StackOverflowError) at koan-engine.runner/is-even? (form-init12162138873637638637.clj:2).
```

Yikes. That's because he has to dec n times the value of n. And that gets added up in the stack until it evaluates every single possible value.

What if we can go backward?
```clojure
(defn is-even-bigint? [n]
  (loop [n   n
         acc true]
    (if (= n 0)
      acc
      (recur (dec n) (not acc)))))
```

This is what tail recursion looks like in Clojure. We start at the evaluated number and our tail is the beginning, we accumulate the value as to not blow the stack!
```clojure
(time (is-even-bigint? 1999999999))
"Elapsed time: 89511.457975 msecs"
```








