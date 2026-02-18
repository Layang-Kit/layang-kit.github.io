---
layout: home

hero:
  name: "🪁 LayangKit"
  text: "Edge-First Starter"
  tagline: SvelteKit + Cloudflare D1 + Drizzle ORM. Auth, email, upload siap pakai. Deploy ke 300+ edge locations dalam 5 menit.
  image:
    src: https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/cloudflare-color.png
    alt: LayangKit Logo
  actions:
    - theme: brand
      text: 🚀 Quick Start (5 Menit)
      link: /guide/quick-start
    - theme: alt
      text: 📖 Panduan Lengkap
      link: /guide/
    - theme: alt
      text: 🐙 GitHub
      link: https://github.com/maulanashalihin/svelte-kit-cloudflare-starter

features:
  - icon: 🔐
    title: Auth Lengkap
    details: Email/password + Google OAuth + email verification + password reset. Session-based dengan HTTP-only cookies.
  - icon: 🗄️
    title: Database Edge
    details: Cloudflare D1 SQLite built-in. Drizzle ORM + Kysely query builder. Type-safe, zero config.
  - icon: 📤
    title: File Upload
    details: S3-compatible storage (R2, Wasabi, S3). Avatar dengan auto WebP. Presigned URL untuk large files.
  - icon: 🌍
    title: Edge Deploy
    details: Deploy ke 300+ lokasi Cloudflare. Sub-100ms latency. Auto-scaling, zero maintenance.
  - icon: ⚡
    title: Modern Stack
    details: Svelte 5 Runes + Tailwind CSS 4 + Drizzle ORM 0.40. Production-ready.
  - icon: 💰
    title: 100% Gratis
    details: Free tier sangat besar. Unlimited requests, 500k queries/hari, 10GB storage.
---

## 🪁 Apa itu LayangKit?

**LayangKit** adalah starter template full-stack modern untuk membangun aplikasi web dengan cepat. Dari zero ke production dalam 5 menit — 100% gratis.

::: tip 💡 Cocok Untuk
- **Founder/Indie Hacker** — Validasi ide cepat tanpa setup ribet
- **Frontend Developer** — Butuh backend dengan auth & database siap pakai
- **Full-stack Developer** — Stack modern yang proven di production
- **AI-Native Developer** — Optimized untuk AI Agent workflow
:::

### Masalah yang Diselesaikan

| Tanpa LayangKit | Dengan LayangKit |
|-----------------|------------------|
| Setup auth: berjam-jam | Auth siap pakai: 5 menit |
| Konfigurasi database ribet | D1 zero-config, langsung coding |
| Deploy rumit (Docker, VPS) | `npm run deploy`, selesai |
| Coba-coba stack | Stack sudah proven, langsung produksi |

---

## 🛠️ Tech Stack

```
┌────────────────────────────────────────────────────────────┐
│  Frontend                                                  │
│  ├── SvelteKit 2.x    → Full-stack framework              │
│  ├── Svelte 5         → UI dengan Runes ($state)           │
│  └── Tailwind CSS 4   → CSS-first styling                  │
├────────────────────────────────────────────────────────────┤
│  Backend                                                   │
│  ├── Cloudflare D1    → SQLite at edge                     │
│  ├── Drizzle ORM      → Schema & migrations                │
│  └── Kysely           → Type-safe queries                  │
├────────────────────────────────────────────────────────────┤
│  Services                                                  │
│  ├── Cloudflare Pages → Edge deployment                    │
│  ├── Cloudflare R2    → File storage                       │
│  └── Resend           → Email delivery                     │
└────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

```bash
# 1. Create project
npm create layang@latest my-app
cd my-app

# 2. Setup database
npx wrangler d1 create my-app-db
# Copy database_id ke wrangler.toml

# 3. Run
npm run db:migrate:local
npm run dev
```

🎉 **Buka http://localhost:5173** — Auth, database, semua berfungsi!

---

## 📚 Navigasi Dokumentasi

### 🚀 Mulai Cepat
| Dokumen | Deskripsi | Waktu |
|---------|-----------|-------|
| [Quick Start](./guide/quick-start) | Setup minimal, langsung jalan | 5 min |
| [Getting Started](./guide/getting-started) | Setup lengkap dengan penjelasan | 15 min |
| [Development Flow](./guide/development-flow) | Workflow development | 10 min |

### 🤖 AI Agent Workflow
| Dokumen | Deskripsi |
|---------|-----------|
| [AI Workflow Overview](./guide/ai-first-development) | 5 Agents: Product → Tech Lead → Dev → QA → DevOps |
| [Workflow Setup](./guide/workflow-setup) | Setup workflow di project |

### 🏗️ Arsitektur & Pola
| Dokumen | Deskripsi |
|---------|-----------|
| [Architecture](./guide/architecture) | System design & patterns |
| [Project Structure](./guide/project-structure) | Struktur folder |
| [SvelteKit Patterns](./guide/sveltekit-patterns) | Load, Actions, API |
| [Database Guide](./guide/database-d1) | D1 + Drizzle + Kysely |

### ⚙️ Konfigurasi
| Dokumen | Deskripsi |
|---------|-----------|
| [Environment Variables](./guide/environment-variables) | Semua env vars |
| [Google OAuth](./guide/google-oauth) | Setup login Google |
| [Resend Email](./guide/resend-email) | Setup email verification |
| [S3 Storage](./guide/cloudflare-r2) | Setup file upload (R2, Wasabi, dll) |

### 📖 Fitur Detail
| Dokumen | Deskripsi |
|---------|-----------|
| [Authentication](./guide/authentication) | Auth system deep dive |
| [File Uploads](./guide/file-uploads) | Upload & S3 storage |
| [Profile Management](./guide/profile-management) | User profile |

### 🐛 Troubleshooting
| Dokumen | Isu |
|---------|-----|
| [Database](./troubleshooting/database) | Migration, query errors |
| [Authentication](./troubleshooting/authentication) | Login, session errors |
| [Deployment](./troubleshooting/deployment) | Build, deploy errors |
| [Upload](./troubleshooting/upload) | File upload errors |

---

## 💰 Free Tier Limits

| Layanan | Free Tier | Untuk Project |
|---------|-----------|---------------|
| **Cloudflare Pages** | Unlimited requests, 500 builds/bulan | Website unlimited traffic |
| **Cloudflare D1** | 500k rows/query/hari, 5 GB | Database aplikasi kecil-menengah |
| **Cloudflare R2** | 10 GB storage, 1M ops/bulan | File storage |
| **Workers** | 100k requests/hari | API calls |
| **Resend** | 100 email/hari | Email verification |

> **Bottom line:** Untuk startup, portfolio, side project — ini **GRATIS TOTAL** dengan limit yang sangat longgar.

---

## 🔗 Referensi

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Drizzle ORM](https://orm.drizzle.team/docs)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)

---

**Dari zero ke production dalam 5 menit — 100% gratis, 300+ edge locations** 🚀

[Mulai Sekarang →](./guide/quick-start)
