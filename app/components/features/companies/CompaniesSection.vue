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
    gsap.from(".company-row", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
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
  <section ref="sectionRef" id="companies" class="py-16 md:py-24">
    <SectionHeading number="02" title="WORKED WITH" />

    <div class="border-t border-foreground/10">
      <div
        class="hidden md:grid grid-cols-12 gap-4 py-3 px-4 text-xs font-dm-mono text-foreground/30 uppercase tracking-wider"
      >
        <span class="col-span-5">Company</span>
        <span class="col-span-4">Role</span>
        <span class="col-span-3">Period</span>
      </div>

      <a
        v-for="exp in experience"
        :key="exp.id"
        :href="exp.website"
        target="_blank"
        rel="noopener noreferrer"
        class="company-row grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-5 px-4 border-t border-foreground/5 hover:bg-foreground/5 transition-colors group cursor-pointer"
      >
        <div class="col-span-5 flex items-center gap-3">
          <img
            :src="exp.logo"
            :alt="exp.company"
            class="w-6 h-6 rounded object-contain"
            loading="lazy"
          />
          <span
            class="font-space-grotesk font-medium text-foreground group-hover:text-primary transition-colors"
          >
            {{ exp.company }}
          </span>
        </div>

        <div class="col-span-4 flex items-center">
          <span class="text-sm text-foreground/60 font-dm-sans">{{ exp.position }}</span>
        </div>

        <div class="col-span-3 flex items-center">
          <span class="text-sm text-foreground/40 font-dm-mono">
            {{ formatDate(exp.startDate) }} —
            {{ exp.endDate ? formatDate(exp.endDate) : "Present" }}
          </span>
        </div>
      </a>
    </div>
  </section>
</template>
