(function () {
    const logoSvg =
        '<svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><rect x="18" y="2" width="12" height="12" rx="2" fill="currentColor" opacity=".45"/><rect x="2" y="18" width="12" height="12" rx="2" fill="currentColor" opacity=".45"/><rect x="18" y="18" width="12" height="12" rx="2" fill="#087E8B"/></svg>';

    const navHtml = `
<nav class="site-nav site-nav--unified" id="site-nav">
    <div class="nav-shell">
        <div class="nav-wrap">
            <a href="index.html" class="brand">${logoSvg}<span>Tiooex</span></a>
            <div class="nav-links" role="navigation" aria-label="Primary">
                <a href="products.html">Capabilities</a>
                <a href="platforms.html">Platforms</a>
                <a href="services.html">Industries</a>
                <a href="blogs.html">Insights</a>
                <a href="about.html">About</a>
                <a href="contact.html" class="btn-nav btn-nav-primary">Discuss a project</a>
            </div>
            <button type="button" class="mobile-toggle" id="mobile-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-panel">&#9776;</button>
        </div>
        <div class="mobile-panel" id="mobile-panel">
            <a href="index.html">Home</a>
            <a href="products.html">Capabilities</a>
            <a href="platforms.html">Platforms</a>
            <a href="services.html">Industries</a>
            <a href="blogs.html">Insights</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        </div>
    </div>
</nav>`;

    const footerHtml = `
<footer class="site-footer site-footer--unified" id="site-footer">
    <div class="footer-main">
        <div class="footer-brand-block">
            <a href="index.html" class="footer-brand">${logoSvg}<span>Tiooex</span></a>
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
