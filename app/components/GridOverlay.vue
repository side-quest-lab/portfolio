<script lang="ts">
export interface GridOverlayProps {
  label?: string;
  target?: HTMLElement | null;
}
</script>

<script setup lang="ts">
import gsap from "gsap";

const props = withDefaults(defineProps<GridOverlayProps>(), {
  label: "DRAG TO MOVE",
});

const { width, height } = useWindowSize();
const el = useTemplateRef("el");

function attach(target: HTMLElement) {
  const targetRect = target.getBoundingClientRect();

  return gsap.set(el.value, {
    width: targetRect.width,
    height: targetRect.height,
    x: targetRect.x,
    y: targetRect.y,
    opacity: 0,
  });
}

function show(vars?: gsap.TweenVars) {
  return gsap.to(el.value, { ...vars, opacity: 1 });
}

function hide(vars?: gsap.TweenVars) {
  return gsap.to(el.value, { ...vars, opacity: 0 });
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

defineExpose({ show, hide });
</script>

<template>
  <div ref="el" class="border border-dashed border-muted fixed left-0 top-0 -z-1">
    <div
      class="w-fit px-1 py-0.5 rounded-xs text-[10px] text-background bg-foreground absolute left-0 -top-1 -translate-y-full"
    >
      {{ props.label }}
    </div>
  </div>
</template>
