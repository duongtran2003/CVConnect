// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon-icon.svg" }],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://26.9.175.39:8888/api/v1"
    }
  },
  css: ["~/assets/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "~/assets/colors.scss";@import "~/assets/_mixin.scss";',
        },
      },
    },
  },
});
