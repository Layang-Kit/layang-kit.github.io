# Creating New Features

Best practices untuk menambahkan fitur baru di LayangKit.

---

## Overview

LayangKit menggunakan pola **Server-First** di mana data di-fetch di server dan di-embed langsung ke HTML. Ini memberikan:

- ⚡ **No Loading States** - Data langsung ada saat page load
- 🔒 **Secure** - Database query di server, bukan di browser
- 🎯 **SEO Friendly** - HTML lengkap dengan data

---

## 1. Define Database Schema

Tambahkan table baru di `src/lib/db/schema.ts`:

```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { users } from './schema'; // import existing tables

// Example: Posts table
export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  published: integer('published', { mode: 'boolean' }).default(false),
  authorId: text('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'number' }).$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at', { mode: 'number' }).$defaultFn(() => Date.now())
});

// Define relations
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  })
}));
```

### Generate Migration

```bash
npm run db:generate
```

### Apply Migration

```bash
# Local
npm run db:migrate:local

# Production
npm run db:migrate
```

---

## 2. Create Protected Route

Buat folder baru di `src/routes/(dashboard)/` untuk halaman yang memerlukan login:

```
src/routes/(dashboard)/
├── posts/
│   ├── +page.svelte      # Page UI
│   ├── +page.server.ts   # Server load & actions
│   └── +page.ts          # Client-side load (optional)
```

### Server Load (`+page.server.ts`)

Pattern **Server Load** untuk fetch data di server:

```typescript
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  // Check authentication
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  // Query dari database via Kysely (locals.db)
  const userPosts = await locals.db
    .selectFrom('posts')
    .selectAll()
    .where('user_id', '=', locals.user.id)
    .orderBy('created_at', 'desc')
    .execute();

  // Return data → tersedia di +page.svelte via `data` prop
  return {
    posts: userPosts
  };
};
```

### Form Actions (`+page.server.ts`)

Tambahkan **Form Actions** untuk handle form submission:

```typescript
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().default(false)
});

export const actions: Actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(401, { error: 'Unauthorized' });
    }

    const formData = await request.formData();
    
    const result = createPostSchema.safeParse({
      title: formData.get('title'),
      content: formData.get('content'),
      published: formData.get('published') === 'on'
    });

    if (!result.success) {
      return fail(400, { 
        error: 'Validation failed',
        issues: result.error.issues 
      });
    }

    // Insert ke database via Kysely
    await locals.db
      .insertInto('posts')
      .values({
        id: crypto.randomUUID(),
        user_id: locals.user.id,
        title: result.data.title,
        content: result.data.content,
        published: result.data.published ? 1 : 0,
        created_at: Date.now(),
        updated_at: Date.now()
      })
      .execute();

    return { success: true };
  },

  delete: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(401, { error: 'Unauthorized' });
    }

    const formData = await request.formData();
    const postId = formData.get('postId') as string;

    // Verify ownership before delete
    const post = await locals.db
      .selectFrom('posts')
      .select('user_id')
      .where('id', '=', postId)
      .executeTakeFirst();

    if (!post || post.user_id !== locals.user.id) {
      return fail(403, { error: 'Forbidden' });
    }

    await locals.db
      .deleteFrom('posts')
      .where('id', '=', postId)
      .execute();

    return { success: true };
  }
};
```

### Page Component (`+page.svelte`)

Gunakan **Svelte 5 Runes** untuk reactivity:

