# Getting Started

Setup LayangKit dalam 15 menit.

---

## Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org)
- **Akun Cloudflare** — [Daftar gratis](https://dash.cloudflare.com/sign-up)

---

## Step 1: Create Project

```bash
npm create layang@latest my-app
cd my-app
```

Wizard akan menanyakan:
- Project name: `my-app`
- Install dependencies: `Yes`
- Initialize git: `Yes`

---

## Step 2: Login ke Cloudflare

```bash
npx wrangler login
```

Browser akan terbuka. Klik **Allow**.

---

## Step 3: Create Database

```bash
npx wrangler d1 create my-app-db
```

**Copy database_id dari output**, lalu paste ke `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "my-app-db"
database_id = "paste-id-here"  # ← Ganti ini
```

---

## Step 4: Setup Database

```bash
npm run db:migrate:local
```

---

## Step 5: Run Development

```bash
npm run dev
```

Buka http://localhost:5173

---

## Selanjutnya?

| Ingin... | Baca... |
|----------|---------|
| Development lebih cepat dengan AI | [AI Agent Workflow](./ai-first-development) |
| Deploy ke production | [Deployment Guide](./deployment) |
| Tambah fitur login Google | [Google OAuth](./google-oauth) |
| Setup email verification | [Resend Email](./resend-email) |
| Setup file upload | [S3 Storage](./cloudflare-r2) |

---

**Selamat! Setup selesai.** 🎉
