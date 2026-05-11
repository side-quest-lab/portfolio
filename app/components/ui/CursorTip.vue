<script lang="ts">
interface CursorTipProps {
  name: string;
  message: string;
}

interface CursorTipExposes {
  moveToElement: (target: HTMLElement, vars?: gsap.TweenVars | undefined) => gsap.core.Tween;
  showTyping: (vars?: gsap.TweenVars) => gsap.core.Tween;
  hideTyping: (vars?: gsap.TweenVars) => gsap.core.Tween;
  typeMessage: (onKeySound?: () => void) => gsap.core.Tween;
  reset: (vars?: gsap.TweenVars) => gsap.core.Tween;
}
</script>

<script setup lang="ts">
import gsap from "gsap";
import SplitText from "gsap/SplitText";

const props = defineProps<CursorTipProps>();

const cursorTipEl = useTemplateRef("cursorTipEl");
const typingEl = useTemplateRef("typingEl");
const typingTextEl = useTemplateRef("typingTextEl");

function moveToElement(target: HTMLElement, vars?: gsap.TweenVars) {
  const tip = cursorTipEl.value;
  const targetRect = target.getBoundingClientRect();

  gsap.set(tip, {
    width: window.innerWidth - targetRect.right + targetRect.width / 2,
  });

  return gsap.to(tip, {
    ...vars,
    x: function (_, tar) {
      const t = tar.getBoundingClientRect();
      return `+=${targetRect.x - t.x + targetRect.width / 2}`;
    },
    y: function (_, tar) {
      const t = tar.getBoundingClientRect();
      return `+=${targetRect.y - t.y + targetRect.height / 2}`;
    },
  });
}

function showTyping(vars?: gsap.TweenVars) {
  return gsap.to(typingEl.value, { ...vars, opacity: 1, duration: 0 });
}

function hideTyping(vars?: gsap.TweenVars) {
  return gsap.to(typingEl.value, { ...vars, opacity: 0, delay: 1 });
}

function typeMessage(onKeySound?: () => void) {
  const text = typingTextEl.value;
  if (!text) return gsap.to(text, {});

  const split = SplitText.create(text, {
    tag: "span",
    type: "chars",
    smartWrap: true,
    onSplit: function (self) {
      gsap.set(self.chars, { autoAlpha: 0, display: "none" });
    },
  });

  return gsap.to(split.chars, {
    display: "inline",
    autoAlpha: 1,
    duration: 0,
    stagger: 0.05,
    onComplete: function () {
      onKeySound?.();
      split.revert();
    },
  });
}

function reset(vars?: gsap.TweenVars) {
  return gsap.to(cursorTipEl.value, { ...vars, x: 0, y: 0 });
}

defineExpose<CursorTipExposes>({
  moveToElement,
  showTyping,
  hideTyping,
  typeMessage,
  reset,
});
</script>

<template>
  <div ref="cursorTipEl" class="absolute top-[-100vh] left-[-100vw] z-10000">
    <svg width="16" height="20" viewBox="0 0 14 18" fill="none">
      <path d="M0.5 0.5L13 10.5H5.5L2.5 17.5L0.5 0.5Z" class="fill-primary" />
    </svg>

    <div class="mx-4 space-y-1 text-background font-bold">
      <div class="w-fit px-1 py-0.5 bg-primary text-xs font-space-grotesk rounded-xs">
        {{ name }}
      </div>

      <div
        ref="typingEl"
        class="w-fit px-2.5 py-0.5 bg-primary text-sm rounded-b-lg rounded-e-lg font-dm-mono opacity-0"
      >
        <p ref="typingTextEl">{{ message }}</p>
      </div>
    </div>
  </div>
</template>
