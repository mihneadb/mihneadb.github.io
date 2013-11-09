---
layout: post
title: "Using Functions to Represent Sets"
date: "Sat Nov 09 13:03:12 +0200 2013"
---

I went to a class on Abstract Data Types (ADTs) at my university and the main
point was the fact that you can use ADTs to think about the functionality of
data structures without worrying about implementation details. In support of this,
the teacher talked about how in Haskell you can either use lists or *functions*
to represent sets.

There was an attempt of a demo in Java, but the process was painful and between
encapsulating functions in objects, handling mutable state and passing
references around, the core idea vanished.

Regardless of the Java demo, I really enjoyed the idea and started to think about
drawbacks, workarounds and other things. I think this is really interesting and
it's a shame you usually only see this type of things in classrooms with
Haskell implementations. I have nothing against Haskell, but I think sticking to it
greatly hinders the size of the potential audience. This is why I decided to come up
with a JavaScript implementation.

First, let's talk about this a bit - using functions to represent sets?! What
is this madness? While I agree that this whole thing is pretty *meta*, the core idea is
really simple and you'll see that the implementation brings a few benefits.

All of this relies on using the
[characteristic function](http://en.wikipedia.org/wiki/Indicator_function)
to represent a set. Nothing magical - you have a function describing a set, `f`,
that yields
`1` for elements in the set and `0` for everything else.

This means that in order to define a set, you need to define its characteristic
function. To start off, here's the empty set:

{% highlight javascript %}
function emptySet(x) {
    return false;
}
{% endhighlight %}

The empty set doesn't contain any elements so the implementation is
straightforward. The set itself is represented by its function, so `contains`
just calls the set with the element we want to check:

{% highlight javascript %}
function contains(elem, set) {
    return set(elem);
}
{% endhighlight %}

What's left to get the *basic* functionality is the `insert` function. Using
recursion and JS closures we can implement insertion fairly easily:

{% highlight javascript %}
function insert(elem, set) {
    return function(x) {
        if (x === elem) { // insert smarter comparison here if needed
            return true;
        }
        return contains(x, set);
    };
}
{% endhighlight %}

Notice that I opted for a functional style where the new value is returned,
instead of encapsulating everything inside a mutable object. I think this approach
is cleaner and makes more sense.

Basically, this is similar to the [cons cell](http://cs.gmu.edu/~sean/lisp/cons/)
concept in LISP. Of course, this implementation won't win any benchmark contest
with its performance, but this is not the point.

Having these three primitives, we get the basic functionality:

{% highlight javascript %}
var aList = insert(3, insert(2, insert(1, emptySet)));

contains(2, aList); // true
contains(4, aList); // false
{% endhighlight %}

We've seen by now that we can use functions to implement basic sets. This is more
of a "check this out thing". Let's see some more examples that will actually
show some of the advantages of this approach.

First, it's really easy to have *infinite* sets. Or any kind of set, as long
as its elements follow a predicate.

{% highlight javascript %}
// want an infinite set? How about all even numbers:
var evens = function(x) { return x % 2 === 0; }

// how about even numbers between 10 and 100:
var someEvens = intersection(evens, function(x) { return x >= 10 && x <= 100; })
{% endhighlight %}

No need to use extra memory to actually store the values.

Another benefit is that you can perform the usual set operations in *constant*
time:

{% highlight javascript %}
function union(set1, set2) {
    return function(x) {
        return contains(x, set1) || contains(x, set2);
    };
}

function intersection(set1, set2) {
    return function(x) {
        return contains(x, set1) && contains(x, set2);
    };
}

var aList = insert(3, insert(2, insert(1, emptySet)));
var listContainingZero = insert(0, emptySet);

var together = union(aList, listContainingZero);

contains(0, together); // true
contains(3, together); // true
{% endhighlight %}

You can implement `difference` and `complement` in a similar fashion.

We talked about the benefits of this implementation, now let's take a look
at the minuses:

Using this in a language with no TCO will kill performance. All the `contains`
calls on a set that doesn't use a predicate (an *explicit* set) will end up
being
slower than the usual approach.

You cannot iterate through the elements in the set. There could be some workarounds,
like storing the value of the cells for explicit sets, but for those backed by
predicates you have to come up with some sort of a generator approach and this
brings *semidecidability* to the game.


All in all, I think this is a very nice approach that shows a new perspective
and even comes with some benefits. I'm open to suggestions of how this
could be improved or how the shortcomings could be avoided.

