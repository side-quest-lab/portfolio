<script setup lang="ts">
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import InertiaPlugin from "gsap/InertiaPlugin";
import SplitText from "gsap/SplitText";

onMounted(() => {
  gsap.registerPlugin(
    Draggable,
    ScrollSmoother,
    ScrollTrigger,
    ScrollToPlugin,
    InertiaPlugin,
    SplitText,
  );
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
