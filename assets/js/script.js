



const lineChartEl = document.getElementById('line-chart');
const candleChartEl = document.getElementById('candle-chart');

// test data for line chart
const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

function drawLineChart(xValues, yValues) {
    new Chart(lineChartEl, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                lineTension: 0.5,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues,
                markerSize: 0

            }]
        },
        options: {
            legend: { display: false },
        }
    });
}

// test drawing line chart works
drawLineChart(xValues, yValues);


window.onload = function () {
    var chart = new CanvasJS.Chart(candleChartEl, {
        title: {
            text: "Showing Stock Prices of a week"
        },
        axisY: {
            prefix: "Rs.",
            title: "Stock Prices(in.Indian Rupees )",
        },
        axisX: {
            valueFormatString: "DD MMM YY"
        },
        data: [{
            type: "candlestick",
            yValueFormatString: "Rs.##00.00",
            xValueFormatString: "DD MMM YY",
            dataPoints: [
                {
                    x: new Date(2022, 06, 01),
                    y: [21.000787, 36.100091, 33.000888, 37.111222]
                },
                {
                    x: new Date(2022, 06, 02),
                    y: [34.080002, 36.060001, 33.410000, 36.060001]
                },
                {
                    x: new Date(2022, 06, 03),
                    y: [40.250001, 41.500000, 37.540009, 41.880001]
                },
                {
                    x: new Date(2022, 06, 04),
                    y: [24.250001, 40.890002, 39.000111, 40.091234]
                },
                {
                    x: new Date(2022, 06, 05),
                    y: [17.256777, 23.099888, 22.000333, 25.111333]
                },
                {
                    x: new Date(2022, 06, 06),
                    y: [18.710001, 34.700005, 32.099002, 34.000111]
                },
                {
                    x: new Date(2022, 06, 07),
                    y: [21.100002, 42.099888, 43.890002, 44.000234]
                }
            ]
        }]
    }); chart.render();
}