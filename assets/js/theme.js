(function () {
  const storageKey = "draciky-theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "night" : "day");

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(storageKey, theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-label", theme === "night" ? "Zapnúť denný režim" : "Zapnúť nočný režim");
      button.textContent = theme === "night" ? "☀ Denný režim" : "☾ Nočný režim";
    });
  }

  setTheme(initial);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-toggle]");
    if (!button) return;
    setTheme(root.dataset.theme === "night" ? "day" : "night");
  });
})();
