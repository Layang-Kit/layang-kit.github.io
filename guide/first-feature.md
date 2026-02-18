# First Feature: Todo List

Tutorial lengkap membuat fitur pertama dengan LayangKit. Kita akan membuat **Todo List** dengan fitur:

- ✅ Create todo
- ✅ List todos (filter: all/active/completed)
- ✅ Toggle complete/uncomplete
- ✅ Delete todo
- ✅ Protected route (hanya logged-in users)

---

## Step 1: Define Database Schema

Edit `src/lib/db/schema.ts` dan tambahkan table `todos`:

```typescript
// Tambahkan di bagian atas dengan imports lainnya
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { users } from './schema';

// Tambahkan setelah table yang sudah ada
export const todos = sqliteTable('todos', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  completed: integer('completed', { mode: 'boolean' }).default(false),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'number' }).$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at', { mode: 'number' }).$defaultFn(() => Date.now())
});

// Relations
export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.id]
  })
}));
```

---

## Step 2: Generate & Apply Migration

```bash
# Generate migration file
npm run db:generate

# Apply ke local database
npm run db:migrate:local
```

Output akan menunjukkan migration berhasil diapply:
```
Executing on local database DB:
┌────────────────────────┐
│ Name                   │
├────────────────────────┤
│ 0000_initial           │
│ 0001_add_todos_table   │ ← Migration baru
└────────────────────────┘
```

---

## Step 3: Create Route Files

Buat folder structure:

```bash
mkdir -p src/routes/(dashboard)/todos
```

Buat 2 file:
- `+page.server.ts` - Server load & actions
- `+page.svelte` - UI component

---

## Step 4: Server Load & Actions

**File: `src/routes/(dashboard)/todos/+page.server.ts`**

```typescript
import type { PageServerLoad, Actions } from './$types';
// Note: Kysely digunakan untuk query, Drizzle hanya untuk schema
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

// Validation schema
const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long')
});

// SERVER LOAD - Fetch todos saat page load
export const load: PageServerLoad = async ({ locals, url }) => {
  // Redirect ke login jika belum authenticated
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  // Get filter dari query param
  const filter = url.searchParams.get('filter') || 'all';
  
  // Build base query
  let query = locals.db
    .selectFrom('todos')
    .selectAll()
    .where('user_id', '=', locals.user.id);
  
  // Apply filter
  if (filter === 'active') {
    query = query.where('completed', '=', 0);
  } else if (filter === 'completed') {
    query = query.where('completed', '=', 1);
  }
  
  // Fetch todos dari database (via Kysely)
  const todoList = await query
    .orderBy('created_at', 'desc')
    .execute();

  // Get counts untuk stats (parallel queries)
  const allCount = await locals.db
    .selectFrom('todos')
    .select((eb) => eb.fn.count('id').as('count'))
    .where('user_id', '=', locals.user.id)
    .executeTakeFirst()
    .then(r => Number(r?.count || 0));
    
  const activeCount = await locals.db
    .selectFrom('todos')
    .select((eb) => eb.fn.count('id').as('count'))
    .where('user_id', '=', locals.user.id)
    .where('completed', '=', 0)
    .executeTakeFirst()
    .then(r => Number(r?.count || 0));
    
  const completedCount = await locals.db
    .selectFrom('todos')
    .select((eb) => eb.fn.count('id').as('count'))
    .where('user_id', '=', locals.user.id)
    .where('completed', '=', 1)
    .executeTakeFirst()
    .then(r => Number(r?.count || 0));

  return {
    todos: todoList,
    filter,
    counts: {
      all: allCount,
      active: activeCount,
      completed: completedCount
    }
  };
};

// FORM ACTIONS
export const actions: Actions = {
  // Create new todo
  create: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(401, { error: 'Unauthorized' });
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;

    // Validasi
    const result = todoSchema.safeParse({ title });
    if (!result.success) {
      return fail(400, { 
        error: result.error.issues[0].message,
        title 
      });
    }

    // Insert ke database (via Kysely)
    await locals.db
      .insertInto('todos')
      .values({
        id: crypto.randomUUID(),
        user_id: locals.user.id,
        title: result.data.title,
        completed: 0,
        created_at: Date.now(),
        updated_at: Date.now()
      })
      .execute();

    return { success: true };
  },

  // Toggle todo complete/uncomplete
  toggle: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(401, { error: 'Unauthorized' });
    }

    const formData = await request.formData();
    const todoId = formData.get('todoId') as string;
    const completed = formData.get('completed') === 'true';

    // Verify ownership
    const todo = await locals.db
      .selectFrom('todos')
      .selectAll()
      .where('id', '=', todoId)
      .executeTakeFirst();

    if (!todo || todo.user_id !== locals.user.id) {
      return fail(403, { error: 'Forbidden' });
    }

    // Update status (via Kysely)
    await locals.db
      .updateTable('todos')
      .set({ 
        completed: completed ? 0 : 1,
        updated_at: Date.now()
      })
      .where('id', '=', todoId)
      .execute();

    return { success: true };
  },

  // Delete todo
  delete: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(401, { error: 'Unauthorized' });
    }

    const formData = await request.formData();
    const todoId = formData.get('todoId') as string;

    // Verify ownership
    const todo = await locals.db
      .selectFrom('todos')
      .select('user_id')
      .where('id', '=', todoId)
      .executeTakeFirst();

    if (!todo || todo.user_id !== locals.user.id) {
      return fail(403, { error: 'Forbidden' });
    }

    // Delete (via Kysely)
    await locals.db
      .deleteFrom('todos')
      .where('id', '=', todoId)
      .execute();

    return { success: true };
  },

  // Clear all completed todos
  clearCompleted: async ({ locals }) => {
    if (!locals.user) {
      return fail(401, { error: 'Unauthorized' });
    }

    await locals.db
      .deleteFrom('todos')
      .where('user_id', '=', locals.user.id)
      .where('completed', '=', 1)
      .execute();

    return { success: true };
  }
};
```

