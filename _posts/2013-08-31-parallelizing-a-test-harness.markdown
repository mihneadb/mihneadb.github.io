---
layout: post
title: "Parallelizing a test harness"
date: "Sat Aug 31 18:08:47 -0700 2013"
---

My main project this summer was getting the XPCShell test harness to run
tests in parallel and I [wrote](http://www.mihneadb.net/post/run-xpcshell-tests-in-parallel/)
a bit about the speedups that we gained and the background of the project. Now
that we actually turned this on in automation, I want to talk about the
process so that we will have a better answer than "One does not simply parallelize
a test harness" the next time someone asks about this.

First, let's see how the _old_ test harness worked.

<p class="text-center">
<img src="/img/parallelizing-a-test-harness/parxpc4.svg" alt="Old harness diagram">
</p>

Basically, the Python harness would figure out the list of tests it needed to
run, set up some environment variables and fired up an XPCShell process.
The process would start running and the harness waited for it to finish. Then,
the test harness would parse the process's output, decide that the test passed
or not and then move on to the next test.

Essentially, nothing too complicated. A Python process that launches JavaScript
shells. People at Mozilla are working on reducing end to end test times in
automation so they figured parallelizing XPCShelltest would be a fast and easy
win - we are starting one JS shell, why not start more?


It turns out they were right.. in some sense. Making the harness run multiple
tests simultaneously was indeed pretty easy. It uses a thread pool and
every thread runs a test.

<p class="text-center">
<img src="/img/parallelizing-a-test-harness/parxpc3.svg" alt="New harness diagram">
</p>

The fun part started when we
actually ran those multiple tests concurrently. To understand why, we need
to talk about what an XPCShell test actually does.

<p class="text-center">
<img src="/img/parallelizing-a-test-harness/parxpc1.svg" alt="Old test environment diagram">
</p>

If there's a JS API for something, you'll probably find XPCShell tests for it.
They test almost *everything*. Some
tests exercise the plugins logic, others test the network libraries and so on.
Because of this, most of the XPCShell tests have to interact with the environment
outside of the shell they are running in. They may require an HTTP server,
access to the filesystem or some information stored in static files. Or maybe
all of the above. Sometimes, even more. The bad news is that in the old
implementation, all these were shared. There was no sandboxing whatsoever.

Because of this, my project went from "make this harness start more XPCShell
processes" to "change the tests so that they are independent, enhance the
harness to provide an actual sandbox and *then* start more XPCShell processes".
Here's a few problems that I encountered:

By far the most common error I had to fix was the fact that all the HTTP servers
we were starting used hardcoded ports. The same hardcoded ports. The HTTP
server we used for testing already had functionality for choosing a random open
port, so I went with that.
In many cases, the fix was pretty trivial, but the difficulty came from the
number of tests that needed this. For example, there were over 100 tests
that I had to change in the network subtree, and unfortunately _sed_ was
not very helpful.

Other problems were caused by the fact that the tests were making changes to
shared files in the tree. I ended up providing every test with its own
plugins and temporary directories, in addition to the profile directory that
the old harness was providing but many tests were ignoring.

An interesting problem that I had to solve was the fact that most of the extensions
tests were using static XML and RDF files for mock data that we store in
the actual repositories. Unfortunately, these files stored certain URLs
which contained the previously mentioned hardcoded ports. Since there was
no way of knowing a priori what port the test server would run on, the static
files hardcoded ports situation was a bit tricky. In order to fix this problem,
I replaced the hardcoded ports in the static files with _%PORT%_ and wrote some
custom handlers for the HTTP server that would intercept the files and replace
_%PORT%_ with the actual port number that they used.

After all these changes, all tests ended up with their own sandbox that they
could safely alter without breaking other running tests.

<p class="text-center">
<img src="/img/parallelizing-a-test-harness/parxpc2.svg" alt="New test environment diagram">
</p>

Even with the sandboxing, there were still some tests that could not be
completely isolated, which is why the new harness supports a new manifest annotation,
_run-sequentially_. Basically, we run all the tests that we can in parallel
and at the end of the run we run the unsafe tests one by one.

At this point, we managed to get the tests running successfully in parallel on
regular developer computers, but they were still having trouble on the test
slaves that we use in automation.

There's a bit of context that I should mention - we have quite a large number
of tests that fail intermittently in automation. It usually is because of
timing problems or network errors. People are looking into fixing them, we
keep track of their failure rates, but they take a while to get fixed and we
are pretty much stuck with them, since [developers would rather work on new
features than writing more solid tests](http://www.mihneadb.net/post/better-tools-better-products/).

Since flaky tests are sensitive to timing changes, running them in parallel
yielded higher intermittent failure rates, and this made it impossible to
turn on the new changes in automation. I had to come up with a solution to this
problem.

At first, I tried to find out which tests were failing intermittently and add
them to the _run-sequentially_ set. This was an iterative process that basically
involved a lot of retriggered runs and manual triaging. I ended up with around
200 extra annotated tests and I was still seeing failures. Even worse, performance
started to take a hit. This was not going to work.

Luckily, the second approach was a winner. The main idea is pretty simple -
run as many tests in parallel as possible, and run the failing tests again,
one by one. If we were to analyse this as an algorithm, the worst case would
be awful. However, there's no perfection in automation, not as long as we have
flaky tests, and it turns out that this approach keeps the same speedup, mostly
because we generally end up retrying a few (under 10, if that) tests per run. The
next step is to include the statistics about retried tests in our intermittent
failure data, so we can still keep track of this.

The other problem we had with turning parallel runs in automation was related
to the filesystems on the Windows test slaves. The new harness interacts a lot
with the filesystem to set up the sandbox (copying directories around, creating
new ones), and has to clean up after a test runs. Unfortunately, on Windows,
you cannot delete a file that is still in use by a process, and even after the
process is done, there _seems to be_ a delay until you can actually delete
the respective file. We solved this problem by deferring the cleanup process
to a later time when the OS would give us access to do it.

It turns out that the actual problem was finding a way to
isolate the tests, rather than enhancing the test harness to run multiple
tests at a time. However, the effort was definitely worth it, considering that
on computers with fast storage (as in your everyday laptop) we get a speedup
roughly equal to the number of CPU cores. It is also a win for the test slaves -
we are generally seeing a 2x speedup, even on our single core Ubuntu setup.

What's next? For one, parallelize more test harnesses! There is
ongoing [work](https://bugzilla.mozilla.org/show_bug.cgi?id=813742) with our
Reftest harness. Second, I'm working on a way to figure out the system resource
usage numbers _per test_. Having this, we will be able to tell exactly what
our tests are doing and maybe take better decisions in deciding what test slaves
we should schedule them on, taking hardware specs into account. My early
benchmarks suggest that faster storage would help us gain an even
bigger speedup for the XPCShell tests in automation.

I think actual stats will help us realize what a 2x speedup means in test
automation, so
I calculated the total time we spend running XPCShell tests per checkin, with
and without the changes. The
number went down from around **1000** minutes to around **500** minutes. This includes
the mobile tests, which were not affected by the changes. To give you some context,
we know from John O'Duinn's
[monthly](http://oduinn.com/blog/2013/08/05/infrastructure-load-for-july-2013/)
report that we had *7051* checkins in July 2013. The new harness will save
us a lot of time!


P.S.: Here's how the bug dependency graph looks like for the whole thing!

<p class="text-center">
<a href="/img/parallelizing-a-test-harness/deps.png"><img src="/img/parallelizing-a-test-harness/deps.png" alt="Bug dependency graph"></a>
</p>

