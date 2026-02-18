# AI Agent Workflow

Development dengan AI Agents — dari ide sampai deploy, otomatis.

---

## Apa itu AI Agent Workflow?

Workflow terdiri dari **5 AI Agents** yang bekerja berurutan untuk mengubah ide Anda menjadi aplikasi live:

```
Product Agent → Tech Lead Agent → Developer Agent → QA Agent → DevOps Agent
     ↓               ↓                  ↓              ↓            ↓
   Define         Design            Implement       Test        Deploy
```

Setiap agent **WAJIB** menunggu approve dari Anda sebelum lanjut ke agent berikutnya.

---

## 5 Agents

| Agent | Tugas | Output |
|-------|-------|--------|
| **Product Agent** | Definisi kebutuhan | PRD, User Stories |
| **Tech Lead Agent** | Desain teknis | Tech Spec, Architecture |
| **Developer Agent** | Implementasi kode | Working code di `src/` |
| **QA Agent** | Testing | Test report |
| **DevOps Agent** | Deployment | Live app di Cloudflare |

---

## Kenapa Menggunakan AI Agents?

| Masalah Tradisional | Solusi AI Agents |
|---------------------|------------------|
| ❌ Scope creep | ✅ PRD jelas sejak awal |
| ❌ Technical debt | ✅ Architecture document |
| ❌ Bug setelah deploy | ✅ QA testing otomatis |
| ❌ Manual deployment | ✅ Deploy otomatis |
| ❌ Dokumentasi terpisah | ✅ Semua tersimpan di `workflow/outputs/` |

---

## Cara Kerja (Simplified)

```
Anda (ide) → PA (PRD) → [APPROVE] → TLA (Spec) → [APPROVE] 
→ DevA (Code) → [APPROVE] → QAA (Test) → [APPROVE] → DOA (Deploy)
```

### Flow Control
- **Approve** → Lanjut ke agent berikutnya
- **Revisi** → Agent memperbaiki output
- **Skip** → Bisa loncat ke agent tertentu (jika sudah punya PRD, langsung ke TLA)

---

## Contoh Kasus: Todo App

**Timeline: 3 hari dari ide → live**

| Hari | Agent | Aktivitas |
|------|-------|-----------|
| Day 1 | Product Agent | Define fitur: create, read, update, delete todo |
| Day 1 | Tech Lead Agent | Design database schema, routes, components |
| Day 2 | Developer Agent | Implement semua fitur |
| Day 3 | QA Agent | Test functionality, edge cases |
| Day 3 | DevOps Agent | Deploy ke Cloudflare Pages |

---

## Memulai

Lihat detail cara penggunaan di [Workflow Setup](./workflow-setup).

---

## Quick Reference

```bash
# Full workflow
@workflow/agents/product.md [deskripsi aplikasi]

# Skip ke implementasi (jika sudah ada spec)
@workflow/agents/developer.md [instruksi]

# Fix bug
@workflow/agents/developer.md Fix bug: [deskripsi]
@workflow/agents/qa.md Verify fix
@workflow/agents/devops.md Deploy hotfix
```
