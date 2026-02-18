# Authentication Guide

Panduan menggunakan sistem authentication di aplikasi.

## 🔐 Metode Login

Aplikasi mendukung 2 metode login:

1. **Email/Password** - Register dengan email dan password
2. **Google OAuth** - Login dengan satu klik menggunakan Google

## 📧 Email/Password Auth

### Register

1. Buka `/register`
2. Isi form:
   - Name (min 2 characters)
   - Email (valid format)
   - Password (min 8, 1 uppercase, 1 number)
3. Submit
4. Check email untuk verification link
5. Click link verifikasi
6. Login di `/login`

### Password Requirements

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number
- Contoh valid: `MyP@ssw0rd`

### Forgot Password

1. Klik "Forgot password?" di halaman login
2. Masukkan email
3. Check email untuk reset link
4. Klik link dan masukkan password baru
5. Login dengan password baru

### Email Verification

**Kenapa perlu verifikasi?**
- ✅ Mencegah spam accounts
- ✅ Memastikan email valid
- ✅ Bisa reset password

**Resend Verification:**
1. Login (jika email belum verified, akan diarahkan)
2. Klik "Resend verification email"
3. Check inbox/spam

## 🔵 Google OAuth

### Login dengan Google

1. Buka `/login`
2. Klik "Continue with Google"
3. Pilih akun Google
4. Otomatis login dan redirect ke dashboard

**Keuntungan:**
- ⚡ Cepat - tidak perlu isi form
- 🔒 Aman - powered by Google security
- 📧 Otomatis verified - Google sudah verifikasi email

### Link Google ke Account Existing

Jika Anda sudah punya account dengan email yang sama:

1. Login dengan Google
2. Sistem akan link Google ke account existing
3. Next time bisa login dengan Google atau password

## 🛡️ Security Features

### Password Hashing

- Algorithm: PBKDF2 (industry standard)
- Salt: Random 16 bytes
- Iterations: 100,000
- Hash stored: salt + derived key

### Session Management

- HTTP-only cookies (tidak bisa diakses JavaScript)
- Secure flag (HTTPS only)
- Auto-expire (configurable)
- Refresh mechanism

### Rate Limiting

- Email verification: 1 menit interval
- Login attempts: Cloudflare protection
- Reset password: 1 token active per user

## 🐛 Troubleshooting Auth

| Masalah | Solusi |
|---------|--------|
| "Email already registered" | Gunakan email lain atau login |
| "Invalid email or password" | Check caps lock, atau reset password |
| "Email not verified" | Check inbox/spam untuk verification email |
| "Please use Google login" | Email ini dibuat via OAuth, login dengan Google |
| Token expired | Minta reset password baru |

## 📁 Files Terkait

```
src/
├── lib/
│   └── auth/
│       ├── session.ts        # Session management (custom)
│       ├── google.ts         # Google OAuth
│       └── password.ts       # Password hashing
└── routes/
    ├── login/
    ├── register/
    ├── forgot-password/
    ├── reset-password/
    └── auth/
        ├── login/
        ├── register/
        ├── google/
        └── verify-email/
```

## 📖 Lanjutan

- [Setup Google OAuth](./google-oauth)
- [Setup Email Verification](./resend-email)
- [Profile Management](./profile-management)
