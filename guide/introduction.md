# Introduction

Understand the philosophy and design decisions behind LayangKit.

---

## What is LayangKit?

LayangKit is a **starter kit** (not a framework) for building full-stack applications with AI assistance. It combines:

- **AI-Native Workflow** — 5 agents that turn ideas into deployed apps
- **Edge-First Stack** — Everything runs on Cloudflare's global network
- **Zero-Config Setup** — Production-ready from the first commit

---

## Core Philosophy

### 1. AI-Native by Design

Most tools add AI as an afterthought. LayangKit was built **for** AI from day one:

- **Structured prompts** in `workflow/agents/` guide AI behavior
- **Unified code patterns** make codebase easy for AI to understand
- **Explicit over implicit** — Kysely queries, clear types, no magic

```typescript
// Pattern AI understands easily
export const load: PageServerLoad = async ({ locals }) => {
  const items = await locals.db
    .selectFrom('items')
    .selectAll()
    .execute();
  return { items };
};
```

### 2. Edge-First Architecture

Traditional stack: Database in US → User in Asia = 300ms+ latency

LayangKit: **Everything at the edge**

| Component | Traditional | LayangKit |
|-----------|-------------|-----------|
| Compute | Single region | 300+ locations |
| Database | PostgreSQL (centralized) | D1 (replicated) |
| Storage | S3 (one region) | R2 (global) |
| Result | 200-500ms latency | **<50ms globally** |

### 3. Unified Pattern

Every feature follows the same structure:

```
src/routes/(dashboard)/[feature]/
├── +page.svelte      # UI (Svelte 5)
├── +page.server.ts   # Load & Actions
└── +server.ts        # API endpoint (if needed)
```

**Benefits:**
- New developer? Knows exactly where to look
- AI Agent? Predicts file locations
- Debugging? Consistent patterns everywhere

### 4. Batteries Included

Don't install 10 packages for basic features:

```bash
# Other starters
npm install next-auth prisma @aws-sdk/s3
npm install resend nodemailer stripe
# ... 30 minutes later

# LayangKit
npm create layang my-app
# Everything included
```

---

## Tech Stack Decisions

### Why SvelteKit + Svelte 5?

| Alternative | Why Not | Why SvelteKit |
|-------------|---------|---------------|
| Next.js | Heavy, complex | Lightweight, fast HMR |
| Nuxt | Vue ecosystem | Prefer Svelte simplicity |
| Remix | Good, but heavy | SvelteKit simpler |

**Svelte 5 Runes** make reactive code explicit:
```svelte
<script>
  let count = $state(0);  // Clear, explicit reactivity
</script>
```

### Why Cloudflare (Not Vercel/AWS)?

| Factor | Vercel/AWS | Cloudflare |
|--------|------------|------------|
| Free hosting | ✅ | ✅ |
| Free database | ❌ (Neon/Supabase paid) | ✅ (D1 free tier) |
| Free storage | ❌ (S3 paid) | ✅ (R2 free tier) |
| Edge compute | Limited | Native |
| Egress fees | $$$ | $0 |

**Result:** Actually free to start, cheap to scale.

### Why Kysely + Drizzle (Not Prisma)?

```typescript
// Prisma — Magic, hard to debug
const user = await prisma.user.findUnique({ where: { id } });

// Kysely — Explicit SQL, type-safe, AI-friendly
const user = await db
  .selectFrom('users')
  .selectAll()
  .where('id', '=', id)
  .executeTakeFirst();
```

**Drizzle** = Schema definition
**Kysely** = Type-safe queries

Best of both worlds.

### Why Custom Auth (Not Auth.js/Clerk)?

| Solution | Size | Lock-in | Control |
|----------|------|---------|---------|
| Auth.js | Heavy | Some | Limited |
| Clerk | External | High | None |
| **Custom** | Lightweight | None | Full |

Our custom auth (~500 lines) gives you:
- Full control over session logic
- No vendor lock-in
- Easy to understand and modify
- Works perfectly with AI agents

---

## Who is LayangKit For?

### ✅ Perfect For

- **Indie hackers** — Ship MVPs fast, scale later
- **Solo developers** — One person, full-stack power
- **AI-assisted developers** — Workflow designed for human + AI
- **Startups** — Consistent stack, fast onboarding

### ❌ Not For

- Enterprise with strict compliance requirements
- Complex microservices architecture
- Heavy PostgreSQL-dependent apps

---

## Comparison with Alternatives

| Feature | From Scratch | Next.js + Vercel | Supabase | **LayangKit** |
|---------|--------------|------------------|----------|---------------|
| Setup time | 12-21 hours | 4-6 hours | 2-3 hours | **5 minutes** |
| AI workflow | None | None | None | **Native** |
| True $0 start | ❌ | ❌ | ❌ | **✅** |
| Edge database | ❌ | ❌ | ❌ | **✅ (D1)** |
| Auth included | ❌ | NextAuth setup | ✅ | **✅** |
| Email included | ❌ | ❌ | ❌ | **✅** |
| Storage included | ❌ | Setup S3 | ✅ | **✅** |

---

## File Organization Philosophy

```
src/
├── routes/
│   ├── (dashboard)/      # Protected routes group
│   │   ├── dashboard/    # Each feature: self-contained
│   │   ├── profile/      # Page + server + API in one folder
│   │   └── [feature]/
│   │       ├── +page.svelte
│   │       ├── +page.server.ts
│   │       └── +server.ts
│   ├── api/              # Shared services only
│   ├── login/            # Public routes
│   └── register/
├── lib/
│   ├── auth/             # Auth logic
│   ├── db/               # Database
│   ├── email/            # Email service
│   └── storage/          # File storage
```

**Principle:** Feature colocation. Everything related to a feature lives together.

---

## Next Steps

Ready to start? Continue to [Quick Start](./quick-start) or explore [AI Agent Workflow](./ai-first-development).
