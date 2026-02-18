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
      { text: 'GitHub', link: 'https://github.com/Layang-Kit/layang-app' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Start Here',
          items: [
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Deployment', link: '/guide/deployment' },
          ]
        },
        {
          text: 'AI Workflow',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/guide/ai-first-development' },
            { text: 'How to Use', link: '/guide/workflow-setup' },
          ]
        },
        {
          text: 'Configuration',
          collapsed: true,
          items: [
            { text: 'Environment Variables', link: '/guide/environment-variables' },
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
            { text: 'Email (Resend)', link: '/guide/resend-email' },
            { text: 'S3 Storage', link: '/guide/cloudflare-r2' },
          ]
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Glossary', link: '/reference/glossary' },
          ]
        }
      ],
      '/troubleshooting/': [
        {
          text: 'Troubleshooting',
          items: [
            { text: 'Database', link: '/troubleshooting/database' },
            { text: 'Authentication', link: '/troubleshooting/authentication' },
            { text: 'Deployment', link: '/troubleshooting/deployment' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Layang-Kit/layang-app' }
    ],
    
    footer: {
      message: 'LayangKit - AI-Native Starter',
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
