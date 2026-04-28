/* ===================================================
   MAIN.JS — Core UI Logic, Loader, Navbar, Form
   =================================================== */

(function () {
  "use strict";

  /* ─── CONFIG ─────────────────────────────────── */
  const CONFIG = {
    emailJS: {
      serviceId: "service_mj1pq8n",       // Replace with EmailJS service ID
      templateId: "template_jwofgn7",     // Replace with EmailJS template ID
      publicKey: "mMgC5odTkVAEuu3dA",        // Replace with EmailJS public key
    },
    ownerEmail: "rageshp.work@gmail.com",
  };

  /* ─── LOADER ─────────────────────────────────── */
  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    // Minimum 2.2s loading for brand impression
    const minTime = 2200;
    const startTime = Date.now();

    window.addEventListener("load", () => {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, minTime - elapsed);

      setTimeout(() => {
        loader.classList.add("hidden");
        document.body.style.overflow = "";
        // Trigger hero animations
        document.querySelectorAll(".hero-content > *").forEach((el, i) => {
          el.style.animationPlayState = "running";
        });
      }, delay);
    });

    // Fallback in case window.load doesn't fire
    setTimeout(() => loader.classList.add("hidden"), 5000);
  }

  /* ─── HAMBURGER / MOBILE MENU ──────────────── */
  function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (!hamburger || !mobileMenu) return;

    function toggleMenu(open) {
      hamburger.classList.toggle("open", open);
      mobileMenu.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }

    hamburger.addEventListener("click", () => {
      toggleMenu(!mobileMenu.classList.contains("open"));
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    // Close on outside click
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) toggleMenu(false);
    });
  }

  /* ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ───── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  /* ─── FORM VALIDATION HELPERS ──────────────── */
  function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add("error");
    if (error) error.textContent = message;
    return false;
  }

  function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.remove("error");
    if (error) error.textContent = "";
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm(data) {
    let valid = true;

    // Clear all errors first
    ["name", "email", "service", "message"].forEach((f) => {
      clearError(f, f + "Error");
    });

    if (!data.name || data.name.trim().length < 2) {
      showError("name", "nameError", "Please enter your full name.");
      valid = false;
    }
    if (!data.email || !validateEmail(data.email.trim())) {
      showError("email", "emailError", "Please enter a valid email address.");
      valid = false;
    }
    if (!data.service) {
      showError("service", "serviceError", "Please select a service.");
      valid = false;
    }
    if (!data.message || data.message.trim().length < 20) {
      showError("message", "messageError", "Please provide more details (min 20 characters).");
      valid = false;
    }

    return valid;
  }

  /* ─── WHATSAPP DIRECT MESSAGE ────────────────── */
function openWhatsAppDirect(formData) {
  const phone = "919042542645";
  const text = `*New Inquiry from Portfolio*\n\n` +
    `*Name:* ${formData.name}\n` +
    `*Email:* ${formData.email}\n` +
    `*Phone:* ${formData.phone || "Not provided"}\n` +
    `*Service:* ${formData.service}\n` +
    `*Message:* ${formData.message}`;

  const encodedText = encodeURIComponent(text);
  const whatsappURL = `https://wa.me/${phone}?text=${encodedText}`;

  window.open(whatsappURL, "_blank");
}

