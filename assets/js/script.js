// waiting for the DOM to be loaded
window.onload = function () {
    const ElemForm = $("#stock-form");
    const ElemInp = $("#ticker-code");

    ElemForm.on("submit", function (e) {
        const thicker = ElemInp.val().trim();
        if (thicker !== "") {
            renderGraph(ElemInp.val().trim());
        }
        else {
            alert("hhhhhh");
        }

    })

}

