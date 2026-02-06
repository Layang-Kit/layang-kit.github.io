# SvelteKit Data Patterns

Best practices untuk data loading dan form submission di SvelteKit dengan **Kysely**.

## 📊 Perbandingan Pattern

| Pattern | Request | SEO | JS Required | Use Case |
|---------|---------|-----|-------------|----------|
| **API + Fetch** | 2 | ❌ | ✅ | Jangan dipakai |
| **Server Load** | 1 | ✅ | ❌ | GET data |
| **Form Actions** | 1 | ✅ | ❌ | POST/PUT/DELETE |

---

## 🔧 Kysely Query Builder

Project ini menggunakan **Kysely** untuk database queries. Berikut pattern yang umum digunakan:

### Select
```typescript
// Select all
const users = await locals.db
  .selectFrom('users')
  .selectAll()
  .execute();

// Select with filter
const user = await locals.db
  .selectFrom('users')
  .where('email', '=', email)
  .selectAll()
  .executeTakeFirst();

// Select specific columns
const names = await locals.db
  .selectFrom('users')
  .select(['id', 'name', 'email'])
  .execute();

// Select with join
const postsWithAuthor = await locals.db
  .selectFrom('posts')
  .innerJoin('users', 'posts.author_id', 'users.id')
  .where('posts.published', '=', 1)
  .select(['posts.title', 'users.name as author_name'])
  .execute();
```

### Insert
```typescript
// Insert single
await locals.db
  .insertInto('users')
  .values({
    id: crypto.randomUUID(),
    email: 'user@example.com',
    name: 'John Doe',
    provider: 'email',
    created_at: Date.now()
  })
  .execute();

// Insert and return
const newUser = await locals.db
  .insertInto('users')
  .values({ id, email, name })
  .returningAll()
  .executeTakeFirst();
```

### Update
```typescript
await locals.db
  .updateTable('users')
  .set({
    name: 'New Name',
    updated_at: Date.now()
  })
  .where('id', '=', userId)
  .execute();
```

### Delete
```typescript
await locals.db
  .deleteFrom('sessions')
  .where('user_id', '=', userId)
  .execute();
```

---

## ✅ Pattern 1: Server Load (Recommended untuk GET)

### Kapan Menggunakan?

- Load data untuk halaman
- Query database
- Tidak perlu loading state

### Contoh

**+page.server.ts**
```typescript
export const load = async ({ locals }) => {
  // Query langsung di server dengan Kysely
  const users = await locals.db
    .selectFrom('users')
    .selectAll()
    .execute();
  
  return { users }; // Data ke page
};
```

**+page.svelte**
```svelte
<script>
  let { data } = $props(); // Auto-populated! (Svelte 5)
</script>

{#each data.users as user}
  <UserCard {user} />
{/each}
```

### Keuntungan

- ✅ 1 request saja
- ✅ SEO friendly (HTML lengkap)
- ✅ No loading state needed
- ✅ Type-safe

### Contoh di Project

- `/dashboard` - Load user data
- `/profile` - Load profile info
- `/_examples/server-load-example` - Demo lengkap

---

## ✅ Pattern 2: Form Actions (Recommended untuk POST)

### Kapan Menggunakan?

- Form submission
- Create/update/delete data
- Works tanpa JavaScript!

### Contoh

**+page.server.ts**
```typescript
export const actions = {
  createUser: async ({ request, locals }) => {
    const form = await request.formData();
    const name = form.get('name') as string;
    
    // Validate
    if (!name) {
      return fail(400, { error: 'Name required' });
    }
    
    // Process with Kysely
    await locals.db
      .insertInto('users')
      .values({
        id: crypto.randomUUID(),
        name,
        provider: 'email',
        created_at: Date.now()
      })
      .execute();
    
    return { success: true };
  }
};
```

**+page.svelte**
```svelte
<form method="POST" action="?/createUser">
  <input name="name" />
  <button type="submit">Create</button>
</form>
```

### Progressive Enhancement

Tambahkan JavaScript untuk UX lebih baik:

