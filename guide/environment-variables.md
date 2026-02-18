# Environment Variables - Konfigurasi Lengkap

Panduan lengkap konfigurasi untuk LayangKit.

::: tip Perubahan Baru 🎉
Setup sudah **disederhanakan**! Tidak perlu `CLOUDFLARE_*` API token lagi - cukup `wrangler login`.
:::

---

## 📋 Dua File Konfigurasi

| File | Isi | Wajib? |
|------|-----|--------|
| `wrangler.toml` | Bindings database & storage | **YA** |
| `.env` | Secrets untuk external services | Opsional |

---

## 🔧 wrangler.toml (WAJIB)

File ini berisi **bindings** yang menghubungkan aplikasi dengan resources Cloudflare.

```toml
name = "my-app"
compatibility_date = "2024-09-23"

[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "your-database-id-here"  # ← GANTI INI!

[[r2_buckets]]
binding = "STORAGE"
bucket_name = "my-bucket"  # Opsional, untuk file upload
```

**Cara setup:**
```bash
# 1. Login
npx wrangler login

# 2. Create database
npx wrangler d1 create my-database

# 3. Copy database_id ke wrangler.toml
```

---

## 📝 .env (OPSIONAL)

File ini berisi **credentials** untuk external services. **Tidak wajib** untuk development dasar.

### 1. Copy Template

```bash
cp .env.example .env
```

### 2. Isi Sesuai Kebutuhan

| Fitur | Variables | Setup Guide |
|-------|-----------|-------------|
| **Google Login** | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | [Google OAuth](./google-oauth) |
| **Email** | `RESEND_API_TOKEN`, `FROM_EMAIL` | [Resend Email](./resend-email) |
| **File Upload** | `S3_*` | [S3 Storage](./cloudflare-r2) |

---

## 🔴 WAJIB (Sebelumnya)

::: danger DIHAPUS
Variabel berikut **tidak perlu lagi** di `.env`:

- ~~`CLOUDFLARE_ACCOUNT_ID`~~
- ~~`CLOUDFLARE_DATABASE_ID`~~
- ~~`CLOUDFLARE_API_TOKEN`~~

Alasan: Kita sekarang pakai `wrangler login` + `wrangler.toml` bindings.
:::

---

## 🟡 OPTIONAL (Fitur Tambahan)

### Google OAuth (Login dengan Google)

```env
GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxx
```

**Setup:** [Google OAuth Setup Guide](./google-oauth)

---

### Resend Email (Email Verification)

```env
RESEND_API_TOKEN=re_xxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
REPLY_TO_EMAIL=support@yourdomain.com
```

**Setup:** [Resend Email Setup](./resend-email)

---

### S3-Compatible Storage (File Upload)

::: tip Support Multiple Providers
- Cloudflare R2 (default)
- Wasabi
- AWS S3
- MinIO
- DigitalOcean Spaces
:::

**Cloudflare R2:**
```env
S3_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
S3_BUCKET_NAME=my-bucket
S3_ACCESS_KEY_ID=your_r2_access_key
S3_SECRET_ACCESS_KEY=your_r2_secret_access_key
S3_PUBLIC_URL=https://pub-<hash>.r2.dev
```

**Wasabi:**
```env
S3_ENDPOINT=https://s3.us-east-1.wasabisys.com
S3_BUCKET_NAME=my-bucket
S3_ACCESS_KEY_ID=your_wasabi_key
S3_SECRET_ACCESS_KEY=your_wasabi_secret
S3_PUBLIC_URL=https://s3.us-east-1.wasabisys.com/my-bucket
S3_REGION=us-east-1
```

**Setup:** [S3 Storage Setup](./cloudflare-r2)

---

## 📝 Contoh .env Lengkap

```bash
# ============================================================================
# OPTIONAL - Google Login
# ============================================================================
GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxx

# ============================================================================
# OPTIONAL - Email Verification
# ============================================================================
RESEND_API_TOKEN=re_xxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
REPLY_TO_EMAIL=support@yourdomain.com

# ============================================================================
# OPTIONAL - File Upload (S3-compatible)
# ============================================================================
S3_ENDPOINT=https://<account_id>.r2.cloudfloreststorage.com
S3_BUCKET_NAME=my-bucket
S3_ACCESS_KEY_ID=abc123...
S3_SECRET_ACCESS_KEY=xyz789...
S3_PUBLIC_URL=https://pub-abc123.r2.dev
```

---

## 🔒 Keamanan

### Jangan pernah:

- ❌ Commit `.env` ke git (sudah di `.gitignore`)
- ❌ Share API token di chat/email
- ❌ Hardcode credentials di code

### Best Practices:

- ✅ Gunakan `.env.example` untuk template
- ✅ Rotate API tokens secara berkala
- ✅ Gunakan token dengan permission minimal
- ✅ Different tokens untuk dev dan production

---

## 🚀 Production Deployment

### Environment Variables di Cloudflare Pages

Untuk production, secrets di-set via Dashboard (bukan `.env`):

1. Dashboard → Pages → Your Project → Settings → Functions → Environment Variables
2. Add variables yang diperlukan

### Bindings di Cloudflare Pages

Bindings (`wrangler.toml`) perlu di-bind manual di Dashboard:

1. Dashboard → Pages → Your Project → Settings → Bindings
2. D1 Database → Bind dengan nama "DB"
3. R2 Buckets → Bind dengan nama "STORAGE" (opsional)

---

## 🐛 Common Issues

| Error | Penyebab | Solusi |
|-------|----------|--------|
| "D1 binding not found" | `database_id` salah | Check `wrangler.toml` |
| "Storage not configured" | `.env` S3 credentials kosong | Isi `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, dll |
| "Email not sent" | `RESEND_API_TOKEN` salah | Verifikasi token di Resend dashboard |
| "Invalid OAuth redirect" | Redirect URI belum didaftarkan | Tambahkan di Google Cloud Console |

---

## 📚 Lanjutan

- [Quick Start](./quick-start) - Setup 5 menit
- [Deployment](./deployment) - Deploy ke production
