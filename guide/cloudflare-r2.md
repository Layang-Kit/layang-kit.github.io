# S3-Compatible Storage Setup

Panduan lengkap untuk setup file upload dengan S3-compatible storage (R2, Wasabi, AWS S3, MinIO, dll).

::: tip Update Baru 🎉
Sekarang support **multiple providers**! Tidak hanya Cloudflare R2, tapi juga Wasabi, AWS S3, MinIO, dan lainnya.
:::

---

## 📋 Overview

Storage menggunakan **S3-compatible API** untuk:
- Upload file langsung dari browser (presigned URLs)
- Upload via server
- CDN delivery

### Supported Providers

| Provider | Endpoint Example | Free Tier |
|----------|------------------|-----------|
| **Cloudflare R2** | `https://<account>.r2.cloudflarestorage.com` | 10 GB |
| **Wasabi** | `https://s3.wasabisys.com` | - |
| **AWS S3** | `https://s3.<region>.amazonaws.com` | 5 GB |
| **MinIO** | `http://localhost:9000` | Self-hosted |
| **DigitalOcean Spaces** | `https://<region>.digitaloceanspaces.com` | - |

---

## 🚀 Setup Cloudflare R2 (Default)

### 1. Buka Cloudflare Dashboard

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pilih account Anda
3. Di sidebar, klik **"R2"**

### 2. Create Bucket

1. Klik tombol **"Create bucket"**
2. Masukkan **Bucket name**:
   - Gunakan nama unik (contoh: `myapp-uploads-2024`)
   - Hanya lowercase, numbers, dan hyphens
   - Min 3, max 63 characters
3. Klik **"Create bucket"**

### 3. Enable Public Access (Optional)

Jika file perlu diakses publik (seperti avatar):

1. Klik bucket yang sudah dibuat
2. Tab **"Settings"**
3. Di bagian **"Public Access"**, klik **"Allow"**
4. Catat **Public URL** (contoh: `https://pub-abc123.r2.dev`)

### 4. Create API Token

1. Di sidebar R2, klik **"Manage R2 API Tokens"**
2. Klik **"Create API Token"**
3. Pilih permissions:
   - **Object Read & Write** ✅
4. Pilih bucket: **Specific buckets** → pilih bucket Anda
5. Klik **"Create API Token"**

**Simpan informasi ini:**
```
Access Key ID:     abc123def456...
Secret Access Key: xyz789ghi012...
```

> **Penting:** Secret Access Key hanya ditampilkan sekali!

### 5. Konfigurasi .env

```env
S3_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
S3_BUCKET_NAME=my-bucket
S3_ACCESS_KEY_ID=your_r2_access_key
S3_SECRET_ACCESS_KEY=your_r2_secret_access_key
S3_PUBLIC_URL=https://pub-<hash>.r2.dev
S3_REGION=auto
```

---

## 🚀 Setup Wasabi

### 1. Create Account & Bucket

