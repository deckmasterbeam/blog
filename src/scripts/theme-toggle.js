(function () {
  var select = document.getElementById("theme-toggle");
  var stored = "system";
  try {
    stored = localStorage.getItem("theme") || "system";
  } catch (e) {}
  select.value = stored;
  select.addEventListener("change", function () {
    var value = select.value;
    try {
      localStorage.setItem("theme", value);
    } catch (e) {}
    if (value === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", value);
    }
  });
})();
