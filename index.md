---
layout: home

hero:
  name: "🪁 LayangKit"
  text: "AI-Native Starter"
  tagline: SvelteKit + Cloudflare + 5 AI Agents. Dari ide ke production dalam hitungan jam, bukan minggu. 100% gratis.
  image:
    src: https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/cloudflare-color.png
    alt: LayangKit Logo
  actions:
    - theme: brand
      text: 🚀 Quick Start (5 Menit)
      link: /guide/quick-start
    - theme: alt
      text: 🤖 AI Workflow
      link: /guide/ai-first-development
    - theme: alt
      text: 📖 Dokumentasi
      link: /guide/

features:
  - icon: 🤖
    title: 5 AI Agents
    details: Product → Tech Lead → Developer → QA → DevOps. Beri instruksi, agents kerja otomatis. State tracking included.
  - icon: ⚡
    title: Development 10x Lebih Cepat
    details: Dari ide ke production dalam 1 hari. Bukan 1 bulan. Agents handle semua dari spec sampai deploy.
  - icon: 🔐
    title: Production Ready
    details: Auth, database, file upload, email — semua built-in. Deploy ke 300+ edge locations. Auto-scaling.
  - icon: 🗄️
    title: Modern Stack
    details: Svelte 5 + Cloudflare D1 + Drizzle ORM. Type-safe, zero config, edge-native.
  - icon: 💰
    title: 100% Gratis
    details: Free tier sangat besar. Unlimited requests, 500k queries/hari, 10GB storage. Cocok untuk MVP.
  - icon: 🌍
    title: Deploy Sekali Klik
    details: npm run deploy — langsung live. D1 binding & env vars otomatis via CLI. No dashboard clicking.
---

## 🤖 Apa itu LayangKit?

**LayangKit** adalah starter template **AI-Native** — built khusus untuk development dengan AI Agents.

Bukan cuma boilerplate code. Tapi **workflow lengkap** dengan 5 AI Agents yang bekerja secara otomatis dari ide sampai deploy.

```
┌─────────────────────────────────────────────────────────────────┐
│  YOUR IDEA                                                      │
│     ↓                                                           │
│  "@workflow/agents/product.md Saya mau app untuk..."           │
│     ↓                                                           │
│  🤖 Product Agent        → PRD, User Stories, Roadmap          │
│  🤖 Tech Lead Agent      → Tech Spec, Database Design          │
│  🤖 Developer Agent      → Working Code                        │
│  🤖 QA Agent             → Test Report                         │
│  🤖 DevOps Agent         → Deploy + State Tracking             │
│     ↓                                                           │
│  🎉 PRODUCTION APP LIVE                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 2 Cara Pakai

### Cara 1: AI Agent Workflow (Rekomendasi)

Development otomatis dengan 5 agents. Cukup beri instruksi.

```bash
# 1. Install
npm create layang my-app
cd my-app

# 2. Panggil AI Agents
@workflow/agents/product.md "Saya mau bikin app todo list"
# [Review output]

@workflow/agents/tech-lead.md "Lanjutkan dari Product Agent"
# [Review output]

@workflow/agents/developer.md "Implement semua fitur"
# [Review code]

@workflow/agents/qa.md "Test aplikasi"
# [Review test report]

@workflow/agents/devops.md "Deploy ke production"
# 🎉 App live!
```

**Keuntungan:**
- ✅ Development 10x lebih cepat
- ✅ Dokumentasi lengkap otomatis
- ✅ Trackable progress
- ✅ Bisa intervensi kapan saja

---

### Cara 2: Manual Development

Pakai sebagai starter template biasa. Coding manual.

```bash
# 1. Install
npm create layang my-app
cd my-app

# 2. Setup database
npx wrangler d1 create my-app-db
# Copy database_id ke wrangler.toml

# 3. Dev
npm run db:migrate:local
npm run dev

# 4. Build & Deploy
npm run build
npm run deploy
```

**Keuntungan:**
- ✅ Full control
- ✅ Cocok untuk yang suka coding manual
- ✅ Auth & database sudah siap

---

## 🤖 AI Agent Workflow Detail

### 5 Agents Bekerja Berurutan

| Agent | Input | Output | Waktu |
|-------|-------|--------|-------|
| **Product** | Ide kamu | PRD, User Stories, Roadmap | 5-10 min |
| **Tech Lead** | PRD | Tech Spec, Database Schema | 5-10 min |
| **Developer** | Tech Spec | Working code di `src/` | 10-30 min |
| **QA** | Code | Test Report | 5-10 min |
| **DevOps** | Approved code | Live app + State tracking | 2-5 min |

### State Tracking (New 🎉)

DevOps Agent menyimpan deployment state:

```markdown
workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md

