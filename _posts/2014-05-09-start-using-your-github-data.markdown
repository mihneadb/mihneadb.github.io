---
layout: post
title: "Start using your GitHub data"
date: "Vi mai 09 19:31:05 +0200 2014"
---

GitHub is the home of Open Source software. Not only that, but both individuals
and companies host their private code there. It started out as a hosted git
solution, but it has evolved way beyond that. You can now track issues,
keep wikis, host web pages, run tests for every
commit and [more](https://github.com/features).

While collaboration is indeed easy, I feel that GitHub lacks some of the
features that are basic with dedicated issue trackers, like Bugzilla, JIRA and
others. With GitHub, it's hard to keep track of lagging issues. Pull requests
get forgotten all the time. Getting a quick overview of what are the most active
issues is not trivial. If you want to make sure the issues are fairly distributed
across team members in order to avoid burnout, good luck. There's no built-in
way of specifying issue dependencies.

The good news is that there are possible workarounds - for example,
we can simulate issues dependencies with
[issue mentions](https://github.com/blog/957-introducing-issue-mentions).
For other shortcomings, there are no workarounds using just GitHub's UI.
Fortunately, there is also an [API](https://developer.github.com/v3/) which
provides us with tons of data. Using it, we can start to address whatever
shortcomings we feel GitHub has for our use cases - want to get a list of all
the pull requests that can't be merged? Write a filter. Are you curious what
bug is burning your users the most? Aggregate some counts.

You get the idea: *all the data is there*. You just have to use it.

Trying to solve this problem of getting more insights than GitHub's UI provides,
I started working on a tool called
[Elasticboard](http://elasticboard.mihneadb.net/landing.html). It provides
a data-rich dashboard that helps you keep track of a GitHub repository, addressing
most of the shortcomings described above. The code is hosted on
[GitHub](https://github.com/ubervu/elasticboard), of course, and you are welcome
to check out one of
[the](http://elasticboard.mihneadb.net/#/facebook/react/timeline)
[demo](http://elasticboard.mihneadb.net/#/lighttable/lighttable/timeline)
[dashboards](http://elasticboard.mihneadb.net/#/mozilla/servo/timeline).

Such a tool is helpful both to repo collaborators and new contributors. The
repo collabs can keep track of what's going on and make sure that no issues
slip through the cracks, while new contributors have their life made easier
because now they can tell which of two issues is more important (there was
more activity surrounding it), what issues are not assigned to anybody and
so on.

Try Elasticboard out, add a repository that
interests you in the hosted demo dashboard. It will only include recent events,
because of GitHub's API limitations, but I think it's enough to make an idea.
If the demo sparked your interest, deploying your own instance is
easy - you can use the provided Docker
container, or even serve it yourself. Either way, the
[README](https://github.com/uberVU/elasticboard/blob/master/README.md)
has all the info you need.

If feel like exploring the available data, I suggest you use
Kibana and the Elasticsearch GitHub river. I wrote a short guide about it
[here](http://www.mihneadb.net/post/a-github-river-for-elasticsearch/).

The code is fully open source and it's designed to be extensible, making it
easy to add new queries and data visualisations. If you are interested in
contributing, again, the
[README](https://github.com/uberVU/elasticboard/blob/master/README.md)
will help you get started.


Happy hacking!

