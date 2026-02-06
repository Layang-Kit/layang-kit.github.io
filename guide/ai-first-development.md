# 🤖 AI Agent Workflow Guide

Panduan menggunakan **3 AI Agent** untuk mengembangkan aplikasi dengan LayangKit. 🪁

---

## 🎯 Overview {#overview}

Project ini menggunakan **5 AI Agent** yang bekerja sama:

```
┌─────────────────────────────────────────────────────────────────┐
│                     AI AGENT WORKFLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  INIT_AGENT → TASK_AGENT / BATCH_TASK_AGENT → TEST_AGENT        │
│                                                         ↓       │
│                                              MANAGER_AGENT      │
│                                                                 │
│  1. INIT_AGENT: Setup project & dokumentasi                     │
│     └── Buat PRD.md, TDD.md, ui-kit.html, PROGRESS.md           │
│                                                                 │
│  2a. TASK_AGENT: Implementasi fitur (per task)                  │
│      └── Baca PROGRESS.md → Pilih 1 task → Implement → Commit   │
│                                                                 │
│  2b. BATCH_TASK_AGENT: Implementasi semua task sekaligus        │
│      └── Execute ALL pending tasks → Commit(s) → Done           │
│                                                                 │
│  3. TEST_AGENT: Testing & Quality Assurance                     │
│     └── Analyze → Write tests → Fix broken → Update PROGRESS    │
│                                                                 │
│  4. MANAGER_AGENT: Change management                            │
│     └── Update docs → Approve → Release notes                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start {#quick-start}

Gunakan command ini untuk memulai:

```bash
# 1. Mulai project baru
"@workflow/INIT_AGENT.md — start my project"

# 2a. Implementasi fitur (per task, dengan konfirmasi)
"@workflow/TASK_AGENT.md — build next feature"

# 2b. Implementasi SEMUA fitur sekaligus (MVP mode)
"@workflow/BATCH_TASK_AGENT.md — execute all pending tasks"

# 3. Testing & Quality Assurance
"@workflow/TEST_AGENT.md — write tests for recent features"

# 4. Manage changes
"@workflow/MANAGER_AGENT.md — handle this change"
```

---

## 🤖 INIT_AGENT — Project Setup {#init-agent}

**Gunakan saat:** Memulai project baru dari starter kit

### Workflow

```
1. Setup project structure
2. Buat workflow/PRD.md (Product Requirements)
3. Buat workflow/TDD.md (Technical Design)
4. Buat workflow/ui-kit.html (UI Design System)
5. Buat workflow/PROGRESS.md (Task Tracking)
6. Setup database & environment
7. ⛔ STOP — Review dengan user (WAJIB!)
8. Setup design system
9. Customize auth pages
10. Git init & first commit
11. Start dev server
```

### Output

- ✅ Project infrastructure siap
- ✅ Database migrations ter-setup
- ✅ Dokumentasi lengkap (PRD, TDD, PROGRESS, UI Kit)
- ✅ Dev server berjalan di http://localhost:5173

### Contoh Penggunaan

```markdown
User: "@workflow/INIT_AGENT.md — start my project"

INIT_AGENT akan:
1. Tanya nama project dan fitur utama
2. Buat semua dokumentasi
3. Setup project structure
4. ⛔ STOP — "Mohon review dokumentasi sebelum lanjut"

User review dan approve...

INIT_AGENT melanjutkan:
5. Setup database & environment
6. Start dev server
7. "Selesai! Buka session baru dengan TASK_AGENT"
```

> ⚠️ **INIT_AGENT akan BERHENTI di Step 7 untuk menunggu user review & approve!**

---

## 🔧 TASK_AGENT — Feature Implementation {#task-agent}

**Gunakan saat:** Implementasi fitur, fix bug, modifikasi fitur

### Workflow

```
1. Baca PROGRESS.md untuk lihat task pending
2. Tampilkan top 3 tasks dengan priority [HIGH], [MEDIUM], [LOW]
3. User pilih task
4. Lock task: [LOCKED: TASK_AGENT_xxx]
5. Auto-create feature branch
6. Implementasi fitur (page, API, component)
7. Test lokal
8. "Silakan test, sudah OK?"
9. Auto-commit & push
10. Unlock task, mark as [x] completed
```

### Best Practices

- ✅ Cek existing files dulu (jangan duplicate)
- ✅ Gunakan built-in auth dan features
- ✅ Match UI kit dari `workflow/ui-kit.html`
- ✅ Gunakan Server Load untuk GET requests
- ✅ Gunakan Form Actions untuk POST/PUT/DELETE
- ✅ Update PROGRESS.md setelah selesai

### Contoh Penggunaan

```markdown
User: "@workflow/TASK_AGENT.md — build next feature"