---

## Step 5: UI Component

**File: `src/routes/(dashboard)/todos/+page.svelte`**

```svelte
<script lang="ts">
  import type { PageProps } from './$types';
  import { enhance } from '$app/forms';
  import { Check, Trash2, Circle, Loader2 } from 'lucide-svelte';
  
  let { data, form }: PageProps = $props();
  
  // Local state untuk UI
  let isCreating = $state(false);
  let togglingId = $state<string | null>(null);
  let deletingId = $state<string | null>(null);
  let isClearing = $state(false);
  
  // Filter tabs
  const filters = [
    { id: 'all', label: 'All', count: data.counts.all },
    { id: 'active', label: 'Active', count: data.counts.active },
    { id: 'completed', label: 'Completed', count: data.counts.completed }
  ];
</script>

<div class="container mx-auto max-w-2xl p-6">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold mb-2">My Todos</h1>
    <p class="text-gray-400">Stay organized and get things done</p>
  </div>

  <!-- Add Todo Form -->
  <form 
    method="POST" 
    action="?/create"
    use:enhance={() => {
      isCreating = true;
      return async ({ update }) => {
        await update();
        isCreating = false;
      };
    }}
    class="mb-6"
  >
    <div class="flex gap-2">
      <input 
        type="text" 
        name="title" 
        placeholder="What needs to be done?"
        value={form?.title || ''}
        class="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        required
        disabled={isCreating}
      />
      <button 
        type="submit" 
        disabled={isCreating}
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center gap-2"
      >
        {#if isCreating}
          <Loader2 class="w-4 h-4 animate-spin" />
        {/if}
        Add
      </button>
    </div>
    
    {#if form?.error}
      <p class="mt-2 text-red-400 text-sm">{form.error}</p>
    {/if}
  </form>

  <!-- Filter Tabs -->
  <div class="flex gap-1 mb-4 p-1 bg-gray-900 rounded-lg">
    {#each filters as filter}
      <a
        href="/todos?filter={filter.id}"
        class="flex-1 py-2 px-4 text-center text-sm font-medium rounded-md transition-colors {data.filter === filter.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}"
      >
        {filter.label}
        <span class="ml-1 text-xs text-gray-500">({filter.count})</span>
      </a>
    {/each}
  </div>

  <!-- Todos List -->
  <div class="space-y-2">
    {#if data.todos.length === 0}
      <div class="text-center py-12 text-gray-500">
        {#if data.filter === 'completed'}
          <p>No completed todos yet.</p>
        {:else if data.filter === 'active'}
          <p>All caught up! No active todos.</p>
        {:else}
          <p>No todos yet. Add one above!</p>
        {/if}
      </div>
    {:else}
      {#each data.todos as todo (todo.id)}
        <div 
          class="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 rounded-lg group hover:border-gray-700 transition-colors"
          class:opacity-75={todo.completed}
        >
          <!-- Toggle Complete -->
          <form 
            method="POST" 
            action="?/toggle"
            use:enhance={() => {
              togglingId = todo.id;
              return async ({ update }) => {
                await update();
                togglingId = null;
              };
            }}
            class="flex-shrink-0"
          >
            <input type="hidden" name="todoId" value={todo.id} />
            <input type="hidden" name="completed" value={todo.completed} />
            <button 
              type="submit"
              disabled={togglingId === todo.id}
              class="p-1 rounded-full transition-colors {todo.completed ? 'text-green-500' : 'text-gray-500 hover:text-gray-300'}"
              aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {#if togglingId === todo.id}
                <Loader2 class="w-6 h-6 animate-spin" />
              {:else if todo.completed}
                <Check class="w-6 h-6" />
              {:else}
                <Circle class="w-6 h-6" />
              {/if}
            </button>
          </form>

          <!-- Title -->
          <span 
            class="flex-1 {todo.completed ? 'line-through text-gray-500' : 'text-gray-200'}"
          >
            {todo.title}
          </span>

          <!-- Delete Button -->
          <form 
            method="POST" 
            action="?/delete"
            use:enhance={() => {
              deletingId = todo.id;
              return async ({ update }) => {
                await update();
                deletingId = null;
              };
            }}
          >
            <input type="hidden" name="todoId" value={todo.id} />
            <button 
              type="submit"
              disabled={deletingId === todo.id}
              class="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Delete todo"
            >
              {#if deletingId === todo.id}
                <Loader2 class="w-4 h-4 animate-spin" />
              {:else}
                <Trash2 class="w-4 h-4" />
              {/if}
            </button>
          </form>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Footer Stats & Clear Completed -->
  {#if data.counts.completed > 0}
    <div class="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
      <span class="text-sm text-gray-500">
        {data.counts.active} item{data.counts.active === 1 ? '' : 's'} left
      </span>
      
      <form 
        method="POST" 
        action="?/clearCompleted"
        use:enhance={() => {
          isClearing = true;
          return async ({ update }) => {
            await update();
            isClearing = false;
          };
        }}
      >
        <button 
          type="submit"
          disabled={isClearing}
          class="text-sm text-gray-500 hover:text-red-400 transition-colors"
        >
          {isClearing ? 'Clearing...' : 'Clear completed'}
        </button>
      </form>
    </div>
  {/if}
</div>
```

