# Common Mistakes & How to Avoid Them

Kesalahan umum yang sering dilakukan pemula dan solusinya.

---

## 🗄️ Database Mistakes

### 1. Lupa Jalankan Migration

**❌ Kesalahan:**
```bash
npm run dev
# Error: table users has no column named bio
```

**✅ Solusi:**
```bash
# Selalu jalankan setelah pull/update
npm run db:migrate:local
```

**💡 Tips:**
- Tambahkan ke pre-start script
- Check `drizzle/` folder untuk migrasi baru

---

### 2. Schema di Code ≠ Schema di Database

**❌ Kesalahan:**
```typescript
// schema.ts - sudah update
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  phone: text('phone'), // Kolom baru
});
```

```bash
# Tapi database masih lama
Error: table users has no column named phone
```

**✅ Solusi:**
```bash
# 1. Generate migration
npm run db:generate

# 2. Apply migration
npm run db:migrate:local
```

---

### 3. Query di Browser (Client-Side)

**❌ Kesalahan:**
```svelte
<script>
  // JANGAN: Query DB di browser!
  import { db } from '$lib/db';
  
  const users = await db.selectFrom('users').selectAll().execute(); // ❌ Error: db not defined
</script>
```

**✅ Solusi (Server Load):**
```typescript
// +page.server.ts
export const load = async ({ locals }) => {
  const users = await locals.db.selectFrom('users').selectAll().execute();
  return { users };
};
```

```svelte
<script>
  export let data; // Data dari server
</script>
```

---

## 🔐 Authentication Mistakes

### 4. Check Auth di Client-Side Saja

**❌ Kesalahan:**
```svelte
<script>
  let isLoggedIn = localStorage.getItem('token'); // Bisa di-hack!
</script>

{#if isLoggedIn}
  <SecretData />
{/if}
```

**✅ Solusi:**
```typescript
// +page.server.ts
export const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }
  return { user: locals.user };
};
```

---

### 5. Lupa Validate Input

**❌ Kesalahan:**
```typescript
export const actions = {
  register: async ({ request }) => {
    const form = await request.formData();
    const email = form.get('email');
    // Langsung insert tanpa validate!
    await db.insert(users).values({ email });
  }
};
```

**✅ Solusi:**
```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const actions = {
  register: async ({ request }) => {
    const form = await request.formData();
    const data = Object.fromEntries(form);
    
    const result = schema.safeParse(data);
    if (!result.success) {
      return fail(400, { errors: result.error.flatten() });
    }
    
    // Now safe to insert
    await db.insert(users).values(result.data);
  }
};
```

---

## 🎨 Frontend Mistakes

### 6. Dynamic Type di Input dengan bind:value

**❌ Kesalahan:**
```svelte
<input 
  type={showPassword ? 'text' : 'password'}
  bind:value={password}
/>
<!-- Error: 'type' attribute cannot be dynamic -->
```

**✅ Solusi:**
```svelte
{#if showPassword}
  <input type="text" bind:value={password} />
{:else}
  <input type="password" bind:value={password} />
{/if}
```

---

### 7. Access DOM Sebelum Mount

**❌ Kesalahan:**
```svelte
<script>
  let inputElement;
  inputElement.focus(); // ❌ undefined!
</script>

<input bind:this={inputElement} />
```

**✅ Solusi:**
```svelte
<script>
  import { onMount } from 'svelte';
  let inputElement;
  
  onMount(() => {
    inputElement.focus(); // ✅ Safe
  });
</script>

<input bind:this={inputElement} />
```

---

### 8. onMount untuk Server Data

**❌ Kesalahan:**
```svelte
<script>
  import { onMount } from 'svelte';
  let users = [];
  
  onMount(async () => {
    const res = await fetch('/api/users');
    users = await res.json();
  });
</script>

{#each users as user}
  <p>{user.name}</p>
{/each}
```

**Masalah:**
- User lihat blank dulu
- SEO jelek (no HTML content)
- Extra API call

**✅ Solusi (Server Load):**
```typescript
// +page.server.ts
export const load = async ({ locals }) => {
  const users = await locals.db.selectFrom('users').selectAll().execute();
  return { users };
};
```

```svelte
<script>
  export let data;
</script>

{#each data.users as user}
  <p>{user.name}</p>
{/each}
```

---

## ⚡ Performance Mistakes

### 9. Load Semua Data Sekaligus

**❌ Kesalahan:**
```typescript
export const load = async ({ locals }) => {
  const posts = await locals.db.selectFrom('posts').selectAll().execute();
  // 10,000 posts! Browser crash!
  return { posts };
};
```

**✅ Solusi (Pagination):**
```typescript
export const load = async ({ locals, url }) => {
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;
  
  const posts = await locals.db
    .selectFrom('posts')
    .limit(limit)
    .offset(offset)
    .selectAll()
    .execute();
  
  return { posts, page };
};
```

---

### 10. Tidak Pakai Key di Each Block

**❌ Kesalahan:**
```svelte
{#each items as item}
  <Item data={item} />
{/each}
```

**✅ Solusi:**
```svelte
{#each items as item (item.id)}
  <Item data={item} />
{/each}
```

**Kenapa:**
- Svelte bisa track item individual
- Re-render lebih efisien
- Animasi/transition lebih smooth

---

## 🔧 Environment & Deployment

### 11. Commit .env ke Git

**❌ Kesalahan:**
```bash
git add .
git commit -m "update"
# .env ikut ter-commit! API keys exposed!
```

**✅ Solusi:**
```bash
# .env sudah di .gitignore

# Commit template saja
git add .env.example
git commit -m "update"
```

---

### 12. Hardcode API Keys di Code

**❌ Kesalahan:**
```typescript
const API_KEY = 'sk-abc123xyz'; // ❌ Jangan!
```

**✅ Solusi:**
```typescript
const API_KEY = import.meta.env.VITE_API_KEY;
// Atau untuk server:
const API_KEY = process.env.API_KEY;
```

---

### 13. Lupa Set Environment Variables di Production

**❌ Kesalahan:**
```bash
npm run deploy
# Error: CLOUDFLARE_ACCOUNT_ID is not defined
```

**✅ Solusi:**
```bash
# Dashboard Cloudflare → Pages → Project → Settings → Functions
# Add Environment Variables disana
```

---

## 📋 Debug Checklist

### Saat Error Terjadi:

- [ ] Check console error message
- [ ] Check Network tab (DevTools)
- [ ] Check server logs (terminal)
- [ ] Database migration sudah dijalankan?
- [ ] Environment variables sudah di-set?
- [ ] Coba hard refresh (Ctrl+F5)
- [ ] Coba restart dev server
- [ ] Check `wrangler.toml` config
- [ ] Check `drizzle.config.ts` config

### Debug Commands:

```bash
# Check database tables
npx wrangler d1 execute DB --local --command ".tables"

# Check table structure
npx wrangler d1 execute DB --local --command "PRAGMA table_info(users)"

# Check data
npx wrangler d1 execute DB --local --command "SELECT * FROM users LIMIT 5"

# Health check
curl http://localhost:5173/api/health
```

---

## 🎓 Learning Path

### Level 1: Beginner
- [ ] Pahami file-based routing
- [ ] Kuasai Server Load pattern
- [ ] Bisa setup database

### Level 2: Intermediate
- [ ] Pahami Form Actions
- [ ] Bisa handle authentication
- [ ] Understand reactive statements

### Level 3: Advanced
- [ ] Optimasi performance
- [ ] Security hardening
- [ ] Custom schema modifications

---

**💡 Remember:** Setiap expert pernah jadi beginner. Keep learning! 🚀
