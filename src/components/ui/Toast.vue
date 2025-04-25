// src/components/ui/Toast.vue
<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="visible"
      class="fixed bottom-6 right-6 z-50 bg-background border border-muted shadow-xl rounded-xl px-4 py-3 text-sm text-foreground flex items-center gap-2 animate-slide-up"
    >
      <span>{{ message }}</span>
      <button @click="close" class="text-muted-foreground hover:text-foreground">&times;</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const props = defineProps<{ message: string }>()
const visible = ref(true)

function close() {
  visible.value = false
}

const timeout = setTimeout(() => close(), 4000)
onUnmounted(() => clearTimeout(timeout))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
@keyframes slide-up {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
