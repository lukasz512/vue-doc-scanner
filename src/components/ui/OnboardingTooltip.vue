<template>
  <div class="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
    <div class="mb-24 px-4 py-2 bg-muted text-foreground rounded-xl shadow-lg animate-fade-in">
      <p class="text-sm">Tap the card to scan your first document 📄</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// This file is standalone because App.vue already handles showing/hiding based on localStorage.
</script>

<style scoped>
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
