const APIKey = '3be0c4ff92mshf3ed26e5ff73578p1884ecjsn26894e084b86';
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
  let APIKey = "g2PtREXHUtUFvq9TqT2kXHdmXdL3gQ0n";

  let queryURL = `https://financialmodelingprep.com/api/v3/profile/${thicker}?apikey=${APIKey}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      ElemFDH.empty();
      ElemFDR.empty();
      ElemFDL.empty();
      const compName = $("<p class='m-2'>").text(`${data[0].companyName} (${data[0].symbol})`);
      const price = $("<span>").text(`  ${data[0].price} (${(((data[0].price / (data[0].price - data[0].changes)) - 1) * 100).toFixed(2)}%)`);
      compName.append(price);

      const beta = $("<p class='m-2'>").text(`Beta ${data[0].beta}`);
      const volume = $("<p class='m-2'>").text(`Volume ${data[0].volAvg}`);
      const dayRange = $("<p class='m-2'>").text(`Day Range ${data[0].range}`);
      const open = $("<p class='m-2'>").text(`Open ${data[0].price - data[0].changes}`);

      ElemFDH.append(compName);
      ElemFDR.append(volume, open, dayRange, beta);
      console.log(data);
    });


  queryURL = `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${thicker}?apikey=${APIKey}`;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const MarketCap = $("<p class='m-2 fs-6'>").text("Market Cap: " + data[0].marketCapTTM.toLocaleString('en-US', {
        // add suffixes for thousands, millions, and billions
        // the maximum number of decimal places to use
        maximumFractionDigits: 2,
        // specify the abbreviations to use for the suffixes
        notation: 'compact',
        compactDisplay: 'short'
      }));
      const EnterpriseValue = $("<p class='m-2'>").text("Enterprise Value: " + data[0].enterpriseValueTTM.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        notation: 'compact',
        compactDisplay: 'short'
      }));


      ElemFDL.append(MarketCap, EnterpriseValue);


      console.log("Revenue: ");
      console.log("Net Income: ");
      console.log("PE Ratio: " + data[0].peRatioTTM.toFixed(2));
      console.log(`Dividend: $${data[0].dividendPerShareTTM} (${data[0].dividendYieldPercentageTTM.toFixed(2)}%)`)

      console.log(data);
    })
}
