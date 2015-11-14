---
layout: default
title: ブログ投稿一覧
---

## ブログ投稿一覧

<div id="post-list">
  <div class="ui very relaxed divided list">
  {% for post in site.posts %}
    <div class="item">
      <div class="content">
        <a class="header" href="{{ post.url }}">{{ post.title }}</a>
        <div class="description">{{ post.date | date: "%Y-%m-%d" }}</div>
      </div>
    </div>
  {% endfor %}
  </div>
</div>