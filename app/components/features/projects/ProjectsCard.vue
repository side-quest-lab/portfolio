<script setup lang="ts">
import type { Project } from "~~/shared/types";

defineProps<{
  project: Project;
  index: number;
}>();
</script>

<template>
  <div
    class="project-card group bg-foreground/3 rounded-xl p-5 border border-foreground/5 hover:border-foreground/10 transition-colors"
  >
    <div class="flex flex-col gap-4">
      <div v-if="project.logo" class="relative overflow-hidden rounded-xl aspect-video">
        <img
          :src="project.logo"
          :alt="project.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div class="flex flex-col justify-center">
        <h3 class="font-space-grotesk text-xl md:text-2xl font-bold text-foreground mb-2">
          {{ project.title }}
        </h3>

        <span class="text-xs font-dm-mono text-foreground/40 mb-3">
          {{ project.period.start
          }}{{ project.period.end ? ` — ${project.period.end}` : " — Present" }}
        </span>

        <p
          v-if="project.description"
          class="text-foreground/60 font-dm-sans text-sm md:text-base mb-4 line-clamp-3"
        >
          {{ project.description }}
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
          <UiTechPill v-for="tech in project.stacks" :key="tech" :name="tech" />
        </div>

        <div class="flex items-center gap-4">
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm font-space-grotesk text-primary hover:text-primary-400 transition-colors group/link"
          >
            LIVE DEMO
            <span class="group-hover/link:translate-x-1 transition-transform">→</span>
          </a>
          <a
            :href="project.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm font-space-grotesk text-foreground/50 hover:text-foreground transition-colors group/repo"
          >
            SOURCE
            <UIcon name="i-lucide-external-link" class="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
