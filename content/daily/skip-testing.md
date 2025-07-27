---
date: 2024-11-18T05:22:55.506Z
title: A story of an executive who asked to stop writing tests.
category: daily
---

Think skipping writing tests will make you go faster?
Think again.

CEO: “Hey, we got a severe bug with our pricing service. It's pricing things wrong. Let's fix it quickly, skip writing
tests, just fix it.”

Dev: “Ok, whatever you say boss.”

One week later, the bug is still there and nowhere close to identifying the root cause.

Coach: “Hey, dev, I see we aren’t making any headway with that bug fix. How can I help?”

Dev: “Great, thanks! So here is how to reproduce the bug.” Dev shows the coach a multi-step process involving over 25
steps to reproduce the bug, from setting up different services locally to filling multiple UI forms.

Coach: “Wow, that took a lot of time just to reproduce it one time. Why don’t we write a unit test for the pricing
service? We can skip all these manual steps if we do so.”

Dev: “Well, the CEO told me to skip the test.”

Coach: “Ok? But why?”

Dev: “To go faster”

Coach laughs: “And how is that working out? To go fast, we have to go well. Try writing the test first, mock the pricing
service dependencies, and let me know how it goes.”

30 minutes later.

Dev: “Hey everyone, I fixed the bug! After writing the test, it took me 5 minutes to find the root cause and fix it!”

True story.

Yours,
Ed
