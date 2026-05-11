<script lang="ts">
interface DragSnapTextProps {
  /** The text to display */
  text?: string;
  /** Whether to show the grid overlay.
   * @default true
   */
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

import { info } from "#shared/data/portfolio";

const props = withDefaults(defineProps<DragSnapTextProps>(), {
  showGrid: true,
});
const slots = defineSlots<DragSnapTextSlots>();

const { playKeySound } = useTypingSound();

const messageIndex = ref(0);
const typingMessage = computed(
  () => props.typingMessages[messageIndex.value % props.typingMessages.length] as string,
);

const dragTargetRef = useTemplateRef("drag-target");
const gridOverlayRef = useTemplateRef("grid-overlay");
const gridAligningOverlayRef = useTemplateRef("grid-aligning-overlay");
const cursorTipRef = useTemplateRef("cursor-tip");

let ctx: gsap.Context | undefined;

onMounted(() => {
  const gridOverlay = gridOverlayRef.value;
  const gridAligningOverlay = gridAligningOverlayRef.value;
  const tip = cursorTipRef.value;

  if (!dragTargetRef.value || !gridOverlay || !gridAligningOverlay || !tip) return;

  const gridOverlayEl = gridOverlay.$el;

  ctx = gsap.context(() => {
    if (props.showGrid) {
      gridOverlay.show();
    }

    Draggable.create(dragTargetRef.value, {
      type: "x,y",
      bounds: "body",
      inertia: true,
      dragResistance: 0.5,
      onDragStart() {
        gridOverlay.hide();
      },
      onThrowComplete() {
        const tl = gsap.timeline();

        tl.add(tip.moveToElement(dragTargetRef.value!, { duration: 1 }));

        if (gridOverlayEl) {
          tl.add(tip.moveToElement(gridOverlayEl, { duration: 0.3 }));
        }

        tl.to(dragTargetRef.value, { x: 0, y: 0, duration: 0.3 });
        tl.add(gridAligningOverlay.flash());
        tl.add(tip.showTyping());
        tl.add(tip.typeMessage(playKeySound));
        tl.add(tip.hideTyping());
        tl.add(tip.reset());
        tl.add(gridAligningOverlay.hide());

        if (props.showGrid) {
          tl.add(gridOverlay.show());
        }

        tl.call(() => {
          messageIndex.value++;
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

    <UiGridOverlay ref="grid-overlay" class="opacity-0" />

    <UiGridAligningOverlay ref="grid-aligning-overlay" />

    <UiCursorTip
      ref="cursor-tip"
      :name="`${info.firstName} ${info.lastName}`"
      :message="typingMessage"
    />
  </div>
</template>
