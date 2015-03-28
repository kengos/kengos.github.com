---
layout: default
title: ブログ一覧
---
<div id="post-list">
<div id="post-items" class="collection collection-post">
{% for post in site.posts %}
  <a href="{{ post.url }}" class="collection-item">{{ post.date | date_to_long_string }} : {{ post.title }}</a>
{% endfor %}
</div>
</div>