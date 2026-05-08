<script setup lang="ts">
import type { Skill } from "~~/shared/types";

defineProps<{
  skill: Skill;
}>();
</script>

<template>
  <div
    class="bg-foreground/5 rounded-xl p-4 border border-foreground/5 hover:border-foreground/10 hover:bg-foreground/[0.07] transition-colors"
  >
    <h4 class="font-space-grotesk font-medium text-foreground text-sm mb-3">
      {{ skill.name }}
    </h4>

    <div class="flex items-center gap-1.5 mb-2">
      <span
        v-for="i in 5"
        :key="i"
        class="w-2.5 h-2.5 rounded-full transition-colors"
        :class="i <= skill.level ? 'bg-primary' : 'bg-foreground/10'"
      />
    </div>

    <span class="text-xs text-foreground/40 font-dm-mono">
      {{ skill.yearsOfExperience }} {{ skill.yearsOfExperience === 1 ? "year" : "years" }}
    </span>
  </div>
</template>
