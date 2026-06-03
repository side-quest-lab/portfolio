<script setup lang="ts">
const props = defineProps<{
  project: Project;
  no: number;
}>();
</script>

<template>
  <div
    class="p-6 space-y-2.5 border border-muted/50 hover:border-primary hover:bg-primary/15 transition-all"
  >
    <div class="flex justify-between flex-wrap gap-4">
      <div class="font-dm-mono text-xs text-primary">
        {{ props.no < 10 ? `0${props.no}` : props.no }}
      </div>

      <div class="flex items-center gap-3">
        <UButton
          v-if="props.project.link"
          icon="i-lucide:external-link"
          size="xs"
          color="neutral"
          variant="link"
          target="_blank"
          :to="props.project.link"
        />
        <UButton
          icon="i-simple-icons:github"
          size="xs"
          color="neutral"
          variant="link"
          :to="props.project.repo"
        />
      </div>
    </div>
    <h2 class="font-space-grotesk font-bold">{{ props.project.title }}</h2>
    <p class="font-dm-mono text-xs text-muted">{{ props.project.description }}</p>
  </div>
</template>
