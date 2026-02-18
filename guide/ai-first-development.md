# AI Agent Workflow

Build applications with AI Agents — from idea to deployment, automated.

---

## What is AI Agent Workflow?

A workflow of **5 AI Agents** that work sequentially to turn your idea into a live application:

```
Product Agent → Tech Lead Agent → Developer Agent → QA Agent → DevOps Agent
     ↓               ↓                  ↓              ↓            ↓
   Define         Design            Implement       Test        Deploy
```

Each agent **MUST** wait for your approval before proceeding to the next.

---

## The 5 Agents

| Agent | Task | Output |
|-------|------|--------|
| **Product Agent** | Define requirements | PRD, User Stories |
| **Tech Lead Agent** | Technical design | Tech Spec, Architecture |
| **Developer Agent** | Code implementation | Working code in `src/` |
| **QA Agent** | Testing | Test report |
| **DevOps Agent** | Deployment | Live app on Cloudflare |

---

## Why Use AI Agents?

| Traditional Problem | AI Agent Solution |
|---------------------|-------------------|
| ❌ Scope creep | ✅ Clear PRD from the start |
| ❌ Technical debt | ✅ Architecture documented |
| ❌ Bugs after deploy | ✅ Automated QA testing |
| ❌ Manual deployment | ✅ Automated deploy |
| ❌ Scattered documentation | ✅ All stored in `workflow/outputs/` |

---

## How It Works

```
You (idea) → PA (PRD) → [APPROVE] → TLA (Spec) → [APPROVE] 
→ DevA (Code) → [APPROVE] → QAA (Test) → [APPROVE] → DOA (Deploy)
```

### Flow Control
- **Approve** → Continue to next agent
- **Revise** → Agent fixes output
- **Skip** → Jump to specific agent (e.g., skip to TLA if you already have PRD)

---

## Example: Todo App

**Timeline: 3 days from idea → live**

| Day | Agent | Activity |
|-----|-------|----------|
| Day 1 | Product Agent | Define features: create, read, update, delete todo |
| Day 1 | Tech Lead Agent | Design database schema, routes, components |
| Day 2 | Developer Agent | Implement all features |
| Day 3 | QA Agent | Test functionality, edge cases |
| Day 3 | DevOps Agent | Deploy to Cloudflare Pages |

---

## Philosophy: AI-Native by Design

Most tools add AI as an afterthought. LayangKit was built **for** AI from day one:

### Structured Prompts

Each agent has a dedicated prompt file in `workflow/agents/`:

```
workflow/agents/
├── product.md      # How to gather requirements
├── tech-lead.md    # How to design architecture
├── developer.md    # How to write code
├── qa.md           # How to test
└── devops.md       # How to deploy
```

### AI-Friendly Code Patterns

Code is written explicitly so AI understands it easily:

```typescript
// Kysely queries — explicit, no magic
const items = await locals.db
  .selectFrom('items')
  .selectAll()
  .where('user_id', '=', userId)
  .execute();
```

### Unified Structure

Every feature follows the same pattern. AI knows exactly where to find and write code:

```
src/routes/(dashboard)/[feature]/
├── +page.svelte
├── +page.server.ts
└── +server.ts
```

---

## Get Started

See detailed usage in [Workflow Setup](./workflow-setup).

---

## Quick Reference

```bash
# Full workflow
@workflow/agents/product.md [app description]

# Skip to implementation (if you have spec)
@workflow/agents/developer.md [instructions]

# Fix bug
@workflow/agents/developer.md Fix bug: [description]
@workflow/agents/qa.md Verify fix
@workflow/agents/devops.md Deploy hotfix
```
