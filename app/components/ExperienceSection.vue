<script setup lang="ts">
import gsap from "gsap";

import { EXPERIENCES } from "#shared/data/portfolio";

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;
const hoverTweens = new Map<HTMLElement, gsap.core.Tween>();

function onMouseEnter(e: MouseEvent) {
  hoverTweens.get(e.currentTarget as HTMLElement)?.play();
}

function onMouseLeave(e: MouseEvent) {
  hoverTweens.get(e.currentTarget as HTMLElement)?.reverse();
}

onMounted(() => {
  if (!sectionRef.value) return;
  ctx = gsap.context(() => {
    gsap.from(".exp-name", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      scrollTrigger: {
        trigger: "#experience",
        start: "top 80%",
        end: "top 0%",
        toggleActions: "play none none none",
        scrub: 0.5,
      },
    });

    sectionRef.value!.querySelectorAll(".exp-row").forEach((row) => {
      hoverTweens.set(
        row as HTMLElement,
        gsap.to(row.querySelectorAll(".exp-name"), {
          x: 8,
          paused: true,
          duration: 0.2,
        }),
      );
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section id="experience" ref="sectionRef">
    <Panel label="Experience">
      <template #body>
        <div
          class="mt-16 mb-4 text-xs text-foreground/50 uppercase font-dm-mono grid grid-cols-[1fr_20%]"
        >
          <p>Company</p>
          <p>Position</p>
        </div>

        <div
          v-for="experience in EXPERIENCES"
          :key="experience.id"
          class="exp-row group py-8 grid grid-cols-[1fr_20%] items-center border-t border-foreground/6 cursor-none"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
        >
          <span
            class="exp-name text-3xl sm:text-4xl md:text-[3.6rem] font-space-grotesk font-bold text-foreground/50 leading-tight group-hover:text-secondary-200 transition-colors duration-200"
          >
            {{ experience.companyName }}
          </span>
          <span
            class="exp-position text-xs font-dm-mono text-foreground/50 uppercase tracking-wider whitespace-nowrap"
          >
            {{ experience.positions[0]?.employmentType }}
          </span>
        </div>
      </template>
    </Panel>
  </section>
</template>
