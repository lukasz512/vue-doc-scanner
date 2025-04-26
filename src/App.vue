<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <!-- Top Navigation -->
    <div class="flex justify-between items-center p-4 border-b border-border">
      <AnimatedLogo />
      <SettingsMenu />
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

    <!-- Onboarding Tooltip -->
    <OnboardingTooltip v-if="showTooltip" />
  </div>
</template>

<script setup lang="ts">
import AnimatedLogo from '@/components/ui/AnimatedLogo.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'
import BottomNavbar from '@/components/ui/BottomNavbar.vue'
import OnboardingTooltip from '@/components/ui/OnboardingTooltip.vue'
import { ref, onMounted } from 'vue'

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