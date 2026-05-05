<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number;
    statusMessage: string;
  };
}>();

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="text-center">
      <h1 class="text-6xl font-heading font-bold text-primary mb-4">
        {{ props.error.statusCode }}
      </h1>
      <p class="text-star-dim mb-8">{{ props.error.statusMessage || "Something went wrong" }}</p>
      <button class="btn-primary" @click="handleError">Go Home</button>
    </div>
  </div>
</template>
