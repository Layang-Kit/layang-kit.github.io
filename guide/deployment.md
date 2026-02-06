# 🚀 Deployment Guide

Deploy aplikasi SvelteKit ke Cloudflare Pages via GitHub dalam 10 menit.

---

## 🎯 Overview

Cloudflare Pages dengan Git Integration adalah cara termudah untuk deploy:
- ✅ **Auto-deploy** - Push ke GitHub = auto deploy
- ✅ **Gratis** - Unlimited requests, 500 builds/month
- ✅ **Global CDN** - 300+ lokasi edge
- ✅ **Edge Functions** - SvelteKit SSR berjalan di edge
- ✅ **D1 Integration** - Database via Dashboard

---

## 📋 Pre-Deployment Checklist

Sebelum deploy, pastikan:

```markdown
- [ ] Project sudah di-push ke GitHub
- [ ] npm run build berhasil locally
- [ ] Database D1 sudah dibuat di Cloudflare
- [ ] Environment variables sudah disiapkan
- [ ] `wrangler.toml` ada (untuk local dev)
```

---

## 🚀 Deployment Steps (Git Integration)

### Step 1: Buat Project di Dashboard (2 menit)

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Workers & Pages → **Create application**
3. Pilih **Pages** → **Connect to Git**
4. Connect GitHub account → Pilih repository kamu
5. Configure build:
   - **Project name:** `my-app` (bebas)
   - **Production branch:** `main`
   - **Framework preset:** `SvelteKit`
   - **Build command:** `npm run build`
   - **Build output directory:** `.svelte-kit/cloudflare`

6. Click **Save and Deploy**

### Step 2: Set D1 Database Binding (WAJIB)

Setelah project terbuat:

1. Pilih project kamu → **Settings** → **Bindings**
2. Click **Add** → **D1 database bindings**
3. **Variable name:** `DB`
4. **D1 database:** Pilih database yang sudah dibuat
5. Click **Save**

::: warning ⚠️ Penting
Tanpa setting ini, aplikasi akan error 500 karena tidak bisa connect ke database!
:::

### Step 3: Set Environment Variables

1. Settings → **Environment variables**
2. Add variables (Production environment):

**Required:**
```
RESEND_API_TOKEN=re_xxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
```

**Untuk R2 (jika pakai file upload):**
```
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET_NAME=xxx
R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

**Untuk Google OAuth:**
```
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
```

### Step 4: Redeploy

1. **Deployments** tab
2. Pilih deployment terbaru → **Retry deployment**

Atau push commit baru ke GitHub:
```bash
git commit --allow-empty -m "trigger redeploy"
git push
```

🎉 **Selesai!** Aplikasi sudah online di `https://my-app.pages.dev`

---

## 🗄️ Production Database Migration

### Apply Migration ke Production

```bash
# Apply migration ke D1 production
npm run db:migrate
```

**Atau via Wrangler:**
```bash
npx wrangler d1 migrations apply DB --remote
```

### Verify Production DB

```bash
# Check tables di production
npx wrangler d1 execute DB --remote --command ".tables"
```

---

## 🌐 Custom Domain

### Setup Custom Domain

1. Dashboard → Pages → Project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter domain: `yourdomain.com`
4. Follow DNS setup instructions

### DNS Configuration

Tambahkan DNS records di domain provider:

```
Type: CNAME
Name: www
Target: my-app.pages.dev
```

Atau untuk apex domain:

```
Type: A
Name: @
Target: 192.0.2.1  (Cloudflare akan provide)
```

---

## 📋 Production Checklist

```markdown
## Pre-Launch Checklist

### Security
- [ ] Environment variables di-set di Cloudflare Dashboard
- [ ] Tidak ada secret di codebase
- [ ] HTTPS enabled (otomatis di Cloudflare)

### Database
- [ ] D1 binding di-set di Dashboard (Settings → Bindings)
- [ ] Migration applied ke production
- [ ] Seed data (jika perlu)

### Features
- [ ] Register/Login working
- [ ] OAuth callback URL updated (production)
- [ ] Email sending working (if used)
- [ ] File upload working (if used)

### Monitoring
- [ ] Analytics enabled
- [ ] Error tracking setup (optional)
```

