# Workflow Setup

Setup dan penggunaan AI Agent Workflow untuk development otomatis.

---

## Prerequisites

::: tip Sudah Built-in
Workflow sudah **built-in** di LayangKit. Tidak perlu setup manual!
:::

Struktur tersedia di folder `workflow/`:

```
workflow/
├── agents/                # Agent instructions
│   ├── product.md
│   ├── tech-lead.md
│   ├── developer.md
│   ├── qa.md
│   └── devops.md
└── outputs/               # Output directory
    ├── 01-product/
    ├── 02-engineering/
    ├── 03-tasks/
    ├── 04-reports/
    └── 05-deployment/
```

---

## Format Panggilan

```
@workflow/agents/[nama-agent].md [instruksi]
```

Contoh:
```
@workflow/agents/product.md Saya mau bikin aplikasi todo list.
```

---

## Command Reference

| Command | Fungsi | Output |
|---------|--------|--------|
| `@workflow/agents/product.md [desc]` | Define requirements | `workflow/outputs/01-product/` |
| `@workflow/agents/tech-lead.md` | Design technical | `workflow/outputs/02-engineering/` |
| `@workflow/agents/developer.md [task]` | Implement code | Code di `src/` |
| `@workflow/agents/qa.md` | Test application | `workflow/outputs/04-reports/` |
| `@workflow/agents/devops.md` | Deploy to production | Live app + state file |

---

## Review & Approve

Setelah agent selesai, review output-nya:

```bash
# Lihat output
ls workflow/outputs/01-product/
cat workflow/outputs/01-product/PRD.md
```

Kemudian berikan instruksi:
- **"Approve"** atau **"Lanjutkan"** → Ke agent berikutnya
- **"Revisi: [detail]"** → Perbaiki output

---

## Contoh Penggunaan

### Development Fitur Baru (Full Workflow)

```bash
# Step 1: Define requirements
@workflow/agents/product.md Saya mau tambah fitur "categories" untuk posts.
# [Review PRD] → "Approve"

# Step 2: Design technical
@workflow/agents/tech-lead.md Lanjutkan dari Product Agent.
# [Review Tech Spec] → "Approve"

# Step 3: Implement
@workflow/agents/developer.md Implement fitur categories.
# [Review Code] → "Approve"

# Step 4: Test
@workflow/agents/qa.md Test fitur categories.
# [Review Test Report] → "Approve"

# Step 5: Deploy
@workflow/agents/devops.md Deploy ke production.
```

### Fix Bug (Skip beberapa agent)

```bash
# Langsung ke Developer Agent
@workflow/agents/developer.md Fix bug: [deskripsi bug]

# Lanjut ke QA
@workflow/agents/qa.md Verify bug fix.

# Deploy
@workflow/agents/devops.md Deploy hotfix.
```

### Update Schema (Mulai dari Tech Lead)

```bash
# Skip Product Agent
@workflow/agents/tech-lead.md
Tambahkan tabel "comments" dengan relasi ke posts.
Buatkan spec lengkap.

# Lanjut ke Developer
@workflow/agents/developer.md Implement schema comments.

# Test & Deploy
@workflow/agents/qa.md Test fitur comments.
@workflow/agents/devops.md Deploy.
```

---

## Output Structure

### 01-product/
- `PRD.md` — Product Requirements Document
- `USER_STORIES.md` — User stories
- `ROADMAP.md` — Timeline & milestones

### 02-engineering/
- `TECH_SPEC.md` — Technical specification
- `ARCHITECTURE.md` — System architecture
- `ROUTES.md` — SvelteKit routes
- `DATABASE_SCHEMA.md` — Schema design

### 03-tasks/
- `TASKS.md` — Task breakdown untuk Developer Agent

### 04-reports/
- `TEST_REPORT.md` — QA test results

### 05-deployment/
- `DEPLOYMENT_CONFIG.md` — Deployment state tracking

---

## DevOps Agent

Agent otomatis untuk deployment ke Cloudflare Pages.

### Penggunaan
```
@workflow/agents/devops.md Deploy aplikasi ke production
```

### Fitur
- **Auto-detect**: First deploy vs update
- **State tracking**: Status di `DEPLOYMENT_CONFIG.md`
- **Auto-configure**: Setup D1, secrets, migrations
- **Zero manual**: Tidak perlu buka dashboard

### Check Status
```bash
cat workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md
```

---

## Best Practices

### 1. Review Setiap Output
Jangan skip review. Setiap tahap bisa direvisi.

### 2. Feedback Spesifik
```
❌ "Revisi"
✅ "Revisi: Tambahkan fitur export CSV di user stories"
```

### 3. Commit Output
```bash
git add workflow/outputs/
git commit -m "docs: product requirements dari PA"
```

### 4. Skip Agent Jika Perlu
Jika sudah punya PRD sendiri:
```
@workflow/agents/tech-lead.md
Saya sudah punya PRD di docs/PRD.md.
Buatkan technical design.
```

### 5. Reset State
Jika deployment bermasalah:
```bash
rm workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md
```

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Agent tidak mengerti | Berikan instruksi lebih spesifik |
| Output tidak sesuai | Berikan feedback detail |
| Deployment failed | `@workflow/agents/devops.md Retry deploy` |
| Workflow file hilang | `git checkout HEAD -- workflow/` |

---

## Mulai Sekarang

```
@workflow/agents/product.md [deskripsi aplikasi]
```
