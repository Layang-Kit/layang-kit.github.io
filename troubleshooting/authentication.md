# Authentication Issues

Masalah umum terkait authentication dan solusinya.

## "Cannot read properties of undefined (reading 'user')"

### Penyebab
`locals.user` undefined karena session tidak valid.

### Solusi

Cek auth di `+page.server.ts`:
```typescript
export const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  return { user: locals.user };
};
```

---

## Redirect Tidak Berfungsi

### Penyebab
Lupa `throw` redirect.

### Solusi

```typescript
// ❌ Salah
return redirect(302, '/login');

// ✅ Benar
throw redirect(302, '/login');
```

---

## Session Tidak Persist

### Penyebab
- Cookie tidak di-set
- Cookie expired

### Solusi

1. Cek hooks.server.ts inject auth:
```typescript
const { user, session } = await validateSession(sessionId);
locals.user = user;
locals.session = session;
```

2. Cek cookie config:
```typescript
// lib/auth/session.ts
cookies.set('auth_session', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 30  // 30 days
});
```

---

## "Invalid credentials"

### Penyebab
- Email/password salah
- User tidak ada
- Password hash tidak match

### Debug

```typescript
// Log untuk debug (hapus di production)
console.log('Input password:', password);
console.log('Stored hash:', user.password_hash);

const valid = await verifyPassword(password, user.password_hash);
console.log('Valid:', valid);
```

---

## Google OAuth Error

### "redirect_uri_mismatch"

**Penyebab:** Redirect URI di Google Cloud tidak match.

**Solusi:**
1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services > Credentials
3. Edit OAuth 2.0 Client
4. Tambahkan Authorized Redirect URI:
   - `http://localhost:5173/auth/google/callback` (dev)
   - `https://your-app.pages.dev/auth/google/callback` (prod)

### "invalid_client"

**Penyebab:** `GOOGLE_CLIENT_ID` atau `GOOGLE_CLIENT_SECRET` salah.

**Solusi:**
1. Cek env vars di `.env`
2. Cek env vars di Cloudflare Dashboard (production)

---

## Email Verification Tidak Terkirim

### Penyebab
- Resend belum setup
- Domain belum verified
- API token salah

### Solusi

1. Cek Resend dashboard:
   - Domain verified?
   - API token aktif?

2. Cek env vars:
```env
RESEND_API_TOKEN=re_xxx
FROM_EMAIL=noreply@yourdomain.com
```

3. Test manual:
```typescript
// +page.server.ts
import { sendVerificationEmail } from '$lib/email/resend';

// Test send
await sendVerificationEmail('test@example.com', 'token-xxx');
```

---

## Password Reset Link Expired

### Penyebab
- Token expired (default 1 jam)
- Token sudah digunakan

### Solusi

Generate token baru:
```typescript
// Perpanjang expiration
expiresAt: Date.now() + 1000 * 60 * 60 * 24  // 24 jam
```

---

## Protected Route Bisa Diakses Tanpa Login

### Penyebab
Lupa cek auth di `+page.server.ts`.

### Solusi

Buat layout group dengan auth check:
```typescript
// (dashboard)/+layout.server.ts
export const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  return { user: locals.user };
};
```

---

## User Role Tidak Diterapkan

### Solusi

Cek role di load function:
```typescript
export const load = async ({ locals }) => {
  if (!locals.user?.is_admin) {
    throw redirect(302, '/dashboard');
  }
  return {};
};
```

---

## Checklist Auth

- [ ] Session cookie di-set dengan benar
- [ ] `hooks.server.ts` inject `locals.user`
- [ ] Protected routes cek auth di `+page.server.ts`
- [ ] Google OAuth redirect URI benar
- [ ] Env vars set di local dan production
