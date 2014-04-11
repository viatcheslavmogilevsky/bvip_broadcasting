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