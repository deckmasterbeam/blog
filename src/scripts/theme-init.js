(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme && theme !== "system") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  } catch (e) {}
})();
