---
layout: default
lang: en
permalink: /blog/
title: blog
description: "Notes for the curious and the easily distracted, on language models, knowledge and what gets lost."
nav: true
nav_order: 1
# jekyll-paginate-v2 replaces this page with a generated object whose path is
# empty, so the defaults rules in _config.yml cannot reach it. The language has
# to be declared here, by hand. It is the only exception in the site.
pagination:
  enabled: true
  collection: posts
  locale: en
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3 # The number of links after the current page
---

{% include blog_index.liquid %}
