<template>
  <div v-if="progress > 0" class="fixed top-0 left-0 right-0 z-50">
    <div class="h-1 bg-primary" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQueueStore } from '@/stores/useQueueStore'

const queue = useQueueStore()

const progress = computed(() => {
  if (queue.items.length === 0) return 0
  const synced = queue.items.filter(i => i.status === 'synced').length
  return Math.round((synced / queue.items.length) * 100)
})
</script>