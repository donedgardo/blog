---
path: /clean-socket-conclusion
date: 2021-10-04T01:22:55.506Z
title: Clean HTTP Socket - What I've Learned
---

👋 Well hello there!!

Today we are going to go over our Java Https socket server implementation.
We are also going to look a few things that I've learned.

#### Client Server Connection & Communication

One of the things that I've learned is mostly how TCP/IP (Transmission Control Protocol over the Internet Protocol) 
established connections. As I've implemented web services in the past I never really understood the low level implementations
of the underlying protocols that make the internet work, I've just leveraged libraries and that was the end of that.

When a client connects to a server it needs and ip address to connect to it. A simple TCP/IP connection first requires a
handshake of sorts, that is, the client acknowledges the server, and the server acknowledges the client. In this 
acknowledgment, the server a client keep an open connection, and their communication becomes a stream of bytes that flow 
between them in both directions.

I've always thought the contrary, that a request was sent from the client as a whole chunk to the server and that the 
server then responded once and closed.
While this might be true the normal situation is that they keep the connection open to save cpu resources and that the data
transfer between is not a one time chunk but a stream of data. 


#### HTTP/1.1 Message Protocol 

So one of the trickiest thing I've had to deal with while implementing the http socket server from scratch was deciding 
when a client request was over. As mentioned above the client server messaging is a flow of bytes, if this holds true how 
does the server or client know when the message has ended and ready to be consumed? 

So let's look at some code to explain how messages are fully consumed.

```java
    private void setRequestProperties() throws Exception {
        setMethodPathAndProtocol();
        parseAndSetHeaders();
        parseAndSetBodyData();
        parseAndSetCookies();
    }
```

Once a request is received by our server this function, `setRequestProperties`, take the stream of message line by line
until fully consumes the request.
First it parses the header files which contain the metadata of the request. The metadata in this header is very important 
as its not only going to tell us what resource the request is trying to interact with but if the request contains data such 
as form data, image upload, etc; it will also tell us what is the size/length of the data to know how much of the bytes we need to keep
reading until we reached the end of the message. 

```java
    private void parseAndSetBodyData() throws IOException {
        if (getMethod().equals(POST_METHOD) && getHeaders().containsKey("Content-Length")) {
            int contentLength = Integer.parseInt(getHeaders().get("Content-Length"));
            StringBuilder b = new StringBuilder();
            for (int i = 0; i < contentLength; i++) {
                b.append((char) in.read());
            }
            body = b.toString();
            String[] bodyData = body.split("&");
            getPostData().putAll(parseInputData(bodyData));
        }
    }
```

Before implementing this I was stopping reading the request message before the message was complete. Now, using the
`Content-Length` metadata from the header I know exactly when I have read the full message from the client.

This works both ways, in the next code example I construct the message from the server to send data to the client using 
http/1.1 protocol.

```java
  public void handle() throws IOException {
        String responseHtml = "<html><body><p>" + htmlContent + "</p></body></html>";
        String responseLength = "Content-Length: " + responseHtml.length() + "\r\n";
        String rawResponse = responseStatusHeader + responseTypeHeader +
                responseLength + responseConnection + responseHtml;
        out.write(rawResponse.getBytes());
    }
```

Here the data sent is plain html string. Before writing to the output stream back to the client I need to set up the 
header metadata which not only includes what type of data I'm sending (`text/html`), but also the length of the content, so 
the client (the browser) can also to the same.


#### Multipurpose Internet Mail Extensions (MIME types)

So far we've learned about how the client and server know the length of the content, but knowing the length is not enough 
to handle the data, hence we have MIME types.

There are multiple types of mime types [here is a list](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
The most basics one are text/plain and application/octect-stream where the left side is the general type and the right
one is the subtype.
There also two different types, there are discrete or multipart types. Discrete types are those which represent a single file,
while multipart represent of a document that's comprised of multiple component parts, each of which have its own MIME type. 
Multipart are commonly used in emails that contain attachments.

#### Sessions and Cookies

Cookies are all the rage, you probably seen some website warning you that their website uses them. This because of a recent 
law passed that protects users privacy and identity called General Data Protection Regulation (GDPR).
> The General Data Protection Regulation 2016/679 is a regulation in EU law on data protection and privacy in the 
> European Union and the European Economic Area. It also addresses the transfer of personal data outside the EU and EEA areas

In order for a website to keep a session and remember any user data/activty in order to provide some persistent features like
remembering who you are as not to force you to login with your password everytime you request a resource, website can set
cookies in your browser. Servers set cookies in your browser so that they can identify the session as they are added in
future request from the same browser.

This is how it looks in our server implementation:
```java
 public void handle() throws Exception {
        String responseHtml = "<html><body><form action='/guess' method='Post'>" +
                "<p><i>" + sessionData.guessMessage + "</i></p>" +
                "<label for='guess'>Guess a number from 1 to 100:</label><br/>" +
                "<input autofocus id='guess' name='guess' type='text'/>" +
                "</form></body></html>";
        String responseLength = "Content-Length: " + responseHtml.length() + "\r\n";
        String cookieHeader = "Set-Cookie: guessSession=" + sessionId + "\r\n";
        String rawResponse = responseStatusHeader + responseTypeHeader +
                responseLength + cookieHeader + responseConnection + responseHtml;
        out.write(rawResponse.getBytes());
    }
```

This code handles a simple game where a user has 7 attempts to guess a number from 1-100.
In order for the server to understand who is the user to figure out how many attempts they already attempted
we `Set-Cookie` a unique id so that any further request the browser request we can keep track of it.   


Tomorrow we will look at how we can create a jar file out our simple socket server in order to use it as a library to host
a server rendered tic-tac-toe game in clojure! ✌️

❤️

