import gsap from "gsap";

export function useScrollAnimations() {
  const rootRef = ref<HTMLElement | null>(null);
  let ctx: gsap.Context | undefined;

  onMounted(() => {
    if (!rootRef.value) return;

    ctx = gsap.context(() => {
      const elements = rootRef.value!.querySelectorAll(".animate-in");
      if (elements.length === 0) return;

      gsap.from(elements, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.value,
          start: "top 85%",
          once: true,
        },
      });
    }, rootRef.value);
  });

  onBeforeUnmount(() => {
    ctx?.revert();
  });

  return { rootRef };
}
