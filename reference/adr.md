# Architecture Decision Records (ADR)

Dokumen ini mencatat keputusan arsitektural penting yang dibuat dalam project ini beserta alasannya.

---

## ADR-001: Session-Based Authentication vs JWT

**Status:** ✅ Accepted  
**Date:** 2024-02-01  
**Context:** Butuh sistem autentikasi yang aman dan bisa di-revoke

### Decision
Menggunakan **Session-Based Authentication** dengan Lucia Auth, bukan JWT.

### Alasan

| Aspek | Session | JWT |
|-------|---------|-----|
| **Revoke** | ✅ Bisa revoke langsung di DB | ❌ Must wait for token expire |
| **Storage** | ID only di cookie | All data di token |
| **Security** | Data di server (trusted) | Data di client (bisa di-decode) |
| **Complexity** | Simpler dengan edge functions | Butuh refresh token logic |
| **SSR** | ✅ Native support di SvelteKit | ⚠️ Need extra handling |

### Consequences
- ✅ Bisa force logout user (security incident)
- ✅ Session data bisa di-update real-time
- ✅ Tidak perlu refresh token mechanism
- ❌ Butuh database lookup tiap request (D1 sangat cepat)

---

## ADR-002: Cloudflare D1 vs PostgreSQL

**Status:** ✅ Accepted  
**Date:** 2024-02-01  
**Context:** Butuh database untuk starter kit yang simple tapi scalable

### Decision
Menggunakan **Cloudflare D1 (SQLite)** sebagai database utama.

### Alasan

**Kenapa D1:**
1. **Edge-native** - Replicated ke 300+ lokasi otomatis
2. **Zero-config** - Tidak perlu setup connection pooling
3. **SQLite compatibility** - Simple, file-based mental model
4. **Free tier generous** - 500MB storage, 5M reads/day
5. **TypeScript native** - Works dengan Cloudflare Workers

**Kenapa BUKAN PostgreSQL:**
1. Butuh connection management (PgBouncer)
2. Latency lebih tinggi (tidak di edge)
3. Setup lebih kompleks untuk starter kit
4. Biaya lebih mahal untuk small projects

### Consequences
- ✅ Deployment super simple
- ✅ Latency minimal untuk global users
- ✅ Tidak perlu managed database service
- ❌ Batasan 500MB (free tier)
- ❌ Write replication eventual consistency
- ❌ Tidak cocok untuk Big Data (>5GB)

---

## ADR-003: Server Load vs Client Fetch

**Status:** ✅ Accepted  
**Date:** 2024-02-01  
**Context:** Pattern data loading di SvelteKit

### Decision
**Prioritaskan Server Load pattern**, gunakan Client Fetch hanya untuk specific use cases.

### Pattern

```typescript
// ✅ RECOMMENDED: Server Load
// +page.server.ts
export const load = async ({ locals }) => {
  const users = await locals.db.selectFrom('users').selectAll().execute();
  return { users }; // Data di-embed di HTML
};

// +page.svelte
<script>
  let { data } = $props(); // Langsung ada, no loading state (Svelte 5)
</script>
```

```typescript
// ⚠️ AVOID: Client Fetch (kecuali perlu)
// +page.svelte
<script>
  import { onMount } from 'svelte';
  let users = [];
  
  onMount(async () => {
    const res = await fetch('/api/users'); // Extra request!
    users = await res.json();
  });
</script>

{#if users.length}
  <!-- Show data -->
{:else}
  <Loading /> <!-- Loading state needed -->
{/if}
```

### Alasan

| Server Load | Client Fetch |
|-------------|--------------|
| 1 request (HTML lengkap) | 2 request (HTML + API) |
| SEO friendly | SEO butuh extra work |
| No loading state | Loading state wajib |
| Type-safe via exports | Manual type definition |
| Works tanpa JS | JS required |

### When to Use Client Fetch
- Real-time updates (polling/WebSocket)
- Data terlalu besar untuk SSR
- User-specific data setelah interaction
- Infinite scroll / pagination client-side

---

## ADR-004: Form Actions vs API Endpoints

**Status:** ✅ Accepted  
**Date:** 2024-02-01  
**Context:** Pattern untuk handle form submission

### Decision
**Gunakan Form Actions untuk POST/PUT/DELETE**, API endpoints hanya untuk non-form operations.

### Pattern

```typescript
// ✅ RECOMMENDED: Form Actions
// +page.server.ts
export const actions = {
  register: async ({ request, locals }) => {
    const form = await request.formData();
    // Validate, process, redirect
    return { success: true };
  }
};

// +page.svelte
<form method="POST" action="?/register">
  <!-- Works tanpa JavaScript! -->
</form>
```

### Alasan
1. **Progressive Enhancement** - Works tanpa JavaScript
2. **Less Boilerplate** - No fetch code, no error handling
3. **Built-in Validation** - SvelteKit handle form data
4. **Automatic Redirect** - Built-in redirect handling
5. **Type Safety** - Form actions typed via SvelteKit

### When to Use API Endpoints (+server.ts)
- Non-JSON responses (file downloads)
- External API calls
- Webhook handlers
- Real-time data (Server-Sent Events)

---

## ADR-005: Drizzle ORM + Kysely vs Prisma

**Status:** ✅ Accepted  
**Date:** 2024-02-01  
**Updated:** 2024-02-06  
**Context:** Butuh ORM yang works dengan Cloudflare Workers

