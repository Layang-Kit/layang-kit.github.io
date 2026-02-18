# Workflow Setup

Setup AI Agent Workflow untuk development otomatis.

## Prerequisites

Workflow sudah **built-in** di LayangKit. Tidak perlu setup manual.

Struktur sudah tersedia di folder `workflow/`:

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

Setiap agent akan menyimpan output di `workflow/outputs/`:

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

## Contoh Penggunaan

### Development Fitur Baru

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

### Fix Bug

```bash
# Langsung ke Developer Agent
@workflow/agents/developer.md Fix bug: [deskripsi bug]

# Lanjut ke QA
@workflow/agents/qa.md Verify bug fix.

# Deploy jika perlu
@workflow/agents/devops.md Deploy hotfix.
```

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

### 05-deployment/
```
workflow/outputs/05-deployment/
└── DEPLOYMENT_CONFIG.md # Deployment info
```

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

## Troubleshooting

### Agent tidak mengerti instruksi
- Berikan instruksi lebih spesifik
- Refer ke file yang sudah ada

### Output tidak sesuai ekspektasi
- Berikan feedback detail apa yang perlu diubah
- Bisa ulang tahap tersebut

### Workflow file hilang
Workflow sudah included di starter. Jika hilang:
```bash
# Copy dari repo
curl -L https://github.com/maulanashalihin/svelte-kit-cloudflare-starter/raw/main/workflow/agents/product.md > workflow/agents/product.md
```

---

**Workflow siap digunakan!** Mulai dengan:
```
@workflow/agents/product.md [deskripsi aplikasi]
```
