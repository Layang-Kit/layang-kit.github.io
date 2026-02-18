# Tutorial 1: Hello World

Build aplikasi pertama dengan LayangKit.

## Tujuan

- Setup project
- Buat route sederhana
- Tampilkan "Hello World"
- Deploy ke Cloudflare

## Prerequisite

- Node.js 18+ terinstall
- Akun Cloudflare (gratis)

## Step 1: Create Project

```bash
npm create layang@latest hello-world
cd hello-world
npm install
```

## Step 2: Setup Database

```bash
# Login ke Cloudflare
npx wrangler login

# Buat database
npx wrangler d1 create hello-world-db

# Copy database_id ke wrangler.toml
```

## Step 3: Buat Route

Edit `src/routes/+page.svelte`:

```svelte
<script>
  let name = $state('World');
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
  <div class="card text-center p-8">
    <h1 class="text-4xl font-bold mb-4">Hello {name}!</h1>
    <p class="text-slate-600 mb-6">Welcome to LayangKit</p>
    
    <input 
      bind:value={name}
      placeholder="Enter your name"
      class="input text-center"
    />
  </div>
</div>
```

## Step 4: Jalankan

```bash
npm run db:migrate:local
npm run dev
```

Buka http://localhost:5173

Coba ketik nama di input — reaktivitas Svelte 5 langsung terasa!

## Step 5: Deploy

```bash
npm run build
npm run deploy
```

Tunggu 1-2 menit, lalu buka URL yang diberikan.

## 🎉 Selamat!

Aplikasi pertama Anda sudah live di edge! 🚀

## Next

[Lanjut ke Tutorial 2: Todo App](./02-todo-app)
