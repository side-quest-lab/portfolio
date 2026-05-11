<script lang="ts">
interface GridAligningOverlayProps {
  label?: string;
  target?: HTMLElement | null;
}
</script>

<script setup lang="ts">
import gsap from "gsap";

const props = withDefaults(defineProps<GridAligningOverlayProps>(), {
  label: "Aligning to Grid...",
});

const { width, height } = useWindowSize();
const el = useTemplateRef("el");

let ctx: gsap.Context | undefined;

function attach(target: HTMLElement) {
  const targetRect = target.getBoundingClientRect();

  return gsap.set(el.value, {
    display: "none",
    width: targetRect.width,
    height: targetRect.height,
    x: targetRect.x,
    y: targetRect.y,
    opacity: 0,
  });
}

onMounted(() => {
  nextTick(() => {
    if (props.target) {
      attach(props.target);
    }
  });
});

watch([width, height], () => {
  if (props.target) {
    attach(props.target);
  }
});

function flash(fromVars?: gsap.TweenVars, toVars?: gsap.TweenVars) {
  return gsap.fromTo(
    el.value,
    { ...fromVars, display: "block", opacity: 1 },
    { ...toVars, opacity: 0, delay: 0.5 },
  );
}

function hide(vars?: gsap.TweenVars) {
  return gsap.to(el.value, { ...vars, display: "none" });
}

defineExpose({ flash, hide });
</script>

<template>
  <div ref="el" class="border border-primary fixed left-0 top-0 *:bg-primary *:absolute">
    <div class="size-1 -left-1 -top-1" />
    <div class="size-1 -right-1 -top-1" />
    <div class="size-1 -left-1 -bottom-1" />
    <div class="size-1 -right-1 -bottom-1" />
    <div
      class="px-1 py-0.5 font-space-grotesk text-background text-xs font-bold rounded-xs -translate-y-[calc(100%+4px)]"
    >
      {{ props.label }}
    </div>
  </div>
</template>
