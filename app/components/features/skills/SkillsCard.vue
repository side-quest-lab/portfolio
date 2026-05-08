<script setup lang="ts">
import type { Skill } from "#shared/types";

defineProps<{
  skill: Skill;
}>();
</script>

<template>
  <div
    class="group relative bg-foreground/3 rounded-2xl p-5 border border-foreground/5 hover:border-primary/20 hover:bg-foreground/6 transition-all duration-300"
  >
    <div class="flex items-center gap-4 mb-4">
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
        :style="{ backgroundColor: `${skill.icon.color}15` }"
      >
        <UIcon :name="skill.icon.name" class="w-6 h-6" :style="{ color: skill.icon.color }" />
      </div>

      <div class="min-w-0">
        <h4 class="font-space-grotesk font-semibold text-foreground text-sm truncate">
          {{ skill.name }}
        </h4>
        <span class="text-xs text-foreground/40 font-dm-mono">
          {{ skill.yearsOfExperience }}
          {{ skill.yearsOfExperience === 1 ? "year" : "years" }}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-1">
      <span
        v-for="i in 5"
        :key="i"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="[
          i <= skill.level ? 'bg-primary' : 'bg-foreground/10',
          i === 1 ? 'w-6' : i === 2 ? 'w-5' : i === 3 ? 'w-4' : i === 4 ? 'w-3' : 'w-2',
        ]"
      />
    </div>
  </div>
</template>
