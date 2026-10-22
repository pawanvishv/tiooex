document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
    const publicMail = ["contact.tiooex", "gmail.com"].join("@");
    document.querySelectorAll(".footer-mail").forEach((link) => {
        link.textContent = publicMail;
        link.href = "mailto:" + publicMail;
    });
    const data = window.TIOOEX || { capabilities: [], articles: [], industries: [] };
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
            if (nav) {
                nav.style.top = hide ? "0" : "";
                nav.style.setProperty("--nav-bottom", hide ? "64px" : "102px");
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
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        document.body.classList.remove("menu-open");
    };

    if (toggle && panel) {
        toggle.type = "button";
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", "mobile-panel");
        toggle.addEventListener("click", (event) => {
            event.stopPropagation();
            const open = panel.classList.toggle("open");
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
        link.addEventListener("click", (event) => {
            if (!panel || !toggle) return;
            const href = link.getAttribute("href") || "";
            if (href.startsWith("#")) {
                closeMenu();
                return;
            }
            event.preventDefault();
            window.location.assign(link.href);
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const jump = document.querySelector(".jumpbar");
    if (jump) {
        const links = [...jump.querySelectorAll("a")];
        const sections = links
            .map((link) => document.querySelector(link.getAttribute("href")))
            .filter(Boolean);
        const mark = () => {
            const y = window.scrollY + 140;
            let current = sections[0];
            sections.forEach((section) => {
                if (section.offsetTop <= y) current = section;
            });
            links.forEach((link) => {
                link.classList.toggle("is-current", current && link.getAttribute("href") === "#" + current.id);
            });
        };
        mark();
        window.addEventListener("scroll", mark, { passive: true });
    }

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

    const applyCapFilter = () => {
        if (!capCards.length) return;
        const query = (capSearch ? capSearch.value : "").trim().toLowerCase();
        let shown = 0;
        capCards.forEach((card) => {
            const blob = card.textContent.toLowerCase();
            const groupOk = capGroup === "all" || card.dataset.group === capGroup;
            const show = groupOk && (!query || blob.includes(query));
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

    if (capSearch) capSearch.addEventListener("input", applyCapFilter);
    if (capFilters) {
        capFilters.querySelectorAll("[data-group]").forEach((button) => {
            button.addEventListener("click", () => {
                capGroup = button.dataset.group;
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
        mail.href = "mailto:" + publicMail + "?subject=" + encodeURIComponent("Scope inquiry — " + cap.name);
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
        contact.href = "index.html#site-footer";
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
            ["Industries", "services.html"],
            ["Insights", "blogs.html"],
            ["Contact", "index.html#site-footer"],
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
        inquiry.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = new FormData(inquiry);
            const name = String(form.get("name") || "").trim();
            const email = String(form.get("email") || "").trim();
            const org = String(form.get("organization") || "").trim();
            const need = String(form.get("need") || "").trim();
            const message = String(form.get("message") || "").trim();
            const body = [
                `Name: ${name}`,
                `Email: ${email}`,
                `Organization: ${org || "—"}`,
                `Need: ${need}`,
                "",
                message || "No additional note."
            ].join("\n");
            window.location.href = "mailto:" + publicMail + "?subject=" + encodeURIComponent("Enterprise inquiry — " + need) + "&body=" + encodeURIComponent(body);
            const status = document.getElementById("inquiry-status");
            if (status) {
                status.hidden = false;
                status.textContent = "Your email app should open with this inquiry. If it does not, write to " + publicMail + ".";
            }
        });
    }

    const sceneButtons = [...document.querySelectorAll("[data-pick]")];
    if (sceneButtons.length) {
        const showScene = (id, smooth = true) => {
            sceneButtons.forEach((button) => {
                const on = button.dataset.pick === id;
                button.setAttribute("aria-pressed", on ? "true" : "false");
            });
            document.querySelectorAll("[data-scene]").forEach((scene) => {
                scene.classList.toggle("is-on", scene.dataset.scene === id);
            });
            const line = document.getElementById("scene-line");
            const note = document.getElementById("scene-note");
            const more = document.getElementById("scene-more");
            const active = sceneButtons.find((button) => button.dataset.pick === id);
            if (line && active) line.textContent = active.dataset.line || "";
            if (note && active) note.textContent = active.dataset.note || "";
            if (more && active && active.dataset.href) {
                more.href = active.dataset.href;
                more.textContent = "Open " + active.textContent.trim();
            }
            if (active && active.parentElement) {
                const list = active.parentElement;
                const count = sceneButtons.length;
                const index = sceneButtons.indexOf(active);
                const lead = Math.max(0, Math.floor(count / 2) - 1);
                for (let step = 0; step < count; step++) {
                    list.appendChild(sceneButtons[(index - lead + step + count) % count]);
                }
                const listBox = list.getBoundingClientRect();
                const itemBox = active.getBoundingClientRect();
                list.scrollTo({
                    top: itemBox.top - listBox.top + list.scrollTop - (list.clientHeight - itemBox.height) / 2,
                    left: itemBox.left - listBox.left + list.scrollLeft - (list.clientWidth - itemBox.width) / 2,
                    behavior: smooth ? "smooth" : "auto"
                });
            }
        };
        let timer = null;
        let paused = false;
        const stage = document.querySelector(".stage");
        const advance = () => {
            if (paused) return;
            const index = sceneButtons.findIndex((button) => button.getAttribute("aria-pressed") === "true");
            const next = sceneButtons[(index + 1) % sceneButtons.length];
            showScene(next.dataset.pick);
        };
        const startScenes = () => {
            clearInterval(timer);
            timer = setInterval(advance, 3200);
        };
        sceneButtons.forEach((button) => {
            button.addEventListener("click", () => {
                showScene(button.dataset.pick);
                if (!paused) startScenes();
            });
        });
        if (stage) {
            stage.addEventListener("pointerenter", (event) => {
                if (event.pointerType === "touch") return;
                paused = true;
                stage.classList.add("is-held");
                clearInterval(timer);
            });
            stage.addEventListener("pointerleave", () => {
                paused = false;
                stage.classList.remove("is-held");
                startScenes();
            });
        }
        const current = sceneButtons.find((button) => button.getAttribute("aria-pressed") === "true") || sceneButtons[0];
        showScene(current.dataset.pick, false);
        startScenes();
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