```svelte
<script>
  let { form } = $props();
  let loading = $state(false);
</script>

<form 
  method="POST" 
  action="?/createUser"
  use:enhance={() => {
    // Called saat submit
    loading = true;
    
    return async ({ result, update }) => {
      // Called saat response
      loading = false;
      if (result.type === 'success') {
        update(); // Reset form
      }
    };
  }}
>
  <input name="name" />
  <button type="submit" disabled={loading}>
    {loading ? 'Creating...' : 'Create'}
  </button>
</form>
```

### Keuntungan

- ✅ Works tanpa JavaScript
- ✅ 1 request
- ✅ No API endpoint needed
- ✅ Secure (logic di server)

### Contoh di Project

- `/register` - Create user
- `/login` - Login user
- `/_examples/form-actions-example` - Demo lengkap

---

## ❌ Pattern: API + Fetch (Anti-pattern)

### Jangan Lakukan Ini

**+server.ts** (Jangan buat!)
```typescript
export const GET = async () => {
  const users = await locals.db
    .selectFrom('users')
    .selectAll()
    .execute();
  return json({ users });
};
```

**+page.svelte** (Jangan lakukan!)
```svelte
<script>
  let users = $state([]);
  
  onMount(async () => {
    const res = await fetch('/api/users'); // ❌ 2 request!
    users = await res.json();
  });
</script>
```

### Masalah

- ❌ 2 request (page + API)
- ❌ Perlu loading state
- ❌ SEO kurang baik
- ❌ Flash of unauthenticated content

---

## 🔄 When to Use API Routes?

API routes (`+server.ts`) tetap berguna untuk:

- **External API** - Webhooks, third-party integrations
- **Mobile apps** - REST API untuk mobile
- **Internal services** - Service-to-service communication
- **File uploads** - Large file streaming

Contoh dengan Kysely:

```typescript
// src/routes/api/users/+server.ts
export const GET: RequestHandler = async ({ locals }) => {
  const users = await locals.db
    .selectFrom('users')
    .selectAll()
    .execute();
  return json(users);
};

export const POST: RequestHandler = async ({ request, locals }) => {
  const body = await request.json();
  
  const newUser = await locals.db
    .insertInto('users')
    .values(body)
    .returningAll()
    .executeTakeFirst();
  
  return json(newUser, { status: 201 });
};
```

Tapi untuk internal SvelteKit pages, gunakan **Server Load** atau **Form Actions**!

---

## 📁 Contoh Files di Project

```
src/routes/
├── _examples/
│   ├── server-load-example/      # Demo Server Load dengan Kysely
│   │   ├── +page.server.ts
│   │   └── +page.svelte
│   └── form-actions-example/     # Demo Form Actions dengan Kysely
│       ├── +page.server.ts
│       └── +page.svelte
```

---

## 🆚 Drizzle vs Kysely Syntax

### Drizzle (Old - tidak dipakai lagi)
```typescript
// Select
const users = await locals.db.query.users.findMany();

// Insert
await locals.db.insert(users).values({ name });

// Update
await locals.db.update(users).set({ name }).where(eq(users.id, id));

// Delete
await locals.db.delete(users).where(eq(users.id, id));
```

### Kysely (Current ✅)
```typescript
// Select
const users = await locals.db
  .selectFrom('users')
  .selectAll()
  .execute();

// Insert
await locals.db
  .insertInto('users')
  .values({ name })
  .execute();

// Update
await locals.db
  .updateTable('users')
  .set({ name })
  .where('id', '=', id)
  .execute();

// Delete
await locals.db
  .deleteFrom('users')
  .where('id', '=', id)
  .execute();
```

---

## 📖 Resources

- [SvelteKit Load Docs](https://kit.svelte.dev/docs/load)
- [SvelteKit Form Actions](https://kit.svelte.dev/docs/form-actions)
- [Progressive Enhancement](https://kit.svelte.dev/docs/form-actions#progressive-enhancement)
- [Kysely Documentation](https://kysely.dev/)
