document.addEventListener('DOMContentLoaded', () => {
    /* ── Visitor counter ── */
    const vc = document.getElementById('visitor-count');
    if (vc) {
        let count = parseInt(localStorage.getItem('tiooex_visitors') || '0', 10);
        if (!sessionStorage.getItem('tiooex_counted')) {
            count++;
            localStorage.setItem('tiooex_visitors', count);
            sessionStorage.setItem('tiooex_counted', '1');
        }
        vc.textContent = count.toLocaleString();
    }

    const nav = document.getElementById('site-nav');
    const toggle = document.getElementById('mobile-toggle');
    const panel = document.getElementById('mobile-panel');
    const promoBar = document.querySelector('.promo-bar');

    const handleScroll = () => {
        if (!nav) return;
        const scrolled = window.scrollY > 20;
        nav.classList.toggle('scrolled', scrolled);

        // Collapse promo bar on scroll
        if (promoBar) {
            if (window.scrollY > 60) {
                promoBar.style.transform = 'translateY(-100%)';
                nav.style.top = '0';
            } else {
                promoBar.style.transform = 'translateY(0)';
                nav.style.top = '';
            }
        }
    };

    if (promoBar) {
        promoBar.style.transition = 'transform 0.3s ease';
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (toggle && panel) {
        toggle.addEventListener('click', () => {
            panel.classList.toggle('open');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            if (panel) panel.classList.remove('open');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── Insight filter pills ──
    const pills = document.querySelectorAll('.pill-tag');
    const filterItems = document.querySelectorAll('.filterable');
    if (pills.length && filterItems.length) {
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                const cat = pill.textContent.trim().toLowerCase();
                filterItems.forEach(item => {
                    if (cat === 'all' || item.dataset.category === cat) {
                        item.style.display = '';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.96)';
                        requestAnimationFrame(() => {
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    } else {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.96)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }
});
