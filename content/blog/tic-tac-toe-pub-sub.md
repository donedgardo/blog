---
path: /tic-tac-toe-web-ai
date: 2021-09-15T01:22:55.506Z
title: Tic-Tac-Toe - Creating a Pub Sub Room
---

👋!!

Last time we were exploring the IPFS library in order to implement our player vs player feature
for our Tic Tac Toe Game. After a lot of experimenting and playing around with their javascript API and 
getting more familiar with using javascript libraries in clojurescript I will now share all my discoveries with some bits of 
snippets of our code.


I also want to take the opportunity to also share what is IPFS and libp2p libraries.

IPFS solves content addressing: **Find Fetch and Authenticate Content**

Libp2p solves process Addressing: **Find Connect and Authenticate Process**

-----
So here is our high level implementation flow:

#### 1. We create an IPFS node. This node is our identifier in the network it allows us to interact with the IPFS network and other nodes. 

```clojure
(defn create-ipfs-node []
    (.create js/Ipfs
             (clj->js {:config
                       {:Addresses
                        {:Swarm
                         ["/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star"
                          "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star"]}}
                       })))
```

Here I create the Ipfs node and configure it to use two multiaddresses for the signaling server, our swarm.

So what are multi-address?
> A multiaddress (often abbreviated multiaddr), is a convention for encoding multiple layers of addressing information into a single “future-proof” path structure.
>
> For example: /ip4/127.0.0.1/udp/1234 encodes two protocols along with their essential addressing information. The /ip4/127.0.0.1 informs us that we want the 127.0.0.1 loopback address of the IPv4 protocol, and /udp/1234 tells us we want to send UDP packets to port 1234.
>
> Multiaddresses can be composed to describe multiple “layers” of addresses.

What is a Swarm?
> Swarm can refer to a collection of interconnected peers.
>
> In the libp2p codebase, “swarm” may refer to a module that allows a peer to interact with its peers,

#### 2. We connect to a peer in the swarm using their address.

The following code allows get our multiaddrs  o we can share with others in the swarm in order to connect as peers.
```clojure
 (let [node (<p! (create-ipfs-node))
          my-addresses  (. (<p! (.id node)) -addresses)]
    ...)
```

Here is one of our multiaddrs: `/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/p2p/12D3KooWAMS8zvZnK8MJHWySAUoMzmHQmFavALf2MryQpXWjWRB3`
These are all the protocols we accept as methods of connection to us.

#### 3. Connect to a peer using its multiaddrs.
Once we have the multiaddrs of the peer we want to connect we then connect to it.

```clojure
(defn connect-to-peer [node multiaddr]
   (. (. node -swarm) (connect multiaddr)))
```

#### 4. Subscribe to a shared topic.
After connecting to our peer we want to subscribe to a shared topic, so we can share messages published by our peers.
```clojure
(defn subscribe-to-topic [node topic handle-message]
  (. (. node -pubsub) (subscribe topic handle-message)))
```

Here we use this `subscribe-to-topic` function, and we pass in the ipfs node, the topic we want to subscribe to a handler
function to be called everytime we get a new message from that topic.

#### 5. Publish messages
```clojure
(defn publish-msg [node topic msg]
  (. (. node -pubsub) (publish topic msg)))
```
Here we can publish messages to all connected peers who are subscribed to the topic.

Next we'll work on our user experience, and our UI for the web to introduce this new features to players in a seamless way.

<3!




