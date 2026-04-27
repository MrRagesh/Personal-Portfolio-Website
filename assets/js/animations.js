/* ===================================================
   ANIMATIONS.JS — GSAP + Scroll Reveal + Particle FX
   =================================================== */

(function () {
  "use strict";

  /* ─── HERO PARTICLE CANVAS (CSS 2D fallback) ─── */
  function buildHeroParticles() {
    const container = document.getElementById("heroParticles");
    if (!container) return;

    const count = 60;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      dot.classList.add("h-particle");
      const size = Math.random() * 4 + 1;
      const colors = ["#0ea5e9", "#8b5cf6", "#f97316", "#38bdf8"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 10;

      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${left}%;
        top: ${top}%;
        opacity: ${Math.random() * 0.4 + 0.1};
        animation: particleFloat ${duration}s ${delay}s infinite ease-in-out alternate;
        box-shadow: 0 0 ${size * 2}px ${color};
        pointer-events: none;
      `;
      container.appendChild(dot);
    }

    // Inject keyframes
    if (!document.getElementById("particleKeyframes")) {
      const style = document.createElement("style");
      style.id = "particleKeyframes";
      style.textContent = `
        @keyframes particleFloat {
          0% { transform: translate(0,0) scale(1); opacity: 0.1; }
          50% { transform: translate(${Math.random() > 0.5 ? "" : "-"}${(Math.random() * 40 + 10).toFixed(0)}px, ${Math.random() > 0.5 ? "" : "-"}${(Math.random() * 40 + 10).toFixed(0)}px) scale(1.3); opacity: 0.5; }
          100% { transform: translate(0,0) scale(1); opacity: 0.1; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ─── GSAP SCROLL ANIMATIONS ─────────────────── */
  function initGSAPAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      setTimeout(initGSAPAnimations, 200);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero stats counter animation
    gsap.utils.toArray(".stat-num").forEach((el) => {
      const target = parseInt(el.dataset.count);
      gsap.fromTo(
        el,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        }
      );
    });

    // Skill bars
    gsap.utils.toArray(".skill-fill").forEach((bar) => {
      const w = bar.dataset.width;
      gsap.to(bar, {
        width: w + "%",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: bar, start: "top 85%", once: true },
      });
    });

    // Services cards stagger
    gsap.utils.toArray(".service-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        }
      );
    });

    // Portfolio items
    gsap.utils.toArray(".portfolio-item").forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 90%", once: true },
        }
      );
    });

    // Section headers
    gsap.utils.toArray(".section-header").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });

    // About section
    gsap.fromTo(
      ".about-img-wrapper",
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".about", start: "top 75%", once: true },
      }
    );

    gsap.fromTo(
      ".about-content",
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".about", start: "top 75%", once: true },
      }
    );

    // CTA Section
    gsap.fromTo(
      ".cta-content",
      { y: 60, opacity: 0, scale: 0.97 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 80%", once: true },
      }
    );

    // Contact grid
    gsap.fromTo(
      ".contact-info",
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".contact", start: "top 80%", once: true },
      }
    );

    gsap.fromTo(
      ".contact-form-wrap",
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".contact", start: "top 80%", once: true },
      }
    );

    // Testimonials
    gsap.fromTo(
      ".testimonials-wrapper",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".testimonials-wrapper", start: "top 85%", once: true },
      }
    );

    // Navbar parallax shrink on scroll
    ScrollTrigger.create({
      start: "top -80",
      onEnter: () => document.querySelector(".navbar")?.classList.add("scrolled"),
      onLeaveBack: () => document.querySelector(".navbar")?.classList.remove("scrolled"),
    });
  }

  /* ─── INTERSECTION OBSERVER (fallback for reveal) */
  function initRevealObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((el) => {
      observer.observe(el);
    });
  }

  /* ─── HERO ROLE ROTATOR ──────────────────────── */
  function initRoleRotator() {
    const roles = document.querySelectorAll(".role-item");
    if (!roles.length) return;

    let current = 0;
    setInterval(() => {
      roles[current].classList.remove("active");
      current = (current + 1) % roles.length;
      roles[current].classList.add("active");
    }, 2800);
  }

  /* ─── PORTFOLIO FILTER ───────────────────────── */
  function initPortfolioFilter() {
    const btns = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".portfolio-item");

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        items.forEach((item) => {
          if (filter === "all" || item.dataset.category === filter) {
            item.classList.remove("hidden");
            item.style.animation = "none";
            item.offsetHeight; // reflow
            item.style.animation = "";
          } else {
            item.classList.add("hidden");
          }
        });
      });
    });
  }

  /* ─── TESTIMONIALS CAROUSEL ──────────────────── */
  function initTestimonials() {
    const track = document.getElementById("testimonialsTrack");
    const dotsContainer = document.getElementById("testiDots");
    const prevBtn = document.getElementById("testiPrev");
    const nextBtn = document.getElementById("testiNext");

    if (!track) return;

    const cards = track.querySelectorAll(".testimonial-card");
    const total = cards.length;
    let current = 0;
    let autoTimer;

    // Create dots
    cards.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("testi-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    // Determine how many visible (responsive)
    function getVisible() {
      return window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    }

    function goTo(idx) {
      const visible = getVisible();
      const maxStart = Math.max(0, total - visible);
      current = Math.min(Math.max(idx, 0), maxStart);

      cards.forEach((c, i) => {
        if (i >= current && i < current + visible) {
          c.classList.add("active");
        } else {
          c.classList.remove("active");
        }
      });

      document.querySelectorAll(".testi-dot").forEach((d, i) => {
        d.classList.toggle("active", i === current);
      });
    }

    function next() { goTo(current + 1 < total - getVisible() + 1 ? current + 1 : 0); }
    function prev() { goTo(current - 1 >= 0 ? current - 1 : total - getVisible()); }

    nextBtn?.addEventListener("click", () => { next(); resetAuto(); });
    prevBtn?.addEventListener("click", () => { prev(); resetAuto(); });

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(next, 4500);
    }

    goTo(0);
    resetAuto();

    // Touch support
    let startX = 0;
    track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
    track.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetAuto(); }
    });
  }

  /* ─── MAGNETIC BUTTONS ───────────────────────── */
  function initMagneticButtons() {
    if (window.matchMedia("(hover: none)").matches) return;

    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.3;
        const dy = (e.clientY - cy) * 0.3;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ─── CUSTOM CURSOR ──────────────────────────── */
  function initCursor() {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });

    function animRing() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animRing);
    }
    animRing();

    // Hover detection
    const hoverTargets = "a, button, .service-card, .portfolio-card, .filter-btn, input, textarea, select";
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  /* ─── SCROLL TO TOP ──────────────────────────── */
  function initScrollTop() {
    const btn = document.getElementById("scrollTop");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      btn.classList.toggle("visible", window.scrollY > 500);
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ─── ACTIVE NAV LINK ON SCROLL ─────────────── */
  function initActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + entry.target.id
              );
            });
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /* ─── TILT 3D EFFECT ON PORTFOLIO CARDS ────── */
  function initCardTilt() {
    if (window.matchMedia("(hover: none)").matches) return;

    document.querySelectorAll(".portfolio-card, .service-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rx = ((e.clientY - cy) / rect.height) * -10;
        const ry = ((e.clientX - cx) / rect.width) * 10;
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ─── INIT ───────────────────────────────────── */
  function init() {
    buildHeroParticles();
    initRoleRotator();
    initPortfolioFilter();
    initTestimonials();
    initMagneticButtons();
    initCursor();
    initScrollTop();
    initActiveNav();
    initCardTilt();
    initRevealObserver();
    initGSAPAnimations();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
