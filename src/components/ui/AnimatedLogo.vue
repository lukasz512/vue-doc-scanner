<template>
  <div
    class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-muted flex items-center justify-center shadow-md"
    :style="logoStyle"
  >
    <svg
      class="w-6 h-6 text-background"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6v6h4m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const logoStyle = ref('')

function handleGyro(event: DeviceOrientationEvent) {
  if (event.beta && event.gamma) {
    const x = Math.min(Math.max(event.gamma, -30), 30)
    const y = Math.min(Math.max(event.beta, -30), 30)
    logoStyle.value = `transform: rotateX(${y / 4}deg) rotateY(${x / 4}deg)`
  }
}

onMounted(() => {
  window.addEventListener('deviceorientation', handleGyro)
})

onUnmounted(() => {
  window.removeEventListener('deviceorientation', handleGyro)
})
</script>
