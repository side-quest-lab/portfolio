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
    class="group flex items-center gap-3 p-3 border border-muted/50 hover:border-primary hover:bg-primary/10 transition-all rounded-lg"
  >
    <div
      class="shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-colors"
      :style="skill.color ? { backgroundColor: `${skill.color}15` } : {}"
    >
      <UIcon :name="skill.icon" class="w-4 h-4" :style="{ color: skill.color || undefined }" />
    </div>
    <span class="text-sm font-dm-mono text-foreground/70 group-hover:text-foreground truncate">
      {{ skill.title }}
    </span>
  </a>
</template>
