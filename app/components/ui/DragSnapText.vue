<script lang="ts">
interface DragSnapTextProps {
  /** The text to display */
  text?: string;
  /** Whether to show the grid overlay. Defaults to true */
  showGrid?: boolean;
  /** Array of typing messages to cycle through */
  typingMessages: string[];
}

export interface DragSnapTextSlots {
  default(props: {}): any;
}
</script>

<script setup lang="ts">
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import SplitText from "gsap/SplitText";

import { info } from "#shared/data/portfolio";

const props = withDefaults(defineProps<DragSnapTextProps>(), {
  showGrid: true,
});
const slots = defineSlots<DragSnapTextSlots>();

const { playKeySound } = useTypingSound();

const messageIndex = ref(0);
const typingMessage = computed(
  () => props.typingMessages[messageIndex.value % props.typingMessages.length],
);

const dragTargetEl = useTemplateRef("drag-target");
const gridOverlayEl = useTemplateRef("grid-overlay");
const gridAligningOverlayEl = useTemplateRef("grid-aligning-overlay");
const cursorTipRef = ref<{
  cursorTipEl: HTMLElement | null;
  typingEl: HTMLElement | null;
  typingTextEl: HTMLElement | null;
} | null>(null);

function relBounding(source: DOMRect, target: DOMRect, offsetX = 0, offsetY = 0) {
  return {
    x: `+=${source.x - target.x + offsetX}`,
    y: `+=${source.y - target.y + offsetY}`,
  };
}

function centerOffset(source: DOMRect, target: DOMRect) {
  return relBounding(source, target, source.width / 2, source.height / 2);
}

let ctx: gsap.Context | undefined;

onMounted(() => {
  const tip = cursorTipRef.value;
  if (!dragTargetEl.value || !gridOverlayEl.value || !tip?.cursorTipEl) return;

  ctx = gsap.context(() => {
    if (props.showGrid) {
      gsap.to(gridOverlayEl.value, { opacity: 1 });
    }

    gsap.set(gridAligningOverlayEl.value, {
      display: "none",
    });

    Draggable.create(dragTargetEl.value, {
      type: "x,y",
      bounds: "body",
      inertia: true,
      dragResistance: 0.5,
      onDragStart() {
        if (props.showGrid) {
          gsap.to(gridOverlayEl.value, { opacity: 0 });
        }
      },
      onThrowComplete() {
        const split = SplitText.create(tip.typingTextEl, { type: "chars" });

        gsap.set(tip.typingEl, { opacity: 0 });

        const tl = gsap.timeline();

        tl.to(tip.cursorTipEl, {
          ...centerOffset(
            dragTargetEl.value!.getBoundingClientRect(),
            tip.cursorTipEl!.getBoundingClientRect(),
          ),
          duration: 1,
        });

        tl.to(tip.cursorTipEl, {
          x: (_, target) =>
            centerOffset(
              gridOverlayEl.value!.getBoundingClientRect(),
              target.getBoundingClientRect(),
            ).x,
          y: (_, target) =>
            centerOffset(
              gridOverlayEl.value!.getBoundingClientRect(),
              target.getBoundingClientRect(),
            ).y,
          duration: 0.3,
        });

        tl.to(dragTargetEl.value, { x: 0, y: 0, duration: 0.3 });

        tl.fromTo(
          gridAligningOverlayEl.value,
          {
            display: "block",
            opacity: 1,
          },
          {
            opacity: 0,
            delay: 0.5,
          },
        );

        tl.to(tip.typingEl, {
          opacity: 1,
        });

        split.chars.forEach((char) => {
          tl.fromTo(
            char,
            { autoAlpha: 0, display: "none" },
            {
              display: "inline-block",
              autoAlpha: 1,
              duration: 0.05,
              onComplete: () => playKeySound(),
            },
          );
        });

        tl.to(tip.typingEl, {
          opacity: 0,
          delay: 1,
        });

        tl.to(tip.cursorTipEl, {
          x: 0,
          y: 0,
        });

        tl.to(gridAligningOverlayEl.value, {
          display: "none",
        });

        if (props.showGrid) {
          tl.to(gridOverlayEl.value, { opacity: 1 });
        }

        tl.call(() => {
          messageIndex.value++;
          split.revert();
        });
      },
    });
  });
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<template>
  <div class="relative">
    <div ref="drag-target" class="w-fit uppercase">
      <slot>
        <span v-if="props.text !== undefined && props.text !== null">
          {{ props.text }}
        </span>
      </slot>
    </div>

    <div
      v-if="props.showGrid"
      ref="grid-overlay"
      class="p-1 border border-dashed border-muted absolute inset-0 -z-1 opacity-0"
    >
      <div
        ref="grid-overlay-text"
        class="w-fit px-1 py-0.5 rounded-xs text-[10px] text-background bg-foreground absolute left-0 -top-1 -translate-y-full"
      >
        DRAG TO MOVE
      </div>
    </div>

    <div
      ref="grid-aligning-overlay"
      class="border border-primary opacity-0 absolute inset-0 *:bg-primary *:absolute"
    >
      <div class="size-1 -left-1 -top-1" />
      <div class="size-1 -right-1 -top-1" />
      <div class="size-1 -left-1 -bottom-1" />
      <div class="size-1 -right-1 -bottom-1" />
      <div
        class="px-1 py-0.5 font-space-grotesk text-background text-xs font-bold rounded-xs -translate-y-[calc(100%+4px)]"
      >
        Aligning to Grid...
      </div>
    </div>

    <UiCursorTip
      ref="cursorTipRef"
      :name="`${info.firstName} ${info.lastName}`"
      :message="typingMessage"
    />
  </div>
</template>
