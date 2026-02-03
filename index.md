---
layout: home

hero:
  name: "🪁 LayangKit"
  text: "Edge-First Full-Stack Starter"
  tagline: SvelteKit + Cloudflare D1 + Drizzle ORM. Auth, email, upload siap pakai. Deploy ke 300+ edge locations.
  image:
    src: https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/cloudflare-color.png
    alt: LayangKit Logo
  actions:
    - theme: brand
      text: 🚀 Mulai dalam 5 Menit
      link: /guide/getting-started
    - theme: alt
      text: 📖 Lihat Dokumentasi
      link: /guide/
    - theme: alt
      text: 🐙 GitHub
      link: https://github.com/maulanashalihin/svelte-kit-cloudflare-starter.git

features:
  - icon: 🔐
    title: Auth Lengkap
    details: Email/password + Google OAuth + email verification. Session-based dengan Lucia Auth, aman by default.
  - icon: 🗄️
    title: Database Siap
    details: Cloudflare D1 SQLite built-in. Drizzle ORM type-safe. Zero config, langsung coding.
  - icon: 📤
    title: Upload File
    details: Cloudflare R2 untuk file upload. Avatar dengan auto WebP. Presigned URL untuk large files.
  - icon: 🌍
    title: Edge Deploy
    details: Deploy ke 300+ lokasi Cloudflare. Sub-100ms latency. Auto-scaling, zero maintenance.
  - icon: ⚡
    title: Modern Stack
    details: Svelte 5 Runes + Tailwind CSS 4 + Drizzle ORM 0.40. Type-safe, reactive, production-ready.
  - icon: 💰
    title: 100% Gratis
    details: Free tier sangat besar. Unlimited requests, 500k queries/hari, 10GB storage. Bisa jalan bertahun-tahun gratis.
---

<!-- Bagian 1: APA ITU LAYANGKIT -->

## 🪁 Apa itu LayangKit?

**LayangKit** adalah starter template full-stack untuk membangun aplikasi web modern dengan cepat.

::: tip 💡 Untuk Siapa?
- **Founder/Indie Hacker** — Mau validasi ide cepat tanpa setup ribet
- **Frontend Developer** — Butuh backend simple dengan auth & database
- **Full-stack Developer** — Mau stack modern yang siap production
- **AI-Native Developer** — Optimized untuk AI Agent workflow
:::

### Masalah yang Diselesaikan

| Sebelum LayangKit | Dengan LayangKit |
|------------------|------------------|
| Setup auth memakan waktu berjam-jam | Auth siap pakai, login dalam 5 menit |
| Konfigurasi database ribet | D1 zero-config, langsung coding |
| Deploy rumit (Docker, VPS, dll) | `npm run deploy`, selesai |
| Coba-coba stack yang cocok | Stack sudah proven, langsung produksi |

---

<!-- Bagian 2: CARA KERJA -->

## 🔄 Cara Kerja LayangKit

Terdapat **3 cara** menggunakan LayangKit, pilih yang sesuai kebutuhanmu:

### Cara 1: Manual Development
```
Setup → Coding → Deploy
  ↓       ↓        ↓
10m    Bebas    10m
```
Kamu kontrol penuh. Cocok untuk yang suka coding sendiri.

### Cara 2: AI Agent Workflow (Recommended ⭐)
```
INIT_AGENT → TASK_AGENT → MANAGER_AGENT
    ↓            ↓             ↓
 Setup     Build Fitur    Manage Change
Project     Otomatis       & Update Docs
```
Biarkan AI Agents yang kerja. Kamu fokus pada bisnis logic.

### Cara 3: Hybrid
```
INIT_AGENT → Manual Coding → TASK_AGENT
    ↓             ↓             ↓
 Setup       Fitur Core    Fitur Tambahan
```
Setup otomatis, coding manual untuk yang penting, AI untuk sisanya.

---

<!-- Bagian 3: FITUR BUILT-IN -->

## ✨ Fitur Sudah Termasuk

Tidak perlu install apa-apa lagi. Semua sudah siap:

### 🔐 Authentication (Built-in)
- ✅ **Register/Login** dengan email/password (PBKDF2 hashing)
- ✅ **Google OAuth** — Login dengan Google
- ✅ **Email Verification** — Via Resend
- ✅ **Password Reset** — Complete forgot/reset flow
- ✅ **Session Management** — HTTP-only cookies dengan Lucia Auth

### 📁 File Uploads
- ✅ **Avatar Upload** — Auto convert WebP
- ✅ **Presigned URLs** — Upload langsung ke R2
- ✅ **CDN Delivery** — Via Cloudflare edge

### 🎨 UI/UX
- ✅ **Dark Elegance Theme** — Tailwind CSS 4
- ✅ **Responsive** — Mobile-first design
- ✅ **Form Validation** — Zod 4.x validation

---

<!-- Bagian 4: TECH STACK -->

## 🛠️ Tech Stack

Stack modern yang dipilih dengan cermat untuk produktivitas maksimal:

```
┌────────────────────────────────────────────────────────────┐
│  Frontend                                                  │
│  ├── SvelteKit 2.x    → Full-stack framework              │
│  ├── Svelte 5         → UI dengan Runes ($state)           │
│  └── Tailwind CSS 4   → CSS-first styling                  │
├────────────────────────────────────────────────────────────┤
│  Backend                                                   │
│  ├── Cloudflare D1    → SQLite at edge (zero setup)        │
│  ├── Drizzle ORM 0.40 → Type-safe SQL                      │
│  └── Lucia Auth       → Session-based auth                 │
├────────────────────────────────────────────────────────────┤
│  Services                                                  │
│  ├── Cloudflare Pages → Edge deployment                    │
│  ├── Cloudflare R2    → File storage                       │
│  └── Resend           → Email delivery                     │
└────────────────────────────────────────────────────────────┘
```

