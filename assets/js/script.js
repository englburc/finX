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
      alert("Input a valid stock thicker!");
    }

  })
  $('#timer').text(dayjs().format('YYYY-MM-DD HH:mm'));

  function showtime() {
    const timeInterval = setInterval(function () {
      // console.log('test..')
      $('#timer').text(dayjs().format('YYYY-MM-DD HH:mm'));
    }, 60000);
  }

  // console.log(showtime())
  showtime()

}


// get the current date and time as a string


// console.log(currentDateTime);
// const timer = $('#timer')
// $('#timer').text(currentDateTime);
// console.log(timer);

