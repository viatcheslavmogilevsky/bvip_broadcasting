
  stream = new EventSource('/stream?auth_token=aruRGNO1RMXW9daxN_pIlw');
  stream.onmessage = function(e) {
    var newElement = document.createElement("li");
    eventList = document.getElementById("event-list")
    newElement.innerHTML = "message: " + e.data;
    eventList.appendChild(newElement);
    // console.log("I just got this from the server: " + e.data);
  }




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