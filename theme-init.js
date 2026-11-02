(function () {
    const STORAGE_KEY = "tiooex-theme";
    const root = document.documentElement;
    let theme = localStorage.getItem(STORAGE_KEY);
    if (theme !== "light" && theme !== "dark") {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    root.setAttribute("data-theme", theme);
})();
