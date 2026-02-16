# Sascha Zeissler - Digital Business Card
**Complete Documentation & Backup**

Last Updated: February 16, 2026

---

## 📋 Overview

A minimalist, dark-themed digital business card optimized for mobile devices and QR code scanning.

**Live URL:** https://shps.app (or https://get-shapes.github.io/business-card-platform/)

**Purpose:** Personal digital business card accessible via QR code on physical business cards

---

## 📁 Project Structure

```
Business Card/
├── index.html           # Main business card (standalone)
├── public/
│   ├── fonts/          # BrutalType font files
│   └── images/         # Shapes logos
│       ├── ShapesBL150.png    # Black logo (avatar)
│       ├── White.png          # White logo
│       └── LogoBlack.png      # Alternative logo
├── robots.txt          # Bot blocking configuration
├── README.md           # Project documentation
└── .gitignore         # Git configuration
```

---

## 👤 Personal Information

**Name:** Sascha Zeissler  
**Title:** Business Generalist  
**Company:** Shapes · Wearable Science  
**Email:** sascha@get-shapes.com  
**Phone:** +49 174 2192663  

**Links:**
- WhatsApp: https://wa.me/491742192663
- LinkedIn: https://www.linkedin.com/in/sascha-shapes/
- Website: https://www.get-shapes.com

---

## 🎨 Design Specifications

