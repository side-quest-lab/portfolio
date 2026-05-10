<script setup lang="ts">
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";

import { info } from "#shared/data/portfolio";

const headerRef = useTemplateRef("headerRef");
const mobileMenuRef = useTemplateRef("mobileMenuRef");
const mobileMenuOpen = ref(false);
const currentTime = ref("");

const navLinks = [
  { label: "WORK", target: "#work" },
  { label: "EXPERIENCE", target: "#experience" },
  { label: "ABOUT", target: "#about" },
  { label: "CONTACT", target: "#contact" },
];

let timeInterval: ReturnType<typeof setInterval> | undefined;
let ctx: gsap.Context | undefined;
let menuAnimation: gsap.core.Timeline | null = null;

function updateTime() {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Phnom_Penh",
  });
}

function openMenu() {
  if (!mobileMenuRef.value) return;

  menuAnimation?.kill();
  menuAnimation = gsap.timeline();

  menuAnimation
    .set(mobileMenuRef.value, { display: "flex" })
    .fromTo(mobileMenuRef.value, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
    .fromTo(
      mobileMenuRef.value.querySelector("nav")!,
      { x: "100%" },
      { x: 0, duration: 0.3, ease: "power2.out" },
      0,
    )
    .fromTo(
      mobileMenuRef.value.querySelectorAll("a"),
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.2, stagger: 0.05, ease: "power2.out" },
      0.1,
    );
}

function closeMenu() {
  if (!mobileMenuRef.value) return;

  menuAnimation?.kill();
  menuAnimation = gsap.timeline({
    onComplete: () => {
      if (mobileMenuRef.value) {
        gsap.set(mobileMenuRef.value, { display: "none" });
      }
    },
  });

  menuAnimation.to(mobileMenuRef.value, {
    opacity: 0,
    duration: 0.2,
    ease: "power2.in",
  });
}

watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) openMenu();
  else closeMenu();
});

function scrollToSection(target: string) {
  const section = document.querySelector(target);
  if (section) {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(section as HTMLElement, true, "top 56px");
    } else {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  mobileMenuOpen.value = false;
}

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        if (!headerRef.value) return;
        const scrolled = self.scroll() > 80;
        headerRef.value.classList.toggle("bg-background/80", scrolled);
        headerRef.value.classList.toggle("backdrop-blur-lg", scrolled);
        headerRef.value.classList.toggle("border-b", scrolled);
        headerRef.value.classList.toggle("border-foreground/10", scrolled);
        headerRef.value.classList.toggle("bg-transparent", !scrolled);
      },
    });
  });
});

onBeforeUnmount(() => {
  menuAnimation?.kill();
  ctx?.revert();
  if (timeInterval) clearInterval(timeInterval);
});
</script>

<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <NuxtLink
        to="/"
        class="font-space-grotesk text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
      >
        {{ info.firstName }}
      </NuxtLink>

      <div class="hidden md:flex items-center gap-1 text-sm text-foreground/60 font-dm-mono">
        <span>Phnom Penh, KH</span>
        <span class="text-foreground/40">—</span>
        <span>{{ currentTime }}</span>
      </div>

      <nav class="hidden md:flex items-center gap-6">
        <a
          v-for="link in navLinks"
          :key="link.label"
          class="cursor-pointer text-sm font-space-grotesk text-foreground/60 hover:text-foreground transition-colors"
          @click="scrollToSection(link.target)"
        >
          {{ link.label }}
        </a>
      </nav>

      <UButton
        color="neutral"
        variant="ghost"
        square
        class="md:hidden"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <div class="size-5 flex flex-col justify-center items-center gap-1">
          <span
            class="block h-0.5 w-4 rounded-[1px] bg-foreground transition-transform duration-300"
            :class="mobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''"
          />
          <span
            class="block h-0.5 w-4 rounded-[1px] bg-foreground transition-transform duration-300"
            :class="mobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''"
          />
        </div>
      </UButton>
    </div>

    <div ref="mobileMenuRef" class="md:hidden fixed inset-0 z-40 hidden">
      <div
        class="absolute inset-0 bg-background/95 backdrop-blur-lg"
        @click="mobileMenuOpen = false"
      />

      <nav
        class="absolute right-0 top-0 bottom-0 w-64 bg-surface border-l border-foreground/10 flex flex-col pt-20 px-6 pb-8"
      >
        <UButton
          color="neutral"
          variant="ghost"
          square
          class="absolute top-4 right-4"
          @click="mobileMenuOpen = false"
        >
          <div class="size-5 flex flex-col justify-center items-center">
            <span class="block h-0.5 w-4 rounded-[1px] bg-foreground rotate-45" />
            <span class="block h-0.5 w-4 rounded-[1px] bg-foreground -rotate-45 -translate-y-0.5" />
          </div>
        </UButton>

        <div class="flex flex-col gap-6">
          <a
            v-for="link in navLinks"
            :key="link.label"
            class="cursor-pointer text-base font-space-grotesk text-foreground/60 hover:text-foreground transition-colors"
            @click="scrollToSection(link.target)"
          >
            {{ link.label }}
          </a>
        </div>

        <div class="mt-auto flex items-center gap-1 text-xs text-foreground/40 font-dm-mono">
          <span>Phnom Penh, KH</span>
          <span class="text-foreground/20">—</span>
          <span>{{ currentTime }}</span>
        </div>
      </nav>
    </div>
  </header>
</template>
