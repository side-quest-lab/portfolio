<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const headerRef = ref<HTMLElement | null>(null);
const currentTime = ref("");

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

let timeInterval: ReturnType<typeof setInterval> | undefined;
let ctx: gsap.Context | undefined;

onMounted(() => {
  updateTime();
  timeInterval = setInterval(updateTime, 1000);

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        if (!headerRef.value) return;
        if (self.direction === 1 && self.scroll() > 80) {
          headerRef.value.classList.add(
            "bg-background/80",
            "backdrop-blur-lg",
            "border-b",
            "border-foreground/10",
          );
          headerRef.value.classList.remove("bg-transparent");
        } else if (self.scroll() <= 80) {
          headerRef.value.classList.remove(
            "bg-background/80",
            "backdrop-blur-lg",
            "border-b",
            "border-foreground/10",
          );
          headerRef.value.classList.add("bg-transparent");
        }
      },
    });
  });
});

onBeforeUnmount(() => {
  ctx?.revert();
  if (timeInterval) clearInterval(timeInterval);
});
</script>

<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink
        to="/"
        class="font-space-grotesk text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
      >
        CHHUNHAK
      </NuxtLink>

      <div class="hidden md:flex items-center gap-4 text-sm text-foreground/60 font-dm-mono">
        <span>Phnom Penh, KH</span>
        <span class="text-foreground/20">—</span>
        <span>{{ currentTime }}</span>
      </div>

      <nav class="flex items-center gap-6">
        <a
          href="#work"
          class="hidden md:block text-sm font-space-grotesk text-foreground/60 hover:text-foreground transition-colors"
        >
          WORK
        </a>
        <a
          href="#experience"
          class="hidden md:block text-sm font-space-grotesk text-foreground/60 hover:text-foreground transition-colors"
        >
          EXPERIENCE
        </a>
        <a
          href="#about"
          class="hidden md:block text-sm font-space-grotesk text-foreground/60 hover:text-foreground transition-colors"
        >
          ABOUT
        </a>
        <a
          href="#contact"
          class="text-sm font-space-grotesk text-foreground/60 hover:text-foreground transition-colors"
        >
          CONTACT
        </a>
      </nav>
    </div>
  </header>
</template>
