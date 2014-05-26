---
layout: post
title: "Caching For the Win"
date: "Ma mai 27 00:11:20 +0300 2014"
---

It seems like every now and then, while working on something, I get reminded
that no matter how much you optimize any given process, most of the time,
caching will give better results - even with no (other) optimizations.

When you think
about it, it's pretty obvious - not doing any work at all is better than doing
"some" work. Nevertheless, we still look out for
[web framework performance](http://www.techempower.com/benchmarks/),
NoSQL access times and whatnot. The Disqus guys have a great
[blog post](http://blog.disqus.com/post/62187806135/scaling-django-to-8-billion-page-views)
on how they used Varnish to scale their
systems to huge numbers while using a "slow" Python-based stack.

I got bit by this recently while working on a school assignment. We had to
solve the Expedia [ranking problem](https://www.kaggle.com/c/expedia-personalized-sort),
working with some CSV data totalling about 15 million entries. To save some
time by not having to parse CSV all the time, I decided to take advantage
of today's technologies and use MongoDB to store the entries. Its
document-oriented, schemaless approach made sense for the data, since there were
a lot of missing values.

Starting to work on the problem, I had to deal with a fairly lengthy feedback
loop, because, even with Mongo being
[webscale](https://www.youtube.com/watch?v=b2F-DItXtZs&index=2&list=PL1FB3417C560AC0B7)
and all, processing took some time (I was using a laptop). To improve this,
I started tweaking the interactions with the database, reduced the accessed
data to the smallest subset possible and so on. I did not get very far - it was
still too slow. Then, I zoomed out a bit and I realised that I've been doing
it wrong from the start. I'm sure it's no surprise by now, I added a caching
layer (in the form of [memoization](http://en.wikipedia.org/wiki/Memoization))
and that yielded great results.

To sum up, when tackling a problem, don't disregard a
[simple solution](http://en.wikipedia.org/wiki/Occam%27s_razor)
for a shiny one. It might turn out to be just fool's gold.

