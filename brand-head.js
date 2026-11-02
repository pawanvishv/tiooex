(function () {
    const SITE = "https://www.tiooex.in";
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
        let el = document.querySelector(`link[rel="${rel}"]`);
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

    ensureLink("icon", "favicon.svg", { type: "image/svg+xml" });
    ensureLink("apple-touch-icon", "assets/logo-512.jpg", { sizes: "512x512" });
    ensureLink("manifest", "site.webmanifest");

    ensureMeta("property", "og:image", OG_IMAGE);
    ensureMeta("property", "og:image:width", "1200");
    ensureMeta("property", "og:image:height", "630");
    ensureMeta("property", "og:image:alt", "Tiooex — enterprise software engineering and platforms");
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:image", OG_IMAGE);
    ensureMeta("name", "twitter:image:alt", "Tiooex — enterprise software engineering and platforms");

    document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => {
        try {
            const data = JSON.parse(node.textContent || "");
            const graph = data["@graph"] || (data["@type"] ? [data] : []);
            let changed = false;
            graph.forEach((item) => {
                if (item && (item["@type"] === "Organization" || item["@type"] === "WebSite")) {
                    if (item["@type"] === "Organization" && item.logo !== LOGO_IMAGE) {
                        item.logo = LOGO_IMAGE;
                        changed = true;
                    }
                    if (item["@type"] === "Organization" && !item.image) {
                        item.image = LOGO_IMAGE;
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
