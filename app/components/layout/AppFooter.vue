<script setup lang="ts">
import { info, socialLinks } from "#shared/data/portfolio";
</script>

<template>
  <footer id="contact" class="border-t border-foreground/10 py-16 px-6">
    <div class="max-w-7xl mx-auto">
      <h2 class="font-space-grotesk text-4xl md:text-5xl font-bold text-foreground mb-8">
        LET'S TALK.
      </h2>

      <a
        :href="`mailto:${info.email}`"
        class="inline-block text-lg md:text-xl text-primary hover:text-primary-400 transition-colors font-dm-sans mb-12"
      >
        {{ info.email }}
      </a>

      <div class="flex items-center gap-6 mb-12">
        <a
          v-for="link in socialLinks"
          :key="link.platform"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-foreground/40 hover:text-foreground transition-colors"
          :aria-label="link.platform"
        >
          <UIcon
            :name="`i-lucide-${link.icon === 'linkedin' ? 'linkedin' : link.icon === 'github' ? 'github' : link.icon === 'twitter' ? 'twitter' : link.icon === 'mail' ? 'mail' : 'external-link'}`"
            class="w-5 h-5"
          />
        </a>
      </div>

      <p class="text-sm text-foreground/40 font-dm-sans">&copy; 2026 {{ info.name }}</p>
    </div>
  </footer>
</template>