| Status | COMPLETED |
| Type | FIRST_DEPLOY |
| Config | Database ✅, Storage ✅, Email ❌ |
```

Bisa resume deployment yang ter-interrupt!

---

## 🛠️ Tech Stack

```
┌────────────────────────────────────────────────────────────┐
│  AI Workflow Layer                                         │
│  ├── 5 Specialized Agents                                  │
│  ├── State Tracking                                        │
│  └── Output Documentation                                  │
├────────────────────────────────────────────────────────────┤
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
│  ├── S3 Storage       → R2, Wasabi, S3, MinIO             │
│  └── Resend           → Email delivery                     │
└────────────────────────────────────────────────────────────┘
```

---

## 📚 Navigasi Dokumentasi

### 🚀 Mulai Cepat
| Dokumen | Deskripsi | Waktu |
|---------|-----------|-------|
| [Quick Start](./guide/quick-start) | Setup minimal, langsung jalan | 5 min |
| [AI Workflow](./guide/ai-first-development) | Development dengan 5 AI Agents | 10 min |
| [Workflow Setup](./guide/workflow-setup) | Cara pakai agents | 10 min |

### 🤖 AI Agent Workflow
| Dokumen | Deskripsi |
|---------|-----------|
| [AI Workflow Overview](./guide/ai-first-development) | 5 Agents: Product → Tech Lead → Dev → QA → DevOps |
| [Workflow Setup](./guide/workflow-setup) | Setup & contoh penggunaan |
| [Product Agent](./guide/ai-first-development#step-1-product-agent-pa) | Define requirements |
| [Tech Lead Agent](./guide/ai-first-development#step-2-tech-lead-agent-tla) | Design technical |
| [Developer Agent](./guide/ai-first-development#step-3-developer-agent-deva) | Implement code |
| [QA Agent](./guide/ai-first-development#step-4-qa-agent-qaa) | Test & report |
| [DevOps Agent](./guide/ai-first-development#step-5-devops-agent-doa) | Deploy & track |

### 🏗️ Arsitektur & Pola
| Dokumen | Deskripsi |
|---------|-----------|
| [Architecture](./guide/architecture) | System design & patterns |
| [Project Structure](./guide/project-structure) | Struktur folder |
| [Database Guide](./guide/database-d1) | D1 + Drizzle + Kysely |

### ⚙️ Konfigurasi
| Dokumen | Deskripsi |
|---------|-----------|
| [Environment Variables](./guide/environment-variables) | Semua env vars |
| [S3 Storage](./guide/cloudflare-r2) | Setup file upload |
| [Deployment](./guide/deployment) | Deploy otomatis vs manual |

---

## 💰 Free Tier Limits

| Layanan | Free Tier | Untuk Project |
|---------|-----------|---------------|
| **Cloudflare Pages** | Unlimited requests, 500 builds/bulan | Website unlimited traffic |
| **Cloudflare D1** | 500k rows/query/hari, 5 GB | Database aplikasi kecil-menengah |
| **S3 Storage** | 10 GB (R2), atau sesuai provider | File storage |
| **Workers** | 100k requests/hari | API calls |
| **Resend** | 100 email/hari | Email verification |

> **Bottom line:** Untuk startup, portfolio, side project — ini **GRATIS TOTAL** dengan limit yang sangat longgar.

---

## 🎯 Cocok Untuk

- **Founder/Indie Hacker** — Validasi ide cepat dengan AI agents
- **Frontend Developer** — Butuh backend siap pakai + AI workflow
- **Full-stack Developer** — Stack modern dengan development otomatis
- **AI-Native Developer** — Optimized untuk AI agent workflow

---

## 🔗 Referensi

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Drizzle ORM](https://orm.drizzle.team/docs)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)

---

**Dari ide ke production dalam 1 hari — dengan bantuan 5 AI Agents** 🚀🤖

[Mulai dengan AI Workflow →](./guide/ai-first-development)
