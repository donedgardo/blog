---
path: /tic-tac-toe-web-ai
date: 2021-09-14T01:22:55.506Z
title: Tic-Tac-Toe - Peer 2 Peer with IPFS
---

👋!!
Last time we worked on making sure we had all features on both our cli and web UIs.
We removed a lot of duplicate added more test on both the UI and the core system.

Today we are going to look into a Peer to peer library, well really a library that helps build the [new web 3.0](https://www.gemini.com/cryptopedia/web-3-0-definition-open-internet-decentralized).
The library is called `js-ipfs` under the hood it leverages [libp2p network stack](https://libp2p.io/).

**js-ipfs**
> A full P2P protocol written entirely in JavaScript
> js-ipfs paves the way for the Browser implementation of the IPFS protocol. Written entirely in JavaScript, it runs in a Browser, a Service Worker, a Web Extension and Node.js, opening the door to a world of possibilities.

**libp2p**:
> A modular network stack.
> Run your network applications free from runtime and address services, independently of their location.

[**ipfs**](https://ipfs.io/)
> IPFS powers the Distributed Web
>  A peer-to-peer hypermedia protocol
>  designed to preserve and grow humanity's knowledge
>  by making the web upgradeable, resilient, and more open.

For our tic tac toe game might be overkill, but I wanted to take the opportunity and learn about these new tools, so why not!

Talking about I also need more experience with integrating js libraries with Clojurscript, although I don't love interop, 
I feel like I need more practice with it to feel comfortable in clojurscript.

So first we need not install `ipfs-core`.

* `npm install ipfs-core`

The first roadblock we faced was using webpack to bundle the package with this library.
Tried a few things but I ended up just following the docs suggestion to use a hosted bundle version.
So to move things forward we did.

*public/index.html*
```html
...
  <div id="app">
  </div> <!-- end of app div -->
  <script src="https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js"></script>
  <script src="cljs-out/dev/main_bundle.js" type="text/javascript"></script>
```

So to access the library we use interop `js/Ipfs`.

First question I had, how do we integrate this while maintaining boundary between the library and our business rules. 

What I imagine would work is that I have a function to create a room wher it would create a ipfs node where we could publish
and subscribe messages for that room.

2nd roadbloack was more around how to interop and using promises and await.
I've learned about `cljs.core.async` library with `go <p!`

Heres first version of the integration:
```clojure
(ns ^:figwheel-hooks tic-tac-toe-web.create-room
  (:require
    [cljs.core.async :refer [go]]
    [cljs.core.async.interop :refer-macros [<p!]]))

(defn create-ipfs-room []
  (go
    (let [node (<p!
                 (.create js/Ipfs
                          (clj->js {:config
                                     {:Addresses
                                      {:Swarm
                                       ["/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star"
                                        "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star"]}}
                                     })))]
      [:div "room"])))
```

The wrtc-star* addresses are free webrtc signaling servers used for testing and developing. ipfs has an option so you can host
your own webrtc signaling server with an Ipfs node. There are some limitation for browser to browser comunication that require this signaling server.
There is work being done to not have this required. browser <-> nodejs and nodejs <-> nodejs don't need a signaling server atm, 
which looks promising.

Next we will look into more test driven development for the library and actual implemntation of creating a pubsub room.
For this I need to learn how to manage routes in reagent so that I can create a sharable link in order for players to connect into a room
and play.

<3!




