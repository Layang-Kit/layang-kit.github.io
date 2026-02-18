# File Uploads Guide

Panduan upload file dan gambar dengan S3-compatible storage.

::: tip Update 🎉
Sekarang support **multiple providers**: R2, Wasabi, AWS S3, MinIO, dll!
:::

---

## 📁 Dua Jenis Upload

| Tipe | API | Use Case | Convert |
|------|-----|----------|---------|
| **Image** | `/api/upload/image` | Avatar, photos | WebP |
| **File** | `/api/upload/presign` | PDF, ZIP, DOC | - |

---

## 🖼️ Image Upload (Avatar)

### Cara Kerja

1. User pilih file (JPG, PNG, GIF, WebP)
2. Server convert ke WebP
3. Resize jika avatar (256x256)
4. Upload ke S3 storage
5. Return public URL

### Upload Avatar

Di Profile page:

1. Klik icon kamera di avatar
2. Pilih gambar dari komputer
3. Preview muncul
4. Klik "Upload Avatar"
5. Done! ✅

### Via API

```typescript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('type', 'avatar'); // atau 'general'

const res = await fetch('/api/upload/image', {
  method: 'POST',
  body: formData
});

const { url, size } = await res.json();
// url: https://cdn.example.com/avatars/user-id/timestamp.webp
```

### Image Processing

**Auto-convert ke WebP:**
- Ukuran lebih kecil (30-50%)
- Kualitas tetap baik
- Browser support modern

**Avatar (type='avatar'):**
- Square crop (center)
- Resize ke 256x256
- Quality: 90%

**General Image (type='general'):**
- Max 1920x1920
- Quality: 85%
- Maintain aspect ratio

### Validasi

- ✅ Max 5MB
- ✅ Format: JPG, PNG, GIF, WebP
- ❌ Tidak accept: SVG, BMP, TIFF

---

## 📄 File Upload (PDF, ZIP, etc)

### Cara Kerja (Presigned URL)

1. Minta presigned URL dari server
2. Upload langsung ke storage dari browser
3. Server receive confirmation

### Via API

**Step 1: Get Presigned URL**

```typescript
const res = await fetch('/api/upload/presign', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    filename: 'document.pdf',
    contentType: 'application/pdf',
    prefix: 'documents' // folder di storage
  })
});

const { uploadUrl, publicUrl } = await res.json();
```

**Step 2: Upload ke Storage**

```typescript
await fetch(uploadUrl, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': 'application/pdf' }
});
// File sekarang di storage!
```

### Allowed File Types

| Type | MIME Type |
|------|-----------|
| PDF | `application/pdf` |
| ZIP | `application/zip` |
| JSON | `application/json` |
| TXT | `text/plain` |
| CSV | `text/csv` |
| Excel | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| Word | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |

---

## 🗂️ Struktur Folder di Storage

```
bucket/
├── avatars/
│   └── {user-id}/
│       └── timestamp.webp
├── uploads/
│   └── {user-id}/
│       └── document.pdf
└── images/
    └── {user-id}/
        └── photo.webp
```

---

## 🔒 Security

### Access Control

- **Avatar:** Public URL (bisa diakses semua)
- **File upload:** Bisa di-restrict dengan presigned URL
- **Delete:** Hanya owner bisa delete file-nya sendiri

### File Validation

- Type checking via MIME type
- Extension whitelist
- Size limit

---

## 🐛 Troubleshooting Upload

| Masalah | Solusi |
|---------|--------|
| "Storage not configured" | Isi `S3_*` variables di `.env` |
| "File too large" | Compress file atau resize image |
| "Invalid file type" | Check allowed types di atas |
| "Upload failed" | Check S3 credentials di `.env` |
| "Image not showing" | Check `S3_PUBLIC_URL` benar |
| "403 Forbidden" | Bucket public access belum enable |

---

## 💡 Best Practices

### Untuk Developer

1. **Always validate** file type dan size
2. **Use unique filenames** (timestamp + random)
3. **Organize by user** atau folder
4. **Delete old files** saat update avatar

### Untuk User

1. **Compress images** sebelum upload (faster)
2. **Use WebP** jika bisa (smaller size)
3. **Avatar:** Gunakan square image untuk hasil terbaik

---

## 📁 Files Terkait

```
src/
├── lib/
│   ├── image/
│   │   └── convert.ts       # WebP conversion
│   └── storage/
│       └── s3.ts            # S3-compatible storage
└── routes/
    ├── (dashboard)/
    │   └── profile/
    │       ├── +page.svelte       # Uses /api/upload/image for avatar
    │       ├── +page.server.ts
    │       └── +server.ts
    └── api/                       # Shared upload service
        └── upload/
            ├── image/+server.ts     # Image upload (used by profile, etc)
            └── presign/+server.ts   # Presigned URL
```

**Catatan:** `/api/upload/*` adalah **shared API service** yang dipakai oleh berbagai fitur (profile, posts, dll). File upload tidak menggunakan unified pattern karena merupakan layanan shared.

---

## 📖 Lanjutan

- [Setup S3 Storage](./cloudflare-r2) - Konfigurasi R2, Wasabi, S3, dll
- [Profile Management](./profile-management)
- [Troubleshooting Upload](../troubleshooting/upload)
