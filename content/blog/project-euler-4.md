---
path: /project-euler-part-4
date: 2021-08-16T01:22:55.506Z
title: Project Euler Part 4
description: 
---

Welcome back!

We skipped over the 9th Euler Project so lets tackle that one next.

Fun fact Euler and I share the same birthday :D!

9th problem:
---
>A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
> <br></br> a2 + b2 = c2
> <br></br> For example, 32 + 42 = 9 + 16 = 25 = 52.
> <br></br>There exists exactly one Pythagorean triplet for which a + b + c = 1000.
> <br></br> Find the product abc.

So lets try breaking this into smaller functions.
* A function we pass a map of `{:a :b :c }`  and it tells us if its a `pythagorean?` or not
* Another function that also recieves this map type to check if its a pythagorean triplet by using the function above and checking if
`a < b < c`.
* A function that generates a combination of possible values of a b c where each of them range from 1 up to 500 (1000/2).
I'm not sure if this assumption is correct, meaning if the max value for any of them is half the of the sum value, but it worked for this problem.
Trying to do a combination of 1000 was rather big (more than a minute to execute), so I cut it down the scope by half.

After this we just use a stateful transducer to:
1. generate the possible list of {:a :b :c } values.
2. filter out the ones that aren't `pythagroan-triplets?`
3. filter out the ones that :a :b and :c sum to the desired value (1000).
4. Return the product of :a :b and :c!

Tada 🎉!