**Theme:** Dark minimalist (Apple Card inspired)  
**Colors:** Black (#000000) and White (#FFFFFF)  
**Font:** BrutalType  
**Card Background:** Linear gradient (#1a1a1a to #0a0a0a)  
**Max Width:** 400px (mobile-optimized)  
**Border Radius:** 32px  

**Key Features:**
- ✅ Fully responsive design
- ✅ Dark mode aesthetic
- ✅ Touch-optimized buttons
- ✅ Animated hover effects
- ✅ Social media integration
- ✅ SEO/Bot blocking enabled

---

## 🚀 Deployment

### GitHub Repository
**URL:** https://github.com/Get-Shapes/business-card-platform

### GitHub Pages
**Enabled:** Yes  
**Source:** Deploy from branch `main` → `/` (root)  
**URL:** https://get-shapes.github.io/business-card-platform/

### Custom Domain: shps.app

**DNS Provider:** Squarespace  
**Domain:** shps.app

**DNS Configuration:**
```
Type: A    Host: @    Value: 185.199.108.153
Type: A    Host: @    Value: 185.199.109.153
Type: A    Host: @    Value: 185.199.110.153
Type: A    Host: @    Value: 185.199.111.153
Type: CNAME Host: www  Value: get-shapes.github.io
```

**HTTPS:** Enabled (enforced by GitHub Pages)

---

## 🤖 Bot Blocking Configuration

### robots.txt
Blocks all search engines and AI crawlers:
- Google (Googlebot)
- Bing (Bingbot)
- OpenAI (GPTBot, ChatGPT)
- Anthropic (Claude)
- Meta (FacebookBot)
- Apple (Applebot)
- Perplexity (PerplexityBot)
- And many more...

### Meta Tags
Multiple `noindex` meta tags in HTML `<head>` ensure comprehensive blocking.

**Result:** Page is **not** indexed by search engines or crawled by AI bots, but remains accessible via direct link (QR code).

---

## ✏️ How to Edit

### Update Personal Information

Open `index.html` and find these sections:

**Name & Title:**
```html
<div class="name">Sascha Zeissler</div>
<div class="title">Business Generalist</div>
<div class="company">Shapes · Wearable Science</div>
```

**WhatsApp Link:**
```html
<a href="https://wa.me/491742192663" class="link" target="_blank">
```

**LinkedIn Link:**
```html
<a href="https://www.linkedin.com/in/sascha-shapes" class="link" target="_blank">
```

**Email:**
```html
<a href="mailto:sascha@get-shapes.com" class="link">
```

**Website:**
```html
<a href="https://www.get-shapes.com" class="link" target="_blank">
```

### Change Colors

Find the `<style>` section and modify:

```css
/* Background color */
body {
    background: #000000;  /* Black */
}

/* Card gradient */
.card {
    background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
}

/* Icon colors */
.icon-whatsapp { color: #25D366; }
.icon-linkedin { color: #0A66C2; }
.icon-email { color: #EA4335; }
.icon-web { color: #ffffff; }
```

### Add/Remove Links

To add a new link, copy this template:

```html
<a href="YOUR_URL" class="link" target="_blank">
    <div class="link-icon">
        <!-- SVG ICON HERE -->
    </div>
    <span class="link-text">LABEL</span>
    <svg class="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
</a>
```

### Change Logo/Avatar

Replace files in `public/images/`:
- `ShapesBL150.png` - Avatar logo (circular display)
- `White.png` - Alternative logo
- `LogoBlack.png` - Black logo variant

---

## 📱 QR Code Generation

Once your card is live at `https://shps.app`:

1. Go to: https://www.qr-code-generator.com/
2. Enter URL: `https://shps.app`
3. Customize design (optional)
4. Download high-resolution QR code
5. Print on business cards

**Recommended QR Code Settings:**
- Format: PNG or SVG (vector)
- Size: At least 300x300 pixels
- Error correction: High (allows up to 30% damage)

---

## 🔧 Technical Details

### Standalone HTML
- **No build process required**
- **No dependencies**
- **No JavaScript frameworks**
- Works offline once loaded
- All CSS embedded

### Font Loading
BrutalType font loaded from `public/fonts/`:
- `.otf` format (OpenType)
- `.ttf` format (TrueType fallback)

### Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Safari (iOS & macOS)
- ✅ Firefox (latest)
- ✅ Mobile browsers

---

## 🔄 Backup & Version Control

### Git Repository
All files are version-controlled in GitHub:
```bash
git clone https://github.com/Get-Shapes/business-card-platform.git
```

### Local Backup
To create a local backup:
```bash
cd /Users/Sascha/Documents/Business\ Card
zip -r business-card-backup-$(date +%Y%m%d).zip index.html public/ README.md robots.txt
```

### Restore from Backup
```bash
unzip business-card-backup-YYYYMMDD.zip
```

---

## 🐛 Troubleshooting

### Domain Not Working
1. Check DNS propagation: https://dnschecker.org
2. Verify A records point to GitHub IPs
3. Wait up to 48 hours for DNS propagation
4. Re-enter domain in GitHub Pages settings

### HTTPS Not Enabled
1. Wait 24 hours after domain verification
2. Uncheck and re-check "Enforce HTTPS" in GitHub settings
3. Clear browser cache and try again

### Changes Not Showing
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Check if changes were pushed: `git log`
3. Wait 1-2 minutes for GitHub Pages to rebuild

### Fonts Not Loading
1. Verify font files exist in `public/fonts/`
2. Check file paths in CSS `@font-face`
3. Clear browser cache

---

## 📝 Maintenance Checklist

**Monthly:**
- [ ] Verify domain is still active
- [ ] Check all links still work
- [ ] Test QR code
- [ ] Review analytics (if added)

**As Needed:**
- [ ] Update contact information
- [ ] Refresh logo/images
- [ ] Modify links
- [ ] Update colors/design

---

## 🔒 Security & Privacy

**Current Settings:**
- ✅ No tracking/analytics
- ✅ No third-party scripts
- ✅ Blocked from search engines
- ✅ HTTPS enforced
- ✅ No cookies
- ✅ No data collection

**Privacy Level:** Maximum (only accessible via direct link/QR code)

---

## 📞 Support Resources

**GitHub Repository Issues:**  
https://github.com/Get-Shapes/business-card-platform/issues

**GitHub Pages Documentation:**  
https://docs.github.com/en/pages

**Domain DNS Help:**  
Squarespace support for DNS configuration

---

## 📊 Project History

**Phase 1:** Initial React/Vite setup with Supabase backend (scrapped)  
**Phase 2:** Simplified to standalone HTML  
**Phase 3:** GitHub Pages deployment  
**Phase 4:** Custom domain setup (shps.app)  
**Phase 5:** Bot blocking implementation  

**Final Result:** Single HTML file, fully functional, optimized for mobile QR scanning

---

**End of Documentation**

*Created for Sascha Zeissler | Shapes · Wearable Science*
