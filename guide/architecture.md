# Architecture Overview

Diagram dan penjelasan cara kerja aplikasi secara menyeluruh.

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLOUDFLARE EDGE                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │   Tokyo Edge    │  │  London Edge    │  │  São Paulo Edge │              │
│  │  ┌───────────┐  │  │  ┌───────────┐  │  │  ┌───────────┐  │              │
│  │  │  Worker   │  │  │  │  Worker   │  │  │  │  Worker   │  │              │
│  │  │  (SSR)    │  │  │  │  (SSR)    │  │  │  │  (SSR)    │  │              │
│  │  └─────┬─────┘  │  │  └─────┬─────┘  │  │  └─────┬─────┘  │              │
│  │        │        │  │        │        │  │        │        │              │
│  │  ┌─────┴─────┐  │  │  ┌─────┴─────┐  │  │  ┌─────┴─────┐  │              │
│  │  │    D1     │  │  │  │    D1     │  │  │  │    D1     │  │              │
│  │  │ (SQLite)  │  │  │  │ (SQLite)  │  │  │  │ (SQLite)  │  │              │
│  │  │  Replica  │  │  │  │  Replica  │  │  │  │  Replica  │  │              │
│  │  └───────────┘  │  │  └───────────┘  │  │  └───────────┘  │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTPS
                                      │
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER BROWSER                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         SvelteKit App                                │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │    │
│  │  │  Pages   │  │  Forms   │  │   API    │  │   Client State   │    │    │
│  │  │(Routes)  │  │(Actions) │  │ (Loads)  │  │   (Stores)       │    │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Request Flow Diagram

### 1. Page Load (Server-Side Rendering)

```
User Request (e.g., /dashboard)
         │
         ▼
┌─────────────────┐
│ Cloudflare Edge │
│     Worker      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SvelteKit       │
│ hooks.server.ts │
│ - Inject DB     │
│ - Validate Auth │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ +page.server.ts │
│ - load()        │
│ - Query D1      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SvelteKit       │
│ Render HTML     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Send to Browser │
│ (Complete HTML) │
└─────────────────┘
```

### 2. Form Submission (Form Actions)

```
User Submit Form
         │
         ▼
┌─────────────────┐
│ POST /action    │
│ (No JS needed)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Cloudflare Edge │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ +page.server.ts │
│ - actions {}    │
│ - Validate      │
│ - Insert D1     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Redirect/Result │
│ (Full page or   │
│  JSON response) │
└─────────────────┘
```

### 3. Client-Side API Call

```
JS Fetch API
         │
         ▼
┌─────────────────┐
│ +server.ts      │
│ (API Endpoint)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Process Request │
│ - Auth check    │
│ - DB query      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ JSON Response   │
└─────────────────┘
```

---

## 🔐 Authentication Flow

### Registration Flow

```
User                    Frontend                  Backend                    D1
  │                         │                         │                       │
  │ Fill form               │                         │                       │
  │────────────────────────>│                         │                       │
  │                         │ POST /auth/register     │                       │
  │                         │────────────────────────>│                       │
  │                         │                         │ Validate input        │
  │                         │                         │ Hash password         │
  │                         │                         │ Insert user           │
  │                         │                         │──────────────────────>│
  │                         │                         │                       │
  │                         │                         │<──────────────────────│
  │                         │                         │ Create session        │
  │                         │                         │ Set cookie            │
  │                         │<────────────────────────│                       │
  │                         │ Set cookie              │                       │
  │ Redirect to dashboard   │                         │                       │
  │<────────────────────────│                         │                       │
  │                         │                         │                       │
```

### Login Flow

```
User                    Frontend                  Backend                    D1
  │                         │                         │                       │
  │ Credentials             │                         │                       │
  │────────────────────────>│                         │                       │
  │                         │ POST /auth/login        │                       │
  │                         │────────────────────────>│                       │
  │                         │                         │ Find user by email    │
  │                         │                         │──────────────────────>│
  │                         │                         │<──────────────────────│
  │                         │                         │ Verify password       │
  │                         │                         │ Create session        │
  │                         │                         │ Set cookie            │
  │                         │<────────────────────────│                       │
  │                         │ Set cookie              │                       │
  │ Redirect to dashboard   │                         │                       │
  │<────────────────────────│                         │                       │
  │                         │                         │                       │
```

### Google OAuth Flow

