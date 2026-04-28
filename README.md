# 🚀 Ragesh P — Personal Portfolio Website

**A fully immersive, 3D animated personal branding website for an AI & Automation Engineer**

---

## ✨ Features

### 🎨 Design & Visual Effects
- **3D Animated Hero** — Custom SVG character illustration with Three.js particle field, floating 3D geometric objects (octahedrons, tetrahedrons, icosahedrons, boxes), and orbit rings
- **Glassmorphism Elements** — Frosted glass effect on floating achievement cards with backdrop blur
- **Custom Cursor** — Animated dot + ring cursor that follows mouse movement
- **Particle Effects** — Floating CSS particles in the hero section
- **Glow Effects** — Dynamic glowing accents on cards, buttons, and text
- **Smooth Animations** — GSAP-powered scroll animations, staggered reveals, and counter animations

### � Sections
1. **Hero** — 3D animated intro with rotating roles, stats counters, and floating achievement cards
2. **About** — Profile with animated rings, floating badges, animated skill bars, and tech stack
3. **Services** — 6 service cards with icons, features lists, and "Most Popular" badges
4. **Portfolio** — 12+ projects with category filters (All, Portfolio, AI/Automation, Web Dev, Marketing)
5. **Testimonials** — Client reviews carousel with avatar, rating stars, and quote styling
6. **CTA** — Call-to-action section with animated buttons
7. **Contact** — Full contact form with validation, service selection, and social links

### 🔧 Functionality
- **Loader** — Branded loading screen with animated logo and progress bar (2.2s minimum)
- **Navbar** — Sticky navigation with smooth scroll, active state highlighting, and mobile hamburger menu
- **Mobile Menu** — Full-screen overlay menu for mobile devices
- **Contact Form** — EmailJS integration with live validation, service selection, and Google Sheets integration support
- **Portfolio Filters** — Filter projects by category with smooth animations
- **Stats Counter** — Animated number counters on scroll (50+ Projects, 30+ Happy Clients, 3+ Years)
- **Skill Bars** — Animated progress bars that fill on scroll
- **Social Links** — WhatsApp, LinkedIn, Instagram, GitHub, YouTube integration
- **Smooth Scroll** — Anchor link smooth scrolling throughout the site

### 🎯 Technical Highlights
- **Three.js** — 3D particle field, floating objects, and grid lines in hero section
- **GSAP + ScrollTrigger** — Professional scroll-based animations and reveals
- **EmailJS** — Contact form email delivery
- **Responsive Design** — Mobile-first approach with breakpoints for all screen sizes
- **CSS Variables** — Centralized theming with easily customizable colors
- **Performance Optimized** — Minimal dependencies, optimized animations, lazy loading-ready

---

## 📁 File Structure

```
Personal Portfolio Website/
├── index.html                  ← Main HTML file (all sections)
├── assets/
│   ├── css/
│   │   └── style.css          ← All styles, CSS variables, responsive
│   ├── js/
│   │   ├── three-scene.js     ← Three.js 3D hero canvas
│   │   ├── animations.js      ← GSAP + scroll reveals + skill bars
│   │   └── main.js            ← Core logic, form, loader, nav
│   └── img/                   ← Project images & assets
│       ├── Ragesh Profile.png
│       ├── Business Consultant Portfolio.jpg
│       ├── Freelance Photographer Portfolio.jpg
│       ├── Premium Digital Agency Portfolio.jpg
│       ├── UI:UX Designer Portfolio.jpg
│       ├── Full Stack Developer Portfoli.jpg
│       ├── Basic Portfolio.jpg
│       ├── RescueLens-AI.png
│       ├── SimplifyED.png
│       ├── Premium E-Commerce Store.jpg
│       ├── Meta Ads Growth Campaign.jpg
│       ├── Business Workflow Automation.jpg
│       ├── Healthcare Booking System.jpg
│       └── GMB & Local SEO Domination.jpg
├── .vscode/
│   └── settings.json
└── README.md
```

---

## ⚡ Quick Start

1. Open `index.html` in a browser (use a local server for best results)
2. For a live server:
   ```bash
   npx serve .
   ```
   Or use VS Code Live Server extension

---

## 🎨 Color Palette

