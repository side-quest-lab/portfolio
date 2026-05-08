<script setup lang="ts">
import gsap from "gsap";
import { experience } from "~~/shared/data/portfolio";

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;

function formatDate(date: string): string {
  if (date === "current") return "Present";
  const parts = date.split("-");
  const year = parts[0] ?? "";
  const month = parts[1] ?? "01";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[Number.parseInt(month) - 1]} ${year}`;
}

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
  <section ref="sectionRef" id="experience" class="py-16 md:py-24">
    <SectionHeading number="04" title="EXPERIENCE" />

    <div class="space-y-6">
      <div
        v-for="exp in experience"
        :key="exp.id"
        class="experience-card bg-foreground/5 rounded-xl p-6 md:p-8 border border-foreground/5 hover:border-foreground/10 transition-colors"
      >
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div class="flex items-center gap-3">
            <img
              :src="exp.logo"
              :alt="exp.company"
              class="w-8 h-8 rounded object-contain"
              loading="lazy"
            />
            <div>
              <h3 class="font-space-grotesk font-bold text-foreground text-lg">
                {{ exp.company }}
              </h3>
              <p class="text-primary font-medium text-sm">{{ exp.position }}</p>
            </div>
          </div>

          <span class="text-sm text-foreground/40 font-dm-mono whitespace-nowrap">
            {{ formatDate(exp.startDate) }} —
            {{ exp.endDate ? formatDate(exp.endDate) : "Present" }}
          </span>
        </div>

        <p class="text-foreground/60 font-dm-sans text-sm md:text-base mb-4">
          {{ exp.description }}
        </p>

        <div class="flex flex-wrap gap-2">
          <TechPill v-for="tech in exp.technologies" :key="tech" :name="tech" />
        </div>
      </div>
    </div>
  </section>
</template>