```svelte
<script lang="ts">
  import type { PageProps } from './$types';
  import { enhance } from '$app/forms';
  
  let { data, form }: PageProps = $props();
  
  // Local state
  let isCreating = $state(false);
  let showDeleteModal = $state(false);
  let selectedPost = $state<string | null>(null);
</script>

<div class="container mx-auto p-6">
  <h1 class="text-2xl font-bold mb-6">My Posts</h1>
  
  <!-- Create Post Form -->
  <form 
    method="POST" 
    action="?/create"
    use:enhance={() => {
      isCreating = true;
      return async ({ update }) => {
        await update();
        isCreating = false;
      };
    }}
    class="mb-8 p-4 border border-gray-800 rounded-lg"
  >
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Title</label>
      <input 
        type="text" 
        name="title" 
        class="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded"
        required
      />
    </div>
    
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Content</label>
      <textarea 
        name="content" 
        rows="4"
        class="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded"
        required
      ></textarea>
    </div>
    
    <label class="flex items-center gap-2 mb-4">
      <input type="checkbox" name="published" class="rounded" />
      <span class="text-sm">Publish immediately</span>
    </label>
    
    <button 
      type="submit" 
      disabled={isCreating}
      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
    >
      {isCreating ? 'Creating...' : 'Create Post'}
    </button>
    
    {#if form?.error}
      <p class="mt-2 text-red-400 text-sm">{form.error}</p>
    {/if}
  </form>
  
  <!-- Posts List -->
  <div class="space-y-4">
    {#each data.posts as post}
      <article class="p-4 border border-gray-800 rounded-lg">
        <div class="flex justify-between items-start mb-2">
          <h2 class="text-xl font-semibold">{post.title}</h2>
          <span class={`text-xs px-2 py-1 rounded ${post.published ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
            {post.published ? 'Published' : 'Draft'}
          </span>
        </div>
        <p class="text-gray-400 mb-4">{post.content}</p>
        <form method="POST" action="?/delete" use:enhance>
          <input type="hidden" name="postId" value={post.id} />
          <button type="submit" class="text-red-400 text-sm hover:text-red-300">
            Delete
          </button>
        </form>
      </article>
    {:else}
      <p class="text-gray-500">No posts yet. Create your first post above!</p>
    {/each}
  </div>
</div>
```

---

## 3. Unified Route Structure (Recommended)

SvelteKit mendukung **unified route** - satu folder berisi page + API sekaligus:

```
src/routes/(dashboard)/posts/           # /posts - List page
├── +page.svelte                        # Page UI
├── +page.server.ts                     # Server load + form actions
├── +server.ts                          # API endpoints (GET/POST for AJAX)
└── [id]/                               # /posts/[id] - Detail page
    ├── +page.svelte                    # Detail UI
    ├── +page.server.ts                 # Load detail + actions
    └── +server.ts                      # API endpoints (GET/PUT/DELETE)
```

### Unified Route Files

| File | Purpose | Access |
|------|---------|--------|
| `+page.svelte` | Page UI component | Browser (GET) |
| `+page.server.ts` | Server load data & form actions | Server-side |
| `+server.ts` | HTTP API endpoints | AJAX/fetch/external |

### Example: Unified Posts Route

**`src/routes/(dashboard)/posts/+page.server.ts`** - Load data & form actions:

```typescript
import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { z } from 'zod';

// Load data untuk page
export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, '/login');
  
  const posts = await locals.db
    .selectFrom('posts')
    .selectAll()
    .where('user_id', '=', locals.user.id)
    .orderBy('created_at', 'desc')
    .execute();
    
  return { posts };
};

// Form actions untuk form submission (no JS needed)
export const actions: Actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    
    const form = await request.formData();
    const title = form.get('title') as string;
    
    await locals.db
      .insertInto('posts')
      .values({
        id: crypto.randomUUID(),
        user_id: locals.user.id,
        title,
        created_at: Date.now()
      })
      .execute();
      
    return { success: true };
  }
};
```

**`src/routes/(dashboard)/posts/+server.ts`** - API endpoints untuk AJAX:

```typescript
import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';

// GET /posts (API version - untuk AJAX/fetch)
export const GET: RequestHandler = async ({ locals, url }) => {
  if (!locals.user) throw error(401, 'Unauthorized');
  
  const limit = parseInt(url.searchParams.get('limit') || '10');
  
  const posts = await locals.db
    .selectFrom('posts')
    .selectAll()
    .where('user_id', '=', locals.user.id)
    .limit(limit)
    .execute();
    
  return json({ posts });
};

// POST /posts (API version - untuk AJAX dengan JSON body)
export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) throw error(401, 'Unauthorized');
  
  const body = await request.json();
  const id = crypto.randomUUID();
  
  await locals.db
    .insertInto('posts')
    .values({
      id,
      user_id: locals.user.id,
      title: body.title,
      content: body.content,
      created_at: Date.now()
    })
    .execute();
    
  return json({ id }, { status: 201 });
};
```

**`src/routes/(dashboard)/posts/+page.svelte`** - Page UI:

```svelte
<script>
  let { data, form } = $props();
  import { enhance } from '$app/forms';
</script>

<!-- Form pakai form actions (works tanpa JS) -->
<form method="POST" action="?/create" use:enhance>
  <input name="title" required />
  <button type="submit">Create</button>
</form>

<!-- Atau pakai fetch ke API endpoint (dengan JS) -->
<script>
  async function createViaAPI() {
    const res = await fetch('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Hello' })
    });
    const data = await res.json();
  }