---

<!-- Bagian 5: FREE TIER -->

## 💰 100% Gratis untuk Project Kecil-Menengah

Semua layanan punya free tier yang sangat besar:

| Layanan | Free Tier | Estimasi Penggunaan |
|---------|-----------|---------------------|
| **Cloudflare Pages** | Unlimited requests, 500 builds/bulan | Website unlimited traffic |
| **Cloudflare D1** | 500k rows/query per hari, 5 GB storage | Database 500rb query/hari |
| **Cloudflare R2** | 10 GB storage, 1 juta Class A ops/bulan | File storage 10 GB |
| **Workers** | 100k requests/hari | API 100rb request/hari |
| **Resend** | 100 email/hari | Email verification 100/hari |

> **Bottom line:** Untuk startup, portfolio, side project — ini **GRATIS TOTAL** dengan limit yang sangat longgar.

---

<!-- Bagian 6: QUICK START -->

## 🚀 Quick Start (Benar-benar 5 Menit)

```bash
# 1. Create project dengan npm (lebih cepat!)
npm create layang@latest my-app
cd my-app

# 2. Buat database (satu command)
npx wrangler d1 create my-app-db
# Copy database_id ke wrangler.toml

# 3. Jalankan
npm run db:migrate:local
npm run dev
```

> 💡 **Baru!** Sekarang install lebih mudah dengan `npm create layang`. Tidak perlu git clone manual!

🎉 **Buka http://localhost:5173** — Auth, database, semua berfungsi.

---

<!-- Bagian 7: PILIH JALURMU -->

## 🎯 Pilih Jalurmu

### 🏃 Path A: Cepat Saja (1 jam)
Mau langsung punya aplikasi yang jalan?

```
Getting Started → Build Manual → Deploy
     10m              40m         10m
```
[Lihat Getting Started →](./guide/getting-started)

---

### 🤖 Path B: AI-Native Development (Recommended)
Biarkan AI yang kerja, kamu fokus bisnis logic.

```
INIT_AGENT (20m) → TASK_AGENT (∞) → Deploy (10m)
  Setup Project    Build Otomatis    Live di Edge
```
[Pelajari AI Agent Workflow →](./guide/ai-first-development)

---

### 📚 Path C: Pelajari Dulu (3 jam)
Mau paham setiap komponen sebelum coding?

```
Getting Started → Development Flow → Architecture
     10m              20m              30m

AI Workflow → Deploy
   15m        10m
```
[Mulai dari Getting Started →](./guide/getting-started)

---

<!-- Bagian 8: DOKUMENTASI -->

## 📚 Navigasi Dokumentasi

| Bagian | Isi | Waktu |
|--------|-----|-------|
| **[🚀 Getting Started](./guide/getting-started)** | Setup lengkap step-by-step | 10 min |
| **[🤖 AI Agent Workflow](./guide/ai-first-development)** | 3 AI Agents: INIT → TASK → MANAGER | 15 min |
| **[🌊 Development Flow](./guide/development-flow)** | SvelteKit patterns & best practices | 20 min |
| **[🎨 Features](./guide/features)** | Cara pakai auth, upload, email | 15 min |
| **[🏗️ Architecture](./guide/architecture)** | System design & patterns | 30 min |
| **[🚀 Deployment](./guide/deployment)** | Deploy ke Cloudflare | 10 min |

### Troubleshooting
- [Database Issues](./troubleshooting/database)
- [Authentication Issues](./troubleshooting/authentication)
- [Deployment Issues](./troubleshooting/deployment)

---

<!-- Bagian 9: NEXT STEPS -->

## 👉 Langkah Selanjutnya

Pilih salah satu untuk memulai:

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">

<a href="./guide/getting-started" style="display: block; padding: 1.5rem; border-radius: 0.75rem; text-align: center; text-decoration: none; transition: all 0.2s; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border: 2px solid transparent;" onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 10px 25px rgba(245, 158, 11, 0.3)'" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='none'">
  <div style="font-size: 2rem; margin-bottom: 0.5rem;">🚀</div>
  <div style="font-weight: 700; font-size: 1.125rem; color: #000000;">Getting Started</div>
  <div style="font-size: 0.875rem; color: rgba(0,0,0,0.7); margin-top: 0.25rem;">Setup dalam 5 menit</div>
</a>

<a href="./guide/ai-first-development" style="display: block; padding: 1.5rem; border-radius: 0.75rem; text-align: center; text-decoration: none; transition: all 0.2s; background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); border: 2px solid transparent;" onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 10px 25px rgba(124, 58, 237, 0.3)'" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='none'">
  <div style="font-size: 2rem; margin-bottom: 0.5rem;">🤖</div>
  <div style="font-weight: 700; font-size: 1.125rem; color: #ffffff;">AI Agent Workflow ⭐</div>
  <div style="font-size: 0.875rem; color: rgba(255,255,255,0.8); margin-top: 0.25rem;">3 Agent: INIT → TASK → MANAGER</div>
</a>

</div>

---

## 🔗 Referensi Eksternal

- [SvelteKit Docs](https://kit.svelte.dev/docs) — Framework documentation
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes) — Reactive system
- [Drizzle ORM](https://orm.drizzle.team/docs) — Database ORM
- [Cloudflare D1](https://developers.cloudflare.com/d1/) — Edge database
- [Lucia Auth](https://lucia-auth.com/) — Authentication
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta) — Styling

---

**Dari zero ke production dalam 5 menit — 100% gratis, 300+ edge locations** 🚀

[Mulai Sekarang →](./guide/getting-started)
