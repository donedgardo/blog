---
path: /proxy-java-clojure
date: 2021-10-12T01:22:55.506Z
title: Overriding Java Classes in Clojure
description: How can we extend Java classes in the clojure namespace?
---
👋 Hello there!!

So far we've been creating html responses using a static html generation with our HTMLRequestHandler.
As we now move towards managing state in the application layer rather than the library that handles our http
server, we would like to write more custom request handling inside the application layer.

#### Making Our Request Handler More Generic

Our current RequestHandler is an abstract class that has a handle method which implements the visitor patter to conform 
to the open/closed principle.

```java
public abstract class RequestHandler {
    protected String responseStatusHeader = "HTTP/1.1 200 OK\r\n";
    protected String responseTypeHeader = "Content-Type: text/html\r\n";
    protected String responseConnection = "Connection: keep-alive\r\n\r\n";

    public void handle(CleanHttpRequest request, OutputStream out) throws Exception {}
}
```

I would love to be able to create an instance of this RequestHandler in our clojure namespace and override the handle 
method to handle multiple types of responses, not just raw html responses.

I started thinking about the RequestHandler and comparing it to other http libraries like express from Node.js
They had this request and resonse object that had really helpful methods. The response object had methods to set the header 
status code, body, cookies and even a method just to end/send the response. 

So I've implemented them:
```java
public abstract class RequestHandler {
    protected String responseStatusHeader = "HTTP/1.1 200 OK\r\n";
    protected String responseTypeHeader = "Content-Type: text/html\r\n";
    protected String responseConnection = "Connection: keep-alive\r\n\r\n";
    protected String cookieHeader = "";
    protected String body = "";
    protected String responseLength = "";

    public void handle(CleanHttpRequest request, OutputStream out) throws Exception {}

    public void setStatusHeader(Number status) {
        this.responseStatusHeader = "HTTP/1.1 " + status + " OK \r\n";
    }

    public void setCookies (String cookie) {
        this.cookieHeader = "Set-Cookie: " + cookie + "\r\n";
    }

    public void setBody(String body) {
        this.body = body;
        this.responseLength = "Content-Length: " + body.length() + "\r\n";
    };

    public void send(OutputStream out) throws IOException {
        String rawResponse = responseStatusHeader + responseTypeHeader +
                responseLength + cookieHeader + responseConnection + body;
        out.write(rawResponse.getBytes());
    };
}

```

#### Override handle method in our clojure namespace

So for us to be able to create a custom handler in our clojure namespace we had to search how to override java methods
from abstract classes in clojure.

This is where the `proxy` macro comes to save the day!

```clojure
(def test-handler
  (proxy
    [clean.socket.RequestHandler]
    []
    (handle [request out]
      (do
        (.setBody this "override handler")
        (.send this out)))))

(def routes (HashMap. {"/" home-page
                       "/ai" ai-page
                       "/test" test-handler
                       "/ai/goes-first" goes-first-page
                       "*" files}))

(def server (clean.socket.CleanServer.))
(defn start []
  (.start server 3000 routes))
```
... and tada 🎉!
![override-handler](../assets/override-handler.png)

#### Managing state in the application layer vs the library

So in our java server we wrote a guessing game, and we created a session using a`ConcurrentHashMap` to deal with 
concurrency issues in a multithreading session.

I'm going to test if a clojure atom is enough to keep data between different threads.

```clojure
(def sessions (atom {}))

(defn get-session-id [cookies]
  (if (or
        (nil? cookies)
        (not (.containsKey cookies "sessionId")))
    (str (. UUID randomUUID))
    (.get cookies "sessionId")))

(def test-handler
  (proxy
    [clean.socket.RequestHandler]
    []
    (handle [request out]
      (let [cookies (.getCookies request)
            sessionId (get-session-id cookies)
            counter (@sessions sessionId)]
        (do
          (swap! sessions assoc sessionId (if (nil? counter) 1 (inc (@sessions sessionId))))
          (.setCookies this (str "sessionId=" sessionId))
          (.setBody this (str "counter " (@sessions sessionId)))
          (.send this out))))))
```

Lo and behold it works.
Two different browser open and both kept different their own counters!

Next we'll start doing some test driven development to develop our tic tac toe server side rendered version since now we have
everything we need!

❤️

