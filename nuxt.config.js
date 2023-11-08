export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ['~/assets/tailwind.css'],
  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  pwa: {
    /* PWA options */
  }
})