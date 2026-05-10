<script setup lang="ts">
interface Props {
  name: string;
  message: string;
}

defineProps<Props>();

const cursorTipEl = ref<HTMLElement | null>(null);
const typingEl = ref<HTMLElement | null>(null);
const typingTextEl = ref<HTMLElement | null>(null);

defineExpose({
  cursorTipEl,
  typingEl,
  typingTextEl,
});
</script>

<template>
  <div ref="cursorTipEl" class="absolute top-[-100vh] left-[-100vw]">
    <svg width="16" height="20" viewBox="0 0 14 18" fill="none">
      <path d="M0.5 0.5L13 10.5H5.5L2.5 17.5L0.5 0.5Z" class="fill-primary" />
    </svg>

    <div class="mx-4 space-y-1 text-background font-bold">
      <div class="w-fit px-1 py-0.5 bg-primary text-xs font-space-grotesk rounded-xs">
        {{ name }}
      </div>

      <div
        ref="typingEl"
        class="w-fit px-2.5 py-0.5 bg-primary text-sm rounded-b-lg rounded-e-lg font-dm-mono"
      >
        <span ref="typingTextEl">{{ message }}</span>
      </div>
    </div>
  </div>
</template>
