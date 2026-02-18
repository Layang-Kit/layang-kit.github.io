import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "LayangKit",
  description: "AI-Native full-stack starter — SvelteKit + Cloudflare + AI Agents. From idea to production in hours.",
  lang: 'id-ID',
  lastUpdated: true,
  
  ignoreDeadLinks: [
    /^http://localhost/,
  ],
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/guide/quick-start' },
      { text: 'GitHub', link: 'https://github.com/Layang-Kit/layang-app' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Project Setup', link: '/guide/getting-started' },
            { text: 'Deployment', link: '/guide/deployment' },
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Project Structure', link: '/guide/project-structure' },
            { text: 'Database', link: '/guide/database-d1' },
          ]
        },
        {
          text: 'AI Agent Workflow',
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
            { text: 'Common Mistakes', link: '/reference/common-mistakes' },
          ]
        },
        {
          text: 'Advanced',
          collapsed: true,
          items: [
            { text: 'Performance', link: '/reference/performance' },
            { text: 'Security', link: '/reference/security' },
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
            { text: 'File Upload', link: '/troubleshooting/upload' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Layang-Kit/layang-app' }
    ],
    
    footer: {
      message: 'From idea to production — with AI Agents',
      copyright: 'Copyright 2026 LayangKit'
    },
    
    search: {
      provider: 'local'
    },
    
    outline: {
      level: [2, 3]
    },
    
    editLink: {
      pattern: 'https://github.com/Layang-Kit/layang-app/edit/main/docs/:path'
    }
  }
})
