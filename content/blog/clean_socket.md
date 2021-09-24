---
path: /clean-socket
date: 2021-09-23T01:22:55.506Z
title: Clean Socket Server
---
👋 Hey there!!

Since my early days working in development agencies I have always been chasing network problems to solve.

As a teenager playing Diablo 2 Starcraft Warfract and the network connectivity in them have piqued my interest in how 
engineers made it work.
Most of all I loved how it brought people together from all over the world. 

Today we are going to start a new project.

Goal - Learn as much Java as possible and about http/1.1 protocol in more detail.

#### HTTP - Hypertext Transfer Protocol

>Each Hypertext Transfer Protocol (HTTP) message is either a request
   or a response.  A server listens on a connection for a request,
   parses each message received, interprets the message semantics in
   relation to the identified request target, and responds to that
   request with one or more response messages.  A client constructs
   request messages to communicate specific intentions, examines
   received responses to see if the intentions were carried out, and
   determines how to interpret the results. 
>
>-- [HTTP Request for Comments (RFC) 1.1](https://datatracker.ietf.org/doc/html/rfc7231)

Let's create a socket server that complies to the http 1.1 protocol in Java.

I'm stepping out of my comfort zone picking Java as I haven't code a single line of it since college 😐.
Also, lets not leverage any libraries to better understand the underlying system of our dear internet
underlying system.

So reading the RFC wiki lead my to a whirlpool, and a dozen wiki tabs later I read interesting topic
like what was an [RFC](https://en.wikipedia.org/wiki/Request_for_Comments) to [ARPANET](https://en.wikipedia.org/wiki/ARPANET) to [HTTP/2](https://en.wikipedia.org/wiki/HTTP/2),
[QUIC](https://en.wikipedia.org/wiki/QUIC) and [HTTP/3](https://en.wikipedia.org/wiki/HTTP/3). Brain upload 🤯! 


------

#### Java Clean Socket Implementation

As always first the test. Initially I started implementing a lot of tests for the implementation of the test 
(eg its constructor methods etc.)  As I added more features I keep having to fix the test which meant my test where really good. 

Instead, here is what I did. I started testing the behaviour of the socket as a user of the socket, our client!
```java
public class CleanServerTest {
    private static CleanServer server;
    private CleanClient client;

    @Before
    public void setup(){
        client = new CleanClient();
        client.startConnection("127.0.0.1", 3000);
    }

    @After
    public void tearDown(){
        client.sendMessage("/bye");
        client.stopConnection();
    }

    @Test
    public void welcomeScreen() {
        String response = client.sendMessage("/hello");
        assertEquals("welcome screen", response);
    }

    @Test
    public void handlesMultipleConnections() {
        CleanClient client2 = new CleanClient();
        client2.startConnection("127.0.0.1", 3000);
        String response = client2.sendMessage("/hello");
        assertEquals("welcome screen", response);
    }
}
```

The client we use in our test:
```java
package clean.socket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class CleanClient {
    private Socket clientSocket;
    private PrintWriter out;
    private BufferedReader in;

    public void startConnection(String ip, int port) {
        try {
            clientSocket = new Socket(ip, port);
            out = new PrintWriter(clientSocket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void stopConnection() {
        try {
            in.close();
            out.close();
            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String sendMessage(String msg) {
        out.println(msg);
        try {
            String resp = in.readLine();
            return resp;
        } catch (IOException e) {
            e.printStackTrace();
            return "Error";
        }
    }
}
```

Our clean server implementation
```java
public class CleanServer {
    private static int port;
    private ServerSocket serverSocket;

    public static void main(String[] args) {
        Map<String, List<String>> params = getParams(args);
        port = Integer.parseInt(params.get("p").get(0));
        CleanServer server = new CleanServer();
        server.start(port);
    }

    public void start(int port) {
        try {
            serverSocket = new ServerSocket(port);
            while (true)
                new CleanClientHandler(serverSocket.accept()).start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void stop() {
        try {
            serverSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static Map<String, List<String>> getParams(String[] args) {
        final Map<String, List<String>> params = new HashMap<>();

        List<String> options = null;
        for (int i = 0; i < args.length; i++) {
            final String a = args[i];

            if (a.charAt(0) == '-') {
                if (a.length() < 2) {
                    System.err.println("Error at argument " + a);
                    return params;
                }

                options = new ArrayList<>();
                params.put(a.substring(1), options);
            } else if (options != null) {
                options.add(a);
            } else {
                System.err.println("Illegal parameter usage");
            }
        }
        return params;
    }
}
```

Our Threaded client handler:
```java
class CleanClientHandler extends Thread {
    private Socket clientSocket;
    private PrintWriter out;
    private BufferedReader in;

    public CleanClientHandler(Socket socket) {
        clientSocket = socket;
    }

    public void run() {
        try {
            out = new PrintWriter(clientSocket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println(inputLine);
                if ("/hello".equals(inputLine)) {
                    out.println("welcome screen");
                }
                if ("/bye".equals(inputLine)) {
                    out.println("bye");
                    break;
                }
                out.println(inputLine);
            }
            in.close();
            out.close();
            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

We aren't done with the RFC we just have a simple socket server with no protocol defined, YET!


Next we'll look into implementing the protocol into our clean socket server ✌️

❤️

