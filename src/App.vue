<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <!-- Top Navigation -->
    <div class="flex justify-between items-center p-4 border-b border-border">
      <AnimatedLogo />
    </div>

    <!-- Main Content -->
    <main class="flex-1 w-full max-w-notion mx-auto px-4 py-6">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Bottom Navbar (only mobile) -->
    <BottomNavbar />

    <!-- Toast Notification -->
    <Toast v-if="toastStore.message" :message="toastStore.message" />

    <!-- Onboarding Tooltip -->
    <OnboardingTooltip v-if="showTooltip" />
  </div>
</template>

<script setup lang="ts">
import AnimatedLogo from '@/components/ui/AnimatedLogo.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'
import BottomNavbar from '@/components/ui/BottomNavbar.vue'
import Toast from '@/components/ui/Toast.vue'
import OnboardingTooltip from '@/components/ui/OnboardingTooltip.vue'
import { useToastStore } from '@/stores/useToastStore'
import { ref, onMounted } from 'vue'

const toastStore = useToastStore()
const showTooltip = ref(false)

onMounted(() => {
  if (!localStorage.getItem('onboardingComplete')) {
    showTooltip.value = true
    setTimeout(() => {
      showTooltip.value = false
      localStorage.setItem('onboardingComplete', 'true')
    }, 5000)
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