### Decision
Menggunakan **Drizzle ORM untuk schema/migrations** dan **Kysely untuk runtime queries**.

### Alasan

**Kenapa Drizzle + Kysely:**
1. **Cloudflare native** - Keduanya works tanpa edge compatibility issues
2. **Separation of concerns** - Drizzle untuk schema, Kysely untuk queries
3. **Better control** - Kysely lebih explicit, tidak ada "magic" relations
4. **Smaller bundle** - Kysely lebih lightweight dari Drizzle ORM runtime
5. **SQL-like syntax** - Familiar untuk developer SQL
6. **Type-safe** - Full TypeScript support

**Kenapa BUKAN Prisma:**
1. Butuh binary compilation untuk edge
2. Query engine harus di-bundle (size besar)
3. Connection pooling issues di Workers
4. Slower cold start

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Schema & Migrations        Runtime Queries             │
│  ┌─────────────┐           ┌─────────────┐              │
│  │   Drizzle   │           │   Kysely    │              │
│  │   Schema    │ ────────▶ │   Queries   │              │
│  │   + Kit     │           │   (D1)      │              │
│  └─────────────┘           └─────────────┘              │
│                                                           │
│  Best of both worlds!                                     │
└─────────────────────────────────────────────────────────┘
```

### Consequences
- ✅ Drizzle Kit terbaik untuk migrations
- ✅ Kysely lebih predictable untuk queries
- ✅ Smaller bundle size
- ✅ Full type safety
- ❌ Harus maintain 2 type definitions
- ❌ No "magic" relations (harus manual join)

---

## ADR-006: PBKDF2 vs bcrypt/argon2

**Status:** ✅ Accepted  
**Date:** 2024-02-01  
**Context:** Password hashing di Cloudflare Workers

### Decision
Menggunakan **PBKDF2 via Web Crypto API** untuk password hashing.

### Alasan

**Constraint:** Cloudflare Workers tidak support Node.js crypto module (bcrypt/argon2 butuh native binary).

**Solusi:** Web Crypto API (native di Workers):
- PBKDF2 dengan SHA-256
- 100,000 iterations
- Salt 16 bytes
- Output 32 bytes

### Implementasi

```typescript
// src/lib/auth/password.ts
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']
  );
  
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  
  // Format: iterations:salt:hash
  return `100000:${base64Encode(salt)}:${base64Encode(hash)}`;
}
```

### Security Analysis
- PBKDF2 masih direkomendasikan NIST
- 100,000 iterations cukup untuk 2024
- Bisa upgrade iterations tanpa breaking change

---

## ADR-007: R2 untuk File Upload vs External Storage

**Status:** ✅ Accepted  
**Date:** 2024-02-01  
**Context:** Butuh solusi file storage yang scalable

### Decision
Menggunakan **Cloudflare R2** untuk file storage.

### Alasan

**Kenapa R2:**
1. **S3-compatible** - Works dengan AWS SDK
2. **No egress fees** - Bandwidth keluar gratis (beda dengan S3!)
3. **Edge delivery** - Integrated dengan Cloudflare CDN
4. **Simple integration** - Same ecosystem dengan D1

**Flow:**
1. Server generate presigned URL (limited time access)
2. Client upload langsung ke R2 (bypass server)
3. File served via CDN (fast global delivery)

### Consequences
- ✅ Biaya bandwidth lebih murah dari S3
- ✅ Upload besar tidak bebani server
- ✅ Automatic CDN caching
- ❌ Eventually consistent (rarely an issue)

---

## ADR-008: Tailwind CSS vs Component Library

**Status:** ✅ Accepted  
**Date:** 2024-02-01  
**Context:** Styling approach untuk starter kit

### Decision
Menggunakan **Tailwind CSS** dengan custom "Dark Elegance" theme.

### Alasan

**Kenapa Tailwind:**
1. **Utility-first** - No context switching antara CSS files dan HTML
2. **Bundle size** - Purge unused styles automatically
3. **Consistent design** - Design system via config
4. **Dark mode** - Built-in support
5. **Customization** - Easy theme extension

**Design System:**
- Background: `bg-neutral-950` (true black)
- Surface: `bg-neutral-900` (soft black)
- Primary: `text-amber-500` (warm accent)
- Text: `text-neutral-100` / `text-neutral-500`

### Consequences
- ✅ Konsisten styling tanpa CSS files terpisah
- ✅ Responsive design mudah
- ✅ Bundle size optimal
- ❌ HTML bisa terlihat "crowded" dengan classes
- ❌ Learning curve untuk utility classes

---

## Summary

| ADR | Decision | Rationale |
|-----|----------|-----------|
| ADR-001 | Session Auth | Bisa revoke, simpler SSR |
| ADR-002 | D1 SQLite | Edge-native, zero-config |
| ADR-003 | Server Load | SEO, no loading states |
| ADR-004 | Form Actions | Progressive enhancement |
| ADR-005 | Drizzle ORM | Cloudflare compatible |
| ADR-006 | PBKDF2 | Web Crypto di Workers |
| ADR-007 | R2 Storage | No egress fees, S3-compatible |
| ADR-008 | Tailwind CSS | Utility-first, consistent |

---

**💡 Note:** Keputusan-keputusan ini bisa direvisit jika requirements berubah atau ada teknologi baru yang lebih baik.
