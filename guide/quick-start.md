# Quick Start

Install and run in 5 minutes.

## Install

```bash
npm create layang my-app
```

Follow the prompts, then:

```bash
cd my-app
```

## Setup (One-time)

```bash
# 1. Login to Cloudflare
npx wrangler login

# 2. Create database
npx wrangler d1 create my-app-db

# 3. Copy database_id to wrangler.toml

# 4. Apply migrations
npm run db:migrate:local
```

## Run

```bash
npm run dev
```

Open http://localhost:5173

## Deploy

```bash
npm run deploy
```

---

[See full documentation](/guide/)
