---
path: /clean-architecture
date: 2021-10-20T01:22:55.506Z
title: Clean Architecture
description: How to write systems that are clean for high development iteration throughput.
---

👋 Hello there!!

#### Why does clean code matter?
Writing a software program that works does not require a lot of knowledge or skill.
Getting software right is hard. When software is written right, you no longer need many programmers to keep it working
or huge list of bugs whenever the software adds new features. Changes are quick and simple and bugs are few.
This may seems farfetched, but I've experienced this.

Bad code is way too common in our industry, but it doesn't have to be.

Some companies seem to believe that if you throw more resources to a badly coded software will solve the problems,
but statistics show otherwise, it might eventually get better but if the cleanup of the code doesn't happen;
productivity stales or even worse, it just halts.

#### So why does this happen?

I believe that the culprit for this is having the following belief:
> "We can clean it up later; we just have to get to market first!"

We all know that the cleanup never happens, and developers get pushed to get the next feature done.

Instead, we should embrace these beliefs:
> "Slow and steady wins the race."

> "The only way to go fast, is to go well"

#### How can we avoid this?

So far we've talked in the blog about the importance of Test Driven Development, but today we will talk about
Clean Architecture.

Most people believe that Architecture is about high level, but this is far from the truth.
Software Architecture deals with immense number of low-level details. In software design, the low level details nd high 
level structure are all part the whole system.

To avoid the common mishaps in badly written code we make sure that we follow this diagram.

![Clean Architecture](../assets/CleanArchitecture.jpeg)

Our outer most layer contains our input output devices.
The inner most layer contains our application business rules.
In between we have our use case layer, which purpose is to allow input an output layers be able to interact
with our business rules.

To make sure our code is clean, and our architecture is flexible all the dependencies point towards our business rules.
This means that our business modules do not depend on lower level modules. For example, we wouldn't want our tic-tac-toe 
game rules to depend on any of the UI code, or the server rendering code. A good rule of thumb to recognize what a high level module
is vs a lower level module is to see how close to the input/output it is, the closer to the inputs/outputs the lower level it is.
Remember that higher level modules should never depend on lower level modules, arrows always point towards the center.

Another rule to keep our clean architecture is to keep the flow of control in the opposite direction.

What does this mean?

It means that our entities/business rules should control the flow of the application. But how can our
high level modules control the lower level modules without depending on them? The answer to this is using the Dependency Inversion Principle.

> Dependency Inversion
>
> A. HIGH LEVEL MODULES SHOULD NOT DEPEND UPON LOW
> LEVEL MODULES. BOTH SHOULD DEPEND UPON ABSTRACTIONS.
>
> B. ABSTRACTIONS SHOULD NOT DEPEND UPON DETAILS. DETAILS
> SHOULD DEPEND UPON ABSTRACTIONS.


The way we execute this in code is to use of Polymorphic Interfaces.

Most programing languages provide a way to create some abstractions. We can create those abstractions in our higher level modules,
And make implementations of them on lower level modules like our controllers. This way our higher level modules don't depend on the details
but instead depend on an abstraction of this interface. 

Once our high level modules use abstracts interfaces to control the flow of the application outwards,
while also not depending on lower level modules. This principle alone will drastically improve the quality of your code
and its ability to change with minimum negative impacts.

_____

Tomorrow we'll look into some parts of our tic-tac-toe code that violate this principle and how we fix this.

Cheers! ❤️

