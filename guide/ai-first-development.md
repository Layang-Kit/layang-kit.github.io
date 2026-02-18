# AI Agent Workflow

Development dengan AI Agents — dari ide sampai deploy, otomatis.

## Overview

Workflow terdiri dari **5 Agents** yang bekerja secara berurutan:

```
Product Agent → Tech Lead Agent → Developer Agent → QA Agent → DevOps Agent
     ↓               ↓                  ↓              ↓            ↓
   Define         Design            Implement       Test        Deploy
     ↓               ↓                  ↓              ↓            ↓
  [REVIEW]       [REVIEW]            [REVIEW]       [REVIEW]     [DONE]
```

Setiap agent **WAJIB** menunggu approve dari Anda sebelum lanjut.

## Agents

| Agent | File | Tugas | Output |
|-------|------|-------|--------|
| **Product Agent** | `product.md` | Definisi kebutuhan | PRD, User Stories, Roadmap |
| **Tech Lead Agent** | `tech-lead.md` | Desain teknis | Tech Spec, Architecture, Routes, Tasks |
| **Developer Agent** | `developer.md` | Implementasi kode | Working code |
| **QA Agent** | `qa.md` | Testing | Test report |
| **DevOps Agent** | `devops.md` | Deployment | Live app |

## Cara Penggunaan

### Format Panggil

```
@workflow/agents/[nama-file].md [instruksi]
```

### Contoh

```
@workflow/agents/product.md

Saya mau bikin aplikasi todo list.
Fitur: create todo, set deadline, mark complete, filter by status.
User: personal use, single user.
Timeline: MVP 1 minggu.
```

## Workflow Step-by-Step

### Step 1: Product Agent (PA)

**Anda panggil:**
```
@workflow/agents/product.md

Saya mau aplikasi [deskripsi].
[Detail kebutuhan...]
```

**PA akan:**
1. Interview jika perlu
2. Buat PRD, User Stories, Roadmap
3. Present ke Anda
4. Tunggu **REVIEW & APPROVE**

**Output:**
- `workflow/outputs/01-product/PRD.md`
- `workflow/outputs/01-product/USER_STORIES.md`
- `workflow/outputs/01-product/ROADMAP.md`

**Anda:** "Approve" → Lanjut ke TLA

---

### Step 2: Tech Lead Agent (TLA)

**Anda panggil:**
```
@workflow/agents/tech-lead.md

Lanjutkan dari Product Agent.
Kebutuhan produk sudah di-approve client.
```

**TLA akan:**
1. Baca output PA
2. Check existing schema
3. Desain sistem:
   - TECH_SPEC.md
   - ARCHITECTURE.md
   - ROUTES.md (SvelteKit routes)
   - DATABASE_SCHEMA.md
   - TASKS.md
4. Present ke Anda
5. Tunggu **REVIEW & APPROVE**

**Output:**
- `workflow/outputs/02-engineering/TECH_SPEC.md`
- `workflow/outputs/02-engineering/ARCHITECTURE.md`
- `workflow/outputs/02-engineering/ROUTES.md`
- `workflow/outputs/02-engineering/DATABASE_SCHEMA.md`
- `workflow/outputs/03-tasks/TASKS.md`

**Anda:** "Approve" → Lanjut ke DevA

---

### Step 3: Developer Agent (DevA)

**Anda panggil:**
```
@workflow/agents/developer.md

Implement semua fitur sesuai spec.
Spec ada di workflow/outputs/02-engineering/
```

**DevA akan:**
1. Baca Tech Spec dan Tasks
2. Implement kode
3. Present hasil
4. Tunggu **REVIEW & APPROVE**

**Mode Development:**
- **One-Shot** (default): Semua sekaligus
- **Per Feature**: Satu modul per waktu

**Anda:** "Approve" → Lanjut ke QAA

---

### Step 4: QA Agent (QAA)

**Anda panggil:**
```
@workflow/agents/qa.md

Test aplikasi yang sudah diimplement.
```

**QAA akan:**
1. Code review
2. Functional testing
3. Edge case testing
4. Buat test report
5. Tunggu **REVIEW & APPROVE**

**Output:**
- `workflow/outputs/04-reports/TEST_REPORT.md`

**Anda:** "Approve" → Lanjut ke DOA

---

### Step 5: DevOps Agent (DOA)

**Anda panggil:**
```
@workflow/agents/devops.md

Deploy ke production.
```

**DOA akan:**
1. Build application
2. Deploy ke Cloudflare
3. Verify deployment
4. Inform deployment complete

**Output:**
- Live app di Cloudflare Pages
- `workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md`

**🎉 DONE!**

## Contoh End-to-End

### Skenario: Todo App

**Step 1 - PA:**
```
@workflow/agents/product.md

Saya mau aplikasi todo list.
Fitur: create, read, update, delete todo.
Setiap todo: title, description, due date, status (pending/done).
Filter by status.
Single user, no auth required untuk MVP.
Timeline: 3 hari.
```

*[PA generates PRD, wait for approve]*

**Anda:** "Approve"

---

**Step 2 - TLA:**
```
@workflow/agents/tech-lead.md

Lanjutkan dari Product Agent.
Kebutuhan produk sudah di-approve.
```

*[TLA generates tech specs, wait for approve]*

**Anda:** "Approve"

---

**Step 3 - DevA:**
```
@workflow/agents/developer.md

Implement semua fitur todo app.
Spec ada di workflow/outputs/02-engineering/
```

*[DevA implements code, wait for approve]*

**Anda:** "Approve"

---

**Step 4 - QAA:**
```
@workflow/agents/qa.md

Test todo app.
```

*[QAA tests, wait for approve]*

**Anda:** "Approve"

---

**Step 5 - DOA:**
```
@workflow/agents/devops.md

Deploy ke production.
```

*[DOA deploys]*

**🎉 Aplikasi live!**

## Setup Workflow di Project

Workflow sudah included di project. Struktur:

```
workflow/
├── README.md              # Overview workflow
├── examples.md            # Contoh penggunaan
├── quick-reference.md     # Cheat sheet
├── agents/
│   ├── product.md         # Product Agent
│   ├── tech-lead.md       # Tech Lead Agent
│   ├── developer.md       # Developer Agent
│   ├── qa.md              # QA Agent
│   └── devops.md          # DevOps Agent
└── outputs/               # Hasil kerja agents
    ├── 01-product/
    ├── 02-engineering/
    ├── 03-tasks/
    ├── 04-reports/
    └── 05-deployment/
```

## Tips

1. **Selalu review** — Setiap output agent, review dulu sebelum approve
2. **Berikan feedback spesifik** — "Tambahkan fitur X" atau "Kurangi Y"
3. **Bisa skip agent** — Jika sudah punya PRD, langsung ke TLA
4. **Iterasi** — Bisa bolak-balik antar agent jika perlu revisi

## Workflow Files

| File | Isi |
|------|-----|
| `workflow/README.md` | Overview workflow |
| `workflow/examples.md` | Contoh skenario lengkap |
| `workflow/quick-reference.md` | Cheat sheet singkat |
| `workflow/agents/*.md` | Instruksi untuk setiap agent |

---

**Mulai dengan:** `@workflow/agents/product.md [deskripsi aplikasi]`
