<template>
  <div class="min-h-screen bg-background text-foreground transition-colors">
    <ProgressBar />
    <div class="flex justify-end p-4">
  <SettingsMenu />
</div>
    <transition name="fade" mode="out-in">
      <RouterViewcp dist/index.html dist/404.html/>
    </transition>
    <Toast v-if="toastMessage" :message="toastMessage" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'

import { ref } from 'vue'
const toastMessage = ref('')

function showToast(text: string) {
  toastMessage.value = text
  setTimeout(() => (toastMessage.value = ''), 4000)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>