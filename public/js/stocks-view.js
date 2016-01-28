$(document).ready(function() {
    // var chartData = processData();
    var chartData = getChartData();
    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myLineChart = new Chart(ctx).Line(chartData, {
        	showScale: true,
        	scaleGridLineColor:"rgba(200,200,200,.3)",
        	scaleFontColor: "rgba(200,200,200,.3)",
        	pointDot : true,
        	datasetFill:false,
            responsive: true  //responsive will fit window
        });
    $("#add-data").on("click", function(){

        // window.myLineChart.datasets[0].points[0].value = Math.random() * 100;  //B) this pair works
        // window.myLineChart.update(); //B) this pair works
        
        // window.myLineChart.removeData();    //A) this pair works
        // window.myLineChart.update();        //A) this pair works
    })
})

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