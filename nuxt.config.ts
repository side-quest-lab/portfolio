import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@vueuse/nuxt"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["gsap", "gsap/ScrollTrigger", "gsap/ScrollSmoother", "gsap/ScrollToPlugin"],
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        class: "dark",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  site: {
    name: "Chhunhak Chhoeung",
    description:
      "Mobile Application Developer specializing in React Native, Flutter, and modern web technologies.",
    defaultLocale: "en",
  },
});
