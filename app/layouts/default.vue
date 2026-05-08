<script setup lang="ts"></script>

<template>
  <div class="bg-background font-sans w-screen min-h-screen relative overflow-x-hidden">
    <LayoutAppHeader />
    <ScrollSmootherWrapper>
      <main class="w-full px-4 md:px-6 lg:px-8 pt-20">
        <slot></slot>
      </main>
      <LayoutAppFooter />
    </ScrollSmootherWrapper>
  </div>
</template>
