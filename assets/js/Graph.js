
function renderGraph(thicker) {
  // call the API with the thicker code
  let data = ChartDataCanvasjs(thicker);

  // variable to store a datapoits to be plotted.
  var dataPoints = [];
  // created a chart object
  var stockChart = new CanvasJS.StockChart("line-chart", {
    zoomEnabled: true,
    animationEnabled: true,

    // call back function to change the axis Y max value
    rangeChanged: function (e) {
      const maxE = e.maximum.toString().substring(0, 10);
      let valueArray = [];
      let maxV = 0;

      const dataArray = Object.entries(dataPoints);
      const filter = dataArray.filter(([key, val]) => dayjs(val['x']).isBetween(dayjs.unix(minE).format('YYYY-MM-DD'),
        dayjs.unix(maxE).format('YYYY-MM-DD'), 'day'));
      filter.forEach((elem) => valueArray.push(elem[1]['y']));
      maxV = Math.max.apply(null, valueArray);
      stockChart.options.charts[0].axisY.maximum = maxV + 100;
    },
    charts: [{
      axisY: {
        labelFontSize: 12,
        maximum: 2000,
      },
      data: [{
        type: "splineArea",
        color: "#3698C5",
        yValueFormatString: "$#,###.##",
        dataPoints: dataPoints
      },
      ]
    }],
    navigator: {
      slider: {
        minimum: new Date(2021, 00, 01),
        maximum: new Date(dayjs()),
      }
    }
  });

  // upload the into the graph dataPoints variable
  data.then(function (result) {
    $.each(result["Time Series (Daily)"], function (i, v) {
      dataPoints.push({ x: new Date(i), y: Number(v["4. close"]) });
    })
    stockChart.render();
  });

}
