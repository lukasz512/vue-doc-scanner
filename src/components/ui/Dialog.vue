<template>
  <div class="fixed inset-0 bg-black/10 backdrop-blur-sm z-50" @click.self="$emit('close')">
    <div
      class="absolute right-4 top-16 bg-background/80 border border-border rounded-xl shadow-md p-3 w-48 animate-fade-down"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Emits \"close\" when clicking outside
</script>

<style scoped>
@keyframes fade-down {
  0% { opacity: 0; transform: translateY(-8px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fade-down {
  animation: fade-down 0.2s ease-out;
}
</style>