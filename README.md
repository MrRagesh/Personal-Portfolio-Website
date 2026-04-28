# 🚀 Ragesh P — Personal Portfolio Website

**A fully immersive, 3D animated personal branding website for an AI & Automation Engineer**

---

## ✨ Features

### 🎨 Design & Visual Effects
- **3D Animated Hero** — Custom SVG character illustration with Three.js particle field, floating 3D geometric objects (octahedrons, tetrahedrons, icosahedrons, boxes), and orbit rings.
- **Glassmorphism Elements** — Frosted glass effect on floating achievement cards with backdrop blur.
- **Custom Cursor** — Animated dot + ring cursor that follows mouse movement.
- **Particle Effects** — Floating CSS particles and Three.js background particles.
- **Glow Effects** — Dynamic glowing accents on cards, buttons, and text.
- **Smooth Animations** — GSAP-powered scroll animations, staggered reveals, and counter animations.

### 📂 Sections
1. **Hero** — 3D animated intro with rotating roles, stats counters, and floating achievement cards.
2. **About** — Profile with animated rings, floating badges, animated skill bars, and tech stack. Includes a direct link to the **Educational Portfolio**.
3. **Services** — 6 service cards with icons, features lists, and "Most Popular" badges.
4. **Portfolio** — 12+ projects with category filters (All, Portfolio, AI/Automation, Web Dev, Marketing).
5. **Testimonials** — Client reviews carousel with avatar, rating stars, and quote styling.
6. **CTA** — Call-to-action section with animated buttons.
7. **Contact** — Full contact form with validation, service selection, and social links.

### 🔧 Functionality
- **Loader** — Branded loading screen with animated logo and progress bar (2.2s minimum).
- **Navbar** — Sticky navigation with smooth scroll, active state highlighting, and mobile hamburger menu.
- **Mobile Menu** — Full-screen overlay menu for mobile devices.
- **Contact Form** — EmailJS integration with live validation and service selection.
- **Portfolio Filters** — Filter projects by category with smooth animations.
- **Stats Counter** — Animated number counters on scroll.
- **Skill Bars** — Animated progress bars that fill on scroll.
- **Social Links** — WhatsApp, LinkedIn, Instagram, GitHub, and Twitter integration.

### 🎓 Educational Portfolio
A dedicated sub-project located in the `Educational Protfolio/` directory, featuring:
- **Project Showcases** — Detailed view of academic and certification projects.
- **Responsive Layout** — Fully optimized for mobile and desktop viewing.
- **Direct Navigation** — Accessible directly from the main "About" section via a custom neon-themed button.

---

## 🎯 Technical Highlights
- **Three.js** — 3D particle field, floating objects, and grid lines in hero section.
- **GSAP + ScrollTrigger** — Professional scroll-based animations and reveals.
- **EmailJS** — Contact form email delivery.
- **Responsive Design** — Mobile-first approach with breakpoints for all screen sizes, including optimized hero cards for single-row mobile display.
- **CSS Variables** — Centralized theming with easily customizable colors.
- **Performance Optimized** — Minimal dependencies, optimized animations, and lazy loading.

---

## 📁 File Structure

```
Personal Portfolio Website/
├── index.html                  ← Main Landing Page
├── Educational Protfolio/      ← Sub-project for education details
│   ├── index.html              ← Education Portfolio main page
│   ├── css/                    ← Education-specific styles
│   └── js/                     ← Education-specific logic
├── assets/
│   ├── css/
│   │   └── style.css          ← Core styles and animations
│   ├── js/
│   │   ├── three-scene.js     ← Three.js 3D hero engine
│   │   ├── animations.js      ← GSAP animations
│   │   └── main.js            ← Core UI logic & form handling
│   └── img/                   ← Project & Profile assets
└── README.md
```

---

## ⚡ Quick Start

1. Open `index.html` in a browser (use a local server like VS Code Live Server for best results).
2. For a live server via terminal:
   ```bash
   npx serve .
   ```

---

## 🎨 Color Palette

```css
--blue:        #0ea5e9;      /* Primary Action */
--orange:      #f97316;      /* Accent / Education Button */
--purple:      #8b5cf6;      /* Highlight Color */
--bg:          #050b15;      /* Deep Space Background */
--text:        #e2e8f0;      /* High Contrast Text */
```

---

## 📧 Contact Form Setup (EmailJS)

Update the `CONFIG` object in `assets/js/main.js`:

```javascript
const CONFIG = {
  emailJS: {
    serviceId: "service_mj1pq8n",
    templateId: "template_jwofgn7",
    publicKey: "mMgC5odTkVAEuu3dA",
  },
  ownerEmail: "rageshp.work@gmail.com",
};
```

---

## � Social Presence

| Platform  | Link |
|-----------|------|
| WhatsApp  | [Chat Now](https://wa.me/919042542645) |
| LinkedIn  | [rageshp](https://linkedin.com/in/rageshp) |
| Instagram | [@rageshp](https://instagram.com/rageshp) |
| GitHub    | [MrRagesh](https://github.com/MrRagesh) |

---

## 🌐 Deployment

### Netlify
Drag and drop the entire project folder to [Netlify Drop](https://netlify.com/drop) for instant deployment.

### GitHub Pages
1. Push the code to a GitHub repository.
2. Go to **Settings > Pages** and select the main branch.

---

## 📞 Contact

Built for **Ragesh P** — AI & Automation Engineer

- 📧 [rageshp.work@gmail.com](mailto:rageshp.work@gmail.com)
- 💼 [LinkedIn Profile](https://linkedin.com/in/rageshp)

---

*© 2026 Ragesh P. All rights reserved.*
