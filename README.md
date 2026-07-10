# Space D — Portfolio of Aime Divin Christian

A cinematic, 3D-powered personal portfolio built with **Next.js 14 (App Router)**, **Three.js**, and a fully custom design system. It features a dark/light theme toggle, English/French language toggle, mobile-first layout, an animated loading screen, an email contact form, and a **password-protected admin dashboard** that lets you edit every piece of site content without touching code.

Content is stored in **Postgres** (via **Prisma**), the dashboard is protected by **NextAuth** (credentials + JWT sessions), and the public site reads everything from the database at request time.

---

## 📑 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Features](#-features)
3. [Prerequisites](#-prerequisites)
4. [Quick Start](#-quick-start)
5. [Environment Variables](#-environment-variables)
6. [Database Setup](#-database-setup)
7. [Project Structure](#-project-structure)
8. [Architecture & Data Flow](#-architecture--data-flow)
9. [Data Model](#-data-model)
10. [Admin Dashboard](#-admin-dashboard)
11. [Icon System](#-icon-system)
12. [Internationalization (EN/FR)](#-internationalization-enfr)
13. [Email / Contact Form](#-email--contact-form)
14. [Favicon & Images](#-favicon--images)
15. [NPM Scripts](#-npm-scripts)
16. [Deployment (Vercel)](#-deployment-vercel)
17. [Security Notes](#-security-notes)
18. [Troubleshooting](#-troubleshooting)
19. [Changing the Admin Password](#-changing-the-admin-password)

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router + one legacy Pages API route) |
| Language | TypeScript |
| 3D / graphics | Three.js, @react-three/fiber, @react-three/drei |
| Animation | Framer Motion, CSS keyframes, IntersectionObserver |
| Database | PostgreSQL |
| ORM | Prisma 6 |
| Auth | NextAuth v4 (Credentials provider, JWT sessions) |
| Password hashing | bcryptjs |
| Icons | lucide-react + custom inline SVGs |
| Email | Nodemailer (SMTP) |
| Seed runner | tsx |

---

## ✨ Features

- **Public portfolio** — hero, about, work, skills, contact sections, all data-driven from the DB.
- **Bilingual** — every content field has an English and French value; users toggle language live.
- **Dark / light themes** — toggled in the navbar, applied via a `data-theme` attribute and CSS variables.
- **3D animated background** and animated loading screen.
- **Contact form** — sends email via Nodemailer/SMTP.
- **Admin dashboard** (`/admin`) — full CRUD over Profile/About text, Projects, Skills, and Social links, protected by login.
- **Resilient rendering** — if the database is unreachable, the homepage falls back to built-in defaults instead of crashing.

---

## ✅ Prerequisites

- **Node.js 18.18+** (Node 20 recommended)
- **npm**
- A **PostgreSQL** database (free options: [Neon](https://neon.tech), [Vercel Postgres](https://vercel.com/storage/postgres), [Supabase](https://supabase.com))
- An **SMTP account** for the contact form (e.g. a Gmail App Password) — optional if you don't need the form

---

## ⚡ Quick Start

```bash
# 1. Install dependencies (this also runs `prisma generate` via postinstall)
npm install

# 2. Create your local env file and fill it in
cp .env.example .env.local
#    → set DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL,
#          ADMIN_EMAIL, ADMIN_PASSWORD, and the SMTP_* values

# 3. Create the database tables from the Prisma schema
npm run db:push

# 4. Seed the existing content + create the admin user
npm run db:seed

# 5. Start the dev server
npm run dev

# 6. Open the site and the dashboard
#    Site:      http://localhost:3000
#    Dashboard: http://localhost:3000/admin
```

Log in at `/admin/login` with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env.local`.

---

## 🔑 Environment Variables

Copy `.env.example` → `.env.local` and fill in every value. `.env.local` is gitignored — **never commit real credentials**.

| Variable | Required | Description | Example |
|----------|:--------:|-------------|---------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string. Use the **pooled** string from Neon/Vercel. | `postgresql://user:pass@host/db?sslmode=require` |
| `NEXTAUTH_SECRET` | ✅ | Secret used to sign session JWTs. Generate with `openssl rand -base64 32`. | `k3f9...` (long random string) |
| `NEXTAUTH_URL` | ✅ | Canonical base URL of the app. | `http://localhost:3000` (dev) / your domain (prod) |
| `ADMIN_EMAIL` | ✅ | Email for the initial admin account (created by the seed). | `admin@spaced.dev` |
| `ADMIN_PASSWORD` | ✅ | Password for the initial admin account (bcrypt-hashed on seed). | `change-this-password` |
| `SMTP_HOST` | ⬜ | SMTP server host for the contact form. | `smtp.gmail.com` |
| `SMTP_PORT` | ⬜ | SMTP port. | `587` |
| `SMTP_USER` | ⬜ | SMTP username / sender address. | `you@gmail.com` |
| `SMTP_PASS` | ⬜ | SMTP password / app password. | `xxxx xxxx xxxx xxxx` |
| `CONTACT_EMAIL` | ⬜ | Where contact-form submissions are delivered. | `aimedivinchristian@gmail.com` |

> `ADMIN_EMAIL` / `ADMIN_PASSWORD` are only read by the **seed script** to create/update the admin row. After seeding, login is validated against the hashed password stored in the database — changing these env vars later does **not** change your password unless you re-run the seed.

---

## 🗄️ Database Setup

Any PostgreSQL instance works. Two easy free options:

### Option A — Neon (recommended)

1. Create a project at [neon.tech](https://neon.tech).
2. Copy the **pooled connection string** (it contains `?sslmode=require`).
3. Paste it into `DATABASE_URL` in `.env.local`.
4. Run:
   ```bash
   npm run db:push    # create tables
   npm run db:seed    # load content + admin user
   ```

### Option B — Vercel Postgres

1. In your Vercel project → **Storage → Create → Postgres**.
2. Vercel auto-adds `DATABASE_URL` (and related vars) to the project. Pull them locally with `vercel env pull .env.local`.
3. Run `npm run db:push` and `npm run db:seed`.

### Useful commands

| Command | Purpose |
|---------|---------|
| `npm run db:push` | Sync the schema in `prisma/schema.prisma` to the database (creates/updates tables). |
| `npm run db:seed` | Insert the seed content and upsert the admin user. |
| `npm run db:studio` | Open Prisma Studio — a GUI to browse/edit rows directly. |
| `npx prisma generate` | Regenerate the typed Prisma client (runs automatically on `npm install`). |

> **Schema changes:** after editing `prisma/schema.prisma`, run `npm run db:push` again. For versioned migrations instead of `db push`, use `npx prisma migrate dev --name <change>`.

---

## 📁 Project Structure

```
space-d-portfolio/
├── app/
│   ├── layout.tsx                     ← Root layout, metadata, favicon, fonts
│   ├── page.tsx                       ← Home (SERVER component: fetches DB → HomeClient)
│   ├── globals.css                    ← Design system, themes, animations
│   ├── api/
│   │   └── auth/[...nextauth]/route.ts← NextAuth route handler
│   └── admin/
│       ├── admin.css                  ← Dashboard styles
│       ├── actions.ts                 ← Server actions (all CRUD, auth-guarded)
│       ├── login/page.tsx             ← Login screen (client)
│       └── (dashboard)/               ← Route group with the sidebar layout
│           ├── layout.tsx             ← Auth check + sidebar shell
│           ├── page.tsx               ← Dashboard overview
│           ├── profile/page.tsx       ← Edit hero / about / contact
│           ├── projects/page.tsx      ← Projects CRUD
│           ├── skills/page.tsx        ← Skills CRUD
│           └── socials/page.tsx       ← Social links CRUD
├── components/
│   ├── HomeClient.tsx                 ← All interactive homepage UI (theme/lang/render)
│   ├── AdminNav.tsx                   ← Dashboard sidebar (client: active link + sign out)
│   ├── ThreeBackground.tsx            ← 3D floating particles & shapes (Three.js)
│   ├── LoadingScreen.tsx              ← Animated loading screen
│   ├── Navbar.tsx                     ← Nav with theme/lang toggles, mobile menu
│   └── ContactForm.tsx               ← Email contact form
├── lib/
│   ├── prisma.ts                      ← PrismaClient singleton
│   ├── data.ts                        ← Data-access helpers + DEFAULT_PROFILE fallback
│   ├── icons.tsx                      ← Icon registry (string key → component)
│   └── translations.ts               ← EN/FR UI chrome strings
├── pages/
│   └── api/contact.ts                 ← Email API route (Nodemailer)
├── prisma/
│   ├── schema.prisma                  ← Data model
│   └── seed.ts                        ← Seed content + initial admin user
├── middleware.ts                      ← Protects /admin (except /admin/login)
├── public/                            ← Images (me.jpg, project images, favicon.png)
├── .env.example                       ← Copy to .env.local
└── package.json
```

---

## 🏗️ Architecture & Data Flow

**Public site (read path)**

```
Browser → app/page.tsx (server component, force-dynamic)
        → lib/data.ts (getProfile / getProjects / getSkills / getSocials)
        → lib/prisma.ts → PostgreSQL
        → <HomeClient> renders the data (client component: theme/lang/interactions)
```

- `app/page.tsx` runs on the server on every request (`export const dynamic = 'force-dynamic'`), fetches the four content sets in parallel, and passes them to `HomeClient`.
- `lib/data.ts` wraps each query in try/catch and returns `DEFAULT_PROFILE` / empty arrays if the DB is down, so the page never 500s.
- Icons can't be stored as JSX, so each Skill/Social row stores an `iconKey` string that maps to a component in `lib/icons.tsx`.

**Admin (write path)**

```
Browser → /admin/... form (submit)
        → server action in app/admin/actions.ts
        → requireAuth() (getServerSession) → Prisma write
        → revalidatePath('/') + revalidatePath('/admin', 'layout')
        → public site shows updated content immediately
```

- Every server action calls `requireAuth()` first, so even a direct action invocation is rejected without a valid session.
- `middleware.ts` additionally blocks navigation to any `/admin` route (except `/admin/login`) for unauthenticated users, redirecting to the login page.
- The `(dashboard)` route group's `layout.tsx` also re-checks the session server-side and redirects to `/admin/login` if missing.

---

## 🧩 Data Model

Defined in [`prisma/schema.prisma`](prisma/schema.prisma).

### `Profile` (singleton, `id = "main"`)

Holds all editable hero/about/contact text. Fields ending in `En`/`Fr` are the two language variants.

| Field | Type | Notes |
|-------|------|-------|
| `id` | String | Always `"main"` (single row) |
| `heroName` | String | Displayed name (not translated) |
| `heroTaglineEn` / `heroTaglineFr` | String | Hero tagline |
| `heroSubEn` / `heroSubFr` | Text | Hero subtitle paragraph |
| `aboutTitleEn` / `aboutTitleFr` | String | About section heading |
| `aboutP1En` / `aboutP1Fr` | Text | About paragraph 1 |
| `aboutP2En` / `aboutP2Fr` | Text | About paragraph 2 |
| `aboutP3En` / `aboutP3Fr` | Text | About paragraph 3 |
| `phone` | String | Contact phone (also used for `tel:` link) |
| `email` | String | Contact email (also used for `mailto:` link) |
| `location` | String | City/country; shown in about badge + footer |
| `contactName` | String | Heading in the contact block |
| `contactBlurbEn` / `contactBlurbFr` | Text | Contact intro paragraph |
| `updatedAt` | DateTime | Auto-updated |

### `Project`

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (cuid) | Primary key |
| `title` | String | Project name |
| `descEn` / `descFr` | Text | Description in each language |
| `tags` | String[] | Chips (e.g. `["Next.js","Three.js"]`) |
| `status` | String | `"done"` or `"in-process"` (drives the badge) |
| `image` | String | Path under `/public` (e.g. `/motolens.png`) |
| `accent` | String | Accent color bar (hex) |
| `liveUrl` | String? | Optional "View Live" link |
| `sortOrder` | Int | Ascending display order |
| `createdAt` / `updatedAt` | DateTime | Timestamps |

### `Skill`

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (cuid) | Primary key |
| `name` | String | Skill name |
| `level` | String | e.g. `"Advanced"`, `"Intermediate"` |
| `iconKey` | String | Key into `lib/icons.tsx` (see [Icon System](#-icon-system)) |
| `sortOrder` | Int | Ascending display order |

### `Social`

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (cuid) | Primary key |
| `label` | String | e.g. `"GitHub"` (also the title/aria-label) |
| `iconKey` | String | Key into `lib/icons.tsx` |
| `href` | String | Link URL |
| `color` | String | Icon/text color |
| `bg` | String | Background (solid color or CSS gradient) |
| `border` | String | Border color |
| `sortOrder` | Int | Ascending display order |

### `AdminUser`

| Field | Type | Notes |
|-------|------|-------|
| `id` | String (cuid) | Primary key |
| `email` | String (unique) | Login email |
| `passwordHash` | String | bcrypt hash — never store plaintext |
| `createdAt` | DateTime | Timestamp |

---

## 🔐 Admin Dashboard

Everything a visitor sees (except fixed UI labels) is editable at **`/admin`** — no code changes or redeploys required.

### Logging in

- Go to `/admin/login`.
- Enter the `ADMIN_EMAIL` / `ADMIN_PASSWORD` created by `npm run db:seed`.
- Sessions are JWT-based (NextAuth). Sign out from the sidebar.

### Sections

| Page | Route | What you manage |
|------|-------|-----------------|
| **Dashboard** | `/admin` | Overview with counts + quick links |
| **Profile & About** | `/admin/profile` | Hero name/tagline/subtitle, about paragraphs, contact details — all in EN + FR |
| **Projects** | `/admin/projects` | Create / edit / delete / reorder projects |
| **Skills** | `/admin/skills` | Create / edit / delete / reorder skills; pick icon |
| **Social Links** | `/admin/socials` | Create / edit / delete / reorder links; set icon + colors |

### How editing works

- Each list item is its own form with a **Save** and **Delete** button; a dashed card at the bottom of each page is the **create** form.
- Saving triggers a server action that writes to Postgres and revalidates the public site, so changes appear immediately.
- **Ordering:** set `sortOrder` (lower = earlier). Items are displayed ascending.
- **Tags** (projects): comma-separated, e.g. `HTML, CSS, Js`.
- **Images** (projects) and the about **photo**: put the file in `/public` and reference it by path (e.g. `/spaced.png`, `/me.jpg`).
- **Colors** (socials/projects): any valid CSS color; the social `bg` also accepts a gradient (e.g. `linear-gradient(45deg,#f09433,#bc1888)`).

---

## 🎨 Icon System

Skills and socials reference an icon by **string key** (JSX can't be stored in the DB). Keys are defined in [`lib/icons.tsx`](lib/icons.tsx). The Skills page also renders a visual gallery of all available keys.

**Available keys**

`react`, `typescript`, `three`, `node`, `tailwind`, `adobe`, `html`, `c`, `linux`, `embedded`, `terminal`, `figma`, `figma-color`, `camera`, `film`, `lightbulb`, `cpu`, `code`, `github`, `instagram`, `facebook`, `youtube`, `whatsapp`, `snapchat`

If an unknown key is stored, it safely falls back to the `code` icon.

**Adding a new icon**

1. Open `lib/icons.tsx`.
2. Add a component (a lucide-react icon or an inline SVG accepting a `size` prop).
3. Register it in the `ICONS` map with a new key.
4. Select the new key from the dashboard's icon dropdown.

---

## 🌍 Internationalization (EN/FR)

There are two layers of text:

1. **Content** (editable in the dashboard) — hero, about, contact, and each project description. Stored as `...En` / `...Fr` field pairs in the database. `HomeClient` picks the active language with a small `pick(lang, en, fr)` helper.
2. **UI chrome** (in code) — navbar labels, button text, form field labels, loading text, section eyebrows. These live in [`lib/translations.ts`](lib/translations.ts) because they're structural, not "content." To add a language, extend that file and the `Lang` type.

Language is toggled in the navbar and held in React state (no full reload).

---

## 📧 Email / Contact Form

The contact form posts to the Pages API route [`pages/api/contact.ts`](pages/api/contact.ts), which sends mail via Nodemailer.

### Gmail (recommended)

1. Enable 2-Step Verification on your Google account.
2. Create an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
3. Set in `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx   # 16-char app password
   CONTACT_EMAIL=aimedivinchristian@gmail.com
   ```

### Other providers

Update `SMTP_HOST` / `SMTP_PORT` for Outlook, Zoho, SendGrid, etc.

---

## 🖼️ Favicon & Images

- **Favicon:** drop `favicon.png` in `/public` — `app/layout.tsx` already references `/favicon.png`.
- **Your photo:** place it at `/public/me.jpg` (referenced by the About section).
- **Project images:** place them in `/public` and reference by path from the dashboard (e.g. `/rehyco.png`).

---

## 📜 NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `next dev` | Start the dev server |
| `npm run build` | `next build` | Production build |
| `npm run start` | `next start` | Run the production build |
| `npm run lint` | `next lint` | Lint |
| `npm run db:push` | `prisma db push` | Sync schema → database |
| `npm run db:seed` | `prisma db seed` | Seed content + admin user |
| `npm run db:studio` | `prisma studio` | Open the Prisma Studio GUI |
| *(auto)* `postinstall` | `prisma generate` | Regenerate the Prisma client after install |

---

## 🚀 Deployment (Vercel)

1. **Provision a database** (Neon or Vercel Postgres) and get its `DATABASE_URL`.
2. **Push to GitHub** and import the repo in Vercel (or use the CLI).
   ```bash
   npm i -g vercel
   vercel
   ```
3. **Set environment variables** in Vercel → Settings → Environment Variables:
   ```
   DATABASE_URL
   NEXTAUTH_SECRET
   NEXTAUTH_URL        # your production URL, e.g. https://yourname.vercel.app
   ADMIN_EMAIL
   ADMIN_PASSWORD
   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL
   ```
4. **Deploy.** `prisma generate` runs automatically via `postinstall`.
5. **Initialize the production database** (one time) — run against the production `DATABASE_URL`:
   ```bash
   # locally, with prod DATABASE_URL exported into .env.local:
   npm run db:push
   npm run db:seed
   ```

> **Why Postgres and not SQLite?** Vercel is serverless — a local SQLite file wouldn't persist between invocations. A hosted Postgres database gives you durable, shared content.
>
> **Prisma version note:** this project pins **Prisma 6**. Prisma 7 removed the classic `url = env("DATABASE_URL")` datasource config in favor of driver adapters + a `prisma.config.ts`; staying on 6 keeps setup simple and Vercel-friendly.

---

## 🛡️ Security Notes

- Admin passwords are **bcrypt-hashed**; plaintext is never stored.
- `/admin` is guarded in **three** layers: `middleware.ts`, the `(dashboard)/layout.tsx` session check, and `requireAuth()` inside every server action.
- Keep `NEXTAUTH_SECRET` secret and unique per environment.
- `.env` / `.env.local` are gitignored — don't commit credentials.
- Change the default `ADMIN_PASSWORD` before going live.

---

## 🧯 Troubleshooting

| Symptom | Likely cause / fix |
|---------|--------------------|
| Homepage shows default content, edits don't appear | DB unreachable or empty — check `DATABASE_URL`, run `npm run db:push` + `npm run db:seed`. |
| `Can't reach database server` | Wrong/expired `DATABASE_URL`, or missing `?sslmode=require` on Neon. |
| Login always fails | Admin row not seeded (`npm run db:seed`), or `NEXTAUTH_SECRET` unset. |
| Redirected to `/admin/login` in a loop | `NEXTAUTH_URL` doesn't match the site URL, or cookies blocked. |
| `PrismaClient is not configured` / type errors | Run `npx prisma generate` (or reinstall). |
| Seed fails to find a module | Ensure you're on the pinned deps (`npm install`); the seed runs with `tsx`. |
| Contact form errors | Check `SMTP_*` values; for Gmail use an App Password, not your account password. |

---

## 🛠️ Where to Customize What

| Target | What to change |
|--------|----------------|
| **`/admin` dashboard** | Projects, skills, social links, hero/about/contact copy (EN + FR) |
| `lib/translations.ts` | UI chrome strings (nav, buttons, form labels); add languages |
| `lib/icons.tsx` | Add/adjust the icon set used by skills & socials |
| `prisma/schema.prisma` | Content data model (run `db:push` after edits) |
| `prisma/seed.ts` | Default/seed content and the initial admin user |
| `app/globals.css` | Colors (`--accent`, `--bg`), fonts, animations |
| `app/admin/admin.css` | Dashboard styling |
| `app/layout.tsx` | Page title, meta description, favicon |
| `public/` | Favicon, profile photo, project images |

---

**Built by Aime Divin Christian — Space D | Kigali, Rwanda**