</script>
```

---

## 4. Add Navigation Link

Update `src/routes/+layout.svelte` untuk menambahkan link di navbar:

```svelte
<!-- Di dalam navigation -->
{#if user}
  <a href="/dashboard" class="nav-link">Dashboard</a>
  <a href="/posts" class="nav-link">Posts</a>  <!-- Tambahkan ini -->
  <a href="/profile" class="nav-link">Profile</a>
{/if}
```

---

## 5. Key Patterns Summary

### Pattern A: Server Load (Page Data)

```typescript
// +page.server.ts
export const load = async ({ locals }) => {
  const data = await locals.db
    .selectFrom('table')
    .selectAll()
    .execute();
  return { data };
};

// +page.svelte - data langsung tersedia
let { data } = $props();
```

**Gunakan untuk**: Page yang perlu data saat load

### Pattern B: Form Actions (Form Submission)

```typescript
// +page.server.ts
export const actions = {
  actionName: async ({ request, locals }) => {
    const form = await request.formData();
    // Process...
    return { success: true };
  }
};

// +page.svelte
<form method="POST" action="?/actionName" use:enhance>
```

**Gunakan untuk**: Form submission (works tanpa JavaScript!)

### Pattern C: API Endpoint (AJAX/External)

```typescript
// +server.ts (di folder yang sama dengan page)
export const GET = async ({ locals }) => {
  return json({ data });
};
```

**Gunakan untuk**: Client-side fetching, external API

### 📁 Unified vs Shared API

**Unified (Recommended)** - Page + API di satu folder:
```
src/routes/(dashboard)/posts/
├── +page.svelte       # Page UI
├── +page.server.ts    # Load + form actions  
└── +server.ts         # API endpoints (optional untuk AJAX)
```

**Shared API** - Hanya untuk layanan yang dipakai banyak fitur atau external:
```
src/routes/api/
├── health/+server.ts         # Health checks (monitoring tools)
├── upload/
│   ├── image/+server.ts      # File upload (dipakai profile, posts, dll)
│   └── presign/+server.ts    # Presigned URL (R2 direct upload)
└── webhook/+server.ts        # External webhooks (Stripe, etc.)
```

**Rules:**
- ✅ **Unified** untuk semua fitur CRUD (users, posts, profile, dll)
- ✅ **Shared API** hanya untuk: file upload, health checks, webhooks

---

## 6. Validation with Zod

Selalu validasi input menggunakan Zod:

```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2).max(100),
  age: z.number().min(0).optional()
});

// Di form action
const result = schema.safeParse(Object.fromEntries(formData));
if (!result.success) {
  return fail(400, { issues: result.error.issues });
}
```

---

## 7. Database Query Patterns (Kysely)

### Select One

```typescript
const user = await locals.db
  .selectFrom('users')
  .selectAll()
  .where('id', '=', userId)
  .executeTakeFirst();
```

### Select Many with Filter & Order

```typescript
const posts = await locals.db
  .selectFrom('posts')
  .selectAll()
  .where('user_id', '=', userId)
  .orderBy('created_at', 'desc')
  .limit(10)
  .execute();
```

### Insert

```typescript
await locals.db
  .insertInto('posts')
  .values({
    id: crypto.randomUUID(),
    title: 'Hello',
    content: 'World',
    user_id: userId,
    created_at: Date.now()
  })
  .execute();
```

### Update

```typescript
await locals.db
  .updateTable('posts')
  .set({ title: 'New Title', updated_at: Date.now() })
  .where('id', '=', postId)
  .execute();
```

### Delete

```typescript
await locals.db
  .deleteFrom('posts')
  .where('id', '=', postId)
  .execute();
```

---

## 8. Security Checklist

Sebelum deploy fitur baru, pastikan:

- [ ] **Authentication Check** - Selalu cek `locals.user`
- [ ] **Authorization** - Verify user owns the resource
- [ ] **Input Validation** - Gunakan Zod untuk semua input
- [ ] **SQL Injection** - Gunakan Kysely (sudah parameterized)
- [ ] **XSS Prevention** - Svelte auto-escape HTML

---

## 9. Testing (Optional)

### Unit Test with Vitest

```typescript
// src/lib/db/schema.test.ts
import { describe, it, expect } from 'vitest';
import { createPostSchema } from './validation';

describe('createPostSchema', () => {
  it('validates valid input', () => {
    const result = createPostSchema.safeParse({
      title: 'Test Post',
      content: 'This is content'
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty title', () => {
    const result = createPostSchema.safeParse({
      title: '',
      content: 'Content'
    });
    expect(result.success).toBe(false);
  });
});
```

Run tests:

```bash
npm test
```

---

## Summary

Flow menambahkan fitur baru (Unified Route):

1. **Define Schema** → `src/lib/db/schema.ts`
2. **Generate Migration** → `npm run db:generate`
3. **Apply Migration** → `npm run db:migrate:local`
4. **Create Unified Route** → `src/routes/(dashboard)/feature/`
   ```
   feature/
   ├── +page.svelte       # Page UI
   ├── +page.server.ts    # Load + form actions
   └── +server.ts         # API endpoints (optional)
   ```
5. **Add Nav Link** → `+layout.svelte`

**File Pattern:**
- `+page.server.ts` = Server load data + form actions (POST `?/actionName`)
- `+server.ts` = HTTP API (GET/POST/PUT/DELETE untuk AJAX/fetch)

---

[Next: Environment Variables](/guide/environment-variables)
