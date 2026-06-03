<script setup lang="ts">
import { TECH_STACK } from "#shared/data/portfolio";

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
</script>

<template>
  <Panel
    id="skills"
    label="Skills & Expertise"
    :ui="{
      root: 'space-y-10',
      body: 'space-y-8',
    }"
  >
    <template #body>
      <div v-for="group in groupedSkills" :key="group.category">
        <h3 class="text-xs font-dm-mono uppercase tracking-wider text-foreground/40 mb-3">
          {{ group.category }}
        </h3>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <SkillsCard v-for="skill in group.skills" :key="skill.key" :skill="skill" />
        </div>
      </div>
    </template>
  </Panel>
</template>