TASK_AGENT akan:
1. Baca PROGRESS.md
2. "Top 3 tasks:
   [HIGH] 1. Database schema untuk todos
   [HIGH] 2. Halaman /todos list  
   [MEDIUM] 3. Form create todo"

User: "Kerjakan task 1"

TASK_AGENT:
3. Lock task
4. Create branch: feature/todo-schema
5. Update src/lib/db/schema.ts
6. Generate & apply migration
7. "Silakan test, sudah OK?"

User: "OK"

TASK_AGENT:
8. Commit: "feat: add todos database schema"
9. Push ke GitHub
10. Mark task completed
```

---

## ⚡ BATCH_TASK_AGENT — Execute All Tasks {#batch-task-agent}

**Gunakan saat:** MVP development, Bootstrap banyak fitur, Deadline ketat

### Perbedaan dengan TASK_AGENT

| Aspek | TASK_AGENT | BATCH_TASK_AGENT |
|-------|------------|------------------|
| **Execution** | 1 task per run | **Semua task sekaligus** |
| **Work Pattern** | **Concurrent** — Buka multiple tabs/terminal untuk task berbeda | **Sequential** — Urut eksekusi, tapi **bisa ditinggal** |
| **Konfirmasi** | Tiap task | **1x di awal saja** |
| **Speed** | Lambat (frequent stops) | **Cepat (continuous)** |
| **Best for** | Production, Review tiap step | **MVP, Prototype, Bootstrap** |

### Work Pattern Detail

**TASK_AGENT — Concurrent Mode:**
```
Terminal 1                    Terminal 2                    Terminal 3
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│ TASK_AGENT      │          │ TASK_AGENT      │          │ TASK_AGENT      │
│ Task: Auth      │    +     │ Task: Database  │    +     │ Task: UI        │
│ (独立工作)       │          │ (独立工作)       │          │ (独立工作)       │
└─────────────────┘          └─────────────────┘          └─────────────────┘
        │                            │                            │
        ▼                            ▼                            ▼
   [独立分支]                      [独立分支]                      [独立分支]
   独立 commit                   独立 commit                   独立 commit
```
- ✅ Buka **multiple terminal/tabs** untuk kerjain task berbeda secara **parallel**
- ✅ Tiap task di branch berbeda, tidak saling ganggu
- ✅ Ideal untuk tim yang mau kerjain fitur berbeda bersamaan
- ⚠️ Perlu koordinasi untuk merge

**BATCH_TASK_AGENT — Sequential Mode (Bisa Ditinggal):**
```
Single Terminal
┌────────────────────────────────────────────────────────────────┐
│ BATCH_TASK_AGENT                                               │
│                                                                │
│ Task 1 ──▶ Task 2 ──▶ Task 3 ──▶ Task 4 ──▶ Task 5            │
│   │          │          │          │          │                │
│   ▼          ▼          ▼          ▼          ▼                │
│ [Done]     [Done]     [Done]     [Done]     [Done]            │
│                                                                │
│ "Execute all tasks?" ──▶ "Yes" ──▶ [BISA DITINGGAL!]          │
│                                      ☕ 🍵 🍔                  │
└────────────────────────────────────────────────────────────────┘
```
- ✅ **1x konfirmasi** di awal, kemudian **bisa ditinggal**
- ✅ Agent kerja **urut & continuous** tanpa henti
- ✅ Cocok untuk deadline, kerjain semua sambil meeting/santai
- ✅ Tidak perlu monitoring, dapat summary di akhir

### Workflow

```
1. Baca PROGRESS.md → Identify ALL pending tasks
2. Tampilkan summary semua task
3. User pilih commit mode:
   a. Atomic (commit per fitur) ← Recommended
   b. Batch (single commit)
