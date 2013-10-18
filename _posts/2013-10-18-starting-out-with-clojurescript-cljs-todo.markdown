---
layout: post
title: "Starting out with ClojureScript: CLJS-todo"
date: "Vi oct 18 21:18:11 +0300 2013"
---

I've been interested in [Clojure](http://clojure.org) for a while now, but
I only got to use it for not-too-complicated one-off tasks. Fortunately,
[Andrei](https://twitter.com/ndreio) and me will participate in a FB hackathon
that's taking place at our university and we decided to use
[ClojureScript](https://github.com/clojure/clojurescript). Considering that
neither of us has ever written a line of CLJS, we figured we should try it out
a bit before the hackathon. What follows is a short guide on starting out with
CLJS and building a [really dumb] todo web app.

As with Clojure, we will use [Leiningen](http://leiningen.org/). Start off by
creating a regular project:

    lein new cljs-todo

Note that can get rid of some of the files and folders, since we won't need them for
this tutorial:

    rm -r doc src test

There's a great lein plugin called
[lein-cljsbuild](https://github.com/emezeske/lein-cljsbuild) that makes the
CLJS workflow nicer. The way it will help us is that it can watch a given
folder for CLJS source code changes and compile everything into a single
JavaScript file automagically. We need to add and configure it in ``project.clj``.

{% highlight clojure %}
(defproject CLJS-todo "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :plugins [[lein-cljsbuild "0.3.4"]]
  :cljsbuild {
              :builds [{
                        :source-paths ["src-cljs"]
                        :compiler {
                                   :output-to "resources/js/main.js"
                                   :optimizations :whitespace
                                   :pretty-print true}}]}

  :dependencies [[org.clojure/clojure "1.5.1"]
                 [prismatic/dommy "0.1.1"]
                 [org.clojure/clojurescript "0.0-1934"]])
{% endhighlight %}

Nothing too advanced here - we specify cljsbuild as a plugin and then
we tell it where our CLJS source code lives and where to save the generated
JS file. The ``:whitespace`` optimization level tells the Google Closure compiler
(which ClojureScript uses) to remove comments and whitespace. ``:pretty-print``
gives us back readable compiled JS code (for some value of readable).

Besides cljsbuild, we will also be using
[dommy](https://github.com/Prismatic/dommy) to interact with the DOM, pretty
much as we would've used JQuery in JS-land.

Now that we configured the CLJS environment, let's start coding. First, the
HTML file we'll be working with, ``resources/index.html``:

{% highlight html %}
<html>
    <body>
        <div id="input-div">
            <input id="todo-input">
            <button id="todo-add-btn">Add</button>
        </div>
        <div id="todos-div">
            <h3>Todos:</h3>
        </div>

        <script src="js/main.js"></script>
    </body>
</html>
{% endhighlight %}

Notice that we've included the ``main.js`` file that cljsbuild generates for us.

Time to write some ClojureScript! As configured in ``project.clj``, our CLJS code
will live in ``src-cljs``, so let's create ``src-cljs/todo.cljs``:

{% highlight clojure %}
(ns cljs-todo.todo
  (:use-macros
   [dommy.macros :only [node sel sel1]])
  (:require
   [dommy.core :as dommy]))


(dommy/append! (sel1 :#todos-div) (node [:p "Make CLJS todo app"]))
{% endhighlight %}

The top part of the file is just including the dependencies into the namespace,
pretty much the same as we would've done in Clojure. Let's explore the last
line, bit by bit:

{% highlight clojure %}
(sel1 :#todos-div)
{% endhighlight %}

This is the equivalent of ``$("#todos-div")`` in JQuery. ``sel1`` returns
just one element, whereas ``sel`` gives back an array of elements.

{% highlight clojure %}
(node [:p "Make CLJS todo app"])
{% endhighlight %}

``node`` is a macro that dommy provides. It's used for HTML templating, just like
[hiccup](https://github.com/weavejester/hiccup). This is basically a nicer way
of saying ``{{ "<p>Make CLJS todo app</p>" }}``.

Finally, we use ``dommy/append!`` to add the new paragraph element as a child to
our todos div.

Now that we have our first iteration of ``todo.cljs``, we should check it out.
But first,
we need to build the JS file. Remember how I said that cljsbuild will watch
our CLJS code for changes and rebuild the JS file when needed? Let's do that:

    lein cljsbuild auto

Open ``index.html`` with your browser and you should see our first todo entry.
All great, but we have a static web app. Not cool! Let's make the *Add* button
work:

{% highlight clojure %}
(ns cljs-todo.todo
  (:use-macros
   [dommy.macros :only [node sel sel1]])
  (:require
   [dommy.core :as dommy]))


(defn add-todo!
  []
  (dommy/append! (sel1 :#todos-div) (node [:p "Make CLJS todo app"])))


(dommy/listen! (sel1 :#todo-add-btn) :click add-todo!)
{% endhighlight %}

We moved the existing ``append!`` call into a function and, using
``dommy/listen!`` we bound it to the button's ``onclick`` event. If you refresh
your browser, pressing the button should add more dummy todos. Remember, your
JS file has been rebuilt by cljsbuild.

Lets make it so we add the text from the input box as a todo note:

{% highlight clojure %}
(ns cljs-todo.todo
  (:use-macros
   [dommy.macros :only [node sel sel1]])
  (:require
   [dommy.core :as dommy]))


(defn add-todo!
  []
  (let [todo-input (sel1 :#todo-input)
        todo-value (dommy/value todo-input)
        todos-div (sel1 :#todos-div)]
    (dommy/append! todos-div (node [:p todo-value]))
    (dommy/set-value! todo-input "")))


(dommy/listen! (sel1 :#todo-add-btn) :click add-todo!)
{% endhighlight %}

Here, we're using ``dommy/value`` to get the text from the input box, and then
we pass it to the ``node`` macro. After the todo is added, we clear the input
box by using ``dommy/set-value!``.

Great, our app works pretty much as intended by now! In order to show off a bit
of JS interop, we are going to make it possible to add a todo by pressing the
Enter key. For that, we need to add these bits to ``todo.cljs``:

{% highlight clojure %}
(defn enter-add-todo!
  [evt]
  (when (= 13 (.-keyCode evt)) ; 13 is Enter
    (add-todo!)))

(dommy/listen! (sel1 :#todo-input) :keyup enter-add-todo!)
{% endhighlight %}

Since we don't have a ``form``, we have to use one of the key events to tell
that Enter has been pressed. Because ``keyup`` is fired for all keys, we need to
check when the Enter key is actually used. This information lies in the
``keyCode`` attribute of the event parameter (``event.keyCode``). In
ClojureScript, we can access a JS object's attributes by using the ``.-``
notation. Again, refresh your browser and the new functionality should be
working.

So there you have it. We started with an empty Clojure project and worked our
way to a working ClojureScript webapp that interacts with the DOM. You can find
my code [here](https://github.com/mihneadb/cljs-todo) and a working demo
[here](http://www.mihneadb.net/cljs-todo).
I hope this guide will help you get started with CLJS!

