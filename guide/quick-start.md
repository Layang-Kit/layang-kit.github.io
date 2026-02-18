# Quick Start

Install and run in 5 minutes.

## Install

```bash
npm create layang my-app
```

Follow the prompts, then:

```bash
cd my-app
```

## Setup (One-time)

```bash
# 1. Login to Cloudflare
npx wrangler login

# 2. Create database
npx wrangler d1 create my-app-db

# 3. Copy database_id to wrangler.toml

# 4. Apply migrations
npm run db:migrate:local
```

## Run

```bash
npm run dev
```

Open browser Anda
  
## About LayangKit

**LayangKit** adalah Edge-first full-stack starter template yang dibangun dengan:

### Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [SvelteKit 2.x](https://kit.svelte.dev/) + [Svelte 5.x (Runes)](https://svelte.dev/) |
| **Database** | [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) (Schema) + [Kysely](https://kysely.dev/) (Query) |
| **Auth** | Custom Session + [Arctic](https://arcticjs.dev/) (Google OAuth) |
| **Password Hashing** | Web Crypto API (PBKDF2) - Custom Implementation |
| **Email** | [Resend](https://resend.com/) |
| **Storage** | [Cloudflare R2](https://developers.cloudflare.com/r2/) |
| **Styling** | [Tailwind CSS 4.x](https://tailwindcss.com/) |
| **Icons** | [Lucide](https://lucide.dev/) |
| **Build** | [Vite 6.x](https://vitejs.dev/) |

### Features Included

- ✅ **Authentication** - Email/Password + Google OAuth
- ✅ **Email Verification** - Verify email via Resend
- ✅ **Password Reset** - Complete forgot/reset flow
- ✅ **File Uploads** - Avatar upload + presigned URLs for R2
- ✅ **Protected Routes** - Dashboard & Profile pages
- ✅ **Dark Theme** - Beautiful "Dark Elegance" UI
- ✅ **Type Safe** - Full TypeScript support
- ✅ **100% Free Tier** - Deploy tanpa biaya

### Project Structure

```
.
├── src/
│   ├── lib/                    # Shared code
│   │   ├── auth/               # Custom session auth, password hashing (PBKDF2), Google OAuth
│   │   ├── db/                 # Drizzle schema, types, client
│   │   │   ├── schema.ts       # Database schema definition
│   │   │   └── index.ts        # DB client factory
│   │   ├── email/              # Resend email service & templates
│   │   ├── image/              # WebP image processing
│   │   └── storage/            # R2 storage helpers
│   ├── routes/                 # SvelteKit routes (file-based routing)
│   │   ├── (dashboard)/        # Protected routes group (unified pattern)
│   │   │   ├── dashboard/      # Dashboard page
│   │   │   │   ├── +page.svelte
│   │   │   │   └── +page.server.ts
│   │   │   ├── dashboard/users/# Users list (unified)
│   │   │   │   ├── +page.svelte
│   │   │   │   ├── +page.server.ts
│   │   │   │   └── +server.ts  # API endpoint (optional)
│   │   │   └── profile/        # Profile page (unified)
│   │   │       ├── +page.svelte
│   │   │       ├── +page.server.ts
│   │   │       └── +server.ts  # API endpoint (optional)
│   │   ├── api/                # Shared API endpoints only
│   │   │   ├── health/         # Health check (monitoring)
│   │   │   └── upload/         # File upload service
│   │   ├── auth/               # Auth pages & endpoints
│   │   ├── login/              # Login page
│   │   ├── register/           # Register page
│   │   └── _examples/          # Example patterns
│   ├── hooks.server.ts         # Server hooks (DB + Auth injection)
│   ├── app.css                 # Global styles (Tailwind 4)
│   └── app.html                # HTML template
├── drizzle/                    # Database migrations
├── migrations/                 # SQL migrations
├── static/                     # Static assets
├── wrangler.toml               # Cloudflare config
└── package.json
```

### Key Files to Know

| File | Purpose |
|------|---------|
| `src/lib/db/schema.ts` | Define database tables (Drizzle) |
| `src/hooks.server.ts` | Server initialization (DB, Auth) |
| `src/routes/+layout.svelte` | Root layout (navbar, etc) |
| `wrangler.toml` | Cloudflare bindings config |
| `.env` | Environment variables (secrets) |

---

[See full documentation](/guide/)
