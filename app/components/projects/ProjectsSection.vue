<script setup lang="ts">
import { PROJECTS } from "#shared/data/portfolio";

const maxVisible = ref(6);
const showAll = ref(false);

const visibleProjects = computed(() => {
  return PROJECTS.slice(0, maxVisible.value);
});

const hasMore = computed(() => PROJECTS.length > maxVisible.value);

const moreProjects = computed(() => PROJECTS.slice(maxVisible.value));
</script>

<template>
  <Panel
    id="work"
    label="Featured Work"
    :ui="{
      root: 'space-y-10',
      body: 'space-y-5',
    }"
  >
    <template #body>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        <ProjectsCard
          v-for="(project, index) in visibleProjects"
          :key="project.id"
          :project="project"
          :no="index + 1"
        />
      </div>

      <UCollapsible
        v-model:open="showAll"
        :ui="{
          content: 'grid sm:grid-cols-2 md:grid-cols-3 gap-5',
        }"
      >
        <template #content>
          <ProjectsCard
            v-for="(project, index) in moreProjects"
            :key="project.id"
            :project="project"
            :no="index + maxVisible + 1"
          />
        </template>
      </UCollapsible>

      <div v-if="hasMore" class="mx-auto w-fit">
        <UButton
          :label="!showAll ? 'Show more' : 'Show less'"
          :trailing-icon="!showAll ? 'i-lucide:chevron-down' : 'i-lucide:chevron-up'"
          color="neutral"
          variant="subtle"
          @click="showAll = !showAll"
        />
      </div>
    </template>
  </Panel>
</template>
