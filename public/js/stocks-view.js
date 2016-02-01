var chartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    datasets: []
};

$(document).ready(function() {
    var socket = io();
    chartData = getChartData();
    createChart();
    chartData.datasets = [];
  $('form').submit(function(){
    socket.emit('track stock', $('#message-in').val());
    $('#message-in').val('');
    return false;
  });
  socket.on('new stock', function(stockData){
    addStockTickerToDom(stockData.name);
    addStockTickerToChart(stockData);
  });
  socket.on("delete stock", function(stock){
      removeStockTickerFromChart(stock); //TODO, with success trigger removing from DOM
      removeStockTickerFromDom(stock);
  });
  $(document).on("click", ".stock-remove", function(){  //delegated event
      var temp = this.id.slice(4);
      socket.emit("untrack stock", temp);
  });
})

function createChart(){
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
}

function addStockTickerToDom(stock){
    var stockTicker = document.createElement("div");
    stockTicker.id = "stock-" + stock;
    stockTicker.innerHTML = stock;
    stockTicker.className = "stock-item";

    var stockDelete = document.createElement("span");
    stockDelete.id = "del-" + stock;
    stockDelete.className = "glyphicon glyphicon-remove stock-remove";
    
    stockTicker.appendChild(stockDelete);
    var x = document.getElementById("stock-tickers");
    x.appendChild(stockTicker);
}
function addStockTickerToChart(stock){
    var newDataset = {
      label: stock.name,
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: []
    };
    var dataNum;
    var datasetNum = [];
    var datasetLabel = [];
    var oneLabel = "";
    for (var i = 0; i<stock.data.length; i++){
        // dataNum = Math.floor(Math.random()*100);
        // datasetNum.push(dataNum);
        // console.log(stock.data[i]);
        if (stock.data.length > 30){
            oneLabel = (i % 12 === 0) ? stock.data[i]["date"]:"";
        } 
        else{
            oneLabel = stock.data[i]["date"];
        }
        // console.log(oneLabel);
        datasetLabel.push(oneLabel);
        datasetNum.push(stock.data[i]["close"].toFixed(2));
    }
    newDataset.data = datasetNum;
    chartData.labels = datasetLabel;
    chartData.datasets.push(newDataset);
    window.myLineChart.destroy();
    createChart();
}

function removeStockTickerFromDom(stock){
    $("#stock-"+stock).remove();
}
function removeStockTickerFromChart(stock){
    // alert(chartData.datasets.length);
    var removeItem = findWithAttr(chartData.datasets, 'label', stock);
    if(removeItem >= 0){
        // alert("removing " + removeItem);
        chartData.datasets.splice(removeItem, 1); //remove one item if found
    }
    // alert(chartData.datasets.length);
    window.myLineChart.destroy();
    createChart();
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            // alert(i);
            return i;
        }
    }
    return -1;
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