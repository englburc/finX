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


  //local storage


}



