const APIKey = '3be0c4ff92mshf3ed26e5ff73578p1884ecjsn26894e084b86';
const APIKey2 = "TcSAvBTZl318Z8WuUz8XSJQFRnjScxv6";
//TcSAvBTZl318Z8WuUz8XSJQFRnjScxv6
// Use it just in the appresentation
//const APIKey2 = "5ab31f1e6c6bcfdebd17fc608c2d7123";

const url = 'https://alpha-vantage.p.rapidapi.com/query?';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': APIKey,
    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
  }
};
const ElemFDH = $("#fundamental-data-header");
const ElemFDL = $("#fundamental-data-left");
const ElemFDR = $("#fundamental-data-right");
const ElemForex = $("#forex-price");

function ChartDataCanvasjs(thicker) {
  // variables to store the informations to perform the API call and data search
  let queryURL = url + `function=TIME_SERIES_DAILY_ADJUSTED&symbol=${thicker}&datatype=json&outputsize=full`;

  // call the API 
  return fetch(queryURL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    }
    )
}

function buttonData(thicker) {
  let queryURL = `https://financialmodelingprep.com/api/v3/quote-order/${thicker}?apikey=${APIKey2}`;

  // call the API 
  return fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data;
    })
}

function fundamentalData(thicker) {


  let queryURL = `https://financialmodelingprep.com/api/v3/profile/${thicker}?apikey=${APIKey2}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      ElemFDH.empty();
      ElemFDR.empty();
      ElemFDL.empty();
      const compName = $("<p class='p-2 fs-5 border border-2 rounded w-50' id='name-company'>").text(`${data[0].companyName} (${data[0].symbol})`);
      const variation = $(((((data[0].price / (data[0].price - data[0].changes)) - 1) * 100) > 0 ? "<p class='p-2 fs-5 text-success border border-2 rounded'>" : "<p class='p-2 fs-5 text-danger border border-2 rounded w-50'>")).text(` ${data[0].price} (${(((data[0].price / (data[0].price - data[0].changes)) - 1) * 100).toFixed(2)}%)`);

      const beta = $("<p class='m-2 pb-2 border-bottom' style='font-size: smaller'>").text(`Beta: ${data[0].beta}`);
      const volume = $("<p class='m-2 pb-2 border-bottom' style='font-size: smaller'>").text(`Volume: ${data[0].volAvg}`);
      const dayRange = $("<p class='m-2 pb-2 border-bottom' style='font-size: smaller'>").text(`Day Range: ${data[0].range}`);
      const open = $("<p class='m-2 pb-2 border-bottom' style='font-size: smaller'>").text(`Open: ${(data[0].price - data[0].changes).toFixed(1)}`);

      ElemFDH.append(compName, variation);
      ElemFDR.append(volume, open, dayRange, beta);
    });


  queryURL = `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${thicker}?apikey=${APIKey2}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const MarketCap = $("<p class='m-2 pb-2 border-bottom' style='font-size: smaller'>").text("Market Cap: " + data[0].marketCapTTM.toLocaleString('en-US', {
        // add suffixes for thousands, millions, and billions
        // the maximum number of decimal places to use
        maximumFractionDigits: 2,
        // specify the abbreviations to use for the suffixes
        notation: 'compact',
        compactDisplay: 'short'
      }));
      const EnterpriseValue = $("<p class='m-2 pb-2 border-bottom' style='font-size: smaller'>").text("Enterprise Value: " + data[0].enterpriseValueTTM.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        notation: 'compact',
        compactDisplay: 'short'
      }));
      const peRatio = $("<p class='m-2 pb-2 border-bottom' style='font-size: smaller'>").text(`PE Ratio: ${data[0].peRatioTTM.toFixed(2)}`);
      const dividend = $("<p class='m-2 pb-2 border-bottom' style='font-size: smaller'>").text(`Dividend: $${data[0].dividendPerShareTTM} (${data[0].dividendYieldPercentageTTM.toFixed(2)}%)`);
      ElemFDL.append(MarketCap, EnterpriseValue, peRatio, dividend);
    })
}


function forexPrice() {
  var currecy = ['EURUSD', 'GBPUSD', 'GBPEUR'];
  ElemForex.empty();
  $.each(currecy, function (i, v) {
    let queryURL = `https://financialmodelingprep.com/api/v3/fx/${v}?apikey=${APIKey2}`;
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const forexEl = $("<div class='col-6 col-lg-12'>");
        const code = $("<p class='mt-3 mb-0 text-info fw-bold'>").text(`${currecy[i]}`);
        // condicional formating based on the variation
        const variation = $((data[0].changes > 0 ? "<p class='m-0 text-success fw-bold'>" : "<p class='m-0 text-danger fw-bold'>")).text(`${data[0].bid} (${(data[0].changes * 100).toFixed(2)}%)`);
        forexEl.append(code, variation)
        ElemForex.append(forexEl);
      })
  })
}


function indexPrice() {
  var currecy = [['SPY', 'S&P 500']];
  $.each(currecy, function (i, v) {
    let queryURL = `https://financialmodelingprep.com/api/v3/profile/${v[0]}?apikey=${APIKey2}`;
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const code = $("<p class='mt-3 mb-0 text-info fw-bold'>").text(`${currecy[i][1]}`);
        const indexEl = $("<div class='col-6 col-lg-12'>");
        // condicional formating based on the variation
        const variation = $((((data[0].price / (data[0].price - data[0].changes)) - 1) > 0 ? "<p class='m-0 text-success fw-bold'>" : "<p class='m-0 text-danger fw-bold'>")).text(`${(((data[0].price / (data[0].price - data[0].changes)) - 1) * 100).toFixed(2)}%`);
        indexEl.append(code,variation);
        ElemForex.append(indexEl);
      })
  })
}
