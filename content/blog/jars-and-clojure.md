---
path: /jars-and-clojure
date: 2021-10-047T01:22:55.506Z
title: JARs and Clojure 
---

👋 Hello again!!

Today and in the next couple of week we will be looking into crating our java socet server into a library in the form of
a `.jar` and using it in clojure to host our tic tac toe clojure game in the server!

#### Creating a JAR library

I've been using gradle as my package manager for the clean java socket server. Today I learned how to leverage this powerful
library to generate a executable `.jar` for us to use in our clojure namespace.

Running `./gradlew build` straight from the cli gave us these errors:
```
clean.socket.CleanServerTest > rendersPngFile FAILED
    java.net.ConnectException at CleanServerTest.java:65
        Caused by: java.net.ConnectException at SocketChannelImpl.java:-2

clean.socket.CleanServerTest > rendersGifFile FAILED
    java.net.ConnectException at CleanServerTest.java:81
        Caused by: java.net.ConnectException at SocketChannelImpl.java:-2
```
🤔

Apparently our build executes our test before the build, that was nice but unexpected.
In order to make the test pass I ran the server on another terminal process and tada 🎉:
```
BUILD SUCCESSFUL in 3s
7 actionable tasks: 2 executed, 5 up-to-date
```

The output of our jar file was in our `app/build/libs/app.jar` 😎. 

#### Using our new jar library in our tic-tac-toe clojure namespace

Easisest way I found how to do this was to run create a new lib folder in our clojure tic tac toe project called lib.
In it I just inserted our `app.jar` file.   

In our lein project we added: 
```clojure
  :resource-paths ["lib/app.jar"]
```

And to test if this worked we ran our repl `lein repl` and tried using the our clen socket server class.   

```
user=> (def app (clean.socket.CleanServer.))
#'user/app
user=> (.start app 3000)
Server Starting!!!
```

Awesome! ✌️

❤️

