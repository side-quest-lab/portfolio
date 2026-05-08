<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <span
    class="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-dm-sans font-medium"
  >
    {{ name }}
  </span>
</template>