---

## 🔧 Troubleshooting Deployment

### Error 500 Setelah Deploy

**Penyebab #1: D1 Binding Belum Di-set**

```
Solution:
1. Dashboard → Project → Settings → Bindings
2. Add D1 database binding → Variable name: DB
3. Save → Redeploy
```

**Penyebab #2: Environment Variables Belum Di-set**

```
Solution:
1. Settings → Environment variables
2. Add semua required variables
3. Redeploy
```

**Penyebab #3: Build Failed**

```bash
# Check build locally
cd guide/my-app
npm run build
```

Common issues:
- TypeScript errors → Run `npm run check`
- Missing imports → Check case sensitivity
- Node version mismatch → Set di Dashboard: Settings → Build & deployments → Build system version

### Error: "D1 binding not found"

**Cek:**
1. Sudah set binding di Dashboard? (Settings → Bindings)
2. Variable name benar? (harus `DB`)
3. Sudah redeploy setelah set binding?

### Build System Version

Jika build failed, cek build system version:

1. Dashboard → Project → Settings → Build & deployments
2. Build system version: **Version 2 (Beta)**
3. Build command: `npm run build`
4. Build output directory: `.svelte-kit/cloudflare`

---

## 🔄 Continuous Deployment

Dengan Git Integration, setiap push ke branch `main` akan otomatis deploy ke production.

### Preview Deployments

Push ke branch lain akan membuat preview deployment:
```bash
git checkout -b feature/new-page
git push origin feature/new-page
```

Preview URL: `https://feature-new-page.my-app.pages.dev`

### Deploy Hooks (Optional)

Untuk trigger deploy dari external:

1. Pages → Project → Settings → Build & deployments
2. Deploy hooks → Create deploy hook
3. Gunakan URL untuk trigger deploy:

```bash
curl -X POST https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/xxxxx
```

---

## 📝 wrangler.toml (Local Development)

File `wrangler.toml` diperlukan untuk **local development** saja. Untuk production, semua binding diatur via Dashboard.

```toml
# wrangler.toml - Untuk local development
[[d1_databases]]
binding = "DB"
database_name = "my-app-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

::: info ℹ️ Info
Untuk Git Integration deployment, `wrangler.toml` **tidak** digunakan untuk production binding. Semua binding harus di-set via Dashboard.
:::

---

## 📊 Monitoring

### Cloudflare Analytics

Dashboard → Pages → Project → Analytics

Metrics yang tersedia:
- Total requests
- Bandwidth usage
- Build duration
- Error rate

### Custom Analytics (Optional)

Tambahkan tracking script:

```svelte
<!-- src/routes/+layout.svelte -->
<svelte:head>
  <!-- Google Analytics, Plausible, dll -->
</svelte:head>
```

---

## 🎯 Production Best Practices

### 1. Environment Variables
- Jangan commit `.env`
- Gunakan Cloudflare Dashboard untuk production secrets
- Different values untuk dev vs production

### 2. Database
- Always backup sebelum migration besar
- Test migration di local dulu
- Gunakan transactions untuk data integrity

### 3. Performance
- Enable Cloudflare caching
- Optimize images (WebP, responsive)
- Minimize JavaScript bundle

### 4. Security
- HTTPS only (otomatis di Cloudflare)
- Security headers di `hooks.server.ts`:

```typescript
// src/hooks.server.ts
export const handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
};
```

---

## 🎉 Deployment Complete!

Aplikasi kamu sekarang:
- ✅ Live di internet
- ✅ Auto-deploy dari GitHub
- ✅ Dihost di 300+ edge locations
- ✅ Dapat HTTPS otomatis
- ✅ Scalable tanpa batas

### What's Next?

- [Custom Domain](./deployment#custom-domain) - Gunakan domain sendiri
- [Monitoring](./deployment#monitoring) - Track performance
- [AI-First Development](./ai-first-development) - Build fitur baru dengan AI

---

**Selamat! 🚀** Aplikasi sudah live!
