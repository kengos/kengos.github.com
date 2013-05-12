---
layout: posts
title: Chart.js line sample
js_files: [Chart.min.js]
tags: [javascript]
---
<h3>
  <a href="https://github.com/nnnick/Chart.js" target="_blank">Chart.js</a> Option sample
</h3>
<div class="row-fluid">
  <div class="span9">
    <canvas id="line1" height="300"></canvas>
  </div>
  <div class="span3">
<pre><code data-for="line1">var options = {

}</code></pre>
  </div>
</div>
<div class="row-fluid">
  <div class="span9">
    <canvas id="line2" height="300"></canvas>
  </div>
  <div class="span3">
<pre><code data-for="line2">var options = {
  scaleOverlay: true
}</code></pre>
  </div>
</div>
<div class="row-fluid">
  <div class="span9">
    <canvas id="line3" height="300"></canvas>
  </div>
  <div class="span3">
<pre><code data-for="line3">var options = {
  scaleOverlay: true,
  scaleOverride: true,
  scaleSteps: 15,
  scaleStepWidth: 10,
  scaleStartValue: -50
}</code></pre>
  </div>
</div>
<p class="note">Note: Tooltip support: <a href="https://github.com/nnnick/Chart.js/pull/51" target="_blank">https://github.com/nnnick/Chart.js/pull/51</a></p>
<script>
$(function(){
  var data = {
    labels : ["1月","2月","3月","4月","5月","6月","7月"],
    datasets : [
      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [65,59,90,81,56,55,40]
      },
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [28,48,40,19,96,27,100]
      }
    ]
  };
  $("canvas").each(function(){
    $(this).attr({width: $(this).parent().width()});
    var $canvas = $(this);
    var ctx = this.getContext("2d");
    eval($("code[data-for='" + $canvas.attr("id") + "']").text());
    new Chart(ctx).Line(data, options);
  });
});
</script>