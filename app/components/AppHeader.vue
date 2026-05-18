<script setup lang="ts">
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";

import { USER } from "#shared/data/portfolio";

const currentTime = ref("");

const headerRef = useTemplateRef("headerRef");
const mobileMenuRef = useTemplateRef("mobileMenuRef");
const mobileMenuOpen = ref(false);

const lock = useBodyScrollLock();

watch(mobileMenuOpen, (isOpen) => {
  lock.value = isOpen;
});

const navLinks = [
  { label: "ABOUT", target: "#about" },
  { label: "WORK", target: "#work" },
  { label: "EXPERIENCE", target: "#experience" },
  { label: "CONTACT", target: "#contact" },
];

let timeInterval: ReturnType<typeof setInterval> | undefined;
let menuTl: gsap.core.Timeline | undefined;

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

  mobileMenuOpen.value = true;

  menuTl?.kill();
  menuTl = gsap.timeline();

  const backdrop = mobileMenuRef.value.querySelector(".menu-backdrop");
  const nav = mobileMenuRef.value.querySelector("nav");
  const links = mobileMenuRef.value.querySelectorAll("nav a");

  menuTl
    .set(mobileMenuRef.value, { display: "flex" })
    .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0)
    .fromTo(nav, { x: "100%" }, { x: 0, duration: 0.35, ease: "power3.out" }, 0)
    .fromTo(
      links,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.25, stagger: 0.05, ease: "power2.out" },
      0.1,
    );
}

function closeMenu() {
  if (!mobileMenuRef.value) return;

  mobileMenuOpen.value = false;

  menuTl?.kill();
  menuTl = gsap.timeline({
    onComplete: () => {
      if (mobileMenuRef.value) {
        gsap.set(mobileMenuRef.value, { display: "none" });
      }
    },
  });

  const backdrop = mobileMenuRef.value.querySelector(".menu-backdrop");
  const nav = mobileMenuRef.value.querySelector("nav");

  menuTl
    .to(nav, { x: "100%", duration: 0.25, ease: "power2.in" }, 0)
    .to(backdrop, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0.05);
}

function toggleMenu() {
  if (mobileMenuOpen.value) {
    closeMenu();
  } else {
    openMenu();
  }
}

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
  closeMenu();
}

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);

  gsap.to(headerRef.value, {
    background: "var(--color-background)",
    duration: 0.01,
    ease: "none",
    scrollTrigger: {
      trigger: headerRef.value,
      start: "bottom top",
      toggleActions: "play none reverse reset",
    },
  });
});

onBeforeUnmount(() => {
  menuTl?.kill();
  if (timeInterval) clearInterval(timeInterval);
});
</script>

<template>
  <header ref="headerRef" class="fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <NuxtLink
        to="/"
        class="font-space-grotesk text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        @click="scrollToSection('#hero')"
      >
        {{ USER.firstName }}
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
          :href="link.target"
          class="cursor-pointer text-sm font-space-grotesk text-foreground/60 hover:text-foreground transition-colors"
          @click="scrollToSection(link.target)"
        >
          {{ link.label }}
        </a>
      </nav>

      <UButton color="neutral" variant="ghost" square class="md:hidden" @click="toggleMenu">
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

    <div ref="mobileMenuRef" class="hidden lg:hidden w-screen h-screen fixed left-0 top-0 z-40">
      <div
        class="menu-backdrop absolute inset-0 bg-background/95 backdrop-blur-lg"
        @click="toggleMenu"
      />

      <nav
        class="w-64 h-full px-6 pb-6 absolute right-0 top-0 bg-background border-l border-foreground/10 grid grid-rows-[64px_1fr_auto]"
      >
        <div class="flex justify-end items-center">
          <UButton color="neutral" variant="ghost" square @click="toggleMenu">
            <div class="size-5 flex flex-col justify-center items-center">
              <span class="block h-0.5 w-4 rounded-[1px] bg-foreground rotate-45" />
              <span
                class="block h-0.5 w-4 rounded-[1px] bg-foreground -rotate-45 -translate-y-0.5"
              />
            </div>
          </UButton>
        </div>

        <div class="py-4 flex flex-col gap-6">
          <a
            v-for="link in navLinks"
            :key="link.label"
            :href="link.target"
            class="cursor-pointer text-base font-space-grotesk text-foreground/60 hover:text-foreground transition-colors"
            @click="scrollToSection(link.target)"
          >
            {{ link.label }}
          </a>
        </div>

        <div class="flex items-center gap-1 text-xs text-foreground/40 font-dm-mono">
          <span>Phnom Penh, KH</span>
          <span class="text-foreground/20">—</span>
          <span>{{ currentTime }}</span>
        </div>
      </nav>
    </div>
  </header>
</template>
