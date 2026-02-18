# Upload Issues

Masalah umum terkait file upload dan solusinya.

## Upload Failed

### "Failed to fetch"

**Penyebab:** Network error atau API endpoint salah.

**Solusi:**

1. Cek API endpoint:
```typescript
const res = await fetch('/api/upload/image', {
  method: 'POST',
  body: formData
});
```

2. Cek CORS:
- Pastikan endpoint di `src/routes/api/upload/` bukan external API

---

### "R2_BUCKET not found"

**Penyebab:** R2 binding belum setup.

**Solusi:**

1. Buat bucket di Cloudflare R2
2. Update `wrangler.toml`:
```toml
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "my-app-storage"
```

3. Set environment variables:
```env
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
```

---

### File Too Large

**Penyebab:** File melebihi limit.

**Solusi:**

1. Check file size sebelum upload:
```typescript
if (file.size > 5 * 1024 * 1024) {  // 5MB
  alert('File too large. Max 5MB.');
  return;
}
```

2. Untuk large files, gunakan presigned URL:
```typescript
const { url } = await fetch('/api/upload/presign').then(r => r.json());
await fetch(url, { method: 'PUT', body: file });
```

---

## Image Tidak Tampil

### "Failed to load resource"

**Penyebab:** URL salah atau file tidak exists.

**Solusi:**

1. Cek URL:
```svelte
<!-- Pastikan URL lengkap -->
<img src={user.avatar} alt="Avatar" />

<!-- Atau dengan fallback -->
<img src={user.avatar || '/default-avatar.png'} alt="Avatar" />
```

2. Cek file exists di R2:
```bash
npx wrangler r2 object list my-app-storage
```

---

## WebP Conversion Failed

### Penyebab
Canvas API tidak support di server (Cloudflare Workers).

### Solusi

Conversion terjadi di client sebelum upload:
```typescript
// Di browser
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// ... draw image
canvas.toBlob((blob) => {
  // Upload blob
}, 'image/webp');
```

Atau gunakan library client-side seperti `browser-image-compression`.

---

## Presigned URL Expired

### Penyebab
URL expired (default 15 menit).

### Solusi

Generate URL baru:
```typescript
// Generate fresh URL
const { url } = await fetch('/api/upload/presign').then(r => r.json());
```

Atau perpanjang expiration:
```typescript
// server
const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 });  // 1 jam
```

---

## CORS Error

### "Access-Control-Allow-Origin"

**Penyebab:** R2 CORS policy tidak di-setup.

**Solusi:**

Set CORS policy di R2 dashboard:
1. R2 > [bucket] > Settings > CORS Policy
2. Add rule:
```json
{
  "AllowedOrigins": ["https://your-app.pages.dev"],
  "AllowedMethods": ["GET", "PUT"],
  "AllowedHeaders": ["*"]
}
```

---

## Checklist Upload

- [ ] R2 bucket created
- [ ] `wrangler.toml` has R2 binding
- [ ] Environment variables set
- [ ] CORS configured (untuk presigned URL)
- [ ] File size checked
- [ ] File type validated
