(function () {
    const SITE = "https://www.tiooex.in";
    const SITE_NAME = "Tiooex";
    const OG_IMAGE = SITE + "/assets/og-image.jpg";
    const LOGO_IMAGE = SITE + "/assets/logo-512.jpg";

    const ensureMeta = (attr, key, content) => {
        if (!content) return;
        let el = document.querySelector(`meta[${attr}="${key}"]`);
        if (!el) {
            el = document.createElement("meta");
            el.setAttribute(attr, key);
            document.head.appendChild(el);
        }
        if (el.getAttribute("content") !== content) el.setAttribute("content", content);
    };

    const ensureLink = (rel, href, extra) => {
        if (!href) return;
        const sizeKey = extra && extra.sizes ? `[sizes="${extra.sizes}"]` : ":not([sizes])";
        let el = document.querySelector(`link[rel="${rel}"]${rel === "icon" ? sizeKey : ""}`);
        if (rel === "icon" && extra && extra.sizes) {
            el = [...document.querySelectorAll('link[rel="icon"]')].find(
                (node) => node.getAttribute("sizes") === extra.sizes
            );
        }
        if (!el) {
            el = document.createElement("link");
            el.rel = rel;
            document.head.appendChild(el);
        }
        el.href = href;
        if (extra) {
            Object.entries(extra).forEach(([k, v]) => {
                if (v != null) el.setAttribute(k, v);
            });
        }
    };

    ensureMeta("name", "application-name", SITE_NAME);
    ensureMeta("property", "og:site_name", SITE_NAME);
    ensureMeta("property", "og:image", OG_IMAGE);
    ensureMeta("property", "og:image:width", "1200");
    ensureMeta("property", "og:image:height", "630");
    ensureMeta("property", "og:image:alt", SITE_NAME + " — enterprise software engineering and platforms");
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:image", OG_IMAGE);
    ensureMeta("name", "twitter:image:alt", SITE_NAME + " — enterprise software engineering and platforms");

    ensureLink("icon", "/favicon.ico", { sizes: "48x48", type: "image/x-icon" });
    ensureLink("icon", "/assets/favicon-48.jpg", { sizes: "48x48", type: "image/jpeg" });
    ensureLink("icon", "/assets/logo-512.jpg", { sizes: "512x512", type: "image/jpeg" });
    ensureLink("icon", "/favicon.svg", { type: "image/svg+xml" });
    ensureLink("apple-touch-icon", "/assets/logo-512.jpg", { sizes: "512x512" });
    ensureLink("manifest", "/site.webmanifest");

    const logoObject = {
        "@type": "ImageObject",
        url: LOGO_IMAGE,
        width: 512,
        height: 512
    };

    document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => {
        try {
            const data = JSON.parse(node.textContent || "");
            const graph = data["@graph"] || (data["@type"] ? [data] : []);
            let changed = false;
            graph.forEach((item) => {
                if (!item) return;
                if (item["@type"] === "Organization") {
                    if (item.name !== SITE_NAME) {
                        item.name = SITE_NAME;
                        changed = true;
                    }
                    if (typeof item.logo === "string" || !item.logo || item.logo.url !== LOGO_IMAGE) {
                        item.logo = logoObject;
                        changed = true;
                    }
                    if (!item.image) {
                        item.image = LOGO_IMAGE;
                        changed = true;
                    }
                }
                if (item["@type"] === "WebSite") {
                    if (item.name !== SITE_NAME) {
                        item.name = SITE_NAME;
                        changed = true;
                    }
                    if (!item.publisher) item.publisher = { "@type": "Organization", name: SITE_NAME };
                    if (item.publisher.name !== SITE_NAME) {
                        item.publisher.name = SITE_NAME;
                        changed = true;
                    }
                    if (!item.publisher.logo) {
                        item.publisher.logo = logoObject;
                        changed = true;
                    }
                }
            });
            if (changed && data["@graph"]) node.textContent = JSON.stringify(data, null, 4);
        } catch (_) {
            /* ignore invalid JSON-LD */
        }
    });
})();
