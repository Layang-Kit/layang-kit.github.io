---
layout: home

hero:
  name: "LayangKit"
  text: "AI-Native Starter"
  tagline: SvelteKit + Cloudflare + AI Agents. From idea to production in hours.
  actions:
    - theme: brand
      text: Quick Start
      link: /guide/quick-start
    - theme: alt
      text: AI Workflow
      link: /guide/ai-first-development

features:
  - title: 5 AI Agents
    details: Product, Tech Lead, Developer, QA, DevOps. Describe your idea, agents build it.
  - title: 10x Faster
    details: From idea to production in 1 day. Not 1 month.
  - title: Production Ready
    details: Auth, database, file upload built-in. Deploy to 300+ edge locations.
  - title: 100% Free
    details: Generous free tiers. Perfect for MVPs and side projects.
---

## What is LayangKit?

LayangKit is a full-stack starter template with 5 AI Agents that work from idea to deployment.

```
Your Idea
    ↓
@workflow/agents/product.md "I want to build..."
    ↓
Product Agent      → Requirements
Tech Lead Agent    → Technical Design  
Developer Agent    → Code
QA Agent           → Testing
DevOps Agent       → Deploy
    ↓
Live Application
```

---

## Quick Start

```bash
npm create layang my-app
cd my-app
npx wrangler d1 create my-app-db
# Copy database_id to wrangler.toml
npm run db:migrate:local
npm run dev
```

Open http://localhost:5173

---

## Documentation

| Topic | Link |
|-------|------|
| Setup | [Quick Start](/guide/quick-start) |
| Deploy | [Deployment](/guide/deployment) |
| AI Agents | [AI Workflow](/guide/ai-first-development) |
| Config | [Environment Variables](/guide/environment-variables) |
| Auth | [Authentication](/guide/authentication) |
| Upload | [File Upload](/guide/file-uploads) |

---

[GitHub](https://github.com/Layang-Kit/layang-app)
