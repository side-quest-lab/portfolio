<script setup lang="ts">
defineProps<{
  project: Project;
}>();
</script>

<template>
  <div
    class="project-card group relative overflow-hidden rounded-2xl border border-white/4 bg-white/2 transition-all duration-500 hover:border-white/8 hover:bg-white/4 lg:rounded-3xl"
  >
    <div class="flex flex-col lg:flex-row">
      <div class="order-1 flex items-center p-4 lg:order-2 lg:w-[58%] lg:p-6">
        <div
          class="max-h-52 relative aspect-video w-full overflow-hidden rounded-xl bg-linear-to-br from-foreground/5 via-accent/5 to-foreground/10 transition-all duration-700 group-hover:from-foreground/10 group-hover:via-accent/10 lg:rounded-2xl"
        >
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="h-full w-full object-cover"
            loading="lazy"
          />
          <div v-else class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <UIcon name="i-lucide-layout" class="mx-auto h-16 w-16 text-foreground/6" />
              <p class="text-xs font-dm-mono uppercase text-foreground/8">Preview</p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="order-2 flex flex-col justify-between gap-8 p-8 lg:order-1 lg:w-[42%] lg:gap-10 lg:p-10 xl:p-12"
      >
        <div>
          <span
            v-if="project.category"
            class="mb-4 inline-block text-[11px] font-dm-mono uppercase tracking-[0.15em] text-foreground/40"
          >
            {{ project.category }}
          </span>
          <h3
            class="mb-4 font-space-grotesk text-2xl font-bold leading-[1.1] tracking-tight text-foreground lg:text-3xl xl:text-[2.25rem]"
          >
            {{ project.title }}
          </h3>
          <p
            v-if="project.description"
            class="text-sm leading-relaxed text-foreground/50 font-dm-sans lg:text-base"
          >
            {{ project.description }}
          </p>

          <div v-if="project.stacks.length" class="mt-5 hidden flex-wrap gap-1.5 lg:flex">
            <span
              v-for="tech in project.stacks.slice(0, 4)"
              :key="tech"
              class="inline-flex items-center rounded-full border border-white/6 bg-white/2 px-2.5 py-0.5 text-[10px] font-dm-mono uppercase tracking-wider text-foreground/40"
            >
              {{ tech }}
            </span>
            <span
              v-if="project.stacks.length > 4"
              class="inline-flex items-center text-[10px] font-dm-mono text-foreground/30"
            >
              +{{ project.stacks.length - 4 }}
            </span>
          </div>
        </div>

        <div>
          <div
            v-if="project.stats && project.stats.length"
            class="mb-8 flex flex-wrap gap-x-8 gap-y-4"
          >
            <div v-for="stat in project.stats" :key="stat.label" class="flex flex-col">
              <UIcon
                v-if="stat.icon"
                :name="stat.icon"
                class="mb-2 h-5 w-5 text-foreground/30 lg:mb-1 lg:hidden"
              />
              <div class="mb-1 font-space-grotesk text-3xl font-bold text-foreground lg:text-4xl">
                {{ stat.value }}
              </div>
              <div
                class="max-w-35 text-[10px] leading-tight font-dm-mono uppercase tracking-[0.15em] text-foreground/40"
              >
                {{ stat.label }}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <UButton
              v-if="project.link"
              label="View Live Demo"
              trailing-icon="i-lucide:arrow-right"
              color="neutral"
              variant="link"
              :to="project.link"
              target="_blank"
              :ui="{
                trailingIcon: 'size-3',
              }"
            />

            <UButton
              label="Source"
              trailing-icon="i-lucide:external-link"
              color="neutral"
              variant="link"
              :to="project.repo"
              target="_blank"
              :ui="{
                trailingIcon: 'size-3',
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
