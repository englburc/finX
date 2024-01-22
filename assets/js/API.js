const APIKey = '3be0c4ff92mshf3ed26e5ff73578p1884ecjsn26894e084b86';
const url = 'https://alpha-vantage.p.rapidapi.com/query?';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': APIKey,
    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
  }
};

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

function formatNumber(number) {
  // Use the toLocaleString method to add suffixes to the number
  number.toLocaleString('en-US', {
    // add suffixes for thousands, millions, and billions
    // the maximum number of decimal places to use
    maximumFractionDigits: 2,
    // specify the abbreviations to use for the suffixes
    notation: 'compact',
    compactDisplay: 'short'
  });
  return number;
}

function fundamentalData(thicker){
  let APIKey = "g2PtREXHUtUFvq9TqT2kXHdmXdL3gQ0n";
  //let queryURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${thicker}&apikey=8ON1KL0C2YZMXCD3`;
  let queryURL = `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${thicker}?apikey=${APIKey}`;
  fetch(queryURL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log("Market Cap: " + data[0].marketCapTTM.toLocaleString('en-US', {
      // add suffixes for thousands, millions, and billions
      // the maximum number of decimal places to use
      maximumFractionDigits: 2,
      // specify the abbreviations to use for the suffixes
      notation: 'compact',
      compactDisplay: 'short'
    }));
    console.log("Enterprise Value: " + data[0].enterpriseValueTTM.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short'
    }));

    console.log("Revenue: " );
    console.log("Net Income: ");
    console.log("PE Ratio: " + data[0].peRatioTTM.toFixed(2));
    console.log(`Dividend: $${data[0].dividendPerShareTTM} (${data[0].dividendYieldPercentageTTM.toFixed(2)}%)`)

    console.log(data);
  })
}

