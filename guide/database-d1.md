# Database Guide

::: tip Update 🎉
Database setup sekarang lebih sederhana! Tidak perlu `CLOUDFLARE_API_TOKEN` lagi - cukup `wrangler login` + `wrangler.toml`.
:::

Database di LayangKit menggunakan **dual ORM strategy**:
- **Drizzle ORM**: Schema definition & migrations
- **Kysely**: Runtime queries (better D1 support)

---

## Setup Database

### 1. Login ke Cloudflare

```bash
npx wrangler login
```

### 2. Create Database

```bash
npx wrangler d1 create my-database
```

### 3. Update wrangler.toml

Copy `database_id` dari output:

```toml
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "xxxxx-xxxx-xxxx-xxxx-xxxx"  # ← dari output
```

### 4. Apply Migrations

```bash
npm run db:migrate:local
```

::: warning Penting
Tidak perlu mengisi `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_DATABASE_ID`, atau `CLOUDFLARE_API_TOKEN` di `.env`!
:::

---

## Struktur File (⚠️ Penting!)

Hanya **2 file** di `src/lib/db/`:

```
src/lib/db/
├── schema.ts    # Drizzle schema (camelCase)
└── index.ts     # All types + exports (snake_case)
```

### 1. schema.ts — Drizzle Schema

```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash'),  // camelCase
  createdAt: integer('created_at', { mode: 'number' })
    .$defaultFn(() => Date.now()),
});
```

### 2. index.ts — Kysely Types

```typescript
// Database interface (snake_case untuk Kysely)
export interface Database {
  users: {
    id: string;
    email: string;
    name: string;
    password_hash: string | null;  // snake_case!
    created_at: number | null;
  };
}

// Helper types
export type User = Database['users'];
export type NewUser = Omit<User, 'id' | 'created_at'>;

// Schema export
export * as schema from './schema';
```

---

## Conversion Rules

Saat update schema, konversi dari Drizzle ke Kysely:

| Drizzle (schema.ts) | Kysely (index.ts) |
|---------------------|-------------------|
| `passwordHash` | `password_hash` |
| `createdAt` | `created_at` |
| `integer(..., { mode: 'boolean' })` | `number` (0/1) |
| `.$defaultFn(...)` | `\| null` |
| `.notNull()` | required type |

---

## Query Patterns

### Select
```typescript
// +page.server.ts
export const load = async ({ locals }) => {
  const posts = await locals.db
    .selectFrom('posts')
    .select(['id', 'title', 'content'])
    .where('user_id', '=', locals.user.id)
    .orderBy('created_at', 'desc')
    .execute();
  
  return { posts };
};
```

### Insert
```typescript
const result = await locals.db
  .insertInto('posts')
  .values({
    title: 'Hello World',
    content: '...',
    user_id: locals.user.id
  })
  .returning('id')
  .executeTakeFirst();
```

### Update
```typescript
await locals.db
  .updateTable('posts')
  .set({ 
    title: 'Updated',
    updated_at: Date.now()
  })
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

## Adding New Table

### Step 1: Update schema.ts
```typescript
export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: integer('created_at', { mode: 'number' })
    .$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at', { mode: 'number' })
    .$defaultFn(() => Date.now()),
});
```

### Step 2: Update index.ts
```typescript
export interface Database {
  // ... existing tables
  
  posts: {
    id: string;
    title: string;
    content: string | null;
    user_id: string;
    created_at: number | null;
    updated_at: number | null;
  };
}

// Export types
export type Post = Database['posts'];
export type NewPost = Omit<Post, 'id' | 'created_at' | 'updated_at'>;
```

### Step 3: Generate Migration
```bash
npm run db:generate
```

### Step 4: Apply Migration
```bash
npm run db:migrate:local
```

---

## Database Commands

```bash
# Generate migration from schema changes
npm run db:generate

# Apply to local D1
npm run db:migrate:local

# Apply to production D1
npm run db:migrate

# Open Drizzle Studio GUI
npm run db:studio

# Reset local database
npm run db:refresh:local
```

::: tip Drizzle Studio
`npm run db:studio` membutuhkan Cloudflare API Token di `.env` (opsional). Alternatif: gunakan `wrangler d1 execute`.
:::

---

## Best Practices

1. **Always update BOTH files** — schema.ts dan index.ts harus sinkron
2. **Use snake_case in Kysely** — Database interface menggunakan snake_case
3. **Check types after changes** — Jalankan `npm run check` setelah update schema
4. **Test migrations locally** — Selalu test di local sebelum production

---

## Troubleshooting

### "D1 binding not found"
- Pastikan `database_id` di `wrangler.toml` benar
- Pastikan sudah `npx wrangler login`

### "Table not found"
- Pastikan migration sudah diapply: `npm run db:migrate:local`
- Cek Drizzle Studio: `npm run db:studio`

### Type errors after schema change
- Update `index.ts` Database interface
- Jalankan `npm run check`

### "Column does not exist"
- Cek spelling (snake_case vs camelCase)
- Pastikan kolom ada di Kysely types