1. Buat akun di [Wasabi](https://wasabi.com)
2. Create bucket di console

### 2. Get Access Keys

1. Console → Access Keys
2. Create new key
3. Copy Access Key ID dan Secret

### 3. Konfigurasi .env

```env
S3_ENDPOINT=https://s3.us-east-1.wasabisys.com
S3_BUCKET_NAME=my-bucket
S3_ACCESS_KEY_ID=your_wasabi_access_key
S3_SECRET_ACCESS_KEY=your_wasabi_secret_key
S3_PUBLIC_URL=https://s3.us-east-1.wasabisys.com/my-bucket
S3_REGION=us-east-1
```

---

## 🚀 Setup AWS S3

### 1. Create Bucket

1. AWS Console → S3 → Create bucket
2. Enable public access jika diperlukan

### 2. Get Access Keys

1. IAM → Users → Create user
2. Attach policy: `AmazonS3FullAccess`
3. Create Access Key

### 3. Konfigurasi .env

```env
S3_ENDPOINT=https://s3.ap-southeast-1.amazonaws.com
S3_BUCKET_NAME=my-bucket
S3_ACCESS_KEY_ID=your_aws_access_key
S3_SECRET_ACCESS_KEY=your_aws_secret_key
S3_PUBLIC_URL=https://my-bucket.s3.ap-southeast-1.amazonaws.com
S3_REGION=ap-southeast-1
```

---

## 🚀 Setup MinIO (Self-hosted)

### 1. Install MinIO

```bash
docker run -p 9000:9000 -p 9001:9001 \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  minio/minio server /data --console-address ":9001"
```

### 2. Create Bucket

1. Buka http://localhost:9001
2. Login dengan credentials
3. Create bucket

### 3. Get Access Keys

1. Console → Access Keys
2. Create access key

### 4. Konfigurasi .env

```env
S3_ENDPOINT=http://localhost:9000
S3_BUCKET_NAME=my-bucket
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin
S3_PUBLIC_URL=http://localhost:9000/my-bucket
S3_REGION=us-east-1
```

---

## 🔧 Konfigurasi di Project

### 1. Update .env

Pilih salah satu provider di atas dan isi `.env`:

```bash
cp .env.example .env
# Edit .env dengan credentials Anda
```

### 2. Wrangler.toml Binding (R2 Only)

::: warning Khusus Cloudflare R2
Binding `[[r2_buckets]]` hanya untuk R2. Untuk provider lain (Wasabi, S3, MinIO), tidak perlu binding ini.
:::

```toml
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "my-bucket"
```

---

## 🧪 Testing

### Test Upload via Aplikasi

1. Jalankan aplikasi:
```bash
npm run dev
```

2. Login ke aplikasi
3. Buka Profile page
4. Upload avatar
5. Check browser console untuk URL gambar

---

## 📁 Struktur Folder di Storage

Recommended structure:

```
bucket/
├── avatars/
│   └── {user-id}/
│       └── avatar.webp
├── uploads/
│   └── {user-id}/
│       ├── document.pdf
│       └── image.png
└── images/
    └── {user-id}/
        └── photo.webp
```

Sudah diimplementasikan di:
- `src/lib/storage/s3.ts` - function `generateFileKey()`
- `src/routes/api/upload/image/+server.ts`

---

## 🔒 Security Best Practices

### 1. Restrict CORS (Opsional)

Di bucket settings, tambahkan CORS policy:
```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }
]
```

### 2. Access Control

- **Jangan** share Access Key dan Secret
- Gunakan **Least Privilege** - hanya permission yang dibutuhkan
- Rotate keys secara berkala

---

## 💰 Pricing Comparison

| Provider | Storage | Egress | Free Tier |
|----------|---------|--------|-----------|
| **Cloudflare R2** | $0.015/GB | **FREE** 🎉 | 10 GB |
| **Wasabi** | $6.99/TB | Free | - |
| **AWS S3** | $0.023/GB | $0.09/GB | 5 GB |

---

## ⚠️ Troubleshooting

### "Storage not configured"

**Penyebab:** `.env` belum diisi atau variabel salah

**Solusi:**
```env
# Pastikan semua variabel terisi
S3_ENDPOINT=https://xxx.r2.cloudflarestorage.com
S3_BUCKET_NAME=my-bucket
S3_ACCESS_KEY_ID=xxx
S3_SECRET_ACCESS_KEY=xxx
```

### "The Access Key ID you provided does not exist"

**Penyebab:**
- Access Key salah
- Key sudah di-delete
- Key expired

**Solusi:** Buat API Token baru di dashboard provider.

### "NoSuchBucket"

**Penyebab:** Bucket name salah

**Solusi:**
```env
# Salah
S3_BUCKET_NAME=https://pub-xxx.r2.dev

# Benar
S3_BUCKET_NAME=my-bucket-name
```

### "Upload failed: 403 Forbidden"

**Penyebab:** Token tidak punya permission write

**Solusi:** Check API Token permissions, pastikan "Object Read & Write" ✅

### Image tidak muncul setelah upload

**Penyebab:**
1. Bucket tidak public
2. `S3_PUBLIC_URL` salah

**Solusi:**
1. Check bucket Settings → Public Access
2. Check `S3_PUBLIC_URL` di .env

---

## 🔗 Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Wasabi Documentation](https://wasabi.com/wp-content/uploads/2021/06/Wasabi_API_Guide.pdf)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [MinIO Documentation](https://min.io/docs/)

---

**Setelah setup selesai, aplikasi bisa upload file dan images ke storage!** 🎉
