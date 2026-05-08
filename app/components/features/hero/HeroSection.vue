<script setup lang="ts">
import gsap from "gsap";
import { personalInfo } from "~~/shared/data/portfolio";

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-number", { opacity: 0, y: 20, duration: 0.6 })
      .from(".hero-name-first", { opacity: 0, y: 80, duration: 0.8 }, "-=0.3")
      .from(".hero-name-last", { opacity: 0, y: 80, duration: 0.8 }, "-=0.5")
      .from(".hero-title", { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
      .from(".hero-tagline", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
      .from(".hero-avatar", { opacity: 0, scale: 0.8, duration: 0.6 }, "-=0.4")
      .from(".hero-hint", { opacity: 0, duration: 0.8 }, "-=0.2");
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <HeroCanvas class="absolute inset-0 z-0" />

    <div class="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <span
        class="hero-number font-space-grotesk text-sm text-foreground/30 font-dm-mono block mb-8"
      >
        01
      </span>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 class="font-space-grotesk font-bold tracking-tight leading-none">
            <span class="hero-name-first block text-7xl md:text-8xl lg:text-9xl text-foreground">
              {{ personalInfo.firstName.toUpperCase() }}
            </span>
            <span
              class="hero-name-last block text-7xl md:text-8xl lg:text-9xl text-foreground/60 mt-2"
            >
              CHHOEUNG
            </span>
          </h1>

          <div class="mt-8">
            <p class="hero-title text-xl md:text-2xl font-space-grotesk text-primary font-medium">
              {{ personalInfo.title }}
            </p>
            <p
              class="hero-tagline text-base md:text-lg text-foreground/60 font-dm-sans mt-3 max-w-md"
            >
              {{ personalInfo.tagline }}
            </p>
          </div>
        </div>

        <div class="flex flex-col items-center lg:items-end gap-6">
          <div
            class="hero-avatar w-32 h-32 md:w-40 md:h-40 rounded-full bg-foreground/10 border-2 border-foreground/20 flex items-center justify-center overflow-hidden"
          >
            <span class="font-space-grotesk text-3xl md:text-4xl font-bold text-foreground/40">
              {{ personalInfo.firstName[0] }}{{ personalInfo.name.split(" ").pop()?.[0] }}
            </span>
          </div>

          <span class="hero-hint font-dm-mono text-xs text-foreground/30 tracking-widest uppercase">
            DRAG TO EXPLORE
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
