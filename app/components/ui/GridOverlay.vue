<script lang="ts">
interface GridOverlayProps {
  label?: string;
}

interface GridOverlayExposes {
  show: (vars?: gsap.TweenVars) => gsap.core.Tween;
  hide: (vars?: gsap.TweenVars) => gsap.core.Tween;
}
</script>

<script setup lang="ts">
import gsap from "gsap";

const props = withDefaults(defineProps<GridOverlayProps>(), {
  label: "DRAG TO MOVE",
});

const el = useTemplateRef("el");

function show(vars?: gsap.TweenVars) {
  return gsap.to(el.value, { ...vars, opacity: 1 });
}

function hide(vars?: gsap.TweenVars) {
  return gsap.to(el.value, { ...vars, opacity: 0 });
}

defineExpose<GridOverlayExposes>({ show, hide });
</script>

<template>
  <div ref="el" class="p-1 border border-dashed border-muted absolute inset-0 -z-1 opacity-0">
    <div
      class="w-fit px-1 py-0.5 rounded-xs text-[10px] text-background bg-foreground absolute left-0 -top-1 -translate-y-full"
    >
      {{ props.label }}
    </div>
  </div>
</template>
