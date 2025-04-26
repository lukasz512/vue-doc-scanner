<template>
  <div
    class="flex flex-col items-center justify-center bg-muted/50 border border-border rounded-2xl p-8 text-muted-foreground text-center shadow-md backdrop-blur-md hover:shadow-lg transition space-y-4 cursor-pointer"
    @click="$emit('click')"
  >
    <slot name="icon">
      <!-- Default icon -->
      <svg class="w-16 h-16 opacity-50" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5V8.25C3 7.01 4.01 6 5.25 6H7.5l2-2h5l2 2h2.25C19.99 6 21 7.01 21 8.25v8.25c0 1.24-1.01 2.25-2.25 2.25H5.25C4.01 18.75 3 17.74 3 16.5z" />
      </svg>
    </slot>

    <div class="space-y-1">
      <p class="text-base font-semibold">{{ title }}</p>
      <p class="text-xs text-muted-foreground">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()

defineEmits(['click'])
</script>
