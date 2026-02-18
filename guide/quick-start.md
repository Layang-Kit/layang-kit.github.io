# Quick Start

Dari zero ke aplikasi berjalan dalam **5 menit**.

::: tip Update Terbaru 🎉
Setup sudah lebih sederhana! Tidak perlu mengisi `CLOUDFLARE_*` API token lagi.
:::

---

## Prerequisites

- Node.js 18+ (direkomendasikan: 20 LTS)
- npm atau pnpm
- Akun Cloudflare (gratis)

---

## 1. Create Project (1 menit)

```bash
npm create layang@latest my-app
```

Atau dengan npx:

```bash
npx create-layang my-app
```

Command ini akan:
- Clone template
- Install dependencies
- Copy `.env.example` → `.env`
- Init git repository

```bash
cd my-app
```

---

## 2. Setup Database (2 menit)

### Login ke Cloudflare

```bash
npx wrangler login
```

### Buat Database

```bash
npx wrangler d1 create my-app-db
```

Output akan seperti ini:
```
✅ Successfully created DB 'my-app-db'

[[d1_databases]]
binding = "DB"
database_name = "my-app-db"
database_id = "xxxxx-xxxx-xxxx-xxxx-xxxx"
```

### Update wrangler.toml

Copy `database_id` dari output ke `wrangler.toml`:

```toml
name = "my-app"
compatibility_date = "2024-09-23"

[[d1_databases]]
binding = "DB"
database_name = "my-app-db"
database_id = "xxxxx-xxxx-xxxx-xxxx-xxxx"  # ← dari output di atas
```

::: warning Penting
**Tidak perlu edit `.env`** untuk database! Cukup update `wrangler.toml`.
:::

---

## 3. Run Development Server (2 menit)

### Apply Migrations

```bash
npm run db:migrate:local
```

### Start Dev Server

```bash
npm run dev
```

🎉 **Buka http://localhost:5173**

Anda akan melihat:
- Landing page dengan navigation
- Login page di `/login`
- Register page di `/register`

---

## 4. Test Fitur Dasar

### Test Authentication
1. Klik **"Get Started"** atau pergi ke `/register`
2. Buat akun dengan email dan password
3. Login dengan akun tersebut
4. Coba logout dan login lagi

### Test Dashboard
Setelah login, Anda akan diarahkan ke dashboard dengan:
- Sidebar navigation
- User menu
- Protected routes

---

## 5. Setup Environment Variables (Opsional)

File `.env` **tidak wajib diisi** untuk development dasar. Isi hanya jika ingin fitur tambahan:

| Fitur | Variabel | Setup Guide |
|-------|----------|-------------|
| **Google Login** | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | [Google OAuth](./google-oauth) |
| **Email Verification** | `RESEND_API_TOKEN`, `FROM_EMAIL` | [Resend Email](./resend-email) |
| **File Upload** | `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, ... | [S3 Storage](./cloudflare-r2) |

```bash
# Edit .env
code .env
```

---

## Struktur Project

```
my-app/
├── src/
│   ├── lib/
│   │   ├── auth/          # Authentication logic
│   │   ├── db/            # Database (2 files!)
│   │   │   ├── index.ts   # All types + exports
│   │   │   └── schema.ts  # Drizzle schema
│   │   ├── email/         # Email service
│   │   └── storage/       # S3-compatible storage
│   └── routes/            # SvelteKit routes
├── migrations/            # Database migrations
└── wrangler.toml          # Cloudflare config (WAJIB)
```

---

## Next Steps

### 🔧 Tambahkan Fitur
Lihat [Development Flow](./development-flow) untuk workflow development.

### 📁 File Upload
Lihat [S3 Storage Setup](./cloudflare-r2) untuk setup upload file.

### 🤖 Gunakan AI Agents
Lihat [AI Agent Workflow](./ai-first-development) untuk development otomatis.

### 🚀 Deploy
Lihat [Deployment](./deployment) untuk deploy ke production.

---

## Troubleshooting

### "D1 binding not found"
- Pastikan `database_id` sudah benar di `wrangler.toml`
- Pastikan sudah login: `npx wrangler login`

### "Failed to execute 'crypto'"
- Pastikan menggunakan Node.js 18+
- Atau coba: `NODE_OPTIONS='--experimental-vm-modules' npm run dev`

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

---

**Selamat! Anda sudah punya aplikasi full-stack berjalan.** 🚀
