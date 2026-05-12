import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/mdc"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "gsap",
        "gsap/ScrollTrigger",
        "gsap/ScrollSmoother",
        "gsap/ScrollToPlugin",
        "gsap/Draggable",
        "gsap/InertiaPlugin",
        "gsap/SplitText",
      ],
    },
  },
  icon: {
    customCollections: [
      {
        prefix: "icons",
        dir: "app/assets/icons",
      },
    ],
  },
  colorMode: {
    preference: "dark",
  },
});
