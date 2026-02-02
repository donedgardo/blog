---
date: 2026-02-04T13:00:00.000Z
title: "The 'Waste' That Makes Teams Faster"
category: daily
---
Hello there! 👋

Today I'm going to tell you something that sounds wasteful:

**Put two developers on the same task.**

I know. Your brain is screaming "but we could ship twice as much!" Bear with me.

It's called **pair programming** (two people) or **mob programming** (the whole team). And in the age of AI, it might matter more than ever — just not in the way you'd expect.

**The old model is dead. Long live the new model.**

Traditional pairing: two humans at one keyboard, sharing the cognitive load of *generating* code. One types, one watches, they rotate.

But AI changed the game. A single developer with Claude or Copilot can generate more code in an hour than a pair could in a day. Generation is no longer the bottleneck.

So what's left?

**Judgment.**

Here's what I've realized: architecture isn't the boxes-and-arrows diagram on your wiki. Architecture is *fractal*. It lives in every function signature, every dependency direction, every naming choice. **The details are the architecture.**

And AI doesn't understand architecture. It understands patterns.

AI has seen millions of codebases. It knows what code *typically looks like*. But it doesn't know *why* we separate concerns. It can't feel the pain of a circular dependency at 2am. It hasn't lived through a codebase that became unmaintainable because everyone took shortcuts "just this once."

**AI hasn't felt the pain. And principles are learned through pain.**

You understand Dependency Inversion not because you read about it, but because you lived through a system where everything depended on everything and a small change cascaded into weeks of work. You understand Single Responsibility because you've stared at a 2,000-line class and wanted to cry.

AI has *read* about these principles — millions of times. But reading about fire isn't the same as being burned.

**So here's the new ensemble model:**

One human dances with AI. Prompting. Generating. Moving fast.

A second human serves as the **principled witness**. They're not slowing down generation. They're watching for violations. They have SOLID in their bones. They're asking:

- "Does this class have one reason to change?"
- "Is this dependency pointing the right direction?"
- "Will the junior devs understand this in six months?"

The first human asks: *"Does this work?"*
The second human asks: *"Should it work this way?"*

**And here's the deepest argument for the human partner:**

Principles evolve through dialogue.

When you explain *why* something violates a principle, you refine your own understanding. Your partner pushes back: "But isn't that actually two responsibilities?" Now you're both sharper.

AI doesn't push back on principles. It acquiesces. It gives you what you asked for.

A human partner asks: "Is what you asked for actually what you need?"

That friction is where wisdom lives.

---

Start with one ensemble session per week. Not for the generation. For the judgment. See what happens.

Tomorrow: the practice that gives your team permission to change code without fear — including code they didn't write.

Yours,
Ed
