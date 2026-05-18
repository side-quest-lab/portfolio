<script setup lang="ts">
import gsap from "gsap";

import { EXPERIENCES } from "#shared/data/portfolio";
</script>

<template>
  <section ref="section" id="experience">
    <Panel label="Experience">
      <template #body>
        <div
          v-for="experience in EXPERIENCES"
          :key="experience.id"
          class="exp-row grid grid-cols-[1fr_auto] items-center border-t border-foreground/6 px-6 sm:px-10 cursor-none"
          style="padding-top: 2rem; padding-bottom: 2rem"
        >
          <span
            class="exp-name text-3xl sm:text-4xl md:text-[3.6rem] font-space-grotesk font-bold text-foreground leading-tight"
          >
            {{ experience.companyName }}
          </span>
          <span
            class="text-xs font-dm-mono text-foreground/50 uppercase tracking-wider whitespace-nowrap"
          >
            {{ experience.positions[0]?.employmentType }}
          </span>
        </div>
      </template>
    </Panel>
  </section>
</template>
