<script setup lang="ts">
import { info, socialLinks } from "#shared/data/portfolio";
</script>

<template>
  <footer class="border-t border-foreground/10 py-12 px-6">
    <div class="max-w-7xl mx-auto text-foreground space-y-6">
      <h2 class="font-space-grotesk text-4xl font-bold">
        LET'S
        <span
          class="max-w-fit uppercase text-transparent"
          style="-webkit-text-stroke: 1.5px var(--color-foreground)"
          >TALK.</span
        >
      </h2>

      <a :href="`mailto:${info.email}`" class="inline-block text-sm font-dm-mono">
        {{ info.email }}
      </a>

      <div class="flex items-center gap-4">
        <UButton
          v-for="link in socialLinks"
          :key="link.platform"
          :icon="link.icon"
          variant="link"
          :to="link.url"
          target="_blank"
          class="text-foreground"
        />
      </div>

      <p class="text-sm font-dm-mono text-foreground/60">
        &copy; 2026 {{ info.firstName }} {{ info.lastName }}
      </p>
    </div>
  </footer>
</template>
