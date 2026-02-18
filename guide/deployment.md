# 🚀 Deployment

Tiga cara deploy ke production.

---

## 1. AI DevOps Agent ⭐ (Rekomendasi)

Cukup bilang ke AI:

```
@workflow/agents/devops.md deploy app ini
```

AI akan handle build, deploy, database, dan configuration. Selesai! 🎉

---

## 2. Wrangler CLI (Basic)

Deploy via command line:

```bash
# 1. Build
npm run build

# 2. Deploy
npm run deploy
# Output: ✨ https://my-app.pages.dev

# 3. Setup database (first time)
npx wrangler pages bindings add d1 \
  --project-name=my-app \
  --binding=DB \
  --database=my-db

# 4. Apply migrations
npm run db:migrate
```

---

## 3. Cloudflare Dashboard (Manual)

Deploy via web interface:

1. **Dashboard** → Workers & Pages → **Create** → **Pages**
2. **Connect to Git** → Pilih repository
3. **Configure:**
   - Framework: `SvelteKit`
   - Build command: `npm run build`
   - Output: `.svelte-kit/cloudflare`
4. **Save and Deploy**
5. **Settings** → **Bindings** → Add D1 database
6. Redeploy: `git commit --allow-empty -m "deploy" && git push`

---

## Update Deployment

| Cara | Command |
|------|---------|
| AI Agent | `@workflow/agents/devops.md update deployment` |
| CLI | `npm run build && npm run deploy` |
| Git | `git push` (auto-deploy jika pakai Git integration) |

---

## Commands

```bash
npm run deploy      # Deploy aplikasi
npm run logs        # Lihat logs real-time
npm run db:migrate  # Apply database migrations
```

---

**Rekomendasi: Gunakan AI DevOps Agent untuk deployment pertama.** 🚀
