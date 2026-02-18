# AI Agent Workflow

Development dengan AI Agents — dari ide sampai deploy, otomatis.

::: tip New 🎉
DevOps Agent sekarang dengan **state tracking**! Deployment status tersimpan otomatis.
:::

---

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

---

## Agents

| Agent | File | Tugas | Output |
|-------|------|-------|--------|
| **Product Agent** | `product.md` | Definisi kebutuhan | PRD, User Stories, Roadmap |
| **Tech Lead Agent** | `tech-lead.md` | Desain teknis | Tech Spec, Architecture, Tasks |
| **Developer Agent** | `developer.md` | Implementasi kode | Working code in `src/` |
| **QA Agent** | `qa.md` | Testing | Test report |
| **DevOps Agent** | `devops.md` | Deployment | Live app + State tracking |

---

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

---

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
2. Implement kode di `src/`
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
1. Check deployment state (baca `DEPLOYMENT_CONFIG.md`)
2. Determine: First Deploy atau Update?
3. Build application
4. Deploy ke Cloudflare (otomatis via CLI)
5. Configure D1 binding (via CLI)
6. Set environment variables (via CLI)
7. Apply database migrations
8. Verify deployment
9. **Update state file**
10. Inform deployment complete

**Output:**
- Live app di Cloudflare Pages
- `workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md` (auto-updated)

**🎉 DONE!**

---

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

---

## State Tracking (New 🎉)

DevOps Agent sekarang melacak deployment state:

```
workflow/outputs/05-deployment/DEPLOYMENT_CONFIG.md
```

### Contoh State

```markdown
| Field | Value |
|-------|-------|
| **Status** | `COMPLETED` |
| **Type** | `FIRST_DEPLOY` |

## Configuration State
- [x] Database created
- [x] Binding configured
- [x] Migrations applied
- [ ] Email configured (optional)
```

### Keuntungan
- Tracking deployment history
- Resume deployment yang ter-interrupt
- Checklist konfigurasi

---

## Tips

1. **Selalu review** — Setiap output agent, review dulu sebelum approve
2. **Berikan feedback spesifik** — "Tambahkan fitur X" atau "Kurangi Y"
3. **Bisa skip agent** — Jika sudah punya PRD, langsung ke TLA
4. **Iterasi** — Bisa bolak-balik antar agent jika perlu revisi
5. **Commit output** — Output agents bisa di-commit ke git

---

## Mulai Sekarang

```
@workflow/agents/product.md [deskripsi aplikasi]
```
