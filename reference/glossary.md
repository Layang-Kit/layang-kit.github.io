# Glossary

Istilah-istilah penting di LayangKit.

## A

### Actions (SvelteKit)
Server-side functions untuk handle form submissions. Di LayangKit, actions digunakan untuk create, update, delete data.

```typescript
export const actions = {
  create: async ({ request, locals }) => { ... }
};
```

### Arctic
Library OAuth yang digunakan untuk Google login.

## C

### Cloudflare D1
SQLite database yang di-host di edge Cloudflare. Zero-config, type-safe dengan Kysely.

### Cloudflare Pages
Platform hosting static sites + edge functions. LayangKit deploy ke sini.

### Cloudflare R2
Object storage (seperti S3) untuk file uploads. Compatible dengan S3 API.

## D

### Drizzle ORM
Type-safe ORM untuk TypeScript. Di LayangKit hanya digunakan untuk schema definition dan migrations.

### D1 Binding
Koneksi antara Worker dan D1 database. Didefinisikan di `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
```

## E

### Edge Deployment
Deploy code ke server terdekat dengan user (300+ lokasi). Hasil: sub-100ms latency.

### Environment Variables
Config yang berbeda untuk local vs production. Di Cloudflare, di-set via Dashboard.

## F

### Form Actions
Pattern di SvelteKit untuk handle form submissions tanpa JavaScript. Progressive enhancement.

## H

### Hooks
Fungsi yang jalan di setiap request. `hooks.server.ts` untuk inject database dan auth.

## K

### Kysely
Type-safe SQL query builder. Di LayangKit digunakan untuk semua database queries.

## L

### Load Function
Server function untuk fetch data sebelum page dirender. Data tersedia via `data` prop.

```typescript
export const load = async ({ locals }) => {
  return { posts };
};
```

### Lucia Auth
Session-based authentication library. Di LayangKit, menggunakan custom implementation dengan pattern serupa.

## P

### Presigned URL
URL temporary untuk upload file langsung ke R2 tanpa melalui server.

### Progressive Enhancement
App works tanpa JavaScript, tapi lebih baik dengan JavaScript.

## R

### Route Groups
Folder dengan prefix `( )` di SvelteKit. Contoh: `(dashboard)/` untuk protected routes.

### Runes
Svelte 5 reactive system: `$state`, `$derived`, `$effect`, `$props`.

## S

### Server Load
Load function yang jalan di server. Selalu digunakan untuk fetch data.

### Session
User authentication state yang disimpan di HTTP-only cookie.

### Snake Case
Format `nama_variable` (dengan underscore). Digunakan di database columns.

## W

### Wrangler
CLI tool dari Cloudflare untuk manage Workers, D1, R2, dll.

## Z

### Zod
Schema validation library. Digunakan untuk validate form inputs dan API requests.

---

## Singkatan Umum

| Singkatan | Arti |
|-----------|------|
| **CRUD** | Create, Read, Update, Delete |
| **CSR** | Client-Side Rendering |
| **SSR** | Server-Side Rendering |
| **SSG** | Static Site Generation |
| **SPA** | Single Page Application |
| **API** | Application Programming Interface |
| **SQL** | Structured Query Language |
| **ORM** | Object-Relational Mapping |
| **JWT** | JSON Web Token |
| **OAuth** | Open Authorization |
| **CDN** | Content Delivery Network |
| **CORS** | Cross-Origin Resource Sharing |
