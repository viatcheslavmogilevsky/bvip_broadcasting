
  // stream = new EventSource('/stream?auth_token=VXbNYV9RBND1f_kcwTkZug');
  // stream.onmessage = function(e) {
  //   var newElement = document.createElement("li");
  //   eventList = document.getElementById("event-list")
  //   newElement.innerHTML = "message: " + e.data;
  //   eventList.appendChild(newElement);
  //   // console.log("I just got this from the server: " + e.data);
  // }



//; = new EventSource('/stream?auth_token=' )

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

    

    //console.log($("#token-value")[0].value);
    event.preventDefault();

    // return false;
    //Source = new EventSource('/stream?auth_token='+$("#token_value").value)
  });
});
//}


// var 
// stream.onmessage = function(e) {
//   console.log("I just got this from the server: " + e.data);
// }


// var eventSource = new EventSource('/stream?auth_token=aruRGNO1RMXW9daxN_pIlw');
// var stockChart; // A <canvas> wrapper perhaps
// var newsTicker; // A <ul> of news story links

// eventSource.addEventListener('open', function() {
//     stockChart = initializeChart();
//     newsTicker = initializeTicker();
// }, false);

// // An event without a type came in
// eventSource.addEventListener('message', function(event) {
//     var stockData = event.data;
//     if (stockData.last_trade_date && stockData.price) {
//         stockChart.addPoint(stockData.time, stockData.price);
//     }
// }, false);

// // Only fired by events with the type: "news"
// eventSource.addEventListener('news', function(event) {
//     newsTicker.add(event.id, event.data);
// }, false);

// // EventSource lost connection or timed out
// eventSource.addEventListener('error', function() {
//     eventSource.close();
//     reinitiateEventSource();
// }, false);