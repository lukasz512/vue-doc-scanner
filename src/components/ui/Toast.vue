<template>
  <div class="fixed bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none">
    <div class="px-4 py-2 bg-muted text-foreground text-sm rounded-full shadow-lg animate-slide-up">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<style scoped>
@keyframes slide-up {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slide-up 0.4s ease-out;
}
</style>