4. User confirm: "Proceed with all {N} tasks?"
5. Execute semua task tanpa berhenti
6. Commit & push (sesuai mode)
7. Generate execution summary
```

### Commit Modes

**Mode A: Atomic Commits (Recommended)**
```
feat: add user authentication [BATCH_AGENT_20250203_201500]
feat: setup database schema [BATCH_AGENT_20250203_201500]
feat: create dashboard page [BATCH_AGENT_20250203_201500]
feat: implement profile page [BATCH_AGENT_20250203_201500]
```
- ✅ Easier code review
- ✅ Selective rollback
- ✅ Better bisect

**Mode B: Single Batch Commit**
```
feat: implement batch tasks [BATCH_AGENT_20250203_201500]
- User authentication system
- Database schema setup
- Dashboard page
- Profile page
```
- ✅ Faster execution
- ✅ Simple history
- ✅ Good for MVP

### Contoh Penggunaan

```markdown
User: "@workflow/BATCH_TASK_AGENT.md — execute all pending tasks"

BATCH_TASK_AGENT:
📋 Found 5 pending tasks:
   [HIGH] 1. User authentication
   [HIGH] 2. Database schema
   [MEDIUM] 3. Dashboard page
   [MEDIUM] 4. Profile page
   [LOW] 5. Settings page

Commit mode?
   a) Atomic (commit per fitur)
   b) Batch (single commit)

User: "a"

BATCH_TASK_AGENT:
Proceed with all 5 tasks? (yes/no)

User: "yes"

BATCH_TASK_AGENT:
🚀 Executing all tasks...
   Task 1/5: ✅ User authentication
   Task 2/5: ✅ Database schema
   Task 3/5: ✅ Dashboard page
   Task 4/5: ✅ Profile page
   Task 5/5: ✅ Settings page

✅ All tasks completed!
✅ 5 commits pushed to GitHub

📊 Execution Summary:
   - Total tasks: 5
   - Successful: 5
   - Failed: 0
   - Time: 12 minutes
```

### Kapan Pakai?

**Pilih berdasarkan Work Style:**

| Situasi | Pilihan |
|---------|---------|
| Mau kerjain **1 task per terminal**, bisa parallel | **TASK_AGENT** ✅ |
| Buka **multiple tabs** untuk task berbeda | **TASK_AGENT** ✅ |
| Kerja bareng tim, tiap orang 1 task | **TASK_AGENT** ✅ |
| Mau **tinggal**, nanti balik sudah selesai semua | **BATCH_TASK_AGENT** ✅ |
| Deadline, butuh **speed** | **BATCH_TASK_AGENT** ✅ |
| Sambil meeting/santai, agent kerja sendiri | **BATCH_TASK_AGENT** ✅ |

**Pilih berdasarkan Project Type:**

| Situasi | Pilihan |
|---------|---------|
| Startup MVP, 10+ fitur baru | **BATCH_TASK_AGENT** ✅ |
| Prototype dengan deadline besok | **BATCH_TASK_AGENT** ✅ |
| Bootstrap project baru | **BATCH_TASK_AGENT** ✅ |
| Backlog 20 task jelas requirement | **BATCH_TASK_AGENT** ✅ |
| Production bug fix | TASK_AGENT ✅ |
| Feature kompleks perlu review | TASK_AGENT ✅ |
| Team project dengan code review | TASK_AGENT ✅ |

---

## 🧪 TEST_AGENT — Testing & Quality Assurance {#test-agent}

**Gunakan saat:** Menulis test, fix broken tests, analyze coverage, quality check

### Philosophy: Test What Matters

> **Not everything needs a test.** TEST_AGENT fokus pada **high-impact tests** saja.

### Test Type Selection

| Feature Type | Unit | Integration | E2E |
|--------------|------|-------------|-----|
| `lib/auth/password.ts` | ✅ | ❌ | ❌ |
| `lib/email/resend.ts` | ✅ | ✅ (mocked) | ❌ |
| `/api/users/+server.ts` | ❌ | ✅ | ❌ |
| `/register/+page.svelte` | ❌ | ✅ | ✅ (Auth flow) |
| Auth lifecycle (multi-page) | ❌ | ❌ | ✅ **Required** |

### E2E Test Decision Framework

**E2E tests are EXPENSIVE** (slow, flaky). Gunakan **3-Criteria Rule**:

Sebelum tulis E2E, cek apakah fitur memenuhi **minimal 2 dari 3**:

1. **Cross-page interaction** - melibatkan multiple routes
2. **Critical business value** - failure = lost revenue/users
3. **Complex user flow** - multiple decisions/steps

**Contoh:**
- ✅ Register → Verify Email → Login → Onboarding (Meets all 3)
- ✅ Checkout → Payment → Confirmation (Meets #2 and #3)
- ❌ View Profile Page (Meets 0 - use integration test)

### Critical Workflows for E2E (LayangKit)

**HANYA 4 flow ini yang butuh E2E:**

1. **Authentication Lifecycle** (HIGHEST)
   ```
   Register → Verify Email → Login → Dashboard → Logout
   ```

2. **Password Recovery** (HIGH)
   ```
   Forgot Password → Email → Reset → Login
   ```

3. **Profile with Image Upload** (MEDIUM)
   ```
   Login → Edit Profile → Upload Avatar → Save
   ```

4. **Google OAuth Flow** (MEDIUM)
   ```
   Click Google Login → OAuth → Callback → Dashboard
   ```

### Workflow

```
1. Entry point:
   - User mentions @workflow/TEST_AGENT.md
   - CI reports test failures
   - Coverage drops below threshold