```
User                    Frontend                  Backend                    Google
  │                         │                         │                        │
  │ Click "Login with       │                         │                        │
  │  Google"                │                         │                        │
  │────────────────────────>│                         │                        │
  │                         │ GET /auth/google        │                        │
  │                         │────────────────────────>│                        │
  │                         │                         │ Generate state         │
  │                         │                         │ Redirect to Google     │
  │                         │<────────────────────────│                        │
  │                         │ 302 Redirect            │                        │
  │<────────────────────────│                         │                        │
  │ Login to Google         │                         │                        │
  │─────────────────────────────────────────────────────────>│
  │                         │                         │                        │
  │                         │                         │<────────────────────────│
  │                         │                         │ Callback with code     │
  │                         │ GET /auth/google/       │                        │
  │                         │     callback            │                        │
  │                         │────────────────────────>│                        │
  │                         │                         │ Exchange code          │
  │                         │                         │ Get user info          │
  │                         │                         │ Create/update user     │
  │                         │                         │ Create session         │
  │                         │<────────────────────────│                        │
  │ Redirect to dashboard   │                         │                        │
  │<────────────────────────│                         │                        │
  │                         │                         │                        │
```

---

## 💾 Data Flow Patterns

### Pattern 1: Server Load (Recommended)

```typescript
// +page.server.ts
export const load = async ({ locals }) => {
  // ✅ Query di server dengan Kysely, data di-embed di HTML
  const users = await locals.db
    .selectFrom('users')
    .selectAll()
    .execute();
  return { users };
};

// +page.svelte
<script>
  let { data } = $props(); // Data sudah ada, no loading state!
</script>

{#each data.users as user}
  <UserCard {user} />
{/each}
```

**Flow:**
```
Request → Server Query → Render HTML → Browser (data langsung ada)
```

### Pattern 2: Form Actions (Recommended)

```typescript
// +page.server.ts
export const actions = {
  createPost: async ({ request, locals }) => {
    const form = await request.formData();
    // ✅ Works tanpa JavaScript!
    await locals.db
      .insertInto('posts')
      .values({ title, content, created_at: Date.now() })
      .execute();
    return { success: true };
  }
};

// +page.svelte
<form method="POST" action="?/createPost">
  <input name="title" />
  <button type="submit">Create</button>
</form>
```

**Flow:**
```
Form Submit → Server Action → DB Insert → Redirect/Result
```

### Pattern 3: Client Fetch (Use Sparingly)

```typescript
// +page.svelte
<script>
  import { onMount } from 'svelte';
  
  let users = [];
  
  onMount(async () => {
    // ⚠️ Extra API call, loading state needed
    const res = await fetch('/api/users');
    users = await res.json();
  });
</script>

{#if users.length}
  {#each users as user}
    <UserCard {user} />
  {/each}
{:else}
  <LoadingSpinner />
{/if}
```

**Flow:**
```
Page Load → HTML Render → JS Fetch → Loading State → Display Data
```

---

## 🚀 Deployment Architecture

```
Development                          Production
    │                                    │
    ▼                                    ▼
┌──────────────┐               ┌──────────────────┐
│ Local D1     │               │ Cloudflare D1    │
│ (SQLite file)│               │ (Edge replicas)  │
└──────┬───────┘               └────────┬─────────┘
       │                                │
       ▼                                ▼
┌──────────────┐               ┌──────────────────┐
│ npm run dev  │               │ Cloudflare Pages │
│ Vite dev     │      ────────▶│ + Edge Functions │
│ server       │     Deploy    │ (SvelteKit SSR)  │
└──────────────┘               └──────────────────┘
                                      │
                                      ▼
                               ┌──────────────────┐
                               │   Global CDN     │
                               │  (300+ edges)    │
                               └──────────────────┘
```

---

## 📊 Performance Characteristics

| Aspect | Local Dev | Production | Notes |
|--------|-----------|------------|-------|
| **Latency** | ~10-50ms | ~50-200ms | Depends on user location |
| **Cold Start** | Instant | <50ms | Edge functions warm |
| **Database** | SQLite file | Replicated SQLite | Read: fast, Write: eventual |
| **SSR Time** | ~10ms | ~5-20ms | Edge compute is fast |
| **Bundle Size** | N/A (dev) | ~50-100KB | Code-split per route |

---

## 🎯 Scalability Limits

| Resource | Free Tier | Paid Tier | When to Scale |
|----------|-----------|-----------|---------------|
| **D1 Storage** | 500MB | $0.75/GB-month | > 400MB data |
| **D1 Reads** | 5M/day | Unlimited | > 4M queries/day |
| **D1 Writes** | 100K/day | Unlimited | > 80K writes/day |
| **Workers** | 100K/day | $0.50/M | > 90K requests/day |
| **Build Time** | - | - | > 100 pages → ISR |

**When to Consider Migration:**
- Database > 5GB → PostgreSQL (Neon, Supabase)
- Complex queries → Add caching layer
- Real-time needs → WebSockets + Durable Objects

---

## 📚 Next Steps

- [Setup Guide](./quick-start) - Start building
- [Data Patterns](./sveltekit-patterns) - Learn best practices
- [Performance](../reference/performance) - Optimize your app
- [Security](../reference/security) - Harden production
