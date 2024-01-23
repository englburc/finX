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

}


// get the current date and time as a string


// console.log(currentDateTime);


function showtime() {
  const timeInterval = setInterval(function () {
    const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm');
    $('#timer').val(currentDateTime);
    console.log(currentDateTime);
  }, 60000);
}

console.log(showtime())