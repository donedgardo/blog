---
date: 2026-07-27T14:00:00.000Z
title: "Who on your team can roll back production?"
description: "For years I've written to you about deployment frequency and MTTR. Then I went and built the thing. The GitLaunch alpha is opening."
category: daily
rss: true
---

Hello there! 👋

A question I ask every team I coach:

**What is running in production right now?**

Not what you merged. Not what the pipeline said an hour ago.

What is *actually live*, this second.

Watch what happens next. Someone opens Slack. Someone scrolls CI logs. Someone squints at a git SHA and says "I think that's the one."

Then I ask the harder question:

**If it breaks, who can roll it back?**

On most lean teams, the honest answer is one person.

And that person is not always awake.

---

I've written to you about this for years.

Deploy daily instead of weekly, so changes stay small. Watch your faulty deployment rate. Restore service fast. [High performers roll back in under five minutes, with one button](https://edgardocarreras.com/daily/mean-time-to-recover).

I kept saying *one button*.

And then I'd walk into a team and ask: okay, where is it? Who's allowed to press it?

Nobody had one. Or one person did, and it lived on their laptop, in their head, behind a script only they had ever run.

The practice was right. The button didn't exist.

So I built it.

---

It's called **GitLaunch**.

It is not another CI/CD tool. Keep your GitHub Actions. Keep your Jenkins. Nothing to rip out.

GitLaunch starts where your pipeline ends. The part nobody owns.

One board shows every build across every environment. What's on staging. What's live. What's ready to promote.

And anyone on the team can move it. QA. Your PM. Your product owner. Promote to the next environment, or roll back to the last good build, in one click.

No YAML. No kubectl. No platform team.

Two DORA numbers you already care about are exactly the two this is built to move:

**Lead time**, because code-complete to live no longer waits on the one person who can deploy.

**MTTR**, because undo becomes a click instead of a war room.

Deploy day stops being a ritual to dread. It gets boring.

Boring is the goal.

---

GitLaunch is almost ready, and I'm opening a small alpha. I'm inviting people in waves.

If your team ships regularly, and deploys are bottlenecked on one or two people, I'd genuinely love to have you in early.

**→ [Join the alpha waitlist](https://gitlaunch.dev/?utm_source=newsletter&utm_medium=email&utm_campaign=alpha-launch&utm_content=daily-alpha-invite)**

Yours,
Ed

---

PS:

Even if you never touch the product, hit reply and tell me one thing: the last time something broke in production, how did your team find out what was live, and who fixed it?

I'm reading every one of those. They're shaping what I build next.