/* ─── CONTACT FORM ──────────────────────────── */
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    // Live validation
    ["name", "email", "service", "message"].forEach((id) => {
      const field = document.getElementById(id);
      if (!field) return;
      field.addEventListener("input", () => {
        if (field.value.trim()) clearError(id, id + "Error");
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name")?.value || "",
        email: document.getElementById("email")?.value || "",
        phone: document.getElementById("phone")?.value || "",
        service: document.getElementById("service")?.value || "",
        message: document.getElementById("message")?.value || "",
      };

      if (!validateForm(formData)) return;

      const submitBtn = document.getElementById("submitBtn");
      const btnText = submitBtn?.querySelector(".btn-text");
      const btnLoading = submitBtn?.querySelector(".btn-loading");
      const successEl = document.getElementById("formSuccess");

      // Show loading state
      if (btnText) btnText.style.display = "none";
      if (btnLoading) btnLoading.style.display = "flex";
      if (submitBtn) submitBtn.disabled = true;

      try {
        // Try EmailJS if configured
        if (
          CONFIG.emailJS.serviceId !== "YOUR_SERVICE_ID" &&
          typeof emailjs !== "undefined"
        ) {
          await emailjs.send(
            CONFIG.emailJS.serviceId,
            CONFIG.emailJS.templateId,
            {
              from_name: formData.name,
              from_email: formData.email,
              phone: formData.phone || "Not provided",
              service: formData.service,
              message: formData.message,
              to_email: CONFIG.ownerEmail,
            },
            CONFIG.emailJS.publicKey
          );
        } else {
          // Demo mode: simulate network delay
          await new Promise((r) => setTimeout(r, 1800));
        }

        // Open WhatsApp with pre-filled message
        openWhatsAppDirect(formData);

        // Store in localStorage as backup (demo)
        storeSubmission(formData);

        // Success
        form.reset();
        if (successEl) {
          successEl.style.display = "flex";
          setTimeout(() => { successEl.style.display = "none"; }, 6000);
        }

      } catch (err) {
        console.error("Form submission error:", err);
        // Show error toast
        showToast("Something went wrong. Please try again or email directly.", "error");
      } finally {
        if (btnText) btnText.style.display = "";
        if (btnLoading) btnLoading.style.display = "none";
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* ─── LOCAL SUBMISSION STORAGE (Demo/Backup) ── */
  function storeSubmission(data) {
    try {
      const key = "ragesh_leads";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push({ ...data, timestamp: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch (e) { /* silently fail */ }
  }

  /* ─── TOAST NOTIFICATION ────────────────────── */
  function showToast(message, type = "info") {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = `
      <i class="fas fa-${type === "error" ? "exclamation-circle" : "check-circle"}"></i>
      <span>${message}</span>
    `;
    toast.style.cssText = `
      position: fixed; bottom: 30px; left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: ${type === "error" ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)"};
      border: 1px solid ${type === "error" ? "rgba(239,68,68,0.4)" : "rgba(34,197,94,0.4)"};
      color: ${type === "error" ? "#fca5a5" : "#4ade80"};
      padding: 14px 24px; border-radius: 50px;
      display: flex; align-items: center; gap: 10px;
      font-size: 0.9rem; font-weight: 500;
      backdrop-filter: blur(12px);
      z-index: 9999; transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      font-family: 'DM Sans', sans-serif;
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = "translateX(-50%) translateY(0)";
    });

    setTimeout(() => {
      toast.style.transform = "translateX(-50%) translateY(100px)";
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  /* ─── EMAILJS INITIALIZATION ────────────────── */
  function initEmailJS() {
    if (typeof emailjs !== "undefined" && CONFIG.emailJS.publicKey !== "YOUR_PUBLIC_KEY") {
      emailjs.init(CONFIG.emailJS.publicKey);
    }
  }

  /* ─── SERVICE WORKER (PWA-ready) ────────────── */
  function registerSW() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch(() => { /* no SW file = silent */ });
      });
    }
  }

  /* ─── NAVBAR SCROLL EFFECT ──────────────────── */
  function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    let lastY = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y > 80) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      lastY = y;
    }, { passive: true });
  }

  /* ─── PERFORMANCE: LAZY IMAGES ──────────────── */
  function initLazyLoad() {
    if (!("IntersectionObserver" in window)) return;

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => obs.observe(img));
  }

  /* ─── COPY EMAIL ON CLICK ───────────────────── */
  function initCopyEmail() {
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const email = link.href.replace("mailto:", "");
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email).then(() => {
            showToast("Email copied to clipboard!", "success");
          }).catch(() => { });
        }
      });
    });
  }

  /* ─── KEYBOARD NAVIGATION ───────────────────── */
  function initKeyboard() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const mobileMenu = document.getElementById("mobileMenu");
        if (mobileMenu?.classList.contains("open")) {
          document.getElementById("hamburger")?.click();
        }
      }
    });
  }

  /* ─── HERO PARALLAX ────────────────────────── */
  function initHeroParallax() {
    const hero = document.querySelector(".hero");
    const object = document.querySelector(".hero-3d-object");
    if (!hero || !object) return;

    hero.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX - innerWidth / 2) / 25;
      const y = (clientY - innerHeight / 2) / 25;

      gsap.to(object, {
        duration: 1,
        x: x,
        y: y,
        rotateY: x / 2,
        rotateX: -y / 2,
        ease: "power2.out",
      });
    });
  }

  /* ─── MAIN INIT ─────────────────────────────── */
  function init() {
    initLoader();
    initMobileMenu();
    initSmoothScroll();
    initHeroParallax();
    initContactForm();
    initEmailJS();
    initNavbarScroll();
    initLazyLoad();
    initKeyboard();
    // registerSW(); // Uncomment for PWA
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose for external use
  window.RageshPortfolio = { showToast };
})();
