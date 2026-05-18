<script setup lang="ts">
import gsap from "gsap";
import { TECH_STACK } from "#shared/data/portfolio";

const sectionRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;

const groupedSkills = computed(() => {
  const groups = {} as Record<TechStack["category"], TechStack[]>;
  for (const skill of TECH_STACK) {
    const { category } = skill;
    if (!groups[skill.category]) groups[category] = [];
    groups[category].push(skill);
  }
  return Object.entries(groups).map(([category, items]) => ({
    category,
    skills: items,
  }));
});

onMounted(() => {
  if (!sectionRef.value) return;

  ctx = gsap.context(() => {
    gsap.from(".skill-category", {
      opacity: 0,
      y: 30,
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
  <section ref="sectionRef">
    <UiSectionHeading number="05" title="SKILLS & EXPERTISE" />

    <div class="space-y-10">
      <div v-for="group in groupedSkills" :key="group.category" class="skill-category">
        <h3
          class="font-space-grotesk text-sm font-medium text-foreground/40 uppercase tracking-wider mb-4"
        >
          {{ group.category }}
        </h3>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <FeaturesSkillsCard v-for="skill in group.skills" :key="skill.key" :skill="skill" />
        </div>
      </div>
    </div>
  </section>
</template>
