---
path: /software-stack-for-the-web-3-developer
date: 2022-01-14T01:22:55.506Z
title: The Software Stack for the Web 3.0 Developer. 
featuredImage: ../assets/web3.0-software-stack.jpeg
---

If you are a web developer looking to build decentralized applications and want to learn the tools, frameworks, and languages that will empower you, you've come to the right place. The following blog will mention some essential tools and concepts to add to your repertoire to build your own decentralized applications. But first, let me explain web 3.0 and how it differs from the current web.

### Web 1.0

Web 1.0 started in 1991 and ended around 2004. It has been called the Wikipedia days. It mainly was one massive library of information with hyperlinks. Web 1.0 was primarily read-only and had no user-generated content; instead, users were only consumers.

### Web 2.0

Web 2.0 is considered to start from 2004 and is currently dominating today's web. Thanks to web browsers tools like flash and javascript, the web has evolved significantly. Not only were users getting information from websites, but websites were now getting information from users, like Facebook, Youtube, and Google searches. 

Companies started gathering information about us to serve us better content, making us stay on their websites longer. Eventually, companies began selling all the data from their users to advertisers. Web 2.0 is also known as the age of targeted advertising and the lack of privacy.

Centralized systems are built around central authorities that control a significant amount of power and are not foolproof. The current web (web 2.0) shows limits in:
* Data security with single points of failure.
* Accessibility and the risk of censorship.
* Network Efficiency, with traffic congestions and location-based content with latency deficiencies.
* The lack of permanence of information, as websites are lost or destroyed each day.

### Web 3.0

There is not an official definition of what web3.0 is. The following is my attempt to explain it. Web 3.0 is a global attempt to have a decentralized, distributable internet. It will leverage blockchain technology and decentralization tools while supporting new experiences like VR and 3d web.

In web 2.0, you were the product; however, in web 3.0, you will be the owner of the content. In addition, in web 3.0, data is not stored in one centralized entity but is distributed instead; theoretically, it would be in thousands of computers to avoid attacks and censorship. 

Instead of central authorities governing, we will see more Decentralized Autonomous Organizations (DAO). This means that instead of CEOs or presidents, users with the most tokens (shareholders) will get to vote on how the company changes, not on government policies but on programmatic policies developed in smart contracts. Another significant feature of Web 3.0 is that your digital identity is not 100% connected to your real-world identity.

Now for the good stuff.

## The software stack for web 3.0 developers.

In the core of all web applications, we deal with data in different stages: 
* Using data (Applications)
* Defining the data transformations (Business Logic)
* Moving data (Transports and Protocols)
* Storing data (Databases, File storage)

Next, we'll look at tools and frameworks that empower web 3.0 developers.

## Web Applications tools. 
Luckily for web developers, we don't have to learn new frameworks or tools to build web applications. The same tools, such as React, Vue, Angular, etc., are also used to make web 3.0 applications. We call web applications on the web 3.0 dApps for decentralized applications.

The main difference in dApps is how the application is hosted and how it communicates with blockchain networks. In web 2.0, one would build the application and upload the build to a hosted server where the server would then serve the application. In contrast with dApps, they would usually contain one or more of these characteristics:
* They are Open-sourced. Meaning anyone can look at the code and help audit the application.
* Hosted on a distributed network. We will look into more details about the tools to do this.
* The address for the application is defined by its content, not by its location. Let's take deeper dive into this next.

### Content-Based vs. Location-Based Addressing.

Take a look at the following URL:
`https://domain.com/path/to/file.png`

Let's break this URL down:

1. The server's location `domain.com` points to an IP address like its physical address.
2. The `path/to` is a tree view, standard for directory listings.
3. We have the `file.png`, which we want to access with its extension so that our application knows how to read it.

This URL is location-based, meaning the content of this file is only accessible based on the location (IP/domain) defined in the URL.
If the domain is shut down, crashed, sold, etc., the content of the file.png is lost "forever." 

Now let's take a look at the following URL:
`/ipfs/#HASCODE/path/to/file.png`

This URL is content-based, meaning the address of the content is accessible without knowing the location of its content. The hash code is a single hash that describes the file's content and provides an immutable link. It guarantees the integrity of the data returned to us with a hash code. This is not possible with location-based addressing, as it can be edited, moved, or disappeared if the location has been changed.

