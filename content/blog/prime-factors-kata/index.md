---
path: /prime-factors-kata
date: 2021-08-03T01:22:55.506Z
title: Prime Factors Kata
description: 
---
![Kata](../../assets/kata.jpeg "Kata" )

I did my first kata yesterday and recorded it, [the prime factors](http://www.butunclebob.com/ArticleS.UncleBob.ThePrimeFactorsKata) kata in Clojure.
The idea behind a kata is to practice your programming craft, it's not about the final code but about the journey.
I've done it a few times already, each time I do it I feel more comfortable. 
Today I learned about loop and recursion in Clojure.

> Repetition is the mother of mastery.



I followed Uncle bob steps, and worked my way up the test cases until my code magically was supporting all numbers!

I found it interesting that we don't test cases 5 and 7, it seems Uncle Bob is telling us we don't need them as if we follow the steps these cases get resolved on the generate prime factors method.

[Youtube](https://youtu.be/o9hwPp36A8U)

```clojure
(ns prime-factors-kata.core)
(defn generate [n]
  (loop [n n
         [accum possible-divider] [ [] 2 ]]
    (if (<= n 1)
      accum
      (if (<= n 3)
        (conj accum n)
        (if (= 0 (mod n possible-divider))
          (recur (/ n possible-divider) [(conj accum possible-divider) 2])
          (recur n [accum (inc possible-divider)])))))
```
Tests:
```clojure
(ns prime-factors-kata.core-spec
  (:require [speclj.core :refer :all]
            [prime-factors-kata.core :refer :all]))
(describe "Prime factors generator"
  (it "returns an empty list when n is 1"
    (should= [] (generate 1)))
  (it "returns an [2] when n is 2"
    (should= [2] (generate 2)))
  (it "returns an [3] when n is 3"
    (should= [3] (generate 3)))
  (it "returns an [2 2] when n is 4"
    (should= [2 2] (generate 4)))
  (it "returns an [2 3] when n is 6"
    (should= [2 3] (generate 6)))
  (it "returns an [2 2 2] when n is 8"
    (should= [2 2 2] (generate 8)))
  (it "returns an [3 3] when n is 9"
    (should= [3 3] (generate 9)))
  (it "doesn't blow the stack"
    (should= [2 2 3 3 5 5] (generate 900))))
```
