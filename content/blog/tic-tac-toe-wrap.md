---
path: /tic-tac-toe-lessons-learned
date: 2021-11-28T01:22:55.506Z
title: Clean Coders Apprenticeship - Lessons Learned.  
---

Throughout my apprenticeship, I've been tasked with planning a software project and practicing code katas to design and
implement systems with new programming languages and paradigms. 

A lot of lessons learned went into a Tic Tac Toe Project as it went into multiple iterations for various features like:
* Multiple UI's. (CLI, client app, server-rendered app).
* "AIs" (Easy and Hard) MiniMax.
* Local play mode.
* Player vs. Player (networked and peer-to-peer)
* HTTP Authoritative Server 
* Persistence with different databases.
* Leaderboards

The biggest takeaway from the project was how vital clean architecture is for the project's velocity and flexibility to 
change as requirements do. When coding the CLI UI, I learned the hard way and did repetitive work to add the web UI. 
However, the difference was night and day once I cleaned up my architecture, and changing or adding input/outputs like 
the database was effortless. Thank you, polymorphism. <3

We learned about estimating, giving a range of numbers to communicate risk, and how to manage that risk by planing around worst-case scenarios.

As a clean coder apprentice I've learned.
* A new programing paradigm: functional programing. [Clojure Koems](/blog/koems) [Coin Changer](/blog/coin-changer)
* A new programing language:  clojure and java. [Jar and Clojure](/blog/jars-and-clojure) 
* New Disciplines like [Test Driven Development TDD](/blog/tic-tac-toe-server-tdd) 
[Behaviour Driven Development BDD](/blog/reagent-behaviour-driven-development), [Katas](blog/prime-factors-kata), 
Pair Programing,  and more.
* The importance of good code architecture. [Clean Architecture](/blog/clean-architecture) [Polymorphism](/blog/persistence-refactor)
* How to design system that enable productivity in development. 
* How to leverage design patterns to enable clean and flexible code. [Visitor Pattern](/blog/proxy-java-clojure) 
[Factory Pattern](/blog/tic-tac-toe-web-factory-game) [Strategy Pattern](/blog/tic-tac-toe-web-easy-ai/)
* How to plan and communicate estimates clearly with stakeholders/project managers and handling expectations. [Preemptive Postmortems](/blog/preemptive-postmortem)
* What it means to be a professional developer and why disciplines matter.