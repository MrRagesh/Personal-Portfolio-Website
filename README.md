# 🚀 Ragesh P — Personal Portfolio Website

**A fully immersive, 3D animated personal branding website**

---

## 📁 File Structure

```
ragesh-portfolio/
├── index.html                  ← Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css           ← All styles, variables, responsive
│   ├── js/
│   │   ├── three-scene.js      ← Three.js 3D hero canvas
│   │   ├── animations.js       ← GSAP + scroll reveals + carousel
│   │   └── main.js             ← Core logic, form, loader, nav
│   └── images/                 ← Add your images here
│       └── (your images)
└── README.md
```

---

## ⚡ Quick Start

1. Open `index.html` in a browser (use a local server for best results)
2. For a live server: `npx serve .` or use VS Code Live Server extension

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
    publicKey: "xxxxxxxxxxxx",        // Your Public Key
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

Update these links in `index.html`:

| Platform  | Location | Placeholder |
|-----------|----------|-------------|
| WhatsApp  | Floating icons + Footer | `https://wa.me/919999999999` |
| LinkedIn  | Floating icons + Footer | `https://linkedin.com/in/rageshp` |
| Instagram | Floating icons + Footer | `https://instagram.com/rageshp` |
| GitHub    | Floating icons + Footer | `https://github.com/rageshp` |
| YouTube   | Floating icons + Footer | `https://youtube.com/@rageshp` |

---

## 🖼️ Adding Your Profile Photo

1. Add your photo to `assets/images/profile.jpg`
2. In `index.html`, replace the avatar div inside `.about-avatar` with:

```html
<img src="assets/images/profile.jpg" alt="Ragesh P" 
     style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
```

---

## 📦 Adding Real Portfolio Projects

In `index.html`, update each `.portfolio-item`:
- Replace placeholder div with `<img src="assets/images/project1.jpg" ... />`
- Update the `href` on View Live / GitHub buttons

---

## 🎨 Customizing Colors

Open `assets/css/style.css` and update `:root` variables:

```css
:root {
  --blue:   #0ea5e9;   /* Primary blue */
  --orange: #f97316;   /* Accent orange */
  --purple: #8b5cf6;   /* Accent purple */
  --bg:     #050b15;   /* Dark background */
}
```

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

## 📞 Contact

Built for **Ragesh P** — AI & Automation Engineer  
📧 rageshp.work@gmail.com

---

*© 2025 Ragesh P. All rights reserved.*
