<script setup lang="ts">
onBeforeMount(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <LoadingScreen />

  <div class="w-full max-w-screen min-h-screen bg-background font-sans relative overflow-x-hidden">
    <LayoutAppHeader />
    <ScrollSmootherWrapper>
      <main>
        <slot></slot>
      </main>
      <LayoutAppFooter />
    </ScrollSmootherWrapper>
  </div>
</template>
