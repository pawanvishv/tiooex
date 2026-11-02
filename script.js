document.documentElement.classList.add("js");

const TIOOEX_THEME_KEY = "tiooex-theme";

const syncThemeUi = (theme) => {
    const isDark = theme === "dark";
    const next = isDark ? "light" : "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((control) => {
        control.setAttribute("aria-label", `Switch to ${next} mode`);
        control.setAttribute("aria-pressed", isDark ? "true" : "false");
    });
    document.querySelectorAll(".mobile-panel-theme .theme-toggle-value").forEach((el) => {
        el.textContent = isDark ? "Light mode" : "Dark mode";
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = isDark ? "#0d1218" : "#f4f6f9";
};

const setSiteTheme = (theme) => {
    if (theme !== "light" && theme !== "dark") return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(TIOOEX_THEME_KEY, theme);
    syncThemeUi(theme);
    const panel = document.getElementById("mobile-panel");
    const toggle = document.getElementById("mobile-toggle");
    if (panel?.classList.contains("open")) {
        panel.classList.remove("open");
        panel.setAttribute("aria-hidden", "true");
        toggle?.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const initialTheme = document.documentElement.getAttribute("data-theme") || "light";
    syncThemeUi(initialTheme);
    document.querySelectorAll("[data-theme-toggle]").forEach((control) => {
        control.addEventListener("click", (event) => {
            event.stopPropagation();
            const current = document.documentElement.getAttribute("data-theme") || "light";
            setSiteTheme(current === "dark" ? "light" : "dark");
        });
    });
    const publicMail = ["contact.tiooex", "gmail.com"].join("@");
    document.querySelectorAll(".footer-mail").forEach((link) => {
        const preferContact = link.getAttribute("href") === "contact.html";
        if (!preferContact) {
            link.textContent = publicMail;
            link.href = "mailto:" + publicMail;
        }
    });
    const data = window.TIOOEX || { capabilities: [], articles: [], industries: [], clients: [] };

    const useStages = {
        modernise: {
            kicker: "Engineering workflow",
            line: "Landing zone → migration wave → rollback point → release gate → run-state dashboard",
            href: "products.html#cloud"
        },
        commerce: {
            kicker: "Commerce workflow",
            line: "Catalog → stock sync → cart → POS sale → fulfilment → reconciliation report",
            href: "platforms.html#commerce"
        },
        mobility: {
            kicker: "Mobility workflow",
            line: "Connected fault → triage → dispatch → workshop job → field update → fleet closure",
            href: "platforms.html#mobility"
        },
        audit: {
            kicker: "Regulated workflow",
            line: "Decision → data lineage → model assist → human review → security gate → audit log",
            href: "products.html#data-ai"
        }
    };
    const useCards = [...document.querySelectorAll(".use-card[data-use]")];
    const useLine = document.getElementById("use-stage-line");
    const useKicker = document.getElementById("use-stage-kicker");
    const useLink = document.getElementById("use-stage-link");
    const pickUse = (id) => {
        const stage = useStages[id];
        if (!stage) return;
        useCards.forEach((card) => {
            const on = card.dataset.use === id;
            card.classList.toggle("is-active", on);
            card.setAttribute("aria-pressed", on ? "true" : "false");
        });
        if (useKicker) useKicker.textContent = stage.kicker;
        if (useLine) useLine.textContent = stage.line;
        if (useLink) {
            useLink.href = stage.href;
            useLink.textContent = "Explore " + stage.kicker.toLowerCase();
        }
    };
    useCards.forEach((card) => {
        card.addEventListener("click", () => pickUse(card.dataset.use));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                pickUse(card.dataset.use);
            }
        });
    });
    if (useCards.length) pickUse(useCards.find((c) => c.classList.contains("is-active"))?.dataset.use || useCards[0].dataset.use);

    const outcomeChips = [...document.querySelectorAll(".outcome-chip[data-outcome]")];
    const outcomePreview = document.getElementById("outcome-preview");
    outcomeChips.forEach((chip) => {
        chip.addEventListener("click", () => {
            outcomeChips.forEach((peer) => {
                const on = peer === chip;
                peer.classList.toggle("is-active", on);
                peer.setAttribute("aria-pressed", on ? "true" : "false");
            });
            if (outcomePreview) outcomePreview.textContent = chip.dataset.outcome || "";
        });
    });

    document.querySelectorAll(".post-hero-jump a").forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        });
    });

    const nav = document.getElementById("site-nav");
    const toggle = document.getElementById("mobile-toggle");
    const panel = document.getElementById("mobile-panel");
    const promoBar = document.querySelector(".promo-bar");
    let lastFocus = null;

    const file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const home = file === "" || file === "index.html";
    document.querySelectorAll(".nav-links a, .mobile-panel a").forEach((link) => {
        const href = link.getAttribute("href") || "";
        if (href.includes("#")) return;
        const raw = (href.split("#")[0].split("/").pop() || "index.html").toLowerCase();
        const linkHome = raw === "" || raw === "index.html";
        if ((linkHome && home) || raw === file) link.setAttribute("aria-current", "page");
    });

    const handleScroll = () => {
        if (nav) nav.classList.toggle("scrolled", window.scrollY > 12);
        if (promoBar) {
            const hide = window.scrollY > 48;
            promoBar.classList.toggle("is-hidden", hide);
            document.body.classList.toggle("promo-hidden", hide);
            if (nav && !nav.classList.contains("site-nav--unified")) {
                nav.style.top = hide ? "0" : "";
                nav.style.setProperty("--nav-bottom", hide ? "64px" : "102px");
            } else if (nav) {
                nav.style.removeProperty("top");
            }
            document.documentElement.style.setProperty("--sticky-top", hide ? "76px" : "110px");
        }
        const bar = document.querySelector(".progress");
        if (bar) {
            const height = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
        }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const closeMenu = () => {
        if (!panel || !toggle) return;
        panel.classList.remove("open");
        panel.setAttribute("aria-hidden", "true");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        document.body.classList.remove("menu-open");
    };

    if (toggle && panel) {
        toggle.type = "button";
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", "mobile-panel");
        panel.setAttribute("aria-hidden", "true");
        toggle.addEventListener("click", (event) => {
            event.stopPropagation();
            const open = panel.classList.toggle("open");
            panel.setAttribute("aria-hidden", open ? "false" : "true");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
            toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            document.body.classList.toggle("menu-open", open);
        });
        document.addEventListener("click", (event) => {
            if (!panel.classList.contains("open")) return;
            if (panel.contains(event.target) || toggle.contains(event.target)) return;
            closeMenu();
        });
    }

    document.querySelectorAll(".mobile-panel a").forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && panel?.classList.contains("open")) closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 901px)").matches) closeMenu();
    }, { passive: true });

    const revealItems = document.querySelectorAll(".reveal");
    let revealObserver = null;
    if ("IntersectionObserver" in window) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
        revealItems.forEach((el) => revealObserver.observe(el));
    } else {
        revealItems.forEach((el) => el.classList.add("visible"));
    }

    const clientWall = document.getElementById("client-wall");
    if (clientWall && data.clients.length) {
        data.clients.forEach((client, index) => {
            const card = document.createElement("article");
            card.className = "client-card reveal";
            card.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
            if (client.logo) {
                const img = document.createElement("img");
                img.src = client.logo;
                img.alt = `${client.name} logo`;
                img.width = 120;
                img.height = 40;
                img.loading = "lazy";
                const sector = document.createElement("span");
                sector.className = "client-sector";
                sector.textContent = client.sector;
                card.append(img, sector);
            } else {
                const sector = document.createElement("span");
                sector.className = "client-sector";
                sector.textContent = client.sector;
                const title = document.createElement("strong");
                title.textContent = client.name;
                const summary = document.createElement("p");
                summary.textContent = client.summary;
                card.append(sector, title, summary);
            }
            clientWall.appendChild(card);
            if (revealObserver) revealObserver.observe(card);
            else card.classList.add("visible");
        });
    }

    const initSectionJump = (rootSelector, scrollOffset = 140) => {
        const jump = document.querySelector(rootSelector);
        if (!jump) return;
        const links = [...jump.querySelectorAll("a[href^='#']")];
        const sections = links
            .map((link) => document.querySelector(link.getAttribute("href")))
            .filter(Boolean);
        if (!sections.length) return;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                const target = document.querySelector(link.getAttribute("href"));
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
                links.forEach((peer) => peer.classList.toggle("is-current", peer === link));
            });
        });
        const mark = () => {
            const y = window.scrollY + scrollOffset;
            let current = sections[0];
            sections.forEach((section) => {
                if (section.offsetTop <= y) current = section;
            });
            links.forEach((link) => {
                const on = Boolean(current && link.getAttribute("href") === "#" + current.id);
                link.classList.toggle("is-current", on);
                if (on) link.setAttribute("aria-current", "true");
                else link.removeAttribute("aria-current");
            });
        };
        mark();
        window.addEventListener("scroll", mark, { passive: true });
    };
    initSectionJump(".jumpbar", 140);
    initSectionJump(".plat-jump", 160);

    document.querySelectorAll("[data-engage]").forEach((root) => {
        const tabs = [...root.querySelectorAll('[role="tab"]')];
        const panels = [...root.querySelectorAll('[role="tabpanel"]')];
        const select = (id) => {
            tabs.forEach((tab) => {
                const on = tab.id === id;
                tab.setAttribute("aria-selected", on ? "true" : "false");
                tab.tabIndex = on ? 0 : -1;
            });
            panels.forEach((panelEl) => {
                panelEl.hidden = panelEl.getAttribute("aria-labelledby") !== id;
            });
        };
        tabs.forEach((tab) => {
            tab.addEventListener("click", () => select(tab.id));
            tab.addEventListener("keydown", (event) => {
                const index = tabs.indexOf(tab);
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    event.preventDefault();
                    tabs[(index + 1) % tabs.length].focus();
                    select(tabs[(index + 1) % tabs.length].id);
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    event.preventDefault();
                    tabs[(index - 1 + tabs.length) % tabs.length].focus();
                    select(tabs[(index - 1 + tabs.length) % tabs.length].id);
                }
            });
        });
    });

    document.querySelectorAll(".faq-item").forEach((item) => {
        const button = item.querySelector("button");
        const answer = item.querySelector(".faq-a");
        if (!button || !answer) return;
        button.addEventListener("click", () => {
            const open = item.classList.toggle("is-open");
            button.setAttribute("aria-expanded", open ? "true" : "false");
            answer.hidden = !open;
            const mark = button.querySelector("span");
            if (mark) mark.textContent = open ? "–" : "+";
        });
    });

    const openStrip = (row, strip) => {
        if (!row || !strip) return;
        row.querySelectorAll(".strip").forEach((item) => {
            const on = item === strip;
            item.classList.toggle("is-open", on);
            const button = item.querySelector(".strip-arrow");
            if (button) button.setAttribute("aria-expanded", on ? "true" : "false");
        });
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    document.querySelectorAll(".strip-row").forEach((row) => {
        let timer = null;
        let paused = false;
        const clickToOpen = document.body.classList.contains("page-services");
        const visibleStrips = () => [...row.querySelectorAll(".strip")].filter((item) => !item.classList.contains("is-filtered-out"));
        const advance = () => {
            if (paused) return;
            const items = visibleStrips();
            if (items.length < 2) return;
            const index = items.findIndex((item) => item.classList.contains("is-open"));
            openStrip(row, items[(index + 1) % items.length]);
        };
        const startMotion = () => {
            clearInterval(timer);
            if (reduceMotion || !finePointer) return;
            timer = setInterval(advance, 2800);
        };
        const hold = (strip) => {
            paused = true;
            clearInterval(timer);
            openStrip(row, strip);
        };
        row.querySelectorAll(".strip").forEach((strip) => {
            strip.addEventListener("pointerenter", (event) => {
                if (event.pointerType === "touch") return;
                if (clickToOpen) {
                    paused = true;
                    clearInterval(timer);
                    return;
                }
                hold(strip);
            });
            strip.addEventListener("click", (event) => {
                if (event.target.closest("a, .read-btn")) return;
                hold(strip);
            });
        });
        row.addEventListener("pointerleave", () => {
            paused = false;
            startMotion();
        });
        startMotion();
    });
    const hashedStrip = document.getElementById((location.hash || "").replace("#", ""));
    if (hashedStrip && hashedStrip.classList.contains("strip")) {
        hashedStrip.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true, pointerType: "mouse" }));
    }

    const pills = document.querySelectorAll(".pill-tag[data-category], .hero-content .pill-tag");
    const filterItems = document.querySelectorAll(".filterable");
    if (pills.length && filterItems.length) {
        pills.forEach((pill) => {
            pill.addEventListener("click", () => {
                pills.forEach((p) => {
                    p.classList.remove("active");
                    p.setAttribute("aria-pressed", "false");
                });
                pill.classList.add("active");
                pill.setAttribute("aria-pressed", "true");
                const cat = (pill.dataset.category || pill.textContent).trim().toLowerCase();
                filterItems.forEach((item) => {
                    const show = cat === "all" || item.dataset.category === cat;
                    item.classList.toggle("is-filtered-out", !show);
                });
                document.querySelectorAll(".strip-row").forEach((row) => {
                    const visible = [...row.querySelectorAll(".strip")].filter((item) => !item.classList.contains("is-filtered-out"));
                    const current = row.querySelector(".strip.is-open");
                    if ((!current || current.classList.contains("is-filtered-out")) && visible[0]) openStrip(row, visible[0]);
                });
                const insightEmpty = document.getElementById("insight-empty");
                if (insightEmpty) {
                    insightEmpty.hidden = [...filterItems].some((item) => !item.classList.contains("is-filtered-out"));
                }
            });
        });
    }

    const capSearch = document.getElementById("cap-search");
    const capFilters = document.getElementById("cap-filters");
    const capCards = [...document.querySelectorAll(".cap-card[data-cap]")];
    const capCount = document.getElementById("cap-count");
    const capEmpty = document.getElementById("cap-empty");
    let capGroup = "all";

    const capSynonyms = {
        cloud: ["infrastructure", "migration", "devops", "aws", "azure"],
        cybersecurity: ["security", "risk", "compliance", "audit"],
        "data-ai": ["analytics", "machine learning", "ml", "ai", "data"],
        "digital-engineering": ["software", "development", "modernisation", "modernization"],
        "supply-chain": ["logistics", "inventory", "fulfillment", "fulfilment"],
        sales: ["commerce", "retail", "pos", "ecommerce"],
        infrastructure: ["cloud", "hosting", "network"],
        emerging: ["innovation", "pilot", "prototype"],
        "finance-risk": ["finance", "reporting", "control"],
        "customer-service": ["support", "contact center", "cx"],
        marketing: ["campaign", "journey", "experience"],
        strategy: ["operating model", "transformation"],
        learning: ["training", "adoption"],
        talent: ["organization", "organisation", "workforce"],
        ecosystem: ["partner", "integration", "vendor"]
    };

    const capMatchesQuery = (card, query) => {
        if (!query) return true;
        const blob = card.textContent.toLowerCase();
        if (blob.includes(query)) return true;
        const id = card.dataset.cap || "";
        const extras = capSynonyms[id] || [];
        return extras.some((term) => term.includes(query) || query.includes(term));
    };

    const applyCapFilter = () => {
        if (!capCards.length) return;
        const query = (capSearch ? capSearch.value : "").trim().toLowerCase();
        let shown = 0;
        capCards.forEach((card) => {
            const groupOk = capGroup === "all" || card.dataset.group === capGroup;
            const show = groupOk && capMatchesQuery(card, query);
            card.classList.toggle("is-filtered-out", !show);
            if (show) shown += 1;
        });
        if (capCount) {
            capCount.textContent = shown === capCards.length
                ? `${capCards.length} capabilities`
                : `${shown} of ${capCards.length} capabilities`;
        }
        if (capEmpty) capEmpty.hidden = shown !== 0;
    };

    const resetCapFilters = () => {
        capGroup = "all";
        if (capSearch) capSearch.value = "";
        if (capFilters) {
            capFilters.querySelectorAll("[data-group]").forEach((button) => {
                const on = button.dataset.group === "all";
                button.classList.toggle("active", on);
                button.setAttribute("aria-pressed", on ? "true" : "false");
            });
        }
        applyCapFilter();
        if (capSearch) capSearch.focus();
    };

    if (capSearch) capSearch.addEventListener("input", applyCapFilter);
    if (capFilters) {
        capFilters.querySelectorAll("[data-group]").forEach((button) => {
            button.addEventListener("click", () => {
                const group = button.dataset.group;
                if (!group) return;
                capGroup = group;
                capFilters.querySelectorAll("[data-group]").forEach((peer) => {
                    const on = peer === button;
                    peer.classList.toggle("active", on);
                    peer.setAttribute("aria-pressed", on ? "true" : "false");
                });
                applyCapFilter();
            });
        });
    }
    applyCapFilter();

    const capReset = document.getElementById("cap-reset");
    if (capReset) {
        capReset.addEventListener("click", (event) => {
            event.stopPropagation();
            resetCapFilters();
        });
    }

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.hidden = true;
    overlay.innerHTML = '<div class="overlay-scrim" data-close></div><div class="overlay-slot" role="dialog" aria-modal="true"></div>';
    document.body.appendChild(overlay);
    const slot = overlay.querySelector(".overlay-slot");

    const closeOverlay = () => {
        overlay.hidden = true;
        slot.innerHTML = "";
        slot.className = "overlay-slot";
        document.body.classList.remove("overlay-open");
        if (lastFocus) lastFocus.focus();
    };

    overlay.addEventListener("click", (event) => {
        if (event.target.closest("[data-close]")) closeOverlay();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !overlay.hidden) closeOverlay();
    });

    const openSlot = (className, node, labelledBy) => {
        lastFocus = document.activeElement;
        slot.className = "overlay-slot " + className;
        slot.innerHTML = "";
        slot.removeAttribute("aria-labelledby");
        slot.appendChild(node);
        if (labelledBy) slot.setAttribute("aria-labelledby", labelledBy);
        overlay.hidden = false;
        document.body.classList.add("overlay-open");
    };

    const listBlock = (title, items) => {
        const wrap = document.createElement("div");
        wrap.className = "detail-block";
        wrap.appendChild(Object.assign(document.createElement("p"), { className: "detail-label", textContent: title }));
        const list = document.createElement("ul");
        items.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });
        wrap.appendChild(list);
        return wrap;
    };

    const openCapability = (id) => {
        const cap = data.capabilities.find((item) => item.id === id);
        if (!cap) return;
        const node = document.createElement("article");
        node.className = "drawer";
        const head = document.createElement("header");
        head.className = "drawer-head";
        const kicker = document.createElement("p");
        kicker.className = "section-kicker";
        kicker.textContent = cap.group;
        const title = document.createElement("h2");
        title.id = "drawer-title";
        title.textContent = cap.name;
        const close = document.createElement("button");
        close.type = "button";
        close.className = "icon-close";
        close.dataset.close = "true";
        close.setAttribute("aria-label", "Close");
        close.textContent = "Close";
        head.append(kicker, title, close);
        const outcome = document.createElement("p");
        outcome.className = "detail-outcome";
        outcome.textContent = cap.outcome;
        const summary = document.createElement("p");
        summary.className = "detail-copy";
        summary.textContent = cap.summary;
        const fits = document.createElement("p");
        fits.className = "detail-copy";
        fits.innerHTML = "<strong>Where it fits. </strong>";
        fits.append(document.createTextNode(cap.fits));
        const start = document.createElement("p");
        start.className = "detail-start";
        start.innerHTML = "<strong>How it starts. </strong>";
        start.append(document.createTextNode(cap.start));
        const actions = document.createElement("div");
        actions.className = "detail-actions";
        const mail = document.createElement("a");
        mail.className = "btn btn-primary";
        mail.href = "contact.html?need=" + encodeURIComponent(cap.name) + "&interest=" + encodeURIComponent(cap.name);
        mail.textContent = "Discuss this scope";
        const more = document.createElement("a");
        more.className = "btn btn-secondary";
        more.href = "services.html";
        more.textContent = "See industries";
        actions.append(mail, more);
        node.append(head, outcome, summary, listBlock("What the work includes", cap.includes), fits, start, actions);
        const scopeLive = document.getElementById("scope-live");
        if (scopeLive) {
            node.className = "inline-detail-card";
            close.textContent = "Hide";
            close.addEventListener("click", () => {
                scopeLive.hidden = true;
                scopeLive.innerHTML = "";
            });
            scopeLive.hidden = false;
            scopeLive.innerHTML = "";
            scopeLive.append(node);
            return;
        }
        openSlot("is-drawer", node, "drawer-title");
        close.focus();
    };

    const openArticle = (id) => {
        const article = data.articles.find((item) => item.id === id);
        if (!article) return;
        const node = document.createElement("article");
        node.className = "reader";
        const bar = document.createElement("div");
        bar.className = "reader-bar";
        const close = document.createElement("button");
        close.type = "button";
        close.className = "icon-close";
        close.dataset.close = "true";
        close.textContent = "Close";
        close.setAttribute("aria-label", "Close article");
        bar.appendChild(close);
        const kicker = document.createElement("p");
        kicker.className = "section-kicker";
        kicker.textContent = article.kicker;
        const title = document.createElement("h2");
        title.id = "reader-title";
        title.textContent = article.title;
        const meta = document.createElement("p");
        meta.className = "insight-meta";
        meta.textContent = article.meta;
        node.append(bar, kicker, title, meta);
        article.paragraphs.forEach((text) => {
            const p = document.createElement("p");
            p.textContent = text;
            node.appendChild(p);
        });
        const end = document.createElement("p");
        end.className = "detail-start";
        end.textContent = "A Tiooex perspective for enterprise teams. It is not client reporting and it does not describe a specific engagement.";
        const actions = document.createElement("div");
        actions.className = "detail-actions";
        const contact = document.createElement("a");
        contact.className = "btn btn-primary";
        contact.href = "contact.html?need=" + encodeURIComponent(article.kicker || "Insight");
        contact.textContent = "Talk about this";
        contact.addEventListener("click", closeOverlay);
        actions.appendChild(contact);
        node.append(end, actions);
        const readerLive = document.getElementById("reader-live");
        if (readerLive) {
            node.className = "inline-detail-card";
            close.textContent = "Hide";
            close.addEventListener("click", () => {
                readerLive.hidden = true;
                readerLive.innerHTML = "";
            });
            readerLive.hidden = false;
            readerLive.innerHTML = "";
            readerLive.append(node);
            return;
        }
        openSlot("is-reader", node, "reader-title");
        close.focus();
    };

    document.querySelectorAll("[data-open-cap]").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            openCapability(button.dataset.openCap);
        });
    });
    document.querySelectorAll("[data-open-article]").forEach((button) => {
        button.addEventListener("click", () => openArticle(button.dataset.openArticle));
    });

    const hash = window.location.hash.replace("#", "");
    if (hash && data.articles.some((item) => item.id === hash)) openArticle(hash);
    if (hash && data.capabilities.some((item) => item.id === hash) && document.querySelector(`[data-cap="${hash}"]`)) {
        openCapability(hash);
    }

    const paletteItems = () => {
        const pages = [
            ["Home", "index.html"],
            ["Capabilities", "products.html"],
            ["Platforms", "platforms.html"],
            ["Industries", "services.html"],
            ["Insights", "blogs.html"],
            ["Contact", "contact.html"],
            ["About", "about.html"],
            ["Engagement models", "index.html#engagement"]
        ].map(([label, href]) => ({ label, href, group: "Pages" }));
        const caps = data.capabilities.map((cap) => ({
            label: cap.name,
            href: `products.html#${cap.id}`,
            group: "Capabilities",
            id: cap.id,
            kind: "cap"
        }));
        const articles = data.articles.map((article) => ({
            label: article.title,
            href: `blogs.html#${article.id}`,
            group: "Insights",
            id: article.id,
            kind: "article"
        }));
        const industries = data.industries.map((industry) => ({
            label: industry.name,
            href: `services.html#${industry.id}`,
            group: "Industries"
        }));
        return [...pages, ...caps, ...articles, ...industries];
    };

    const openPalette = () => {
        if (!overlay.hidden && slot.classList.contains("is-palette")) return;
        if (panel) panel.classList.remove("open");
        document.body.classList.remove("menu-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        const items = paletteItems();
        const node = document.createElement("div");
        node.className = "palette";
        const input = document.createElement("input");
        input.type = "search";
        input.placeholder = "Search pages, capabilities, industries, insights";
        input.setAttribute("aria-label", "Search the site");
        input.id = "palette-input";
        const list = document.createElement("div");
        list.className = "palette-list";
        list.setAttribute("role", "listbox");
        node.append(input, list);

        let current = 0;
        let visible = items;

        const render = () => {
            const query = input.value.trim().toLowerCase();
            visible = items.filter((item) => item.label.toLowerCase().includes(query) || item.group.toLowerCase().includes(query));
            current = 0;
            list.innerHTML = "";
            if (!visible.length) {
                const empty = document.createElement("p");
                empty.className = "palette-empty";
                empty.textContent = "No matches. Try cloud, banking, or engagement.";
                list.appendChild(empty);
                return;
            }
            let lastGroup = "";
            visible.forEach((item, index) => {
                if (item.group !== lastGroup) {
                    const label = document.createElement("p");
                    label.className = "palette-group";
                    label.textContent = item.group;
                    list.appendChild(label);
                    lastGroup = item.group;
                }
                const button = document.createElement("button");
                button.type = "button";
                button.className = "palette-item" + (index === 0 ? " is-active" : "");
                button.setAttribute("role", "option");
                button.innerHTML = `<span></span><small></small>`;
                button.querySelector("span").textContent = item.label;
                button.querySelector("small").textContent = item.group;
                button.addEventListener("click", () => choose(item));
                list.appendChild(button);
            });
        };

        const paintActive = () => {
            [...list.querySelectorAll(".palette-item")].forEach((button, index) => {
                button.classList.toggle("is-active", index === current);
            });
        };

        const choose = (item) => {
            closeOverlay();
            if (item.kind === "cap" && document.querySelector(`[data-cap="${item.id}"]`)) {
                openCapability(item.id);
                return;
            }
            if (item.kind === "article" && document.body.classList.contains("page-blogs")) {
                openArticle(item.id);
                return;
            }
            window.location.href = item.href;
        };

        input.addEventListener("input", render);
        input.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                current = Math.min(current + 1, visible.length - 1);
                paintActive();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                current = Math.max(current - 1, 0);
                paintActive();
            } else if (event.key === "Enter" && visible[current]) {
                event.preventDefault();
                choose(visible[current]);
            }
        });

        openSlot("is-palette", node, "palette-input");
        render();
        input.focus();
    };

    document.querySelectorAll("[data-open-palette]").forEach((button) => {
        button.addEventListener("click", openPalette);
    });

    const shortcut = document.querySelector("[data-shortcut]");
    if (shortcut && /Mac|iPhone|iPad/.test(navigator.platform)) shortcut.textContent = "⌘K";

    const inquiry = document.getElementById("inquiry-form");
    if (inquiry) {
        const params = new URLSearchParams(window.location.search);
        const routeField = inquiry.querySelector('[name="route"]');
        const needField = inquiry.querySelector('[name="need"]');
        if (routeField && params.get("route")) routeField.value = params.get("route");
        if (needField) {
            const rawInterest = params.get("need") || params.get("interest") || params.get("industry");
            const interest = rawInterest ? decodeURIComponent(String(rawInterest).replace(/\+/g, " ")).trim() : "";
            if (interest) {
                let matched = false;
                [...needField.options].forEach((opt) => {
                    if (opt.value.toLowerCase() === interest.toLowerCase()) {
                        needField.value = opt.value;
                        matched = true;
                    }
                });
                if (!matched) {
                    const custom = document.createElement("option");
                    custom.value = interest;
                    custom.textContent = interest;
                    needField.appendChild(custom);
                    needField.value = interest;
                }
            }
        }

        inquiry.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = new FormData(inquiry);
            const errors = [];
            const name = String(form.get("name") || "").trim();
            const email = String(form.get("email") || "").trim();
            const org = String(form.get("organization") || "").trim();
            const route = String(form.get("route") || "project");
            const need = String(form.get("need") || "").trim();
            const stage = String(form.get("stage") || "").trim();
            const role = String(form.get("role") || "").trim();
            const message = String(form.get("message") || "").trim();
            const consent = form.get("consent");
            const errorBox = document.getElementById("form-errors");

            if (!name) errors.push("Enter your name.");
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Enter a valid work email.");
            if (!org) errors.push("Enter your company name.");
            if (!consent) errors.push("Confirm consent so we can respond to your enquiry.");

            if (errors.length) {
                if (errorBox) {
                    errorBox.hidden = false;
                    errorBox.textContent = errors.join(" ");
                }
                return;
            }
            if (errorBox) errorBox.hidden = true;

            const routeLabel = { project: "Discuss a project", demo: "Platform demo", partnership: "Partnership" }[route] || route;
            const body = [
                `Enquiry type: ${routeLabel}`,
                `Name: ${name}`,
                `Email: ${email}`,
                `Company: ${org}`,
                `Role: ${role || "—"}`,
                `Interest: ${need}`,
                `Stage: ${stage || "—"}`,
                "",
                message || "No additional note."
            ].join("\n");
            window.location.href = "mailto:" + publicMail + "?subject=" + encodeURIComponent(`${routeLabel} — ${need}`) + "&body=" + encodeURIComponent(body);
            const status = document.getElementById("inquiry-status");
            if (status) {
                status.hidden = false;
                status.textContent = "Your email app should open with this enquiry. If it does not, write to " + publicMail + ".";
            }
        });
    }

    document.querySelectorAll("[data-track]").forEach((el) => {
        el.addEventListener("click", () => {
            if (typeof window.gtag === "function") {
                window.gtag("event", el.dataset.track, { page_path: window.location.pathname });
            }
        });
    });

    const sectorRoot = document.querySelector("[data-sector-panel]");
    const sectorButtons = sectorRoot ? [...sectorRoot.querySelectorAll("[data-pick]")] : [];
    if (sectorButtons.length) {
        const stageEl = sectorRoot.querySelector(".sector-stage");
        const showSector = (id) => {
            const active = sectorButtons.find((button) => button.dataset.pick === id) || sectorButtons[0];
            sectorButtons.forEach((button) => {
                const on = button === active;
                button.setAttribute("aria-pressed", on ? "true" : "false");
            });
            const line = document.getElementById("scene-line");
            const note = document.getElementById("scene-note");
            const more = document.getElementById("scene-more");
            if (line) line.textContent = active.dataset.line || "";
            if (note) note.textContent = active.dataset.note || "";
            if (more) {
                const label = active.textContent.trim();
                more.href = active.dataset.href || "services.html";
                more.textContent = "View " + label + " on Industries";
            }
            if (stageEl) {
                stageEl.classList.remove("is-updating");
                void stageEl.offsetWidth;
                stageEl.classList.add("is-updating");
            }
            if (active.scrollIntoView && window.matchMedia("(max-width: 900px)").matches) {
                active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
        };
        sectorButtons.forEach((button) => {
            button.addEventListener("click", () => showSector(button.dataset.pick));
        });
        const current = sectorButtons.find((button) => button.getAttribute("aria-pressed") === "true") || sectorButtons[0];
        showSector(current.dataset.pick);
    }

    const segLinks = [...document.querySelectorAll(".seg-nav a")];
    if (segLinks.length) {
        const segSections = segLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
        const markSeg = () => {
            const y = window.scrollY + 180;
            let current = segSections[0];
            segSections.forEach((section) => {
                if (section.offsetTop <= y) current = section;
            });
            segLinks.forEach((link) => {
                link.classList.toggle("is-current", current && link.getAttribute("href") === "#" + current.id);
            });
        };
        markSeg();
        window.addEventListener("scroll", markSeg, { passive: true });
    }

    document.querySelectorAll(".mailto-form").forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = form.querySelector("input[type=email]");
            if (!email || !email.value.trim()) return;
            const subject = form.dataset.subject || "Note from tiooex.in";
            window.location.href = "mailto:" + publicMail + "?subject=" + encodeURIComponent(subject + " — " + email.value.trim());
            const status = form.parentElement.querySelector(".form-status");
            if (status) {
                status.hidden = false;
                status.textContent = "Your email app should open to confirm. We only use this address to reply.";
            }
        });
    });
});
