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