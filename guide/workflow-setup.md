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
├── README.md              # Overview
├── examples.md            # Contoh
├── quick-reference.md     # Cheat sheet
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

## Cara Pakai

### 1. Panggil Agent

Format:
```
@workflow/agents/[nama-agent].md [instruksi]
```

Contoh:
```
@workflow/agents/product.md Saya mau bikin aplikasi todo list.
```

### 2. Review Output

Setiap agent menyimpan output di `workflow/outputs/`:

| Agent | Output Folder |
|-------|---------------|
| Product Agent | `workflow/outputs/01-product/` |
| Tech Lead Agent | `workflow/outputs/02-engineering/` |
| Developer Agent | Code di `src/` |
| QA Agent | `workflow/outputs/04-reports/` |
| DevOps Agent | `workflow/outputs/05-deployment/` |

### 3. Approve & Continue

Setelah review, berikan instruksi:
- **"Approve"** atau **"Lanjutkan"** → Agent lanjut ke tahap berikutnya
- **"Revisi: [detail]"** → Agent memperbaiki

---

## Contoh Penggunaan

### Development Fitur Baru (Full Workflow)

```bash
# Step 1: Define requirements
@workflow/agents/product.md Saya mau tambah fitur "categories" untuk posts.

# [Review PRD]

# Step 2: Design technical
@workflow/agents/tech-lead.md Lanjutkan dari Product Agent.

# [Review Tech Spec]

# Step 3: Implement
@workflow/agents/developer.md Implement fitur categories.

# [Review Code]

# Step 4: Test
@workflow/agents/qa.md Test fitur categories.

# [Review Test Report]

# Step 5: Deploy
@workflow/agents/devops.md Deploy ke production.
```

### Fix Bug (Skip beberapa agent)

```bash
# Langsung ke Developer Agent
@workflow/agents/developer.md Fix bug: [deskripsi bug]

# Lanjut ke QA
@workflow/agents/qa.md Verify bug fix.

# Deploy jika perlu
@workflow/agents/devops.md Deploy hotfix.
```

### Update Schema (Dari Tech Lead)

```bash
# Mulai dari Tech Lead (skip Product)
@workflow/agents/tech-lead.md

Tambahkan tabel "comments" dengan relasi ke posts.
Buatkan spec lengkap.

# Lanjut ke Developer
@workflow/agents/developer.md Implement schema comments.

# Test
@workflow/agents/qa.md Test fitur comments.

# Deploy
@workflow/agents/devops.md Deploy.
```

---

## Output Structure

### 01-product/
```
workflow/outputs/01-product/
├── PRD.md              # Product Requirements Document
├── USER_STORIES.md     # User stories
└── ROADMAP.md          # Timeline & milestones
```

### 02-engineering/
```
workflow/outputs/02-engineering/
├── TECH_SPEC.md        # Technical specification
├── ARCHITECTURE.md     # System architecture
├── ROUTES.md           # SvelteKit routes
└── DATABASE_SCHEMA.md  # Schema design
```

### 03-tasks/
```
workflow/outputs/03-tasks/
└── TASKS.md            # Task breakdown
```

### 04-reports/
```
workflow/outputs/04-reports/
└── TEST_REPORT.md      # QA test results
```

### 05-deployment/ (New 🎉)
```
workflow/outputs/05-deployment/
└── DEPLOYMENT_CONFIG.md # Deployment state tracking
```

**DEPLOYMENT_CONFIG.md** berisi:
- Deployment status (PENDING/IN_PROGRESS/COMPLETED)
- Deployment type (FIRST_DEPLOY/UPDATE)
- Configuration checklist
- Deployment history

---

## DevOps Agent

Agent otomatis untuk deployment ke Cloudflare Pages.

### Penggunaan

```
@workflow/agents/devops.md Deploy aplikasi ke production
```

### Fitur

- **Auto-detect**: First deploy vs update deployment
- **State tracking**: Status tersimpan di `DEPLOYMENT_CONFIG.md`
- **Auto-configure**: Setup D1 binding, secrets, migrations
- **Zero manual**: Tidak perlu buka dashboard Cloudflare

### Command

| Instruksi | Fungsi |
|-----------|--------|
| `Deploy ke production` | First deploy atau update |
| `Setup deployment` | Configure environment |
| `Status deployment` | Check deployment state |
| `Retry deploy` | Deploy ulang jika failed |

---

## Best Practices

### 1. Review Setiap Output
Jangan skip review. Setiap tahap bisa direvisi.

### 2. Berikan Feedback Spesifik
```
# ❌ Kurang baik
"Revisi"

# ✅ Lebih baik
"Revisi: Tambahkan fitur export CSV di user stories"
```

### 3. Commit Output
Output agents bisa di-commit ke git:

```bash
git add workflow/outputs/
git commit -m "docs: product requirements dari PA"
```

### 4. Bisa Skip Agent
Jika sudah punya PRD sendiri, langsung ke Tech Lead Agent:

```
@workflow/agents/tech-lead.md

Saya sudah punya PRD di docs/PRD.md.
Buatkan technical design.
```

### 5. Reset State Jika Perlu
Jika ingin deploy ulang atau ada masalah:

```bash
# Reset deployment state
rm workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md
cp workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md.example \
   workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md
```

---

## Troubleshooting

### Agent tidak mengerti instruksi
- Berikan instruksi lebih spesifik
- Refer ke file yang sudah ada

### Output tidak sesuai ekspektasi
- Berikan feedback detail apa yang perlu diubah
- Bisa ulang tahap tersebut

### Deployment failed
- Check state: `cat workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md`
- Re-run DevOps Agent: `@workflow/agents/devops.md Retry deploy`

### Workflow file hilang
Workflow sudah included di starter. Jika hilang:
```bash
# Copy dari repo
git checkout HEAD -- workflow/
```

---

## Command Reference

| Command | Fungsi |
|---------|--------|
| `@workflow/agents/product.md [desc]` | Define requirements |
| `@workflow/agents/tech-lead.md` | Design technical |
| `@workflow/agents/developer.md [task]` | Implement code |
| `@workflow/agents/qa.md` | Test application |
| `@workflow/agents/devops.md` | Deploy to production |

---

**Workflow siap digunakan!** 🚀

Mulai dengan:
```
@workflow/agents/product.md [deskripsi aplikasi]
```
