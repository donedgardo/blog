---
path: /clean-socket-2
date: 2021-09-27T01:22:55.506Z
title: Clean Socket Server HTTP HTML Response
---

👋 Hey there!!

Today we have a simple goal.

Let's make a socket server that on visiting `/hello` on the browser it responds with a html welcoming the user.

So looking at the RFC for HTTP 1.1 we get request from browser like this:
```
GET /hello HTTP/1.1
Host: localhost:3000
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9
```

Our goal is to respond with a proper http message.
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 50
Connection: keep-alive

<html><body><p>Welcome Screen!</p></body></html>
```

So let's write a simple test:
```java
    @Test
    public void welcomeScreen() {
        String request = "GET / HTTP/1.1 \r\n" +
                "Host: localhost:3000 \r\n" +
                "Accept-Encoding: gzip, deflate \r\n" +
                "Accept-Language: en-US,en;q=0.9 \r\n";
        String response = client.sendMessage(request);
        String expectedResponse = "HTTP/1.1 200 OK\r\n" +
                "Content-Type: text/html\r\n" +
                "Content-Length: 50\r\n" +
                "Connection: keep-alive\r\n\r\n" +
                "<html><body><p>Welcome Screen!</p></body></html>\r\n";
        assertEquals(expectedResponse, response);
    }
```

And our production code!
```java
 public void run() {
        try {
            String rawRequest = getRawRequest();
            String responseStatusHeader = "HTTP/1.1 200 OK\r\n";
            String responseTypeHeader = "Content-Type: text/html\r\n";
            String responseHtml = "<html><body><p>Welcome Screen!</p></body></html>\r\n";
            String responseLength = "Content-Length: " + responseHtml.length() + "\r\n";
            String responseConnection = "Connection: keep-alive\r\n";
            String rawResponse = responseStatusHeader + responseTypeHeader +
                    responseLength + responseConnection + "\r\n" + responseHtml;
            outStream.write(rawResponse.getBytes());
            outStream.flush();
            in.close();
            outStream.close();
            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String getRawRequest() throws IOException {
        StringBuilder rawRequest = new StringBuilder();
        while (in.ready()) {
            rawRequest.append(in.readLine()).append("\r\n");
        }
        return rawRequest.toString();
    }
```

It took me a while to get the test passing as I was not flushing the output from the server to the client.

Was mostly out of power today, tomorrow we'll look into adding hosting an index html and listing a static hosted
directory ✌️

❤️

