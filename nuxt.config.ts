// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:8000',
    },
  },
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/google-fonts',
  ],
  css: ['~/assets/scss/main.scss'],
  googleFonts: {
    families: {
      Jura: true,
      Roboto: true,
      Inter: true,
      'Crimson Pro': {
        wght: '200..900',
        ital: '200..700',
      }
    }
  }
  // elementPlus: { /** Options */ }
})