2. Analyze:
   - Read PROGRESS.md for untested features
   - Run npm run test:coverage
   - Apply E2E Decision Framework

3. Implement tests:
   - Unit tests for lib modules
   - Integration tests for API/routes
   - E2E tests (only if meets criteria)

4. Update PROGRESS.md test status
5. Push test updates
```

### Contoh Penggunaan

```markdown
User: "@workflow/TEST_AGENT.md — write tests for auth"

TEST_AGENT:
📋 Analyzing auth module...
   Password hashing: ❌ No unit tests
   Login API: ❌ No integration tests
   Auth flow: ❌ No E2E tests

🎯 Applying E2E Decision Framework:
   Auth flow: Cross-page ✅ + Critical ✅ + Complex ✅
   → E2E REQUIRED

🔧 Writing tests...
   ✅ Unit: password.test.ts
   ✅ Integration: login.test.ts
   ✅ E2E: auth-lifecycle.spec.ts

📊 Coverage: 45% → 78%
✅ All tests passing
```

---

## 📊 MANAGER_AGENT — Change Management {#manager-agent}

**Gunakan saat:** Change request (bug, feature), update dokumentasi, approve deployment

### Workflow

```
1. Terima change request
   SOURCE: [Client/QA/Developer]
   TYPE: [Bug/Feature/Modification]

2. Analyze impact
   - Priority: Critical/High/Medium/Low
   - Feasibility check

3. Update dokumentasi
   - Update PRD.md (requirements)
   - Update TDD.md (technical specs)
   - Update PROGRESS.md (tasks)

4. TASK_AGENT implement
5. Deploy
6. Create release notes
   - Update version di package.json
   - Create CHANGELOG.md
```

### Contoh Penggunaan

```markdown
User: "@workflow/MANAGER_AGENT.md — client request fitur export Excel"

MANAGER_AGENT akan:
1. Analyze:
   - Priority: High
   - Feasibility: Yes

2. Update dokumentasi:
   - PRD.md — Tambah Section 4.5: Data Export
   - TDD.md — Tambah API endpoint /api/export/excel
   - PROGRESS.md — Tambah task "Export Excel"

3. "Change request documented. TASK_AGENT bisa mulai implementasi"

User: "@workflow/TASK_AGENT.md — build export Excel"

[Implementasi...]

MANAGER_AGENT:
4. Approve deployment
5. Create CHANGELOG.md
```

---

## 🔄 End-to-End Example {#end-to-end-example}

### Scenario: Membuat Aplikasi Todo List

**Step 1: INIT_AGENT — Setup**
```markdown
User: "@workflow/INIT_AGENT.md — start Todo List app"

INIT_AGENT:
✅ Buat PRD.md — Fitur: add, edit, delete, complete todos
✅ Buat TDD.md — Database schema, API endpoints
✅ Buat ui-kit.html — Design system
✅ Buat PROGRESS.md — Task list

⛔ STOP — "Review dokumentasi:"
- [ ] Fitur lengkap?
- [ ] Design sesuai?
- [ ] Database schema OK?

User: "Lanjutkan"

INIT_AGENT:
✅ Setup database
✅ Start dev server
✅ "Selesai! Dev server: http://localhost:5173"
```

**Step 2a: TASK_AGENT — Build (Per Task)**
```markdown
User: "@workflow/TASK_AGENT.md — build todo feature"

