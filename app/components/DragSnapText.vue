<script lang="ts">
interface DragSnapTextProps {
  /** The text to display */
  text?: string;
  /** Whether to show the grid overlay.
   * @default true
   */
  overlay?: boolean;
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

import { USER } from "#shared/data/portfolio";

const props = withDefaults(defineProps<DragSnapTextProps>(), {
  overlay: true,
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
let snapTimeline: gsap.core.Timeline | undefined;

onMounted(() => {
  const gridOverlay = gridOverlayRef.value;
  const gridAligningOverlay = gridAligningOverlayRef.value;
  const tip = cursorTipRef.value;
  const dragTarget = dragTargetRef.value;

  if (!dragTarget || !gridOverlay || !gridAligningOverlay || !tip) return;

  ctx = gsap.context(() => {
    gsap.registerPlugin(Draggable);

    if (props.overlay) {
      gridOverlay.show();
    }

    Draggable.create(dragTarget, {
      type: "x,y",
      bounds: "body",
      inertia: true,
      dragResistance: 0.5,
      onDragStart() {
        snapTimeline?.kill();
        snapTimeline = undefined;

        gridOverlay.hide();
      },
      onThrowComplete() {
        snapTimeline = gsap.timeline({
          defaults: {
            overwrite: "auto",
          },
          onComplete() {
            messageIndex.value++;
            snapTimeline = undefined;
          },
        });

        snapTimeline.add(tip.moveToElement(dragTarget, { duration: 1 }));
        snapTimeline.add(tip.moveToElement(gridOverlay.$el, { duration: 0.3 }));
        snapTimeline.to(dragTarget, { x: 0, y: 0, duration: 0.3 });
        snapTimeline.add(gridAligningOverlay.flash());
        snapTimeline.add(tip.showTyping());
        snapTimeline.add(tip.typeMessage(playKeySound));
        snapTimeline.add(tip.hideTyping());
        snapTimeline.add(tip.reset());
        snapTimeline.add(gridAligningOverlay.hide());

        if (props.overlay) {
          snapTimeline.add(gridOverlay.show());
        }
      },
    });
  });
});

onBeforeUnmount(() => {
  snapTimeline?.revert();
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

    <GridOverlay ref="grid-overlay" :target="dragTargetRef" />

    <GridAligningOverlay ref="grid-aligning-overlay" :target="dragTargetRef" />

    <CursorTip
      ref="cursor-tip"
      :name="`${USER.firstName} ${USER.lastName}`"
      :message="typingMessage"
    />
  </div>
</template>
