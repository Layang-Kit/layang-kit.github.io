---
layout: home

hero:
  name: "LayangKit"
  text: "AI-Native Starter"
  tagline: SvelteKit + Cloudflare + AI Agents. From idea to production in hours, not weeks. 100% free.
  image:
    src: https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/cloudflare-color.png
    alt: LayangKit Logo
  actions:
    - theme: brand
      text: Quick Start
      link: /guide/quick-start
    - theme: alt
      text: AI Workflow
      link: /guide/ai-first-development
    - theme: alt
      text: Documentation
      link: /guide/

features:
  - icon: 
    title: 5 AI Agents
    details: Product, Tech Lead, Developer, QA, and DevOps agents work sequentially. Just describe your idea, agents handle the rest.
  - icon:
    title: 10x Faster Development
    details: From idea to production in 1 day, not 1 month. Agents handle everything from spec to deployment.
  - icon:
    title: Production Ready
    details: Auth, database, file upload, email — all built-in. Deploy to 300+ edge locations with auto-scaling.
  - icon:
    title: Modern Stack
    details: Svelte 5 + Cloudflare D1 + Drizzle ORM. Type-safe, zero config, edge-native.
  - icon:
    title: 100% Free
    details: Generous free tiers. Unlimited requests, 500k queries/day, 10GB storage. Perfect for MVPs.
  - icon:
    title: One-Click Deploy
    details: npm run deploy — live instantly. D1 binding and env vars via CLI. No dashboard clicking required.
---

## What is LayangKit?

LayangKit is an AI-Native starter template — built specifically for development with AI Agents.

Not just a code boilerplate. But a complete workflow with 5 AI Agents that work automatically from idea to deployment.

```
Your Idea
    ↓
@workflow/agents/product.md "I want an app for..."
    ↓
Product Agent         → PRD, User Stories, Roadmap
Tech Lead Agent       → Tech Spec, Database Design
Developer Agent       → Working Code
QA Agent              → Test Report
DevOps Agent          → Deploy + State Tracking
    ↓
PRODUCTION APP LIVE
```

---

## Two Ways to Use

### Option 1: AI Agent Workflow (Recommended)

Automatic development with 5 agents. Just give instructions.

```bash
# 1. Install
npm create layang my-app
cd my-app

# 2. Call AI Agents
@workflow/agents/product.md "I want to build a todo list app"
# [Review output]

@workflow/agents/tech-lead.md "Continue from Product Agent"
# [Review output]

@workflow/agents/developer.md "Implement all features"
# [Review code]

@workflow/agents/qa.md "Test the application"
# [Review test report]

@workflow/agents/devops.md "Deploy to production"
# App is live!
```

Benefits:
- 10x faster development
- Complete documentation auto-generated
- Trackable progress
- Intervene anytime

---

### Option 2: Manual Development

Use as a regular starter template. Code manually.

```bash
# 1. Install
npm create layang my-app
cd my-app

# 2. Setup database
npx wrangler d1 create my-app-db
# Copy database_id to wrangler.toml

# 3. Dev
npm run db:migrate:local
npm run dev

# 4. Build & Deploy
npm run build
npm run deploy
```

Benefits:
- Full control
- Great for those who prefer manual coding
- Auth & database ready to use

---

## AI Agent Workflow Detail

### 5 Agents Work Sequentially

| Agent | Input | Output | Time |
|-------|-------|--------|------|
| Product | Your idea | PRD, User Stories, Roadmap | 5-10 min |
| Tech Lead | PRD | Tech Spec, Database Schema | 5-10 min |
| Developer | Tech Spec | Working code in src/ | 10-30 min |
| QA | Code | Test Report | 5-10 min |
| DevOps | Approved code | Live app + State tracking | 2-5 min |

### State Tracking

DevOps Agent saves deployment state:

```markdown
workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md

| Status | COMPLETED |
| Type | FIRST_DEPLOY |
| Config | Database ✓, Storage ✓, Email ✗ |
```

Can resume interrupted deployments!

---

## Tech Stack

```
AI Workflow Layer
├── 5 Specialized Agents
├── State Tracking
└── Output Documentation

Frontend
├── SvelteKit 2.x    → Full-stack framework
├── Svelte 5         → UI with Runes
└── Tailwind CSS 4   → CSS-first styling

Backend
├── Cloudflare D1    → SQLite at edge
├── Drizzle ORM      → Schema & migrations
└── Kysely           → Type-safe queries

Services
├── Cloudflare Pages → Edge deployment
├── S3 Storage       → R2, Wasabi, S3, MinIO
└── Resend           → Email delivery
```

---

## Documentation

### Getting Started
| Document | Description | Time |
|----------|-------------|------|
| [Quick Start](/guide/quick-start) | Minimal setup, get running | 5 min |
| [AI Workflow](/guide/ai-first-development) | Development with 5 AI Agents | 10 min |
| [Workflow Setup](/guide/workflow-setup) | How to use agents | 10 min |

### Core Concepts
| Document | Description |
|----------|-------------|
| [Architecture](/guide/architecture) | System design & patterns |
| [Project Structure](/guide/project-structure) | Folder structure |
| [Database](/guide/database-d1) | D1 + Drizzle + Kysely |

### Configuration
| Document | Description |
|----------|-------------|
| [Environment Variables](/guide/environment-variables) | All env vars |
| [S3 Storage](/guide/cloudflare-r2) | File upload setup |
| [Deployment](/guide/deployment) | Auto vs manual deploy |

---

## Free Tier Limits

| Service | Free Tier | For Projects |
|---------|-----------|--------------|
| Cloudflare Pages | Unlimited requests, 500 builds/month | Unlimited traffic |
| Cloudflare D1 | 500k rows/query/day, 5 GB | Small-medium apps |
| S3 Storage | 10 GB (R2), or per provider | File storage |
| Workers | 100k requests/day | API calls |
| Resend | 100 emails/day | Email verification |

**Bottom line:** For startups, portfolios, side projects — this is **completely free** with very generous limits.

---

## Who Is It For

- **Founders/Indie Hackers** — Validate ideas quickly with AI agents
- **Frontend Developers** — Need backend ready + AI workflow
- **Full-stack Developers** — Modern stack with automatic development
- **AI-Native Developers** — Optimized for AI agent workflow

---

## References

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Drizzle ORM](https://orm.drizzle.team/docs)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)

---

From idea to production in 1 day — with 5 AI Agents

[Start with AI Workflow](/guide/ai-first-development)
