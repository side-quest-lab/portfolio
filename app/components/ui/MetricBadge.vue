<script setup lang="ts">
defineProps<{
  value: string;
  label: string;
  direction?: "up" | "down";
}>();
</script>

<template>
  <div class="flex flex-col items-start gap-1">
    <span class="font-space-grotesk text-2xl md:text-3xl font-bold text-foreground">
      {{ value }}
    </span>
    <span
      class="text-xs font-dm-mono uppercase tracking-wider"
      :class="direction === 'down' ? 'text-red-400' : 'text-secondary-400'"
    >
      {{ direction === "down" ? "↓" : "↑" }}
      {{ label }}
    </span>
  </div>
</template>
