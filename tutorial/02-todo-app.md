# Tutorial 2: Todo App

Build full CRUD todo app dengan database.

## Tujuan

- Buat tabel database
- Implement CRUD (Create, Read, Update, Delete)
- Gunakan SvelteKit Form Actions
- Style dengan Tailwind

## Final Result

Aplikasi todo dengan:
- ✅ Add todo
- ✅ Mark as complete
- ✅ Delete todo
- ✅ Filter by status
- ✅ Persist ke database

## Step 1: Database Schema

Update `src/lib/db/schema.ts`:

```typescript
export const todos = sqliteTable('todos', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  completed: integer('completed', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'number' })
    .$defaultFn(() => Date.now()),
});
```

Update `src/lib/db/index.ts`:

```typescript
export interface Database {
  // ... existing tables
  
  todos: {
    id: string;
    title: string;
    completed: number;  // 0 or 1
    created_at: number;
  };
}

export type Todo = Database['todos'];
export type NewTodo = Omit<Todo, 'id' | 'created_at'>;
```

Generate dan apply migration:

```bash
npm run db:generate
npm run db:migrate:local
```

## Step 2: Route dengan Load + Actions

Buat `src/routes/todos/+page.server.ts`:

```typescript
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export const load: PageServerLoad = async ({ locals }) => {
  const todos = await locals.db
    .selectFrom('todos')
    .selectAll()
    .orderBy('created_at', 'desc')
    .execute();
  
  return { todos };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const form = await request.formData();
    const title = form.get('title');
    
    if (!title || typeof title !== 'string') {
      return fail(400, { error: 'Title required' });
    }
    
    await locals.db
      .insertInto('todos')
      .values({
        id: nanoid(),
        title,
        completed: 0,
        created_at: Date.now()
      })
      .execute();
    
    return { success: true };
  },
  
  toggle: async ({ request, locals }) => {
    const form = await request.formData();
    const id = form.get('id');
    const completed = form.get('completed') === 'true' ? 1 : 0;
    
    await locals.db
      .updateTable('todos')
      .set({ completed: completed ? 0 : 1 })
      .where('id', '=', id)
      .execute();
    
    return { success: true };
  },
  
  delete: async ({ request, locals }) => {
    const form = await request.formData();
    const id = form.get('id');
    
    await locals.db
      .deleteFrom('todos')
      .where('id', '=', id)
      .execute();
    
    return { success: true };
  }
};
```

## Step 3: Svelte Component

Buat `src/routes/todos/+page.svelte`:

```svelte
<script>
  let { data, form } = $props();
  let filter = $state('all'); // 'all' | 'active' | 'completed'
  
  let filteredTodos = $derived(
    data.todos.filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
  );
</script>

<div class="max-w-2xl mx-auto p-6">
  <h1 class="text-3xl font-bold mb-8">Todo App</h1>
  
  <!-- Add Form -->
  <form method="POST" action="?/create" class="flex gap-2 mb-6">
    <input 
      name="title"
      placeholder="What needs to be done?"
      class="input flex-1"
      required
    />
    <button type="submit" class="btn-primary">Add</button>
  </form>
  
  {#if form?.error}
    <div class="text-red-600 mb-4">{form.error}</div>
  {/if}
  
  <!-- Filters -->
  <div class="flex gap-2 mb-6">
    {#each ['all', 'active', 'completed'] as f}
      <button 
        class="px-3 py-1 rounded {filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-200'}"
        onclick={() => filter = f}
      >
        {f}
      </button>
    {/each}
  </div>
  
  <!-- Todo List -->
  <div class="space-y-2">
    {#each filteredTodos as todo (todo.id)}
      <div class="card flex items-center gap-4 p-4">
        <form method="POST" action="?/toggle" class="flex items-center gap-3 flex-1">
          <input type="hidden" name="id" value={todo.id} />
          <input type="hidden" name="completed" value={todo.completed} />
          
          <button type="submit" class="w-6 h-6 rounded border-2 flex items-center justify-center
            {todo.completed ? 'bg-green-500 border-green-500' : 'border-slate-300'}">
            {#if todo.completed}
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            {/if}
          </button>
          
          <span class="flex-1 {todo.completed ? 'line-through text-slate-400' : ''}">
            {todo.title}
          </span>
        </form>
        
        <form method="POST" action="?/delete">
          <input type="hidden" name="id" value={todo.id} />
          <button type="submit" class="text-red-500 hover:text-red-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </form>
      </div>
    {/each}
  </div>
  
  {#if filteredTodos.length === 0}
    <p class="text-center text-slate-400 py-8">No todos yet!</p>
  {/if}
</div>
```

## Step 4: Test

```bash
npm run dev
```

Buka http://localhost:5173/todos

Test:
- Add todo
- Toggle complete
- Delete todo
- Filter todos

## Step 5: Deploy

```bash
npm run build
npm run deploy
```

## What You Learned

- ✅ Database schema dengan Drizzle
- ✅ Kysely queries (select, insert, update, delete)
- ✅ SvelteKit Load functions
- ✅ SvelteKit Form Actions
- ✅ Svelte 5 Runes ($state, $derived)
- ✅ Progressive enhancement (works without JS!)

## Next Steps

- Add user authentication
- Add due dates
- Add categories
- Deploy dan share!

---

**Selamat! Anda sudah bisa build full CRUD app!** 🎉
