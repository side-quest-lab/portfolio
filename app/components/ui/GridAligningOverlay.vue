<script lang="ts">
interface GridAligningOverlayProps {
  label?: string;
}

interface GridAligningOverlayExposes {
  flash: (fromVars?: gsap.TweenVars, toVars?: gsap.TweenVars) => gsap.core.Tween;
  hide: (vars?: gsap.TweenVars) => gsap.core.Tween;
}
</script>

<script setup lang="ts">
import gsap from "gsap";

const props = withDefaults(defineProps<GridAligningOverlayProps>(), {
  label: "Aligning to Grid...",
});

const el = useTemplateRef("el");

let ctx: gsap.Context | undefined;

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.set(el.value, { display: "none" });
  });
});

onBeforeUnmount(() => {
  ctx?.revert();
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

defineExpose<GridAligningOverlayExposes>({ flash, hide });
</script>

<template>
  <div ref="el" class="border border-primary opacity-0 absolute inset-0 *:bg-primary *:absolute">
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
