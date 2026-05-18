<script setup lang="ts">
import type { TechStack } from "#shared/types";

defineProps<{
  skill: TechStack;
}>();
</script>

<template>
  <a
    :href="skill.href"
    target="_blank"
    rel="noopener noreferrer"
    class="group relative bg-foreground/3 rounded-2xl p-5 border border-foreground/5 hover:border-primary/20 hover:bg-foreground/6 transition-all duration-300"
  >
    <div class="flex items-center gap-4">
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
        :style="skill.color ? { backgroundColor: `${skill.color}15` } : {}"
      >
        <UIcon :name="skill.icon" class="w-6 h-6" :style="{ color: skill.color || undefined }" />
      </div>

      <div class="min-w-0">
        <h4 class="font-space-grotesk font-semibold text-foreground text-sm truncate">
          {{ skill.title }}
        </h4>
      </div>
    </div>
  </a>
</template>
