export default defineNuxtConfig({
  vite: {
    vue: {
      template: {
        compilerOptions: {
          // Tell Vite that all components starting with "nostr-" are web components
          isCustomElement: (tag) => tag.startsWith('nostr-')
        }
      }
    }
  },
  ssr: false,

  app: {
    pageTransition: {
      name: 'layout',
      mode: 'out-in'
    },
    head: {
      title: 'Nuxstr',
      viewport: 'initial-scale=1, viewport-fit=cover, width=device-width'
    }
  },

  css: ['~/assets/tailwind.css'],

  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  pwa: {
    /* PWA options */
    registerType: 'autoUpdate',
    manifest: {
      name: 'Nuxstr',
      short_name: 'Nuxstr',
      theme_color: '#ffffff'
    },
    client: {
      installPrompt: true
    }
  },

  compatibilityDate: '2024-08-15'
})