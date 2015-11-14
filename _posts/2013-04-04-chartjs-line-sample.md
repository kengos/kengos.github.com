---
layout: posts
title: Chart.js line sample
js_files: [Chart.min.js, 2013-04-04.js]
tags: [javascript]
---
<h3>
  <a href="https://github.com/nnnick/Chart.js" target="_blank">Chart.js</a> Option sample
</h3>
<canvas id="line1" height="300"></canvas>
<pre><code class="javascript" data-for="line1">var options = {}</code></pre>

<canvas id="line2" height="300"></canvas>
<pre><code data-for="line2">var options = { scaleOverlay: true }</code></pre>

<canvas id="line3" height="300"></canvas>
<pre><code data-for="line3">var options = {
  scaleOverlay: true,
  scaleOverride: true,
  scaleSteps: 15,
  scaleStepWidth: 10,
  scaleStartValue: -50
}</code></pre>

<p class="note">Note: Tooltip support: <a href="https://github.com/nnnick/Chart.js/pull/51" target="_blank">https://github.com/nnnick/Chart.js/pull/51</a></p>