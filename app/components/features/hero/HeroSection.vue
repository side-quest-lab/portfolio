<script setup lang="ts">
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import SplitText from "gsap/SplitText";

import { USER } from "#shared/data/portfolio";

const messages = [
  "Let's keep it centered... please!",
  "Bruhh... stop breaking my layout.",
  "Again?? We just fixed this.",
  "I'm telling the CSS on you.",
  "That's it. I'm locking position next update.",
  "This is NOT a team-building exercise.",
  "My alignment is crying right now.",
  "Congratulations, you found the only interactive thing here.",
  "The grid was perfectly fine before you showed up.",
  "Error 404: patience not found.",
];

const messageIndex = ref(0);
const typingMessage = computed(() => messages[messageIndex.value % messages.length] ?? "");

const firstNameRef = useTemplateRef("hero-first-name");
const lastNameRef = useTemplateRef("hero-last-name");

const { playKeySound } = useTypingSound();

const firstNameRect = useWindowBounding(firstNameRef);
const lastNameRect = useWindowBounding(lastNameRef);

let ctx: gsap.Context | undefined;
let tl = gsap.timeline({
  delay: 2,
});

watch(
  [firstNameRect.width, firstNameRect.height, firstNameRect.x, firstNameRect.y],
  ([width, height, x, y]) => {
    gsap.set(".drag-hint", {
      width,
      height,
      x: x,
      y: y,
    });
  },
);

onMounted(() => {
  const firstNameEl = firstNameRef.value;
  const lastNameEl = lastNameRef.value;

  if (firstNameEl && lastNameEl) {
    ctx = gsap.context(() => {
      tl.from(firstNameEl.querySelector("div"), {
        y: "100%",
        ease: "sine.inOut",
      });

      tl.from(
        lastNameEl.querySelector("div"),
        {
          y: "100%",
          ease: "sine.inOut",
        },
        "-=0.2",
      );

      tl.fromTo(
        ".drag-hint",
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        "+=1",
      );

      const firstDraggable = Draggable.create(firstNameEl, {
        type: "x,y",
        bounds: "#hero",
        inertia: true,
        onDragStart() {
          lastDraggable?.disable();
          gsap.to(".drag-hint", {
            opacity: 0,
          });
        },
        onThrowComplete() {
          const split = SplitText.create(".cursor-message", {
            tag: "span",
            type: "chars",
            onSplit: function (self) {
              gsap.set(self.chars, { autoAlpha: 0, display: "none" });
            },
          });

          tl.call(function () {
            firstDraggable?.disable();
          });
          tl.fromTo(
            ".snap-grid",
            {
              width: firstNameRect.width.value,
              height: firstNameRect.height.value,
              x: firstNameRect.x.value,
              y: firstNameRect.y.value,
              opacity: 0,
            },
            {
              opacity: 1,
            },
          );
          tl.to(".drag-cursor", {
            x: function (_, target) {
              const rect = firstNameEl.getBoundingClientRect();
              const { x } = target.getBoundingClientRect();
              return `+=${rect.x - x + rect.width / 2}`;
            },
            y: function (_, target) {
              const rect = firstNameEl.getBoundingClientRect();
              const { y } = target.getBoundingClientRect();
              return `+=${rect.y - y + rect.height / 2}`;
            },
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          });
          tl.to(".drag-cursor", {
            x: `${firstNameRect.x.value + firstNameRect.width.value / 2}`,
            y: `${firstNameRect.y.value + firstNameRect.height.value / 2}`,
            ease: "elastic.out(1, 0.5)",
          });
          tl.to(firstNameEl, { x: 0, y: 0, duration: 0.3 });
          tl.to(".cursor-bubble", { autoAlpha: 1 });
          tl.to(
            split.chars,
            {
              display: "inline",
              autoAlpha: 1,
              duration: 0,
              stagger: {
                each: 0.05,
                onComplete: function () {
                  playKeySound();
                },
              },
              onComplete: function () {
                split.revert();
              },
            },
            "+=0.5",
          );
          tl.to(".cursor-bubble", { autoAlpha: 0 }, "+=1");
          tl.to(".snap-grid", { opacity: 0 });
          tl.to(".drag-cursor", {
            x: function (_, target) {
              const rect = target.getBoundingClientRect();
              return `-${rect.width}`;
            },
            y: function (_, target) {
              const rect = target.getBoundingClientRect();
              return `-${rect.height}`;
            },
          });
          tl.to(".drag-hint", {
            opacity: 1,
          });
          tl.call(function () {
            messageIndex.value++;
            firstDraggable?.enable();
            lastDraggable?.enable();
          });
        },
      })[0];

      const lastDraggable = Draggable.create(lastNameEl, {
        type: "x,y",
        bounds: "#hero",
        inertia: true,
        onDragStart() {
          firstDraggable?.disable();
        },
        onThrowComplete() {
          tl = gsap.timeline({
            onComplete() {
              messageIndex.value++;
              firstDraggable?.enable();
              lastDraggable?.enable();
            },
          });

          const split = SplitText.create(".cursor-message", {
            tag: "span",
            type: "chars",
            onSplit: function (self) {
              gsap.set(self.chars, { autoAlpha: 0, display: "none" });
            },
          });

          tl.call(function () {
            lastDraggable?.disable();
          });
          tl.fromTo(
            ".snap-grid",
            {
              width: lastNameRect.width.value,
              height: lastNameRect.height.value,
              x: lastNameRect.x.value,
              y: lastNameRect.y.value,
              opacity: 0,
            },
            {
              opacity: 1,
            },
          );
          tl.to(".drag-cursor", {
            x: function (_, target) {
              const rect = lastNameEl.getBoundingClientRect();
              const { x } = target.getBoundingClientRect();
              return `+=${rect.x - x + rect.width / 2}`;
            },
            y: function (_, target) {
              const rect = lastNameEl.getBoundingClientRect();
              const { y } = target.getBoundingClientRect();
              return `+=${rect.y - y + rect.height / 2}`;
            },
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          });
          tl.to(".drag-cursor", {
            x: `${lastNameRect.x.value + lastNameRect.width.value / 2}`,
            y: `${lastNameRect.y.value + lastNameRect.height.value / 2}`,
            ease: "elastic.out(1, 0.5)",
          });
          tl.to(lastNameEl, { x: 0, y: 0, duration: 0.3 });
          tl.to(".cursor-bubble", { autoAlpha: 1 });
          tl.to(
            split.chars,
            {
              display: "inline",
              autoAlpha: 1,
              duration: 0,
              stagger: {
                each: 0.05,
                onComplete: function () {
                  playKeySound();
                },
              },
              onComplete: function () {
                split.revert();
              },
            },
            "+=0.5",
          );
          tl.to(".cursor-bubble", { autoAlpha: 0 }, "+=1");
          tl.to(".snap-grid", { opacity: 0 });
          tl.to(".drag-cursor", {
            x: function (_, target) {
              const rect = target.getBoundingClientRect();
              return `-${rect.width}`;
            },
            y: function (_, target) {
              const rect = target.getBoundingClientRect();
              return `-${rect.height}`;
            },
          });
        },
      })[0];
    });
  }
});

