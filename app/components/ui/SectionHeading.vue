<script setup lang="ts">
defineProps<{
  number: string;
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="mb-8 md:mb-12">
    <span class="text-sm font-medium text-foreground/30 font-dm-mono">
      {{ number }}
    </span>
    <h2 class="font-space-grotesk text-3xl md:text-4xl font-bold text-foreground mt-2">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-foreground/50 font-dm-sans mt-2 text-base">
      {{ subtitle }}
    </p>
  </div>
</template>
