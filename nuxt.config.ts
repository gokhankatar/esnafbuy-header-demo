export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: 'image/x-icon',
          href: "/favicon.ico"
        }
      ]
    }
  }
});