---
layout: post
title: "cljs-webapp - A leiningen template for ClojureScript webapps"
date: "Mon Nov 04 01:17:30 +0200 2013"
---

Starting out with ClojureScript, I realized that writing the
cljsbuild boilerplate in `project.clj` and setting up the directory structure
all over again is in no way fun. Knowing about leiningen templates,
I figured there has to be
a CLJS one.

Turns out there are a few. However, all CLJS templates that
I found come bundled with a server set up as well. I wanted something simple
that I could use for writing client side webapps, which is why I wrote
[cljs-webapp](http://github.com/mihneadb/cljs-webapp).

If this sounds useful to you, all you have to do to use it is:

{% highlight bash %}
lein new cljs-webapp PROJECT-NAME
cd PROJECT-NAME
lein cljsbuild auto dev
# open resources/public/index.html in the browser
{% endhighlight %}

It comes set up with two cljsbuild configurations, one for development and one
for production (they differ in optimization level). Also, there's a simple
`index.html` file that includes the generated JS file.

Happy hacking!

