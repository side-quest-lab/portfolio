<script setup lang="ts"></script>

<template>
  <div class="bg-background font-sans w-screen min-h-screen relative overflow-x-hidden">
    <ScrollSmootherWrapper>
      <main class="w-full px-2">
        <slot></slot>
      </main>
    </ScrollSmootherWrapper>
  </div>
</template>
