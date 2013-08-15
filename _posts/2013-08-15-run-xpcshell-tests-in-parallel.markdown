---
layout: post
title: "Run XPCShell tests in parallel"
date: "Thu Aug 15 07:58:27 -0700 2013"
---

The patches in [bug 887054](https://bugzilla.mozilla.org/show_bug.cgi?id=887054)
(or as I like to call it, _parxpc_) have just landed!

For those who don't know what _XPCShell_ is, think of it as a JavaScript
shell with XPConnect support, which basically means it can access all the
services and interfaces that you find in
[Gecko](https://developer.mozilla.org/en-US/docs/Gecko), among other
things. We use it for mostly all of our JavaScript tests that don't
require starting an actual browser instance, and we have quite a few
of those tests - on Linux, around 1700.

The good news is that you can now run all these tests in parallel, and
I found that if you have pretty fast storage (like an SSD), the gained
speedup is at least approximately equal to the number of (actual, not
hyperthreaded) cores in your computer.

For example, I went from this:

    ./mach xpcshell-test --sequential  305.04s user 78.60s system 49% cpu 12:50.18 total

To this:

    ./mach xpcshell-test  359.51s user 76.25s system 246% cpu 2:56.76 total

Even better, I've seen an almost two time speedup on
the Ubuntu test slaves that we have, which are _single_ core.

You might be wondering what allowed us to get this enormous speedup, and
the answer (from what I found so far) is basically waiting on IO. Most
of the XPCShell based tests do tasks like:

* working with the filesystem
* handling extensions and plugins
* parsing static files
* sending network requests

Really few do CPU intensive tasks, like encoding and decoding some information.

You might be wondering what you have to do to benefit of this. It's easy! Just
update your working tree to the latest version of
[mozilla-central](https://hg.mozilla.org/mozilla-central) and the next time you
run the XPCShell tests with
[mach](https://developer.mozilla.org/en-US/docs/Developer_Guide/mach),
they will run in parallel.

This change should not introduce any new test failures, so if you encounter any,
make sure it's not one of the known (filed) intermittents and please
[file](https://bugzilla.mozilla.org/enter_bug.cgi)
a bug about it. Don't forget to cc me (_:mihneadb_).

If you have trouble, there's the handy _--sequential_ flag that you can pass to
mach in order to run tests one by one.

This is not yet enabled in automation because of some
intermittent failures that only happen some test slaves. I will get back with
a post with more details and some info on the whole process of parallelizing
the harness.

Feel free to post a comment with the speedup you got (_--sequential_ makes it
easy to benchmark), I'm really curious!
