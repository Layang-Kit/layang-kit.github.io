# 🚀 Deployment Guide

Deploy aplikasi SvelteKit ke Cloudflare Pages.

---

## 🎯 Pilih Cara Deploy

| Cara | Waktu | Auto-setup | Buka Dashboard? |
|------|-------|------------|-----------------|
| **Otomasi CLI** ⭐ | 2 menit | ✅ Otomatis | ❌ Tidak perlu |
| **Manual Dashboard** | 10 menit | ❌ Manual | ✅ Perlu |

**Rekomendasi:** Gunakan **Otomasi CLI** untuk deployment lebih cepat tanpa buka dashboard!

---

## Cara 1: Otomasi CLI (2 Menit) ⭐

Deploy + konfigurasi sepenuhnya via CLI tanpa buka dashboard Cloudflare.

### Prerequisites

```bash
# Login ke Cloudflare (satu kali setup)
npx wrangler login

# Pastikan build berhasil
npm run build
```

### Step-by-Step Deployment

#### 1. Deploy Aplikasi

```bash
npm run deploy
```

Output contoh:
```
✨ Successfully deployed to https://my-app.pages.dev
```

#### 2. Configure D1 Binding (WAJIB)

```bash
npx wrangler pages bindings add d1 \
  --project-name=my-app \
  --binding=DB \
  --database=my-database
```

#### 3. Set Environment Variables

Tidak perlu buka dashboard! Via CLI:

```bash
# Email service (Resend)
npx wrangler pages secret put RESEND_API_TOKEN --project-name=my-app
# Enter value: re_your_token_here

npx wrangler pages secret put FROM_EMAIL --project-name=my-app
# Enter value: noreply@yourdomain.com

# S3 Storage (jika pakai file upload)
npx wrangler pages secret put S3_ENDPOINT --project-name=my-app
npx wrangler pages secret put S3_ACCESS_KEY_ID --project-name=my-app
npx wrangler pages secret put S3_SECRET_ACCESS_KEY --project-name=my-app
npx wrangler pages secret put S3_BUCKET_NAME --project-name=my-app

# Google OAuth (opsional)
npx wrangler pages secret put GOOGLE_CLIENT_ID --project-name=my-app
npx wrangler pages secret put GOOGLE_CLIENT_SECRET --project-name=my-app
```

#### 4. Apply Database Migrations

```bash
npm run db:migrate
```

#### 5. Verify Deployment

```bash
curl https://my-app.pages.dev/api/health
```

Expected response:
```json
{"status":"ok","db":"connected","timestamp":"2024-..."}
```

🎉 **Selesai!** Aplikasi live tanpa buka dashboard Cloudflare!

---

## Cara 2: Manual Dashboard

Jika otomasi CLI bermasalah, gunakan cara manual via Dashboard.

### Step 1: Connect GitHub

1. [Dashboard](https://dash.cloudflare.com) → Workers & Pages → **Create**
2. **Pages** → **Connect to Git**
3. Pilih repository → Configure:
   - **Project name:** `my-app`
   - **Production branch:** `main`
   - **Framework:** `SvelteKit`
   - **Build command:** `npm run build`
   - **Output:** `.svelte-kit/cloudflare`
4. **Save and Deploy**

### Step 2: Set D1 Binding

1. Project → **Settings** → **Bindings**
2. Add **D1 database binding**:
   - Variable name: `DB`
   - Database: pilih database
3. **Save**

> ⚠️ **WAJIB:** Tanpa ini aplikasi error 500!

### Step 3: Set Environment Variables

1. Settings → **Environment variables**
2. Add variables (sama dengan CLI method)

### Step 4: Redeploy

```bash
git commit --allow-empty -m "trigger deploy"
git push
```

---

## 🔄 Update Deployment

### Via CLI (Cepat)

```bash
npm run build && npm run deploy
```

### Via Git (Auto-deploy)

```bash
git add . && git commit -m "update" && git push
```

---

## 🗄️ Production Database

### Apply Migration

```bash
npm run db:migrate
```

### Verify Database

```bash
npx wrangler d1 execute DB --remote --command "SELECT * FROM users"
```

---

## 🌐 Custom Domain

1. Dashboard → Pages → Project → **Custom domains**
2. **Set up** → Enter domain
3. Follow DNS instructions

---

## 🛠️ Troubleshooting

### "D1 binding not found"

**Via CLI (Cepat):**
```bash
npx wrangler pages bindings add d1 \
  --project-name=my-app \
  --binding=DB \
  --database=my-database
```

**Via Dashboard:**
Settings → Bindings → Add D1

### "Missing environment variable"

```bash
npx wrangler pages secret put <VARIABLE_NAME> --project-name=my-app
```

### Error 500

- Check D1 binding: `npx wrangler pages bindings list --project-name=my-app`
- Check environment variables
- Check logs: `npm run logs`

---

## 📋 Commands Reference

```bash
# Deploy aplikasi
npm run deploy

# Set secret/environment variable
npx wrangler pages secret put <NAME> --project-name=my-app

# List semua secrets
npx wrangler pages secret list --project-name=my-app

# Delete secret
npx wrangler pages secret delete <NAME> --project-name=my-app

# View logs
npm run logs

# Database migrate
npm run db:migrate

# Execute SQL
npx wrangler d1 execute DB --remote --command "SELECT * FROM users"

# List projects
npx wrangler pages project list
```

---

## 📊 Monitoring

### View Logs

```bash
# Real-time logs
npm run logs

# Atau
npx wrangler pages deployment tail --project-name=my-app --format=pretty
```

### Health Check

```bash
curl https://my-app.pages.dev/api/health
```

---

## 🎉 Deployment Complete!

Aplikasi sudah live di 300+ edge locations! 🚀

| Command | Fungsi |
|---------|--------|
| `npm run deploy` | Deploy aplikasi |
| `npm run logs` | View logs |
| `npm run db:migrate` | Apply migrations |
