<script setup lang="ts">
import gsap from "gsap";
import type { Project } from "~~/shared/types";

defineProps<{
  project: Project;
  index: number;
}>();

function parseAchievement(text: string): {
  value: string;
  label: string;
  direction: "up" | "down";
} {
  const numberMatch = text.match(/(\d[\d,]*\.?\d*[%+x]?)/i);
  const value = numberMatch?.[1] ?? "";
  const rest = text.replace(numberMatch?.[0] ?? "", "").trim();
  const direction =
    text.toLowerCase().includes("reduction") || text.toLowerCase().includes("reduced")
      ? "down"
      : "up";
  return { value, label: rest.replace(/^[-–—]\s*/, ""), direction };
}
</script>

<template>
  <div
    :class="[
      'project-card group',
      project.featured
        ? 'bg-foreground/5 rounded-2xl p-6 md:p-8 border border-foreground/5 hover:border-primary/30 transition-colors'
        : 'bg-foreground/3 rounded-xl p-5 border border-foreground/5 hover:border-foreground/10 transition-colors',
    ]"
  >
    <div
      :class="[project.featured ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'flex flex-col gap-4']"
    >
      <div
        :class="[
          'relative overflow-hidden rounded-xl',
          project.featured ? 'aspect-video' : 'aspect-video',
        ]"
      >
        <div
          v-if="!project.imageUrl.startsWith('http')"
          class="absolute inset-0 bg-linear-to-br from-foreground/10 to-foreground/5 flex items-center justify-center"
        >
          <span class="font-space-grotesk text-lg font-bold text-foreground/20">
            {{ project.title }}
          </span>
        </div>
        <img
          v-else
          :src="project.imageUrl"
          :alt="project.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div class="flex flex-col justify-center">
        <span class="text-xs font-dm-mono uppercase text-primary tracking-wider mb-2">
          {{ project.category }}
        </span>

        <h3 class="font-space-grotesk text-xl md:text-2xl font-bold text-foreground mb-3">
          {{ project.title }}
        </h3>

        <p class="text-foreground/60 font-dm-sans text-sm md:text-base mb-4 line-clamp-3">
          {{ project.description }}
        </p>

        <div v-if="project.featured" class="flex flex-wrap gap-6 mb-4">
          <UiMetricBadge
            v-for="(achievement, i) in project.achievements.slice(0, 3)"
            :key="i"
            v-bind="parseAchievement(achievement)"
          />
        </div>

        <div class="flex flex-wrap gap-2 mb-4">
          <UiTechPill v-for="tech in project.techStack" :key="tech" :name="tech" />
        </div>

        <a
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm font-space-grotesk text-primary hover:text-primary-400 transition-colors group/link"
        >
          VIEW PROJECT
          <span class="group-hover/link:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  </div>
</template>
