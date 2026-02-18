# Database Issues

Masalah umum terkait database dan solusinya.

## "D1 binding not found"

### Penyebab
- `database_id` salah di `wrangler.toml`
- Belum login ke Cloudflare
- Database belum dibuat

### Solusi

1. Cek `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "my-app-db"
database_id = "xxxxx-xxxx-xxxx-xxxx-xxxx"  # Pastikan ini benar
```

2. Verifikasi database exists:
```bash
npx wrangler d1 list
```

3. Login ulang:
```bash
npx wrangler login
```

---

## "Table not found"

### Penyebab
- Migration belum diapply
- Migration failed

### Solusi

1. Generate migration:
```bash
npm run db:generate
```

2. Apply ke local:
```bash
npm run db:migrate:local
```

3. Untuk production:
```bash
npm run db:migrate
```

---

## "Column does not exist"

### Penyebab
- Schema dan Kysely types tidak sinkron
- Salah case (camelCase vs snake_case)

### Solusi

1. Cek schema.ts:
```typescript
passwordHash: text('password_hash')  // camelCase
```

2. Cek index.ts:
```typescript
password_hash: string | null;  // Harus snake_case!
```

3. Jalankan type check:
```bash
npm run check
```

---

## Type Error Setelah Schema Change

### Solusi

1. Update `src/lib/db/index.ts`:
```typescript
export interface Database {
  // Tambahkan tabel/kolom baru
}
```

2. Jalankan check:
```bash
npm run check
```

3. Generate dan apply migration:
```bash
npm run db:generate
npm run db:migrate:local
```

---

## Migration Failed

### Reset Local Database

**WARNING:** Ini akan hapus semua data local!

```bash
npm run db:refresh:local
```

### Check Migration Status

```bash
npx wrangler d1 migrations list DB --local
```

### Manual Apply

```bash
npx wrangler d1 execute DB --local --file=./migrations/0001_initial.sql
```

---

## Drizzle Studio Tidak Bisa Connect

### Solusi

1. Pastikan database local running:
```bash
npm run dev  # Di terminal terpisah
```

2. Jalankan studio:
```bash
npm run db:studio
```

3. Buka http://local.drizzle.studio

---

## "database_id is required"

### Penyebab
Belum setup database.

### Solusi

```bash
# Buat database
npx wrangler d1 create my-app-db

# Copy database_id ke wrangler.toml
```

---

## Query Returns Empty Array

### Penyebab
- Data memang kosong
- Where clause salah
- Wrong table name

### Debug

1. Log query:
```typescript
const result = await locals.db
  .selectFrom('posts')
  .selectAll()
  .execute();

console.log('Result:', result);  // Check di terminal
```

2. Check di Drizzle Studio:
```bash
npm run db:studio
```

---

## Foreign Key Constraint Failed

### Penyebab
Insert data dengan foreign key yang tidak exists.

### Solusi

Pastikan referenced row exists:
```typescript
// Pastikan user exists dulu
const user = await locals.db
  .selectFrom('users')
  .where('id', '=', userId)
  .selectAll()
  .executeTakeFirst();

if (!user) {
  throw error(404, 'User not found');
}

// Baru insert
await locals.db.insertInto('posts').values({ user_id: userId }).execute();
```

---

## Performance Issues

### Query Lambat

1. Add index:
```typescript
// schema.ts
userId: text('user_id').references(() => users.id).notNull()
  .$defaultFn(() => createIndex('posts_user_id_idx').on(table.userId))
```

2. Limit results:
```typescript
.selectAll()
.limit(100)  // Jangan select semua!
.offset(page * 100)
```

3. Select only needed columns:
```typescript
.select(['id', 'title', 'created_at'])  // ✅
// .selectAll()  // ❌ Kalau tidak perlu
```

---

## Checklist Debug Database

- [ ] `database_id` benar di `wrangler.toml`
- [ ] Sudah `npm run db:migrate:local`
- [ ] Schema dan index.ts sinkron
- [ ] Snake_case di Kysely types
- [ ] Drizzle Studio bisa connect
