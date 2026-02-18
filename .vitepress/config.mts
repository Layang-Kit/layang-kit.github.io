import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "LayangKit",
  description: "AI-Native full-stack starter — SvelteKit + Cloudflare + AI Agents",
  lang: 'id-ID',
  lastUpdated: true,
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/guide/quick-start' },
      { text: 'AI Agents', link: '/guide/ai-first-development' },
      { text: 'GitHub', link: 'https://github.com/Layang-Kit/layang-app' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Quick Start', link: '/guide/quick-start' },
          ]
        },
        {
          text: 'AI Agents',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/guide/ai-first-development' },
            { text: 'How to Use', link: '/guide/workflow-setup' },
          ]
        },
        {
          text: 'Creating Features',
          collapsed: true,
          items: [
            { text: 'Guide', link: '/guide/creating-features' },
            { text: 'First Feature: Todo List', link: '/guide/first-feature' },
          ]
        },
        {
          text: 'Configuration',
          collapsed: true,
          items: [
            { text: 'Environment', link: '/guide/environment-variables' },
            { text: 'Database', link: '/guide/database-d1' },
            { text: 'Authentication', link: '/guide/authentication' },
            { text: 'File Upload', link: '/guide/file-uploads' },
          ]
        },
        {
          text: 'Integrations',
          collapsed: true,
          items: [
            { text: 'Google OAuth', link: '/guide/google-oauth' },
            { text: 'Email', link: '/guide/resend-email' },
            { text: 'S3 Storage', link: '/guide/cloudflare-r2' },
          ]
        },
        {
          text: 'Deployment',
          collapsed: false,
          items: [
            { text: 'Deploy to Production', link: '/guide/deployment' },
          ]
        },
      ],
      '/troubleshooting/': [
        {
          text: 'Troubleshooting',
          items: [
            { text: 'Database', link: '/troubleshooting/database' },
            { text: 'Auth', link: '/troubleshooting/authentication' },
            { text: 'Deploy', link: '/troubleshooting/deployment' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Layang-Kit/layang-app' }
    ],
    
    footer: {
      message: 'LayangKit',
      copyright: 'Copyright 2026'
    },
    
    search: {
      provider: 'local'
    },
    
    outline: {
      level: [2, 3]
    }
  }
})
