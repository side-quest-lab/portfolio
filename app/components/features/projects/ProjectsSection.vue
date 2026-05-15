<script setup lang="ts">
import { PROJECTS } from "#shared/data/portfolio";
</script>

<template>
  <Panel
    id="work"
    label="Featured Work"
    :ui="{
      root: 'space-y-10',
      body: 'space-y-10',
    }"
  >
    <template #body>
      <FeaturesProjectsCard
        v-for="(project, index) in PROJECTS"
        :key="project.id"
        :project="project"
        :index="index"
        class="last:mb-0"
      />
    </template>
  </Panel>
</template>
