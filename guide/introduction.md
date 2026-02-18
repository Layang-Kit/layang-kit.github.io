# Introduction

Selamat datang di **LayangKit** — AI-Native full-stack starter template untuk membangun aplikasi modern dengan cepat.

---

## Apa itu LayangKit?

LayangKit adalah starter kit (bukan framework) yang didesain untuk:

- **Solo developers** yang ingin move fast
- **Teams** yang butuh consistency antar project
- **AI-assisted development** dengan workflow terintegrasi
- **Edge deployment** dengan performa global

> **Core philosophy:** *Mulai dari ide, langsung ngoding fitur. Tanpa setup berjam-jam.*

---

## Kenapa LayangKit Dibuat?

### Masalah yang Kami Rasakan

Setiap kali memulai project baru, kami menghabiskan waktu untuk:

| Aktivitas | Waktu | Frustrasi |
|-----------|-------|-----------|
| Pilih & setup framework | 2-3 jam | "SvelteKit atau Next.js?" |
| Konfigurasi database & ORM | 2-4 jam | "Migration fail lagi" |
| Setup authentication | 3-5 jam | "OAuth callback error" |
| Integrasi email service | 1-2 jam | "Email masuk spam" |
| Setup file upload | 2-3 jam | "S3 permission denied" |
| Konfigurasi deployment | 2-4 jam | "Environment variable belum ke-set" |
| **Total** | **12-21 jam** | Sebelum ngoding fitur! |

**LayangKit menghilangkan 12-21 jam tersebut.**

---

## Kenapa Memilih LayangKit?

### 1. AI-Native by Design

Bukan "bisa pakai AI", tapi **didesain untuk AI**:

- ✅ AI Agent Workflow terintegrasi (Product → Tech Lead → Dev → QA → DevOps)
- ✅ Kode pattern yang mudah dipahami AI
- ✅ Dokumentasi struktur yang jelas untuk AI context
- ✅ Built-in prompts untuk development tasks

```bash
# Contoh: Develop fitur dengan AI
@workflow/agents/product.md "Saya mau fitur subscription dengan Stripe"
# AI akan generate PRD, spec, code, test, dan deploy
```

### 2. Edge-First Architecture

Performa global tanpa configuration:

- ✅ **Cloudflare Pages** — Deploy di 300+ edge locations
- ✅ **Cloudflare D1** — Database SQLite di edge
- ✅ **Cloudflare R2** — Storage S3-compatible tanpa egress fee
- ✅ Latency <50ms di seluruh dunia

### 3. Batteries Included

Production-ready dari starter:

| Fitur | Status |
|-------|--------|
| Authentication (Email + Google OAuth) | ✅ Built-in |
| Email service (Resend) | ✅ Built-in |
| File upload (R2/S3-compatible) | ✅ Built-in |
| Database (D1 + Kysely) | ✅ Built-in |
| Type-safe API | ✅ Built-in |
| Dark theme UI | ✅ Built-in |

**Tidak perlu install library tambahan untuk fitur dasar.**

### 4. Developer Experience

Ngoding yang enjoyable:

- ⚡ **Hot reload** — Perubahan langsung terlihat
- 📝 **Type-safe** — TypeScript end-to-end
- 🎨 **Tailwind 4** — Styling cepat
- 🗄️ **Kysely** — Type-safe SQL query builder
- 🔍 **Clear error messages** — Debug lebih mudah

---

## Untuk Siapa?

### ✅ Cocok Untuk

- **Indie hackers** — MVPs cepat, deploy dalam hari (bukan minggu)
- **Startup teams** — Consistent stack, onboarding developer mudah
- **Agencies** — Delivery cepat dengan quality konsisten
- **AI-assisted developers** — Workflow terintegrasi dengan AI

### ❌ Bukan Untuk

- Enterprise dengan requirement sangat spesifik
- Project yang butuh database relational kompleks (PostgreSQL, etc)
- Yang ingin microservices architecture

---

## Tech Stack

| Layer | Technology | Kenapa? |
|-------|------------|---------|
| **Framework** | SvelteKit 2.x + Svelte 5 | Performa, simplicity, reactivity |
| **Database** | Cloudflare D1 (SQLite) | Edge-native, zero config, scalable |
| **Query** | Kysely + Drizzle | Type-safe SQL, schema management |
| **Auth** | Custom Session + Arctic | Lightweight, secure, no vendor lock-in |
| **Email** | Resend | Reliable, great DX, free tier |
| **Storage** | Cloudflare R2 | S3-compatible, zero egress fee |
| **Styling** | Tailwind CSS 4.x | Utility-first, rapid development |
| **Icons** | Lucide | Consistent, lightweight |

---

## Filosofi Kode

### 1. Unified Pattern

Semua fitur mengikuti pattern yang sama:

```
src/routes/(dashboard)/[feature]/
├── +page.svelte      # UI
├── +page.server.ts   # Load & Actions
└── +server.ts        # API (if needed)
```

Developer tahu persis di mana mencari kode.

### 2. Explicit over Implicit

- Query SQL explisit dengan Kysely (bukan magic ORM)
- Type definitions terlihat jelas
- Error handling explicit

### 3. Progressive Enhancement

- Form works tanpa JavaScript
- Loading states graceful
- Accessibility built-in

---

## Perbandingan dengan Alternatif

| Aspek | From Scratch | Next.js + Vercel | Supabase | **LayangKit** |
|-------|--------------|------------------|----------|---------------|
| Setup time | 12-21 jam | 4-6 jam | 2-3 jam | **5 menit** |
| Auth setup | Manual | NextAuth | Built-in | **Built-in** |
| Database | Setup sendiri | Vercel Postgres | PostgreSQL | **D1 (Edge)** |
| File upload | Setup S3 | Setup S3 | Storage | **R2 (Edge)** |
| AI Workflow | None | None | None | **Native** |
| Deployment | Manual | Vercel | Supabase | **Cloudflare** |
| Cost (start) | Varies | $0-20/bulan | $0-25/bulan | **$0/bulan** |

---

## Mulai Sekarang

Lanjut ke [Quick Start](./quick-start) untuk install dan running dalam 5 menit.

Atau explore lebih dalam:
- [AI Agent Workflow](./ai-first-development) — Development dengan AI
- [Creating Features](./creating-features) — Panduan membuat fitur
