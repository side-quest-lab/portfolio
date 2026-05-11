<script setup lang="ts">
import gsap from "gsap";

interface Props {
  minDuration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  minDuration: 2000,
});

const emit = defineEmits<{
  complete: [];
}>();

const progress = ref(0);
const loadingRef = useTemplateRef("loading");

let tl: gsap.core.Timeline | undefined;

onMounted(() => {
  tl = gsap.timeline({
    onComplete: () => {
      emit("complete");
    },
  });

  tl.to(loadingRef.value, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
  });

  tl.to(
    progress,
    {
      value: 100,
      duration: props.minDuration / 1000,
      ease: "power2.inOut",
      onUpdate: () => {
        progress.value = Math.round(progress.value);
      },
    },
    "<",
  );

  tl.to(loadingRef.value, {
    display: "none",
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
  });
});

onBeforeUnmount(() => {
  tl?.revert();
});
</script>

<template>
  <div
    ref="loading"
    class="fixed inset-0 z-9999 bg-background flex items-end justify-end p-8 md:p-12 lg:p-16"
  >
    <span
      class="font-space-grotesk text-foreground text-6xl md:text-8xl lg:text-9xl font-bold tabular-nums"
    >
      {{ progress }}%
    </span>
  </div>
</template>
