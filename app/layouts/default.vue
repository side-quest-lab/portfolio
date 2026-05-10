<script setup lang="ts"></script>

<template>
  <div class="bg-background font-sans w-screen min-h-screen relative overflow-x-hidden">
    <LayoutAppHeader />
    <ScrollSmootherWrapper>
      <main>
        <slot></slot>
      </main>
      <LayoutAppFooter />
    </ScrollSmootherWrapper>
  </div>
</template>
