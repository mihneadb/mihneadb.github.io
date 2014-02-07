---
layout: post
title: "A GitHub river for Elasticsearch"
date: "Fri Feb 07 19:23:02 +0200 2014"
---

[Elasticsearch](http://www.elasticsearch.org/) is a great tool, allowing users to store and query giant text datasets with speed and ease.
However, the thing I like most about elasticsearch is the workflows that you can build
around it and its idioms. One of these idioms is the so-called
[river](http://www.elasticsearch.org/blog/the-river/).

A river is an easy way to set
up a continuous flow of data that goes into your elasticsearch datastore.
It is more convenient than the classical way of manually indexing data because
once configured, all the data will be updated automatically. This reduces
complexity and also helps build a real-time system.

There are already a few rivers out there, like the
[twitter](https://github.com/elasticsearch/elasticsearch-river-twitter/) and
[wikipedia](https://github.com/elasticsearch/elasticsearch-river-wikipedia/blob/master/README.md)
rivers, but there wasn't any GitHub river until
[now](https://github.com/ubervu/elasticsearch-river-github).

##Using the GitHub river

The GitHub river allows us to periodically index a repository's public events.
If you provide authentication data (as seen in the
[README](https://github.com/uberVU/elasticsearch-river-github/blob/master/README.md)),
it can also index data for private repositories.

To get a taste of the workflow possibilities this opens, we will index some data from
the [lettuce](https://github.com/gabrielfalcao/lettuce) repo and explore it in a pretty
[kibana](http://www.elasticsearch.org/overview/kibana/) dashboard.

<a href="http://www.mihneadb.net/other/gh-kibana-dashboard.png"><img src="http://www.mihneadb.net/other/gh-kibana-dashboard.png"></a>

Assuming you have elasticsearch already installed, you first need to install the river. Make sure you restart elasticsearch after this so it picks up the new plugin.

```bash
# if you don't have plugin in your $PATH, it's in $ELASTICSEARCH/bin/plugin.
plugin -i com.ubervu/elasticsearch-river-github/1.2.1

```

Now we can create our GitHub river:

```
curl -XPUT localhost:9200/_river/gh_river/_meta -d '{
    "type": "github",
    "github": {
        "owner": "gabrielfalcao",
        "repository": "lettuce",
        "interval": 3600
    }
}
```

Right after this, elasticsearch will start indexing the most recent 300 (GitHub API policy) public events of `gabrielfalcao/lettuce`. Then, after one hour, it will check again for new events.

The data is accessible in the `gabrielfalcao-lettuce` index, where you will find a
different document type for every GitHub event type.

##Using Kibana to visualize the data

In order to make some sense of this data, let's get Kibana up and running. First,
you need to [download](http://download.elasticsearch.org/kibana/kibana/kibana-latest.zip)
and extract the latest Kibana build. To access it, open `kibana-latest/index.html` in your
favorite web browser.

What you see now is the default Kibana start screen. You could go ahead and configure your
own dashboard, but to speed things up I suggest you import the dashboard I set up. First,
download the JSON [file](http://data.mihneadb.net/gh-kibana.json) that defines the
dashboard. Then, at the top-right corner of the page, go to `Load > Advanced > Choose file` and select the downloaded JSON.

That's it! You now have a basic dashboard set up that shows some key graphs based on
the GitHub data you have in elasticsearch. Furthermore, thanks to the river and the
way the dashboard is set up, you will get new data every hour and the dashboard will
refresh accordingly.

Besides repository events, the river also fetches all the issue data and open pull
requests. Checking those out in Kibana is left as an exercise for the reader.

Happy hacking!
