<script setup lang="ts">
import { info } from "#shared/data/portfolio";

const typingMessages = [
  "Hey... that tickles",
  "Okay that was NOT an accident",
  "Bro my pixels are CRYING right now",
  "Please... I just aligned everything",
  "I give up... do whatever you want",
  "Wait you're actually still going?",
  "The layout is literally shaking rn",
  "This is personal at this point",
  "I'm telling the other components",
  "...I'll just rebuild it tomorrow",
];
</script>

<template>
  <section
    ref="section"
    class="w-full h-screen pt-20 flex flex-col items-center justify-center gap-6 overflow-hidden font-space-grotesk text-7xl md:text-8xl lg:text-9xl text-foreground font-bold relative before:-top-px after:-bottom-px bg-[radial-gradient(var(--pattern-foreground)_1.5px,transparent_0)] bg-size-[20px_20px] bg-center [--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5"
  >
    <p class="text-sm text-foreground/50 font-dm-mono text-center">
      NAVIGATING THE UNKNOWN, PIXEL BY PIXEL
    </p>

    <UiDragSnapText :text="info.firstName" :typing-messages="typingMessages" />

    <UiDragSnapText :typing-messages="typingMessages">
      <span class="text-transparent" style="-webkit-text-stroke: 1.5px var(--color-foreground)">
        {{ info.lastName }}
      </span>
    </UiDragSnapText>

    <div class="flex flex-col items-center">
      <p class="text-xl md:text-2xl font-space-grotesk text-primary font-medium">
        {{ info.title }}
      </p>
      <p class="text-base md:text-lg text-foreground/60 font-dm-sans mt-3 max-w-md">
        {{ info.tagline }}
      </p>
    </div>
  </section>
</template>
