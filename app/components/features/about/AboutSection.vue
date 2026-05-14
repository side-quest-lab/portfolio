<script setup lang="ts">
import gsap from "gsap";

import { USER } from "#shared/data/portfolio";

let ctx: gsap.Context | undefined;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(".about-image", {
      y: "50%",
      scrollTrigger: {
        trigger: "#about",
        toggleActions: "play none none none",
        scrub: 0.5,
      },
    });
  });
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<template>
  <section id="about" class="max-w-7xl mx-auto px-4 py-4 grid md:grid-cols-2 gap-8">
    <div class="space-y-10">
      <h2
        class="about-heading text-foreground text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold"
      >
        ABOUT
      </h2>

      <h3 class="about-bio text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
        {{ USER.bio }}
      </h3>

      <MDC :value="USER.about" class="about-body md:text-lg" />

      <UButton
        icon="i-lucide:mail"
        label="GET IN TOUCH"
        :to="`mailto:${decodeEmail(USER.email)}`"
        class="about-cta px-6 py-3 font-space-grotesk text-foreground font-medium"
      />
    </div>

    <div class="about-image justify-self-center">
      <img :src="USER.avatar" alt="profile" class="w-md rounded-xl" />
    </div>
  </section>
</template>
