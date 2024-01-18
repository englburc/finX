



const lineChartEl = document.getElementById('line-chart');

// test data
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

            }]
        },
        options: {
            legend: { display: false },
        }
    });
}

// test drawing line chart works
drawLineChart(xValues, yValues) 