onBeforeUnmount(() => {
  tl?.revert();
  ctx?.revert();
});
</script>

<template>
  <section
    id="hero"
    class="w-full h-screen pt-20 flex flex-col items-center justify-center gap-8 overflow-hidden font-space-grotesk text-foreground relative before:-top-px after:-bottom-px bg-[radial-gradient(var(--pattern-foreground)_1.5px,transparent_0)] bg-size-[20px_20px] bg-center [--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5"
  >
    <p class="text-sm text-foreground/50 font-dm-mono">NAVIGATING THE UNKNOWN, PIXEL BY PIXEL</p>

    <div ref="hero-first-name" id="hero-first-name" class="w-fit uppercase overflow-hidden z-10">
      <div class="font-bold text-7xl md:text-9xl lg:text-[180px]">{{ USER.firstName }}</div>
    </div>

    <div ref="hero-last-name" id="hero-last-name" class="w-fit uppercase overflow-hidden z-10">
      <div
        class="text-7xl md:text-9xl lg:text-[180px] text-transparent [-webkit-text-stroke:1.5px_var(--color-foreground)] font-bold"
      >
        {{ USER.lastName }}
      </div>
    </div>

    <p class="text-xl md:text-2xl font-dm-sans text-foreground/50">
      {{ USER.jobTitle }}
    </p>

    <div
      class="drag-hint bg-muted/15 border border-dashed border-foreground/50 absolute left-0 top-0"
    >
      <div
        class="w-fit px-1 py-0.5 rounded-xs text-[10px] text-background font-semibold bg-foreground absolute left-1/2 -top-1 -translate-x-1/2 -translate-y-full"
      >
        DRAG TO MOVE
      </div>
    </div>

    <div class="snap-grid bg-primary/5 border border-primary absolute left-0 top-0 opacity-0">
      <div class="size-1 bg-primary absolute left-0 top-0" />
      <div class="size-1 bg-primary absolute right-0 top-0" />
      <div class="size-1 bg-primary absolute left-0 bottom-0" />
      <div class="size-1 bg-primary absolute right-0 bottom-0" />
      <div
        class="px-1 py-0.5 bg-primary absolute text-background text-xs font-bold rounded-xs -translate-y-[calc(100%+4px)]"
      >
        Aligning to Grid...
      </div>
    </div>

    <div class="drag-cursor w-fit max-w-[calc(50vw)] absolute top-0 left-0 -translate-full z-10000">
      <UIcon name="i-icons:cursor" class="block text-base text-primary" />

      <div
        class="w-fit px-1 py-0.5 mx-4 mt-1 text-background font-bold bg-primary text-xs font-space-grotesk rounded-xs"
      >
        {{ USER.displayName }}
      </div>

      <div
        class="cursor-bubble opacity-0 w-fit max-w-full px-2.5 py-0.5 mx-4 mt-1 text-background font-bold bg-primary text-sm rounded-b-lg rounded-e-lg font-dm-mono"
      >
        <p>
          <span class="cursor-message">
            {{ typingMessage }}
          </span>
          <span
            class="typing-cursor animate-blink inline-block w-0.5 h-[1em] bg-background align-middle -translate-y-px"
          ></span>
        </p>
      </div>
    </div>
  </section>
</template>
