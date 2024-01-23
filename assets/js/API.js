const APIKey = '3be0c4ff92mshf3ed26e5ff73578p1884ecjsn26894e084b86';
const APIKey2 = "5ab31f1e6c6bcfdebd17fc608c2d7123";
// Use it just in the appresentation
//const APIKey2 = "g2PtREXHUtUFvq9TqT2kXHdmXdL3gQ0n";

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
      const compName = $("<p class='p-2 fs-5 border-2 rounded w-50'>").text(`${data[0].companyName} (${data[0].symbol})`);
      const price = $("<span class='p-2 fs-5 border-2 rounded w-40'>").text(`  ${data[0].price} (${(((data[0].price / (data[0].price - data[0].changes)) - 1) * 100).toFixed(2)}%)`);
      ElemFDH.append(price);

      const beta = $("<p class='m-2 pb-2 fs-6 border-bottom'>").text(`Beta: ${data[0].beta}`);
      const volume = $("<p class='m-2 pb-2 fs-6 border-bottom'>").text(`Volume: ${data[0].volAvg}`);
      const dayRange = $("<p class='m-2 pb-2 fs-6 border-bottom'>").text(`Day Range: ${data[0].range}`);
      const open = $("<p class='m-2 pb-2 fs-6 border-bottom'>").text(`Open: ${(data[0].price - data[0].changes).toFixed(1)}`);

      ElemFDH.append(compName, price);
      ElemFDR.append(volume, open, dayRange, beta);
      console.log(data);
    });


  queryURL = `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${thicker}?apikey=${APIKey2}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const MarketCap = $("<p class='m-2 pb-2 fs-6 border-bottom'>").text("Market Cap: " + data[0].marketCapTTM.toLocaleString('en-US', {
        // add suffixes for thousands, millions, and billions
        // the maximum number of decimal places to use
        maximumFractionDigits: 2,
        // specify the abbreviations to use for the suffixes
        notation: 'compact',
        compactDisplay: 'short'
      }));
      const EnterpriseValue = $("<p class='m-2 pb-2 fs-6 border-bottom'>").text("Enterprise Value: " + data[0].enterpriseValueTTM.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        notation: 'compact',
        compactDisplay: 'short'
      }));
      const peRatio = $("<p class='m-2 pb-2 fs-6 border-bottom'>").text(`PE Ratio: ${data[0].peRatioTTM.toFixed(2)}`);
      const dividend = $("<p class='m-2 pb-2 fs-6 border-bottom'>").text(`Dividend: $${data[0].dividendPerShareTTM} (${data[0].dividendYieldPercentageTTM.toFixed(2)}%)`);
      ElemFDL.append(MarketCap, EnterpriseValue, peRatio, dividend);


      //  console.log("Revenue: ");
      //  console.log("Net Income: ");
      //  console.log("PE Ratio: " + data[0].peRatioTTM.toFixed(2));
      //  console.log(`Dividend: $${data[0].dividendPerShareTTM} (${data[0].dividendYieldPercentageTTM.toFixed(2)}%)`)

      console.log(data);
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
        const code = $("<p class='m-2'>").text(`${currecy[i]}`);
        const variation = $("<p class='m-2'>").text(`${data[0].bid} (${(data[0].changes * 100).toFixed(2)}%)`);
        ElemForex.append(code, variation);
      })
  })
}


function indexPrice() {
  var currecy = [['SPY', 'S&P 500'], ['', ''], ['', '']];
  $.each(currecy, function (i, v) {
    let queryURL = `https://financialmodelingprep.com/api/v3/profile/${v[0]}?apikey=${APIKey2}`;
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const code = $("<p class='m-2'>").text(`${currecy[i][1]}`);
        const variation = $("<p class='m-2'>").text(`${(((data[0].price / (data[0].price - data[0].changes)) - 1) * 100).toFixed(2)}%`);
        ElemForex.append(code, variation);
      })
  })
}