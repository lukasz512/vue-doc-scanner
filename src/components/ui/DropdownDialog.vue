<template>
  <div class="relative" ref="dropdownRef">
    <component
      :is="triggerIcon"
      class="w-5 h-5 cursor-pointer hover:text-foreground text-muted-foreground transition"
      @click="toggle"
    />

    <Transition name="fade-scale">
      <div
        v-if="open"
        class="absolute z-50 min-w-[12rem] bg-background/80 backdrop-blur-md border border-border rounded-xl shadow-xl p-2 mt-2"
        :class="positionClasses"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { FunctionalComponent } from 'vue'

const props = defineProps<{
  triggerIcon: FunctionalComponent
  side?: 'top' | 'bottom' | 'left' | 'right'
  align?: 'start' | 'center' | 'end'
}>()

const open = ref(false)
const dropdownRef = ref(null)

function toggle() {
  open.value = !open.value
}

onClickOutside(dropdownRef, () => {
  open.value = false
})

const positionClasses = computed(() => {
  const side = props.side || 'bottom'
  const align = props.align || 'end'

  let sideClass = ''
  if (side === 'bottom') sideClass = 'top-full mt-2'
  if (side === 'top') sideClass = 'bottom-full mb-2'
  if (side === 'left') sideClass = 'right-full mr-2'
  if (side === 'right') sideClass = 'left-full ml-2'

  let alignClass = ''
  if (align === 'start') alignClass = 'left-0'
  if (align === 'center') alignClass = 'left-1/2 -translate-x-1/2'
  if (align === 'end') alignClass = 'right-0'

  return `${sideClass} ${alignClass}`
})
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
