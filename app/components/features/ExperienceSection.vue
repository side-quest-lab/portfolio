<script setup lang="ts">
import gsap from "gsap";
import { EXPERIENCES } from "#shared/data/portfolio";

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    gsap.from(".experience-card", {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
      },
    });
  }, sectionRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<template>
  <section ref="sectionRef" id="experience">
    <UiSectionHeading number="04" title="EXPERIENCE" />

    <div class="space-y-6">
      <div
        v-for="exp in EXPERIENCES"
        :key="exp.id"
        class="experience-card bg-foreground/5 rounded-xl p-6 md:p-8 border border-foreground/5 hover:border-foreground/10 transition-colors"
      >
        <div v-for="position in exp.positions" :key="position.id" class="mb-6 last:mb-0">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded flex items-center justify-center bg-foreground/10">
                <UIcon :name="position.icon" class="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 class="font-space-grotesk font-bold text-foreground text-lg">
                  {{ exp.companyName }}
                  <a
                    v-if="exp.companyWebsite"
                    :href="exp.companyWebsite"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary/60 hover:text-primary transition-colors"
                  >
                    <UIcon name="i-lucide-external-link" class="w-3 h-3 inline-block ml-1" />
                  </a>
                </h3>
                <p class="text-primary font-medium text-sm">{{ position.title }}</p>
                <span
                  v-if="position.employmentType"
                  class="text-xs text-foreground/40 font-dm-mono"
                >
                  {{ position.employmentType }}
                </span>
              </div>
            </div>

            <span class="text-sm text-foreground/40 font-dm-mono whitespace-nowrap">
              {{ position.employmentPeriod.start }} —
              {{ position.employmentPeriod.end ?? "Present" }}
            </span>
          </div>

          <p
            v-if="position.description"
            class="text-foreground/60 font-dm-sans text-sm md:text-base mb-4 whitespace-pre-line"
          >
            {{ position.description }}
          </p>

          <div v-if="position.skills" class="flex flex-wrap gap-2">
            <UiTechPill v-for="tech in position.skills" :key="tech" :name="tech" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
