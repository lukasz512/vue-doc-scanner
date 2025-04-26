<template>
  <div
    class="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 max-w-screen-md mx-auto space-y-2 min-h-[300px]"
  >
    <div v-if="title" class="text-lg font-medium text-primary mb-2">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style scoped>
div:hover {
  transition: box-shadow 0.2s ease;
}
</style>