TASK_AGENT:
📋 PROGRESS.md:
   [HIGH] 1. Database schema
   [HIGH] 2. Halaman /todos
   [MEDIUM] 3. Form create

User: "Task 1"

TASK_AGENT:
✅ Update schema.ts
✅ Generate migration
✅ Apply migration
✅ Commit & push
✅ Mark completed
```

**Step 2b: BATCH_TASK_AGENT — Build (All Tasks)**
```markdown
User: "@workflow/BATCH_TASK_AGENT.md — execute all pending tasks"

BATCH_TASK_AGENT:
📋 Found 3 pending tasks:
   [HIGH] 1. Database schema
   [HIGH] 2. Halaman /todos
   [MEDIUM] 3. Form create

Commit mode? (atomic/batch)
User: "atomic"

Proceed with all 3 tasks? (yes/no)
User: "yes"

BATCH_TASK_AGENT:
🚀 Executing...
   Task 1/3: ✅ Database schema
   Task 2/3: ✅ Halaman /todos
   Task 3/3: ✅ Form create

✅ All tasks completed!
✅ 3 commits pushed
```

**Step 3: MANAGER_AGENT — Change**
```markdown
User: "@workflow/MANAGER_AGENT.md — add due date to todos"

MANAGER_AGENT:
✅ Analyze: High priority, feasible
✅ Update PRD.md
✅ Update TDD.md  
✅ Update PROGRESS.md

"TASK_AGENT siap implement"
```

---

## 📂 Workflow Files

File-file ini ada di folder `/workflow/` starter kit:

| File | Deskripsi |
|------|-----------|
| `AGENT-GUIDE.md` | Panduan lengkap semua agent |
| `INIT_AGENT.md` | Setup project baru |
| `TASK_AGENT.md` | Implementasi fitur (per task) |
| `BATCH_TASK_AGENT.md` | Implementasi semua task sekaligus |
| `TEST_AGENT.md` | Testing & Quality Assurance |
| `MANAGER_AGENT.md` | Change management |
| `PRD.md` | Product Requirements Document |
| `TDD.md` | Technical Design Document |
| `PROGRESS.md` | Development progress tracking |
| `ui-kit.html` | UI design system |

---

## 💡 Tips Sukses

### Do's ✅
- Gunakan **Agent Workflow** untuk semua project
- Selalu berikan context lengkap ke AI
- Iterasi bertahap, jangan sekaligus besar
- Test setelah setiap iterasi
- Simpan prompt yang berhasil untuk reuse

### Don'ts ❌
- Jangan skip **user review** di INIT_AGENT Step 7
- Jangan minta TASK_AGENT update PRD/TDD
- Jangan minta fitur kompleks sekaligus
- Jangan skip testing setelah AI generate code

---

## 🎯 Tips Berkomunikasi dengan AI

### 1. Berikan Context Lengkap

❌ Kurang baik:
```
Buatkan halaman login
```

✅ Lebih baik:
```
Buatkan halaman login untuk SvelteKit dengan:
- Form email dan password
- Validasi dengan Zod
- Form action untuk handle submit
- Error handling untuk display error message
- Redirect ke /dashboard jika sukses
- Styling dengan Tailwind CSS
- Svelte 5 syntax dengan $props() dan $state()
```

### 2. Iterasi Bertahap

Jangan minta AI membuat fitur kompleks sekaligus:

**Iterasi 1:** Database schema + migration  
**Iterasi 2:** Backend (server load + actions)  
**Iterasi 3:** Frontend UI  
**Iterasi 4:** Polish & error handling

### 3. Validate Output

Selalu cek output AI untuk:
- ✅ Import statements benar
- ✅ Type definitions lengkap
- ✅ Error handling ada
- ✅ Security considerations

---

## 🔗 Resources

- [Claude Documentation](https://docs.anthropic.com)
- [GitHub Copilot](https://github.com/features/copilot)
- [SvelteKit Best Practices](https://kit.svelte.dev/docs/best-practices)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)

---

**Siap menggunakan AI Agent Workflow?** 🤖

**Mulai dari sini:**
1. [Getting Started](./getting-started) — Setup project
2. "@workflow/INIT_AGENT.md — start my project"
3. [Development Flow](./development-flow) — Pahami pola coding
