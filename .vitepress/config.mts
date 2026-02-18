import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "LayangKit",
  description: "Edge-first full-stack starter template — SvelteKit + Cloudflare D1 + Drizzle ORM. Cepat deploy ke edge, auth & upload siap pakai.",
  lang: 'id-ID',
  lastUpdated: true,
  
  ignoreDeadLinks: [
    /^http:\/\/localhost/,
  ],
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '🏠 Beranda', link: '/' },
      { text: '🚀 Mulai', link: '/guide/quick-start' },
      { text: '🤖 AI Workflow', link: '/guide/ai-first-development' },
      { text: '📖 Referensi', link: '/reference/glossary' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '🚀 Getting Started',
          collapsed: false,
          items: [
            { text: 'Quick Start (5 menit)', link: '/guide/quick-start' },
            { text: 'Getting Started (Lengkap)', link: '/guide/getting-started' },
            { text: 'Development Flow', link: '/guide/development-flow' },
            { text: 'Features Overview', link: '/guide/features' },
          ]
        },
        {
          text: '🤖 AI Agent Workflow',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/guide/ai-first-development' },
            { text: 'Workflow Setup', link: '/guide/workflow-setup' },
          ]
        },
        {
          text: '🏗️ Arsitektur',
          collapsed: true,
          items: [
            { text: 'Architecture Overview', link: '/guide/architecture' },
            { text: 'Project Structure', link: '/guide/project-structure' },
            { text: 'Database Guide', link: '/guide/database-d1' },
            { text: 'Database Schema', link: '/guide/database-schema' },
            { text: 'SvelteKit Patterns', link: '/guide/sveltekit-patterns' },
          ]
        },
        {
          text: '⚙️ Setup Lanjutan',
          collapsed: true,
          items: [
            { text: 'Environment Variables', link: '/guide/environment-variables' },
            { text: 'Google OAuth', link: '/guide/google-oauth' },
            { text: 'Resend Email', link: '/guide/resend-email' },
            { text: 'S3 Storage (R2, Wasabi, S3)', link: '/guide/cloudflare-r2' },
            { text: 'Customizing Schema', link: '/guide/customizing-schema' },
          ]
        },
        {
          text: '📖 Fitur Detail',
          collapsed: true,
          items: [
            { text: 'Authentication', link: '/guide/authentication' },
            { text: 'File Uploads', link: '/guide/file-uploads' },
            { text: 'Profile Management', link: '/guide/profile-management' },
          ]
        },
        {
          text: '🚀 Deployment',
          collapsed: true,
          items: [
            { text: 'Deploy ke Cloudflare', link: '/guide/deployment' },
          ]
        },
      ],
      '/reference/': [
        {
          text: '📚 Referensi',
          collapsed: false,
          items: [
            { text: 'Glossary', link: '/reference/glossary' },
            { text: 'Common Mistakes', link: '/reference/common-mistakes' },
            { text: 'API Reference', link: '/reference/api-reference' },
          ]
        },
        {
          text: '⚡ Performa & Keamanan',
          collapsed: true,
          items: [
            { text: 'Performance Guide', link: '/reference/performance' },
            { text: 'Security Hardening', link: '/reference/security' },
          ]
        },
        {
          text: '🏛️ Keputusan Arsitektur',
          collapsed: true,
          items: [
            { text: 'Architecture Decision Records', link: '/reference/adr' },
          ]
        }
      ],
      '/troubleshooting/': [
        {
          text: '🐛 Troubleshooting',
          collapsed: false,
          items: [
            { text: 'Database Issues', link: '/troubleshooting/database' },
            { text: 'Authentication Issues', link: '/troubleshooting/authentication' },
            { text: 'Deployment Issues', link: '/troubleshooting/deployment' },
            { text: 'Upload Issues', link: '/troubleshooting/upload' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/maulanashalihin/svelte-kit-cloudflare-starter' }
    ],
    
    footer: {
      message: 'Dari zero ke production dalam 5 menit — 100% gratis 🚀',
      copyright: 'Copyright © 2026'
    },
    
    search: {
      provider: 'local'
    },
    
    outline: {
      level: [2, 3]
    },
    
    editLink: {
      pattern: 'https://github.com/maulanashalihin/svelte-kit-cloudflare-starter/edit/main/docs/:path'
    }
  }
})
