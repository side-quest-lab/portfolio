<script setup lang="ts">
import { SOCIAL_LINKS, USER } from "#shared/data/portfolio";
</script>

<template>
  <footer class="border-t border-foreground/10 py-12 px-6">
    <div class="max-w-7xl mx-auto text-foreground space-y-6">
      <h2 class="font-space-grotesk text-4xl font-bold">
        LET'S
        <span
          class="max-w-fit uppercase text-transparent [-webkit-text-stroke:1.5px_var(--color-foreground)]"
          >TALK.</span
        >
      </h2>

      <a :href="`mailto:${decodeEmail(USER.email)}`" class="inline-block text-sm font-dm-mono">
        {{ decodeEmail(USER.email) }}
      </a>

      <div class="flex items-center gap-4">
        <UButton
          v-for="link in SOCIAL_LINKS"
          :key="link.title"
          :icon="link.icon"
          variant="link"
          :to="link.href"
          target="_blank"
          class="text-foreground"
        />
      </div>

      <p class="text-sm font-dm-mono text-foreground/60">
        &copy; 2026 {{ USER.firstName }} {{ USER.lastName }}
      </p>
    </div>
  </footer>
</template>
