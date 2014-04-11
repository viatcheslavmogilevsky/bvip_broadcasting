var Source;

$(function() {
  $('form').on("submit", function(event) {
    if (typeof Source != 'undefined') { Source.close(); } 

    Source = new EventSource('/stream?auth_token='+$("#token-value")[0].value)
    Source.onmessage = function(e) {
      var newElement = document.createElement("li");
      list = $('#event-list')[0];
      $(newElement).html(e.data);
      $(list).append(newElement);

      if($("#event-list li").length > 10) {
        $("#event-list li:first").remove();
      }
    }

    Source.onerror = function() {
      console.log("disconnected");
    }

    Source.onopen = function(event) {
      console.log("connected");
    };
    
    event.preventDefault();
  });
});