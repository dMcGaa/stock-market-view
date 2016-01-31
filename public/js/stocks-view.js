$(document).ready(function() {
    // var chartData = processData();
    var socket = io();
    var chartData = getChartData();
    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myLineChart = new Chart(ctx).Line(chartData, {
        	showScale: true,
        	scaleGridLineColor:"rgba(200,200,200,.3)",
        	scaleFontColor: "rgba(200,200,200,.3)",
        	scaleLabel: "<%=value%>$",
        	multiTooltipTemplate: "<%= datasetLabel %> - $<%= value %>",
        	pointDot : true,
        	datasetFill:false,
            responsive: true  //responsive will fit window
        });
  $('form').submit(function(){
    socket.emit('track stock', $('#message-in').val());
    $('#message-in').val('');
    return false;
  });
  socket.on('new stock', function(stock){
    addStockTicker(stock);
  });
})

function addStockTicker(stock){
    var stockTicker = document.createElement("div");
    stockTicker.id = stock;
    stockTicker.innerHTML = stock;
    stockTicker.style.display = "inline";
    
    var stockDelete = document.createElement("button");
    stockDelete.id = "del-" + stock;
    stockDelete.innerHTML = "del";
    stockDelete.style.display = "inline";
    
    stockTicker.appendChild(stockDelete);
    stockTicker.style.marginLeft = "5px";
    stockTicker.style.marginRight = "5px";
    var x = document.getElementById("stock-tickers");
    x.appendChild(stockTicker);

    // $('#stock-tickers').append($('<div>').text(stock));
    
}

function getChartData(){
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    return data;
}