How content-based hashing works is similar to how git works; it uses [merkel tree](https://en.wikipedia.org/wiki/Merkle_tree). The content is first broken down into small blocks of data (usually 256 kb). Next, each block is cryptographically hashed based on its content, which means each block is represented by one unique code. Then each block gets paired, and a new corresponding hash is then assigned to each pair of a block. This paring and hashing are repeated until we obtain the root hash for the content. We call this root hash the CID.

Through this identification system, the CID allows access to all the blocks, which enables it to reconstruct them into the original file. This system is also known as [Directed Acyclic Graph (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph). This is why the root hash (CID) guarantees data integrity since if a single block is corrupted or modified, the corresponding parent hash changes as well up to the root parent.

Another benefit of content-based addressing is that since the content is split up into multiple small blocks of data, it allows ease of distribution and replication through distributed networks.

### Location-based Addressing in Practice

Let me introduce you to the library that implements these and many other tools, [IPFS (Interplanetary File System)](https://ipfs.io). IPFS aims to solve the current web 2.0 problems by attempting a distributed web. IPFS is the integration and implementation of many excellent ideas. 

Let's take a look at an example of creating a CID for any content using IPFS:

```javascript
const node = await Ipfs.create()
const results = await node.add('=^.^= meow meow')
const cid = results[0].hash
console.log('CID created via ipfs.add:', cid)
const data = await node.cat(cid)
console.log('Data read back via ipfs.cat:', new TextDecoder().decode(data))
```

First, we create an ipfs node; nodes can be created in the browser or server. Next, we add content to our node; this example is a simple string, but this can be a file or even a directory. The `cid` represents the root hash we have been talking about. Finally, we can get the contents based on the CID by using `node.cat(cid)`, and by decoding the data, we can view it.

More examples can be found [here.](https://github.com/ipfs/js-ipfs/blob/master/docs/BROWSERS.md#code-examples)

Note that the content becomes inaccessible when the ipfs node is offline. If you want your IPFS data to remain accessible when your local IPFS node goes offline, you might want to use another option like collaborative clusters or a pinning service. We will talk about these options next.

### Deploying location-based addressed web pages.

Say you have a web app you want to host in a distributed network like IPFS. Once you have your build files, you will upload them to an IPFS node through the CLI or desktop app (recommended). Once you have uploaded the content, you will get a root hash or CID for your build. Their desktop app allows you to set up a daemon and a user interface to see peers, pin files (so that they don't get deleted from a cleanup process), and access other distributed content. 

If you turn off your node, your content won't be reachable, bummer I know, but there are solutions for this. 
* IPFS collaborative clusters. These groups of IPFS nodes collaboratively pin all content added to the IPFS Cluster by one or many trusted peers. You can also set up your [own cluster](https://cluster.ipfs.io). 
* Pinning Services. These services run many IPFS nodes and will pin your data for you! This way, you don't have to run and maintain your own IPFS node. I suggest [Piñata](https://pinata.cloud/) since it gives users 1GB of free uploads.

Check out this [simple VR web](https://ipfs.io/ipfs/QmZ7MQCQo3Xv5Q5HAp6HjLA1ivKXdLm3NsK6dnb5eBd66R) app I've just deployed to the distributed web using ipfs and pining it with Piñata.

### What about domain names?

Having a CID to lookup content is excellent, but what if you don't know the CID of the latest version of the app. Since CIDs are immutable, each change to your web app will generate a new CID. The solution for this is [IPNS](https://docs.ipfs.io/concepts/ipns). IPNS solves this by creating an address that can be updated, using a hash of a public key, and associating with the record containing the information about the has its links to and is signed by the corresponding private key.

```bash
$ ipfs name publish /ipfs/<CID>
```

This command will give you a key you can use to set up your own domain. 

But wait a minute, aren't domain name providers centralized? Yes, however, Etherum has its own DNS of sorts called ENS, so you can buy decentralized domains like `your-domain.eth`. For a step-by-step guide, check out this helpful [resource](https://docs.ipfs.io/how-to/websites-on-ipfs/link-a-domain/#handshake). 

All these steps are relatively manual, but recently a service called [Fleek](https://fleek.co) was launched that allows developers to host websites on IPFS without needing to do much.

### Web3 Js Libraries

Web3 JS is a collection of libraries that allow you to interact with a local or remote blockchain node using HTTP, IPC, or WebSocket. Many flavors of web3.js are available depending on which network you want your dApp to interact with. For Ethereum, there is [web3.js](https://web3js.readthedocs.io/), and for Solana, [Solana-web3.js](https://docs.solana.com/developing/clients/javascript-api). 

### Metamask

[Metamask](https://metamask.io/) is a crypto wallet and browser extension that allows users to securely interact with decentralized applications. It offers account/wallet management and connects users to the blockchain by securely providing web3.js to the application through the browser plugin. Without it, users would have to connect their wallets each time they access a dApp.

# Backend Business Logic

We are familiar with backend services that carry out critical business logic in the current web. These are usually implemented in Java, C#, Rust, Clojure, Javascript, Ruby, Go, etc. In addition, they are centralized, meaning organizations have control and are hosted in location-based addresses.

With the new web, we have smart contracts. Smart contracts are self-executing contracts with business rules and agreements specified through code. They are deployed to blockchain networks ensuring that they can't be tampered with once deployed. Smart contracts enable trustless services like loans, automatic execution of trade agreements, micropayments, and more.

Currently, we have a few options of blockchain networks we can deploy our smart contracts.

### Ethereum Network (ETH)

Ethereum is the first network to support smart contracts; unfortunately, it's a victim of its own success. The network is heavily congested, has a large carbon footprint, and has high gas (transaction) fees. It also doesn't work well with other blockchains. 

Writing contracts for the ETH network can be made using [Solidity](https://docs.soliditylang.org/) or [Viper](https://ethereum-viper.readthedocs.io/en/latest/). Solidity is the most common one, and Viper is for those Pythonistas out there.

Being the first to support smart contracts, Ethereum developers more helpful tools for developing, testing, and deploying smart contracts. The one that I've enjoyed practicing Test Driven Development with has been [Truffle](https://trufflesuite.com/). Truffle makes developers' jobs more efficient by providing the tools you need for your smart contract lifecycle management. It handles scriptable deployments and migrations, a powerful console, and, best of all, an automated contract testing library. Its automated testing library can be written in JavaScript and Solidity, making your development highly productive.

### Solana (SOL)

Next, we have Solana (SOL). Solana is the fastest crypto at the moment. With better fees as they are a fraction of a cent. Solana uses [Rust](https://www.rust-lang.org/) or C++ to build contracts. I've recently tried Rust, and to be honest, it isn't that bad. It's nicer than solidity in many ways as you have higher language functionality you expect from modern languages while leaving room for low-level manipulation of memory and the stack heap.

### Polkadot (DOT)

The last one I want to talk about is Polkadot (DOT). DOT stands out for its interoperability and its work well with other platforms. The main difference is that its smart contracts run on a side chain and not on the main blockchain, making them faster and cheaper to transact with. For example, you can develop smart contracts using an EVM pallet offered by [Frontier](https://github.com/paritytech/frontier) or WebAssembly based contracts using its [Contracts pallet](https://github.com/paritytech/substrate/tree/master/frame/contracts) Frame library.

# Data/Storage Layer

We are familiar with centralized servers that host database applications like SQL and NoSQL on the current web. However, with web 3.0, we will have many different options for decentralized storage to feed our dApps.

### Data on the Blockchain.

The first successful implementation of a blockchain network was Bitcoin. It allowed a trustless and distributed network to store a ledger to account for assets and transactions of those assets. Fundamentally the bitcoin network is a distributed database. 

Writing data on the blockchain is expensive and slow but free to read. As such, its real-world use cases for storage are limited. Hence storing data of-chain is a popular approach. Nevertheless, storing data in the main chain has succeeded in maintaining a ledger of accounts and transactions that hold crypto assets.

### Interplanetary File System

[IPFS](https://ipfs.io) shines in many ways, but the most beautiful thing about it is that it's free to read and write. However, it doesn't live on the chain, so it doesn't inherit the issues of transaction cost and scalability. In addition, providing content-based addressing ensures data will not be subject to censorship, network congestions, and loss of information. IPFS also shines in the rich libraries it has published for a network stack, but more on that later. Another attractive feature of the IPFS storage system is that it is supported on most blockchain networks by default.

### Gaia 

[Gaia](https://docs.stacks.co/build-apps/references/gaia) is also a decentralized storage architecture for off-chain data. Its best use case is for storing user application data privately. It benefits dApps users through high performance and availability without introducing central trust parties. It differs from the rest because it allows users to dictate where their application data is stored (AWS, Azure, DigitalOcean, etc.). By default, Gaia provides free storage in AWS using a key-value pair system. DApp users then give permission to the application by signing with their wallet key for apps to read the data while still having governance over their personal data and having an always opt-out feature.

### Incentivised Storage Systems

These storage systems differ in that the data is stored by peers in a network and are incentivized with crypto tokens to store and deliver data securely and efficiently. These are [Swarm](https://www.ethswarm.org/), [Filecoin](https://filecoin.io), and [Storj](https://www.storj.io/), to name a few.

### Oracles

A blockchain oracle is a third-party service that connects smart contracts with the outside world, primarily to feed information from the world and reverse. These are usually via trusted APIs, centralized proprietary corporate data feeds, and the internet of things feeds.

# Transports Protocols
With the current web, we have seen the success of many transport protocols that run over the IP protocol, ensuring that the data sent over the wire is received entirely and in the correct order. While TCP and UDP  are the most common protocols in use, they are not the only options. Alternatives exist, such as QUIC,  UTP, WebRTC, WebSockets, and more.

How web3.0 will differ is that it will aim to be transport agnostic. This means that deciding what transport protocol to use is up to the developer. In fact, one application can support multiple means of transport simultaneously. This is where libp2p comes in.

### Libp2p

[Libp2p](https://libp2p.io/) defines itself as "A modular network stack." It allows you to run your network applications free from runtime and address services, independently of their location. One of its key features is multiaddr. It was created by the IPFS team, and it's what powers most web3.0 networking.

#### Multiaddr
Transports are defined in two core operations, listening and dialing. Before you can dial up a peer, you need to know how to reach them. Since each transport will require its own address scheme, libp2p uses a "multiaddress" or multiaddr to encode many different addressing strategies.

Here is an example:
```
/ip4/7.7.7.7/tcp/6543
```

This is equivalent to 7.7.7.7:6543 construction, but it is explicit about the protocol that is being described.

#### Publish/Subscribe
Libp2p also provides pub sub-system tools where peers congregate around topics they are interested in,  typically used in chat rooms, real-time and file-sharing applications.

Before a peer can subscribe to a topic, it must find other peers and establish connections. The pub/sub system doesn't do this by itself. Instead, it relies on the application to find new peers on its behalf. It can do this via distributed hash tables, local network broadcasts, centralized trackers or rendezvous points, or a list of bootstrapped peers.

Here is a code sample I used in my peer 2 peer tic-tac-toe game using Clojurescript:

```clojure
(defn create-ipfs-node []
  (.create
    js/Ipfs
    (clj->js {:config
              {:Addresses
               {:Swarm
                ["/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star"
                 "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star"]}}})))

(defn create-ipfs-util [topic handle-messages]
  (go
    (let [node         (<p! (create-ipfs-node))
          my-addresses (get-my-addresses (<p! (.id node)))
          subscription (<p! (subscribe-to-topic node topic handle-messages))
          interval     (js/setInterval
                         #(do
                            (go
                              (let [peer-ids (<p! (get-peer-ids node topic))]
                                (swap! room-state assoc :node node :my-addresses my-addresses :peer-ids peer-ids))))
                         3000)]
      node)))
```

It would discover other peers using a public signaling/rendezvous server defined in the `create-ipfs-node` function, and it would subscribe to a topic in the `create-ipfs-util` while also keeping track of new peers and my `peerIds.`

You can find more examples [here](https://github.com/ipfs-examples/js-ipfs/examples).

# Conclusion

The current web is in danger, but the future for our web is bright. An open-source and more efficient internet has already begun with a more secure, permanent, privacy-sensitive internet on the horizon. Many great ideas and solutions have been shared to the problems we now face with the current web. Developers have built tools to implement solutions that empower new programmers to build a better web from these great notions. However, web 3.0 also poses a lot of risk as illegal or hateful content will be hosted, and we will need to pose solutions for these in the years to come. Another key challenge will be to interface with today's web and migrate to the web 3.0 seamlessly to users.

