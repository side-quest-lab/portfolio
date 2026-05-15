import type { MaybeComputedElementRef } from "@vueuse/core";

/**
 * Reactive bounding box of an HTML element. Updates on window resize.
 *
 * @param target
 */
export function useWindowBounding(target: MaybeComputedElementRef) {
  const height = shallowRef(0);
  const bottom = shallowRef(0);
  const left = shallowRef(0);
  const right = shallowRef(0);
  const top = shallowRef(0);
  const width = shallowRef(0);
  const x = shallowRef(0);
  const y = shallowRef(0);

  function update() {
    const el = unrefElement(target);

    if (!el) {
      height.value = 0;
      bottom.value = 0;
      left.value = 0;
      right.value = 0;
      top.value = 0;
      width.value = 0;
      x.value = 0;
      y.value = 0;
      return;
    }

    const rect = el.getBoundingClientRect();

    height.value = rect.height;
    bottom.value = rect.bottom;
    left.value = rect.left;
    right.value = rect.right;
    top.value = rect.top;
    width.value = rect.width;
    x.value = rect.x;
    y.value = rect.y;
  }

  watch(
    () => unrefElement(target),
    (ele) => !ele && update(),
  );
  useEventListener("resize", update, { passive: true });

  tryOnMounted(() => {
    update();
  });

  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update,
  };
}