---

## Step 6: Add Navigation Link

Edit `src/routes/+layout.svelte` dan tambahkan link ke Todos:

```svelte
<!-- Cari bagian navigation untuk authenticated users -->
{#if user}
  <a href="/dashboard" class="nav-link">Dashboard</a>
  <a href="/todos" class="nav-link">Todos</a>  <!-- Tambahkan ini -->
  <a href="/profile" class="nav-link">Profile</a>
{/if}
```

---

## Step 7: Test Your Feature

1. **Start dev server** (jika belum running):
   ```bash
   npm run dev
   ```

2. **Register/Login**:
   - Buka aplikasi di browser
   - Register akun baru atau login

3. **Navigate ke Todos**:
   - Klik "Todos" di navbar
   - Atau langsung ke `/todos`

4. **Test semua fitur**:
   - ✅ Add todo baru
   - ✅ Toggle complete/uncomplete
   - ✅ Filter (All/Active/Completed)
   - ✅ Delete todo
   - ✅ Clear completed

---

## What We Built

### Database Layer
- Table `todos` dengan relasi ke `users`
- Migration file di `drizzle/`

### Server Layer
- **Server Load**: Fetch todos dengan filter
- **Form Actions**: 4 actions (create, toggle, delete, clearCompleted)
- **Authorization**: Check ownership sebelum modify

### UI Layer
- **Progressive Enhancement**: Works tanpa JavaScript
- **Loading States**: Feedback saat processing
- **Optimistic UI**: `enhance` untuk smooth experience
- **Responsive**: Mobile-friendly design

---

## Common Patterns Used

### 1. Form with Loading State
```svelte
<form 
  method="POST" 
  action="?/actionName"
  use:enhance={() => {
    isLoading = true;
    return async ({ update }) => {
      await update();
      isLoading = false;
    };
  }}
>
  <button disabled={isLoading}>
    {isLoading ? 'Loading...' : 'Submit'}
  </button>
</form>
```

### 2. Filter with Query Params
```typescript
// +page.server.ts
const filter = url.searchParams.get('filter') || 'all';

// +page.svelte
<a href="/todos?filter=active">Active</a>
```

### 3. Ownership Check
```typescript
const todo = await locals.db
  .selectFrom('todos')
  .select('user_id')
  .where('id', '=', todoId)
  .executeTakeFirst();

if (!todo || todo.user_id !== locals.user.id) {
  return fail(403, { error: 'Forbidden' });
}
```

---

## Next Steps

Sekarang kamu sudah memahami pola dasar membuat fitur dengan LayangKit. Coba:

1. **Tambahkan edit todo** - Update title yang sudah ada
2. **Drag & drop reorder** - Urutkan todos
3. **Due dates** - Tambahkan deadline
4. **Categories/Tags** - Organize dengan label

---

[Back to Creating Features](/guide/creating-features) | [Database Guide](/guide/database-d1)
