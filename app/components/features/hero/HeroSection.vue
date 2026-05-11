<script setup lang="ts">
import { info } from "#shared/data/portfolio";

const messages = [
  "Let's keep it centered... please!",
  "Bruhh... stop breaking my layout.",
  "Again?? We just fixed this.",
  "I'm telling the CSS on you.",
  "That's it. I'm locking position next update.",
  "This is NOT a team-building exercise.",
  "My alignment is crying right now.",
  "Congratulations, you found the only interactive thing here.",
  "The grid was perfectly fine before you showed up.",
  "Error 404: patience not found.",
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

    <DragSnapText :text="info.firstName" :typing-messages="messages.slice(0, 5)" />

    <DragSnapText :typing-messages="messages.slice(5, 10)" :overlay="false">
      <span class="text-transparent" style="-webkit-text-stroke: 1.5px var(--color-foreground)">
        {{ info.lastName }}
      </span>
    </DragSnapText>

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
