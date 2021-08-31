---
path: /tic-tac-toe-reagent
date: 2021-08-30T01:22:55.506Z
title: Tic Tac Toe in Clojure - Part 6 Web UI with Reagent
---

Today we showcased the CLI version of the tic tac toe to our 'client', everything went well.
Now we will work toward this story:

> Create Interface for Tic Tak Toe Game in the Web

We will be learning about Clojurescript, and the React-like library for clojurescript called [Reagent](https://reagent-project.github.io/).

A few things I've learned about clojurescript is that it seeks to address the weak link in client/embedded application 
development by replacing Javascript with Clojure. It is made possible thanks to the Google Closure library complier.

So to start the project I'm going to use [Figwheel](https://figwheel.org/)
>Figwheel Main builds your ClojureScript code and hot loads it as you are coding!

We get started with a simple comand line to bootstrap our clojurescript with reagent and fighweel boilerplate.
```bash
lein new figwheel-main tic-tac-toe-web -- +npm-bundle --reagent   
```

We run `yarn` to install dependencies and `lein fig:build` to get our development environment running! Sweet!

What I really love about this new tech stack is the ability to have a running repl interact with your app. 
Its like I have direct access to interact with the app and test different things really quick!

Alright, now that we have a working development environment lets move the code from our cli project over to clojurescript.

So we copied some files over to our Clojurscript project our and  renamed their file extensions from `clj` to `cljs`
We ran into issues and learned that `:refer :all` is not supported in Clojurscript, so we refactored some of that require code
in our clojurescript program made sure test passed and copied over the changes to our Clojurescript project.

Reagent uses `atoms` as its inmutable state for the react application state so we gotta make sure we `!swap` the game state
accordingly and when we expect it to change.

For now we just use one of our tic-tac-toe constants `new-game` and assign it to the atom like so:
```clojure
(defonce app-state (atom {:game tic-tac-toe/new-game}))
```

I want to figure out the UI html for this. So I'm going to read a bit on how to create components in reagent, so I get a better
idea on how to implement our board. Thinking of using SVGs to render out the board but not sure yet. I'm also wondering 
if I can also add some test to the UI components, not business logic test but behaviour test e.g.:
* does the board render properly,
* does clicking a spot call the play function with the correct argument,
* does it display the winner
* does it display if the game is over? 

Essentially all the responsibilities (display and input handling) of my UI like my CLI test but for reagent. I've come to love behaviour driven development in react with [React testing library](https://testing-library.com/)
I wonder if there is an equivalent for clojurescript and reagent, guess I have a lot to figure out!

Scratch that I can actually use [npm libraries with fighweel](https://figwheel.org/docs/npm.html) so I will attempt to write a simple test case for my UI using it.
A lot of trial and error at the moment but will share next time!



