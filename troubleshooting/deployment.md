# Deployment Issues

Masalah umum saat deploy dan solusinya.

## Build Failed

### "Cannot find module"

**Penyebab:** Import path salah atau module tidak diinstall.

**Solusi:**
```bash
# Cek semua imports
npm run check

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

### "D1 binding not found"

**Penyebab:** `database_id` tidak valid atau database belum dibuat.

**Solusi:**
1. Cek `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "my-app-db"
database_id = "xxxxx-xxxx-xxxx-xxxx-xxxx"
```

2. Verifikasi database:
```bash
npx wrangler d1 list
```

---

### Type Errors

**Solusi:**
```bash
# Fix type errors dulu
npm run check

# Lalu build ulang
npm run build
```

---

## Deploy Failed

### "Authentication error"

**Penyebab:** Belum login ke Wrangler.

**Solusi:**
```bash
npx wrangler login
```

---

### "No project found"

**Penyebab:** Project belum dibuat di Cloudflare Pages.

**Solusi:**
```bash
# Deploy akan create project otomatis
npm run deploy

# Atau create manual di dashboard
```

---

### "Build output directory not found"

**Penyebab:** Build belum dijalankan.

**Solusi:**
```bash
npm run build
npm run deploy
```

---

## App Error Setelah Deploy

### "Internal Server Error"

**Penyebab:** Runtime error di production.

**Solusi:**

1. Check logs:
```bash
npm run logs
```

2. Cek environment variables:
   - Buka Cloudflare Dashboard
   - Pages > [project] > Settings > Environment Variables
   - Pastikan semua vars terisi

---

### Database Error di Production

**Penyebab:** Production DB belum migrate.

**Solusi:**
```bash
npm run db:migrate
```

---

### "This site can't be reached"

**Penyebab:**
- Deployment masih processing
- Wrong URL
- DNS issue

**Solusi:**
1. Tunggu 2-3 menit setelah deploy
2. Cek URL di dashboard: Cloudflare Pages > [project]
3. Hard refresh: `Ctrl+Shift+R`

---

## Environment Variables Not Working

### Penyebab
Env vars hanya di-set di local (`.env`), belum di Cloudflare Dashboard.

### Solusi

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pages > [your-project] > Settings > Environment Variables
3. Tambahkan semua env vars:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `RESEND_API_TOKEN`
   - dst.

4. Re-deploy:
```bash
npm run deploy
```

---

## Preview vs Production

### Perbedaan

| Fitur | Preview | Production |
|-------|---------|------------|
| URL | `[branch].pages.dev` | `pages.dev` |
| Environment | Development | Production |
| D1 | Local | Production |

### Test Production Locally

```bash
# Build untuk production
npm run build

# Preview dengan Wrangler
npm run preview
```

---

## Rollback

Jika deploy bermasalah, rollback ke versi sebelumnya:

1. Buka Cloudflare Dashboard
2. Pages > [project] > Deployments
3. Klik versi yang ingin di-rollback
4. Click "Rollback to this version"

---

## Checklist Sebelum Deploy

- [ ] `npm run check` — no errors
- [ ] `npm run test` — all pass
- [ ] `npm run build` — success
- [ ] `npm run db:migrate` — production DB updated
- [ ] Environment variables set di Cloudflare Dashboard
- [ ] D1 database bound
- [ ] (Optional) R2 bucket bound

---

## Useful Commands

```bash
# Build dan deploy
npm run build && npm run deploy

# Check deployment logs
npm run logs

# View all deployments
npx wrangler pages deployment list

# Get deployment URL
npx wrangler pages project get
```
