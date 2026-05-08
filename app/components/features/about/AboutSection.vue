<script setup lang="ts">
import gsap from "gsap";
import { personalInfo } from "~~/shared/data/portfolio";

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    gsap.from(".about-heading", {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
      },
    });

    gsap.from(".about-content", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 75%",
      },
    });
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<template>
  <section ref="sectionRef" id="about" class="py-16 md:py-24">
    <span class="font-space-grotesk text-sm text-foreground/30 font-dm-mono block mb-4"> 06 </span>

    <h2
      class="about-heading font-space-grotesk text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl leading-tight mb-8"
    >
      THE DEVELOPER BEHIND THE APPS.
    </h2>

    <div class="about-content max-w-2xl">
      <p class="text-foreground/60 font-dm-sans text-base md:text-lg leading-relaxed mb-8">
        {{ personalInfo.bio }}
      </p>

      <a
        :href="personalInfo.resumeUrl"
        download
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-600 text-white font-space-grotesk font-medium rounded-lg transition-colors"
      >
        <UIcon name="i-lucide-download" class="w-4 h-4" />
        DOWNLOAD RESUME
      </a>
    </div>
  </section>
</template>
