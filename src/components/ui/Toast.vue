<template>
  <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-xl px-4 py-2 shadow-lg text-sm text-foreground animate-fade-in">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
