// waiting for the DOM to be loaded
window.onload = function () {
  const ElemForm = $("#stock-form");
  const ElemInp = $("#ticker-code");

  ElemForm.on("submit", function (e) {
    e.preventDefault();
    const thicker = ElemInp.val().trim();
    if (thicker !== "") {
      console.log("submitted");
      renderGraph(thicker);
      fundamentalData(thicker);
      forexPrice();
      ElemInp.val("");
    }
    else {
      alert("Input a valid stock ticker!");
    }

  })
  $('#timer').text(dayjs().format('YYYY-MM-DD HH:mm'));

  function showtime() {
    const timeInterval = setInterval(function () {

      $('#timer').text(dayjs().format('YYYY-MM-DD HH:mm'));
    }, 60000);
  }
  showtime()

  //JASON object containing history
  const history = {
    history: "history"
  };
  console.log({ history })
  //delete previous data before saving new history
  localStorage.clear();
  //save history to local storage
  localStorage.setItem("history", JSON.stringify(history));
  console.log({ localStorage })

  // get JASON from local storage
  const historyFromLocalStorage = JSON.parse(localStorage.getItem("history"));
  console.log({ historyFromLocalStorage })


}



