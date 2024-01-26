// waiting for the DOM to be loaded
window.onload = function () {
  const ElemForm = $("#stock-form");
  const ElemInp = $("#ticker-code");
  const Elemhistory = $("#history-section");

  function callAPI(e) {
    e.preventDefault();
    const thicker = ElemInp.val().trim();
    if (thicker !== "" && e.type === "submit") {
      renderGraph(thicker);
      fundamentalData(thicker);
      forexPrice();
      indexPrice();
      addHistory(thicker);
      ElemInp.val("");
    }
    else if (e.type === "click") {
      renderGraph($(this).attr("data-stock"));
      fundamentalData($(this).attr("data-stock"));
      forexPrice();
      indexPrice();
    }
    else {
      alert("Input a valid stock ticker!");
    }
  }

  // Added event listening   
  ElemForm.on("submit", callAPI);
  Elemhistory.on("click", "button", callAPI);

  renderButtons();

  $('#timer').text(dayjs().format('DD-MM-YYYY h:mmA'));
  $('#time-sm').text(dayjs().format('DD-MM-YYYY h:mmA'));

  function showtime() {
    const timeInterval = setInterval(function () {
      $('#timer').text(dayjs().format('DD-MM-YYYY h:mmA'));
    }, 60000);
  }
  showtime()


  // Function to render the buttons on the history section.
  // If called with parameter, it render just a new button
  // If called without parameter, it render a new button for each stock in the history array     
  function renderButtons(stock) {
    if (stock === undefined) {
      historyStorage = JSON.parse(localStorage.getItem("history_stock"));
      if (historyStorage !== null) {
        $.each(historyStorage, function (i, v) {
          const ElemButton = $("<button class='m-2 p-2 fs-5 border-2 rounded bg-primary-subtle'>").attr("type", "button");
          ElemButton.attr("data-stock", v);
          let actualPrice = buttonData(v);
          actualPrice.then(function (result) {
            console.log(result[0]);
            ElemButton.text(`${result[0].symbol} - ${result[0].name} ${result[0].price} (${result[0].changesPercentage.toFixed(2)}%)`);
          });
          Elemhistory.prepend(ElemButton);
        })
      }
    }
    else {
      const ElemButton = $("<button class='m-2 p-2 fs-5 border-2 rounded bg-primary-subtle'>").attr("type", "button");
      ElemButton.attr("data-stock", stock);
      let actualPrice = buttonData(stock);
      actualPrice.then(function (result) {
        console.log(result[0]);
        ElemButton.text(`${result[0].symbol} - ${result[0].name} ${result[0].price} (${result[0].changesPercentage.toFixed(2)}%)`);
      });
      Elemhistory.prepend(ElemButton);
    }
  }

  // function to add a new stock to the history Object in the localStorage.
  // If the localStorage is empty, it create a new array with the stock passed to the function and add it to the localStorage
  // If not, it push a new stock to the localStorage only in case that it doesn't exist.
  function addHistory(stock) {
    historyStorage = JSON.parse(localStorage.getItem("history_stock"));
    if (historyStorage === null) {
      historyStorage = [stock];
      localStorage.setItem("history_stock", JSON.stringify(historyStorage));
      renderButtons(stock);
    }
    else if (!historyStorage.includes(stock)) {
      historyStorage.push(stock);
      localStorage.setItem("history_stock", JSON.stringify(historyStorage));
      renderButtons(stock);
    }
  }

}



