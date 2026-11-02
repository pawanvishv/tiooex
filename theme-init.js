(function () {
    const STORAGE_KEY = "tiooex-theme";
    const root = document.documentElement;
    let theme = localStorage.getItem(STORAGE_KEY);
    if (theme !== "light" && theme !== "dark") {
        theme = "light";
    }
    root.setAttribute("data-theme", theme);
})();
