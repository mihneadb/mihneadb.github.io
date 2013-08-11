---
layout: post
title: "The Pastebin Client Exercise"
date: "Sat Aug 10 23:20:25 -0700 2013"
---

I found that writing a pastebin command line client can be a good exercise
for both practicing and learning a new programming language. Let me tell you
why.

First, a list of features that it should have:

* pasting a file that is passed as an argument
* pasting input that's piped into stdin
* support for user credentials
* persistent user credentials in a config file
* support for anonymous posting
* the ability to specify a language (for syntax highlighting)
* error handling (nothing too advanced)
* saving the new paste URL in the user's clipboard

The good thing about implementing all the above mentioned features is that you
end up dealing with many essential aspects that one usually encounters when
solving real tasks. These include:

* stdin handling
* file operations
* JSON/INI parsing (config file, response from pastebin server)
* HTTP requests
* creating a process and passing it input (for clipboard handling)
* command line arguments handling
* string / file path manipulation
* exceptions (invalid config file, bad HTTP request)
* understanding and using an external API

This is a nice exercise because it will not take too many lines of code (under
200, probably) and it will not eat up too much of your time either. If you want
to try it out, I recommend the [Refheap](https://www.refheap.com) pastebin
server because of their nice API and support for multiple languages - it even
supports [Rust](http://www.rust-lang.org)!

An extra challenge in case you opt for the Refheap API - they have a feature
that allows you to specify a file extension for the language attribute and they
will infer the correct syntax highlighting settings for you.

You can find my Python implementation on
[github](https://github.com/mihneadb/refpaste). I got the inspiration from
[this](https://github.com/Raynes/rapture) great
[Elixir](http://elixir-lang.org/) implementation that I found on the Refheap
wiki page.