```css
--blue:        #0ea5e9;      /* Primary blue */
--blue-dark:   #0369a1;      /* Darker blue */
--blue-glow:   rgba(14,165,233,0.35);
--orange:      #f97316;      /* Accent orange */
--orange-glow: rgba(249,115,22,0.3);
--purple:      #8b5cf6;      /* Accent purple */
--purple-glow: rgba(139,92,246,0.3);
--bg:          #050b15;      /* Main background */
--bg-2:        #080f1e;      /* Secondary background */
--text:        #e2e8f0;      /* Main text */
--text-muted:  #64748b;      /* Muted text */
--text-bright: #f8fafc;      /* Bright text */
```

---

## 📧 Setting Up the Contact Form (EmailJS)

1. Go to [https://www.emailjs.com](https://www.emailjs.com) and create a free account
2. Create a **new email service** (Gmail recommended) and note the **Service ID**
3. Create an **email template** with these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{phone}}` — phone number
   - `{{service}}` — selected service
   - `{{message}}` — message content
4. Note your **Template ID** and **Public Key**
5. Open `assets/js/main.js` and update the CONFIG:

```javascript
const CONFIG = {
  emailJS: {
    serviceId: "service_xxxxxxx",    // Your Service ID
    templateId: "template_xxxxxxx",  // Your Template ID
    publicKey: "xxxxxxxxxxxx",      // Your Public Key
  },
  ownerEmail: "rageshp.work@gmail.com",
};
```

---

## 🗂️ Google Sheets Integration (Optional)

To store form submissions in Google Sheets:

1. Create a Google Sheet
2. Go to Extensions → Apps Script
3. Create a POST endpoint using Web App deployment
4. Add the fetch call in `main.js` inside `initContactForm()`:

```javascript
// Add after EmailJS send:
await fetch("YOUR_GOOGLE_SCRIPT_URL", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

---

## 🔗 Social Media Links

| Platform  | URL |
|-----------|-----|
| WhatsApp  | `https://wa.me/919042542645` |
| LinkedIn  | `https://linkedin.com/in/rageshp` |
| Instagram | `https://instagram.com/rageshp` |
| GitHub    | `https://github.com/MrRagesh` |
| YouTube   | `https://youtube.com/@rageshp` |

---

## 🖼️ Image Assets

The portfolio includes the following project images in `assets/img/`:

| Image File | Description |
|------------|-------------|
| `Ragesh Profile.png` | Profile photo for About section |
| `Business Consultant Portfolio.jpg` | Portfolio website project |
| `Freelance Photographer Portfolio.jpg` | Portfolio website project |
| `Premium Digital Agency Portfolio.jpg` | Portfolio website project |
| `UI:UX Designer Portfolio.jpg` | Portfolio website project |
| `Full Stack Developer Portfoli.jpg` | Portfolio website project |
| `Basic Portfolio.jpg` | Basic portfolio project |
| `RescueLens-AI.png` | AI/Automation project |
| `SimplifyED.png` | AI-powered educational platform |
| `Premium E-Commerce Store.jpg` | E-commerce project |
| `Meta Ads Growth Campaign.jpg` | Marketing project |
| `Business Workflow Automation.jpg` | AI/Automation project |
| `Healthcare Booking System.jpg` | Web development project |
| `GMB & Local SEO Domination.jpg` | Marketing project |
| `AI Customer Support Bot.jpg` | AI/Automation project |

---

## 🌐 Deployment

### Netlify (Recommended — Free)
1. Drag & drop the folder to [netlify.com/drop](https://netlify.com/drop)
2. Get instant live URL

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### GitHub Pages
1. Push to GitHub repository
2. Settings → Pages → Deploy from main branch

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile (iOS/Android) | ✅ Full |

---

## 🛠️ Technologies Used

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, flexbox, grid, animations, glassmorphism
- **JavaScript (ES6+)** — Vanilla JS, no framework dependencies
- **Three.js** — 3D hero scene with particles and floating objects
- **GSAP + ScrollTrigger** — Professional scroll animations
- **EmailJS** — Contact form email delivery
- **Font Awesome 6.5** — Icon library
- **Google Fonts** — Syne (headings) + DM Sans (body)

---

## 📞 Contact

Built for **Ragesh P** — AI & Automation Engineer

- 📧 rageshp.work@gmail.com
- 🌐 [https://rageshp.com](https://rageshp.com)
- 💬 [WhatsApp](https://wa.me/919042542645)
- 💼 [LinkedIn](https://linkedin.com/in/rageshp)

---

*© 2025 Ragesh P. All rights reserved.*
