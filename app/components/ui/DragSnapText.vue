<script lang="ts">
interface DragSnapTaxtProps {
  /** The text to display */
  text: string;
}
</script>

<script setup lang="ts">
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import SplitText from "gsap/SplitText";

import { info } from "#shared/data/portfolio";

const props = defineProps<DragSnapTaxtProps>();

const { playKeySound } = useTypingSound();

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

const messageIndex = ref(0);
const typingMessage = computed(() => typingMessages[messageIndex.value % typingMessages.length]);

const dragTargetEl = useTemplateRef("drag-target");
const gridOverlayEl = useTemplateRef("grid-overlay");
const gridAligningOverlayEl = useTemplateRef("grid-aligning-overlay");
const cursorTipEl = useTemplateRef("cursor-tip");
const typingEl = useTemplateRef("typing");
const typingTextEl = useTemplateRef("typing-text");

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
  if (dragTargetEl.value && gridOverlayEl.value && cursorTipEl.value) {
    ctx = gsap.context(() => {
      gsap.to(gridOverlayEl.value, {
        opacity: 1,
      });

      gsap.set(gridAligningOverlayEl.value, {
        display: "none",
      });

      Draggable.create(dragTargetEl.value, {
        type: "x,y",
        bounds: "body",
        inertia: true,
        dragResistance: 0.5,
        onDragStart() {
          gsap.to(gridOverlayEl.value, { opacity: 0 });
        },
        onThrowComplete() {
          const split = SplitText.create(typingTextEl.value, { type: "chars" });

          gsap.set(typingEl.value, { opacity: 0 });

          const tl = gsap.timeline();

          tl.to(cursorTipEl.value, {
            ...centerOffset(
              dragTargetEl.value!.getBoundingClientRect(),
              cursorTipEl.value!.getBoundingClientRect(),
            ),
            duration: 1,
          });

          tl.to(cursorTipEl.value, {
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

          tl.to(typingEl.value, {
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

          tl.to(typingEl.value, {
            opacity: 0,
            delay: 1,
          });

          tl.to(cursorTipEl.value, {
            x: 0,
            y: 0,
          });

          tl.to(gridAligningOverlayEl.value, {
            display: "none",
          });

          tl.to(gridOverlayEl.value, { opacity: 1 });

          tl.call(() => {
            messageIndex.value++;
            split.revert();
          });
        },
      });
    });
  }
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<template>
  <div class="relative">
    <div ref="drag-target" class="w-fit uppercase">
      {{ props.text }}
    </div>

    <div
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

    <div ref="cursor-tip" class="absolute top-[-100vh] left-[-100vw]">
      <svg width="16" height="20" viewBox="0 0 14 18" fill="none">
        <path d="M0.5 0.5L13 10.5H5.5L2.5 17.5L0.5 0.5Z" class="fill-primary" />
      </svg>

      <div class="mx-4 space-y-1 text-background font-bold">
        <div class="w-fit px-1 py-0.5 bg-primary text-xs font-space-grotesk rounded-xs">
          {{ info.firstName }} {{ info.lastName }}
        </div>

        <div
          ref="typing"
          class="w-fit px-2.5 py-0.5 bg-primary text-sm rounded-b-lg rounded-e-lg font-dm-mono"
        >
          <span ref="typing-text">{{ typingMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
