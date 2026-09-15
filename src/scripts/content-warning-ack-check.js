(function () {
  var gate = document.currentScript.parentElement;
  if (gate.dataset.active !== "true") return;
  try {
    if (localStorage.getItem(document.currentScript.dataset.key) === "1") {
      gate.classList.add("cw-ack");
    }
  } catch (e) {}
})();
