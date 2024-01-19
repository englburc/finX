const APIKey = '3be0c4ff92mshf3ed26e5ff73578p1884ecjsn26894e084b86';
const url = 'https://alpha-vantage.p.rapidapi.com/query?';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': APIKey,
    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
  }
};

function ChartData(thicker, interval) {
  // variables to store the informations to perform the API call and data search
  let queryURL = url + `function=TIME_SERIES_DAILY_ADJUSTED&symbol=${thicker}&datatype=json&outputsize=full`;
  let keySearh = "Time Series (Daily)";
  let size = 'day';

  // 
  switch (interval) {
    case "1D":
      queryURL = url + `interval=15min&function=TIME_SERIES_INTRADAY&symbol=${thicker}&datatype=json&outputsize=compact`
      keySearh = "Time Series (15min)";
      break;
    case "1W":
      queryURL = url + `function=TIME_SERIES_DAILY_ADJUSTED&symbol=${thicker}&datatype=json&outputsize=compact`
      size = '7';
      break;
    case "1M":
      queryURL = url + `function=TIME_SERIES_DAILY_ADJUSTED&symbol=${thicker}&datatype=json&outputsize=compact`
      size = '30';
      break;
    case "1Y":
      size = '365';
      break;
    case "5Y":
      size = '1825';
      break;
    case "MAX":
      size = '3650';
      break;
    default:
      return null;
      break;
  }

  // call the API 
  fetch(queryURL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Test if the API return the value for the correct thicker code
      // If error print the message in the console log to help on the debug process 
      try {        
        if (data["Meta Data"]["2. Symbol"] === thicker) {
          console.log(data["Meta Data"]["2. Symbol"]);
          console.log(data);
          if (size === "day") {
            // check if it contains the real date, 
            // if not, take the one from the previous day.
            // using inline
            let dateSearch = (Object.keys(data[keySearh]).includes(dayjs().format('YYYY-MM-DD 10:00:00')) ? dayjs().format('YYYY-MM-DD') : dayjs().subtract(1, 'day').format('YYYY-MM-DD'));
            // variable to store values of the X and Y axes. 
            let dataOut = { 'axeX': [], 'axeY': [] };
            $.each(data[keySearh], function (i, v) {
              if (i.substring(0, 10) == dateSearch) {
                dataOut.axeX.push(i);
                dataOut.axeY.push(v);
              }
            })
            // Reverse the sequence of date time come from the API
            dataOut.axeX = dataOut.axeX.reverse();
            dataOut.axeY = dataOut.axeY.reverse();
            console.log(dataOut);
            return dataOut;
          }
          else {
            let dataOut = { 'axeX': [], 'axeY': [] };
            let KeyArray = Object.keys(data[keySearh]);

            // check if the stock thicker have the enouh historical data regards the section,
            // otherwise take the max data retrived by the API.  
            let checkSize = (Object.keys(data[keySearh]).length < size ? Object.keys(data[keySearh]).length : size);
            for (let i = 0; i < checkSize; i++) {
              dataOut.axeX.push(KeyArray[i]);
              dataOut.axeY.push(data[keySearh][KeyArray[i]]);
            }
            dataOut.axeX = dataOut.axeX.reverse();
            dataOut.axeY = dataOut.axeY.reverse();
            return dataOut;
          }
        }
      }
      // print the message error in the console log to help on the debug process
      catch (error) {
        console.log(`API return Erro: ${error}`);
        console.log(data);
      }
    })
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


// Options to interval parameter, needs to be storage inside a data-interval in the button 
// 1D, 1W, 1M, 1Y, 5Y, MAX 
//console.log(ChartData("AAPL", "1D"));


fundamentalData("AAPL");