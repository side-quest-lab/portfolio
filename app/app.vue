<script setup lang="ts">
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

useHead({
  title: "Chhunhak Chhoeung — Mobile Application Developer",
  meta: [
    {
      name: "description",
      content:
        "Mobile Application Developer specializing in React Native, Flutter, and modern web technologies. Building innovative mobile experiences with cutting-edge technologies.",
    },
    {
      name: "keywords",
      content:
        "mobile developer, react native, flutter, next.js, typescript, portfolio, mobile app development",
    },
  ],
});

onMounted(() => {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);
});
</script>

<template>
  <UApp>
    <LoadingScreen />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
