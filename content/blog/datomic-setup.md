---
path: /datomic-setup
date: 2021-10-26T01:22:55.506Z
title: Datomic Setup
description: I had a lot of issues setting up datomic for leiningen, so here I show what I've learned.
---

👋 Hello there!!

Today we'll be walking through how to set up the database library [Datomic](https://www.datomic.com/) for use in
Leiningen project. I've had a lot of issues and learned a lot so hopefully this will serve helpful for someone else or 
me in the future.

#### Installing Datomic

In the datomic doc they mention to install the datomic library into your local maven directory. I didn't know I had a 
local maven directory, so I looked around the `~/.m2` and tried running the install script that came from the install 
zip file, but that didn't work when trying to import datomic to the project.

Once you request an install from their website they sent through my email a password and username that I had not idea
what for. As I've read more the key concept that made me "aha" was that datomic was not in any public maven repository. 
In order to download and use the library I would have to access a private repository to download the library.

But how do we setup Leiningen to be able to access the private repository.

#### Leiningen Setup
Leiningen `project.clj` has a property to define what repositories to look for listed dependencies in its projects.
But knowing the private repository wasn't enough how do we pass in some of our secrets (username/password) without
committing them into code?


Using [environment based variables](https://github.com/technomancy/leiningen/blob/master/doc/DEPLOY.md#full-disk-encryption)
```clojure
...
  :repositories [["cognitect-dev-tools"
                  {:url      "https://dev-tools.cognitect.com/maven/releases/"
                   :username :env
                   :password :env}]]
```

We export the secrets in our shell or our `.bashrc`| `.zhrc` like so
```
export LEIN_USERNAME=xxxxx
export LEIN_PASSWORD=xxxxxxxxxxxxxxxxxx
```
We add our datomic to `deps`
```clojure
  :dependencies [...
                 [com.datomic/dev-local "1.0.238"]]

```

Once we run our leiningen project our project install the dependencies properly 🎉! 

#### Setup local Database

So after getting it installed we need just one more step to set up our local database.
We need to specify our directory path of our databases.

In our `~/.datomic/dev-local.edn` we specify the above directory
```
{:storage-dir "/Users/ecarreras/tic-tac-toe-web/db"}
```

Once we have this we can use our local instance of Datomic!

Using a [sample data](https://docs.datomic.com/cloud/dev-local.html#samples) and copying it to our above directory
```clojure
(ns tic-tac-toe-server.datomic-persistence
  (:require [datomic.client.api :as d]))

(def client (d/client {:server-type :dev-local
                       :system "datomic-samples"}))

(d/list-databases client {})
;=> ["mbrainz-subset" "solar-system" "social-news" "movies" ...]
```
_____
Next we'll be looking to create a new implementation of perishable using datomic and adding a new feature to our 
tic-tac-toe game, leaderboards!

❤️

