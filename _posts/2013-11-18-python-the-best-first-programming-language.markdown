---
layout: post
title: "Python - The Best First Programming Language"
date: "Mon Nov 18 21:45:26 +0200 2013"
---

I started to learn programming in high school and they taught us C. It felt
a bit complicated, focusing more on memory management
than on algorithms, but I didn't know about anything else and I was really
interested so I went with it. After that,
the first programming class in university (that had no prerequisites) was also
about C. By then I knew about other programming languages, especially Python,
and seeing people with no prior experience struggling I started to ask myself
if Python would be a better first language. After TA-ing some programming
classes and hosting some Python workshops, I'm convinced that Python is
the best first programming language. Let me tell you why.

Here's a taste of what Python looks like:

{% highlight python %}
def contains(numbers, value):
    for n in numbers:
        if n == value:
            return True
    return False

nums = [1, 2, 3, 7, 13, -2, 4, 8, 9]
result = contains(nums, 7)
print result # True
{% endhighlight %}

I showed this snippet of code to people with no programming experience and
they had no trouble reading it and understanding its behaviour. I listened to
their feedback, reflected on this and came up with four key aspects that I think
make Python the first programming language someone should learn. It's a
*high level*, *dynamic* (and dynamically typed) programming language, featuring
an *expressive* syntax that enhances code *readability*. Let's talk about every
one of them.

Python is a **high level language**. This doesn't necessarily say much, since C can
also be considered a high level language. Let's go with "a higher level language
than C". This means that Python provides a level of abstraction that helps
you focus on algorithms and what your program should do, hiding the fact that
the computer is a *dumb* machine that only understands binary. Examples of this
are plenty - you don't have to manually manage memory, Python will tell
you when you access a list out of bounds, strings have built-in support
and the standard library comes
with well documented functions for mostly anything you'd want to do. Besides,
you have access to all the data structures you'll need when studying
programming.

The definition of a **dynamic** programming language is, as Wikipedia
[mentions](http://en.wikipedia.org/wiki/Dynamic_programming_language), a bit
fuzzy, but the main aspect that makes Python a *friendly* language is
its runtime. Thanks to it, we have
[dynamic typing](http://c2.com/cgi/wiki?DynamicTyping), easy
[introspection](http://en.wikipedia.org/wiki/Type_introspection) and
[reflection](http://en.wikipedia.org/wiki/Reflection_(computer_science\)),
all bundled and accessible in the Python interpreter. This encourages newcomers
to experiment with live code and enables a tighter feedback loop when working
on projects. No idea what a function does? Try it in the interpreter! Wonder
what functions a module provides? Use
[dir](http://docs.python.org/2/library/functions.html#dir)! Having all these
makes experimenting easier and brings down the time it takes to prototype an
idea.

To me, the **expressive power** of a programming language is composed of two things:
how easy it is to express an idea, and how concisely can you do it. I feel that
Python allows you to accomplish a lot of things in a few lines of code,
without sacrificing readability (check out
[The Zen of Python](http://www.python.org/dev/peps/pep-0020/)). It's the small
things, like being able to write `3 < x < 10`, that add up to enable you
to write short, beautiful code.
[List comprehensions](http://en.wikipedia.org/wiki/List_comprehension) are
another example of powerful syntax:

{% highlight python %}
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
evens = [x for x in numbers if x % 2 == 0]
{% endhighlight %}

The syntax is similar to the math
[set-builder notation](http://en.wikipedia.org/wiki/Set-builder_notation),
which makes it both powerful and readable.

Last but not least, **readability** is a key strength of Python. I think the biggest
reason for this is having indentation as part of the syntax. Python doesn't use
curly braces to delimit blocks of code, relying on indentation instead. For
beginners, this means they *have* to write well-indented code for their
programs to work, and later on, it means that reading other people's code
will be easier.

Besides, Python uses words where other languages would use symbols and numbers
(`and`, `or`, `True`, `False` etc.), bringing it closer to the algorithmic
pseudocode.

Try this. Read the following code snippets out loud. Which one is easier
to reason about? [C veterans are not eligible!]

{% highlight c %}
is_even = (a % 2 == 0) ? 1 : 0;
{% endhighlight %}

{% highlight python %}
is_even = True if a % 2 == 0 else False
{% endhighlight %}

<p class="muted text-half">Of course, we could've used just the comparison as an expression but the point
was to show the ternary constructs.</p>

Because the syntax is similar to pseudocode, beginners can have a working
implementation of an algorithm they want to study fairly easily. Then, thanks
to Python's readability and dynamic nature they can experiment freely in order
to make sure they understood the respective algorithm.


For all the mentioned reasons (and more), I think Python is the way to go
for teaching programming. To put this claim to the test,
[ROSEdu](http://www.rosedu.org) started *Py4School*, a programme in which
we teach high school teachers and students Python, as an alternative to C.
So far, both teachers and students love it.

To sum up, Python is a newbie-friendly but powerful language, that lets beginners focus on
algorithms, abstracting away low level implementation details, thanks to an
expressive and readable syntax. I think this makes it, hands down, *the best
first programming language*.

