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
          text: 'Getting Started',
          items: [
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Deployment', link: '/guide/deployment' },
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
