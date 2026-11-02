(function () {
    const theme = document.documentElement.getAttribute("data-theme") || "light";
    const logoSrc = theme === "dark" ? "logo-mark-dark.svg" : "logo-mark-light.svg";
    const logoImg =
        `<img class="logo-mark" src="${logoSrc}" width="30" height="30" alt="" decoding="async">`;

    const navHtml = `
<nav class="site-nav site-nav--unified" id="site-nav">
    <div class="nav-shell">
        <div class="nav-wrap">
            <a href="index.html" class="brand">${logoImg}<span>Tiooex</span></a>
            <div class="nav-links" role="navigation" aria-label="Primary">
                <a href="products.html">Capabilities</a>
                <a href="platforms.html">Platforms</a>
                <a href="services.html">Industries</a>
                <a href="blogs.html">Insights</a>
                <a href="about.html">About</a>
                <button type="button" class="theme-toggle nav-theme-toggle" data-theme-toggle aria-label="Switch to dark mode" aria-pressed="false">
                    <span class="theme-icon theme-icon-sun" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg></span>
                    <span class="theme-icon theme-icon-moon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a6.5 6.5 0 0 0 11.5 11.5z"/></svg></span>
                </button>
                <a href="contact.html" class="btn-nav btn-nav-primary">Discuss a project</a>
            </div>
            <div class="nav-actions">
                <button type="button" class="theme-toggle nav-theme-toggle nav-theme-toggle--mobile" data-theme-toggle aria-label="Switch to dark mode" aria-pressed="false">
                    <span class="theme-icon theme-icon-sun" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg></span>
                    <span class="theme-icon theme-icon-moon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a6.5 6.5 0 0 0 11.5 11.5z"/></svg></span>
                </button>
                <button type="button" class="mobile-toggle" id="mobile-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-panel">&#9776;</button>
            </div>
        </div>
        <div class="mobile-panel" id="mobile-panel">
            <a href="index.html">Home</a>
            <a href="products.html">Capabilities</a>
            <a href="platforms.html">Platforms</a>
            <a href="services.html">Industries</a>
            <a href="blogs.html">Insights</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <button type="button" class="mobile-panel-theme" data-theme-toggle aria-label="Switch to dark mode" aria-pressed="false">
                <span class="theme-toggle-label">Appearance</span>
                <span class="theme-toggle-value">Dark mode</span>
            </button>
        </div>
    </div>
</nav>`;

    const footerHtml = `
<footer class="site-footer site-footer--unified" id="site-footer">
    <div class="footer-main">
        <div class="footer-brand-block">
            <a href="index.html" class="footer-brand">${logoImg}<span>Tiooex</span></a>
            <p class="footer-lead">Build, modernise and run the systems your business depends on — secure platforms, connected workflows, and engineering delivery from Bangalore.</p>
        </div>
        <nav class="footer-links" aria-label="Explore">
            <p class="footer-heading">Explore</p>
            <a href="products.html">Capabilities</a>
            <a href="platforms.html">Platforms</a>
            <a href="services.html">Industries</a>
            <a href="blogs.html">Insights</a>
        </nav>
        <nav class="footer-links" aria-label="Company">
            <p class="footer-heading">Company</p>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <a href="contact.html?route=demo">Request a demo</a>
        </nav>
        <address class="footer-card">
            <p class="footer-heading">Contact</p>
            <p class="footer-place">Bangalore, KA 560066, India</p>
            <a class="footer-mail" href="contact.html">Email us</a>
            <p class="footer-copy">Typical reply within two business days.</p>
        </address>
    </div>
    <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Tiooex. All rights reserved.</p>
        <p>Bangalore, Karnataka</p>
    </div>
</footer>`;

    const mount = () => {
        const navMount = document.getElementById("chrome-nav");
        const footerMount = document.getElementById("chrome-footer");
        if (navMount) navMount.outerHTML = navHtml;
        if (footerMount) footerMount.outerHTML = footerHtml;

        const legacyNav = document.getElementById("site-nav");
        if (legacyNav && !navMount) {
            legacyNav.outerHTML = navHtml;
        }
        const legacyFooter = document.getElementById("site-footer");
        if (legacyFooter && !footerMount) {
            legacyFooter.outerHTML = footerHtml;
        }

        if (document.querySelector(".promo-bar")) {
            document.body.classList.add("has-promo");
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mount);
    } else {
        mount();
    }
})();
