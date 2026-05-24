# Space D — Portfolio of Aime Divin Christian

A cinematic, 3D-powered personal portfolio built with **Next.js 14**, **Three.js**, and a fully custom design system. Features dark/light theme toggle, English/French language toggle, mobile-first layout, animated loading screen, and email contact form.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your email credentials (see Email Setup below)

# 3. Run in development
npm run dev

# 4. Open http://localhost:3000
```

---

## 📁 Project Structure

```
space-d/
├── app/
│   ├── layout.tsx          ← Root layout, metadata, favicon, fonts
│   ├── page.tsx            ← Main portfolio page
│   └── globals.css         ← Design system, themes, animations
├── components/
│   ├── ThreeBackground.tsx ← 3D floating particles & shapes (Three.js)
│   ├── LoadingScreen.tsx   ← Animated loading screen
│   ├── Navbar.tsx          ← Nav with theme/lang toggles, mobile menu
│   └── ContactForm.tsx     ← Email contact form
├── pages/
│   └── api/
│       └── contact.ts      ← Email API route (Nodemailer)
├── lib/
│   └── translations.ts     ← EN/FR translations
├── public/
│   └── favicon.png         ← ← ADD YOUR FAVICON HERE
├── .env.example            ← Copy to .env.local
└── package.json
```

---

## 🎨 Adding Your Favicon

1. Place your `favicon.png` file in the `/public` folder
2. That's it — `app/layout.tsx` already references `/favicon.png`

```
public/
└── favicon.png   ← drop your file here
```

---

## 📧 Email Setup (Contact Form)

The contact form sends emails via Nodemailer. To configure:

### Gmail (Recommended)
1. Enable 2-Step Verification on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Generate an App Password for "Mail"
4. Add to `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx   # 16-char app password
CONTACT_EMAIL=aimedivinchristian@gmail.com
```

### Other Providers
Update `SMTP_HOST` and `SMTP_PORT` to match your provider (Outlook, Zoho, SendGrid, etc.).

---

## 🔗 Adding Your Social Links

In `app/page.tsx`, find the `SOCIALS` array and replace `YOUR_USERNAME` with your actual handles:

```typescript
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/YOUR_USERNAME', ... },
  { label: 'Instagram', href: 'https://instagram.com/YOUR_USERNAME', ... },
  { label: 'Facebook', href: 'https://facebook.com/YOUR_USERNAME', ... },
  { label: 'WhatsApp', href: 'https://wa.me/250796977458', ... },  // already set
  { label: 'YouTube', href: 'https://youtube.com/@YOUR_CHANNEL', ... },
];
```

---

## 🖼️ Adding Your Photo

In `app/page.tsx`, find the `about-img-placeholder` section and replace with:

```tsx
import Image from 'next/image';

// Replace the placeholder div with:
<Image
  src="/your-photo.jpg"   // ← place photo in /public folder
  fill
  alt="Aime Divin Christian"
  style={{ objectFit: 'cover', borderRadius: '20px' }}
/>
```

---

## 🚀 Deploy on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Settings → Environment Variables → add SMTP_* and CONTACT_EMAIL
```

---

## 🛠️ Customization

| File | What to customize |
|------|------------------|
| `lib/translations.ts` | Add more languages or edit copy |
| `app/globals.css` | Colors (`--accent`, `--bg`), fonts |
| `app/page.tsx` | Projects, skills, social links |
| `app/layout.tsx` | Page title, meta description, favicon |
| `public/favicon.png` | Your favicon (replace file) |

---

**Built by Aime Divin Christian — Space D | Kigali, Rwanda**
