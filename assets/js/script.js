// waiting for the DOM to be loaded
window.onload = function () {
  const ElemForm = $("#stock-form");
  const ElemInp = $("#ticker-code");

  ElemForm.on("submit", function (e) {
    e.preventDefault();
    const thicker = ElemInp.val().trim();
    if (thicker !== "") {
      console.log("submited");
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

