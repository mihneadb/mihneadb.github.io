---
layout: post
title: "Liking Light Table"
date: "Thu Jan 30 22:34:10 +0200 2014"
---


If you haven't done so already, you should check out
[Light Table](http://www.lighttable.com). It's a great new IDE that is trying
to approach the way we go about programming in a different manner, kind of
like what Bret Victor [suggests](http://vimeo.com/36579366).

Leaving the philosophical aspects aside, Light Table is also interesting
from a technology perspective. First of all,
its [architecture](http://www.chris-granger.com/2013/01/24/the-ide-as-data/)
allows for plugins to be "first class citizens", able to do anything within the
IDE, as if their code was part of the editor's core. Second, LT is a packaged
webapp. It's written in ClojureScript and packaged with
[node-webkit](https://github.com/rogerwang/node-webkit), so it's pushing
both ClojureScript's development and the Web forward.

Recently, the code was [open sourced](https://github.com/LightTable/LightTable)
and the plugin infrastructure was made
available. It's been less than a month and the
[community](https://groups.google.com/forum/#!forum/light-table-discussion)
has already added support for Ruby, Haskell, Markdown, LaTeX and more,
in addition to the "standard" Clojure and Python.

Since the project was open sourced, I contributed with a few bug fixes
and enhancements, and I even wrote my own
[plugin](https://github.com/mihneadb/lighttable_refheap). I have to say,
hacking on Light
Table is pretty easy, thanks to the nicely written codebase and to the Behavior
Object Tag architecture. As for plugins, there's a
[template](https://github.com/mdhaney/lt-plugin-template) that gets
you up and running in no time.

So if you are looking for a new IDE to try, or a young open source
project with a friendly community to contribute to, I suggest you take
a look at Light Table!
