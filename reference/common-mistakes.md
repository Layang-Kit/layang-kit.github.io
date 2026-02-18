# Common Mistakes

Kesalahan umum dan cara memperbaikinya.

## Database

### ❌ Lupa Update index.ts

**Masalah:** Update `schema.ts` tapi lupa update `index.ts`.

**Error:**
```
Type error: Property 'X' does not exist on type 'Database'
```

**Solusi:**
Selalu update **KEDUA** file:
```typescript
// 1. schema.ts
export const posts = sqliteTable('posts', {
  title: text('title').notNull(),  // camelCase
});

// 2. index.ts
export interface Database {
  posts: {
    title: string;  // snake_case di Kysely!
  }
}
```

---

### ❌ Salah Case (camelCase vs snake_case)

**Masalah:** Menggunakan camelCase di Kysely query.

**Error:**
```
Column 'passwordHash' does not exist
```

**Solusi:**
```typescript
// ❌ Salah
.where('passwordHash', '=', hash)

// ✅ Benar
.where('password_hash', '=', hash)
```

---

### ❌ Lupa Generate Migration

**Masalah:** Update schema tapi tidak generate migration.

**Error:**
```
Table not found
```

**Solusi:**
```bash
npm run db:generate   # Generate migration
npm run db:migrate:local  # Apply ke local
```

---

## Authentication

### ❌ Check Auth di Page Svelte

**Masalah:** Cek auth di client-side.

**Solusi:**
Selalu cek auth di `+page.server.ts`:
```typescript
export const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  return {};
};
```

---

### ❌ Lupa Throw Redirect

**Masalah:** Return redirect instead of throw.

**Error:**
```
Redirect tidak berfungsi
```

**Solusi:**
```typescript
// ❌ Salah
return redirect(302, '/login');

// ✅ Benar
throw redirect(302, '/login');
```

---

## Forms

### ❌ Wrong Action Name

**Masalah:** Form action name tidak match.

**Error:**
```
Action 'create' not found
```

**Solusi:**
```svelte
<!-- Match dengan actions di +page.server.ts -->
<form method="POST" action="?/create">
```

```typescript
export const actions = {
  create: async (...) => { ... }  // ✅ nama harus sama
};
```

---

### ❌ Lupa formData()

**Masalah:** Tidak await request.formData().

**Error:**
```
formData is not a function
```

**Solusi:**
```typescript
export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();  // ✅ Jangan lupa await!
    const name = form.get('name');
  }
};
```

---

## Environment Variables

### ❌ Access env di Client

**Masalah:** Coba akses `process.env` di Svelte component.

**Error:**
```
process is not defined
```

**Solusi:**
Env vars hanya bisa diakses di server (`+page.server.ts`, `+server.ts`, `hooks.server.ts`).

---

### ❌ Lupa Set di Cloudflare

**Masalah:** Works di local, tapi error di production.

**Solusi:**
Set environment variables di Cloudflare Dashboard:
1. Pages > [your-project] > Settings > Environment Variables
2. Tambahkan semua vars yang diperlukan

---

## Deployment

### ❌ Lupa Migrate Production DB

**Masalah:** Deploy tapi database belum migrate.

**Error:**
```
Table 'X' does not exist
```

**Solusi:**
```bash
npm run db:migrate  # Apply ke production
```

---

### ❌ Wrong database_id

**Masalah:** `database_id` di `wrangler.toml` salah.

**Error:**
```
D1 binding not found
```

**Solusi:**
Copy exact `database_id` dari output `wrangler d1 create`.

---

## TypeScript

### ❌ Import type tanpa `type`

**Masalah:** Import type tanpa keyword `type`.

**Warning:**
```
'X' is a type and must be imported using a type-only import
```

**Solusi:**
```typescript
// ❌ Salah
import { Database } from '$lib/db';

// ✅ Benar
import type { Database } from '$lib/db';
```

---

## Svelte 5

### ❌ Mutate Props Langsung

**Masalah:** Mutate props di child component.

**Error:**
```
Cannot assign to read-only property
```

**Solusi:**
```svelte
<script>
  let { data } = $props();
  
  // ❌ Salah
  data.count = 5;
  
  // ✅ Benar: buat local state
  let count = $state(data.count);
</script>
```

---

### ❌ Lupa $ untuk Reactive

**Masalah:** Lupa prefix `$` untuk reactive values.

**Masalah:**
Value tidak update saat berubah.

**Solusi:**
```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>

<!-- ❌ Tidak reactive -->
<p>{doubled}</p>

<!-- ✅ Reactive -->
<p>{$doubled}</p>
```

---

## Checklist Sebelum Deploy

- [ ] `npm run check` — no TypeScript errors
- [ ] `npm run test` — all tests pass
- [ ] `npm run build` — build success
- [ ] `npm run db:migrate` — production DB migrated
- [ ] Environment variables set di Cloudflare Dashboard
- [ ] D1 database bound
- [ ] (Optional) R2 bucket bound

---

**Tip:** Selalu jalankan `npm run check` sebelum commit! ✅
