---
layout: post
title: "Better Tools, Better Products"
date: "Tue Aug 27 21:49:35 -0700 2013"
---

It seems to me that nowadays, developers forget about tools and they only care about the product. It's only about features, shiny spec sheets and eye popping visuals. Very few are interested in the actual development process and the core foundation that the product sits on. I want to emphasize the fact that the tools that aid you in the development process are critical for creating solid software.

When I say *tools*, I'm mostly referring to two distinct types - 1. self contained software utilities, for example text editors, and 2. patterns and processes, like an automated deploy system. Let's talk a bit about both.

Software utilities are ubiquitous. They are so common and have been around for so long that we take them for granted. Think about it, what would get you more excited - a new GCC feature or some new, hip, CSS-only web-scale demo? What about an update for Vim? Meh, boring!

If you take a minute to think about it, you will realize that *boring* tools like GCC and Vim have made possible software the way we know it today. Not only that, but the are still part of all major software stacks, despite their lack of *flair*. In the end, I think that's exactly the point - a tool should help you get your job done and not get in your way. So don't think less of tools if they don't seem noticeable. They are working as intended.

The other type of tools I want to talk about are less obvious. They aren't necessarily pieces of software that stand on their own, but rather processes or *addons* that complement the development process.

Python programmers, think about how your productivity would change if Python had no interactive read-eval-print loop. Web developers, how *fun* would web development be without devtools? How well would sysadmins do without shell scripts?

One could make the argument that all these are *nice to have*, but not having them won't keep anybody from developing their product. And it is indeed true. You *can* do it. Even more, when people start working on new projects they don't generally spend time using all the tools they have available to test their code or automate processes.

I don't think this inception phase is relevant, because it doesn't last very long. The real challenges show up when you have an established product that reaches many end-users. Then, if you find a bug, you want to be able to deploy a hotfix as soon as possible. For this, you need a well thought-out, automated deployment process. More than that, you don't want to ship bugs to your users in the first place. That means you need to have tests and run them for every set of changes engineers make to the product. Your tests have to run fast and when something fails you want to know exactly what change caused the failure. All these aspects are essential, because at the end of the day, your user won't are about the new flashy feature you just deployed if it broke half of the existing functionality. Just like the editors that don't get in your way, all these processes should be invisible to the user. I think this is what makes tooling the unsung hero of software development.

To sum up, even if they are not *pretty* and can sometimes feel like dirty work, the reality is that proper tools give your product a solid foundation. They make it maintainable and, when time comes, extensible. Knowing this, I believe that we should stop thinking of tools as second class citizens and find ways to improve our development processes, because better tools will help us craft better products.
