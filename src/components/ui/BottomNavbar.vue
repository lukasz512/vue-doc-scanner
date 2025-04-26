<template>
  <nav class="fixed bottom-0 inset-x-0 bg-background border-t border-border flex justify-around items-center h-16 z-50 md:hidden">
    <RouterLink to="/" class="flex flex-col items-center text-xs text-muted-foreground hover:text-foreground">
      <HomeIcon class="w-5 h-5 mb-1" />
      Home
    </RouterLink>
    <RouterLink to="/sync" class="flex flex-col items-center text-xs text-muted-foreground hover:text-foreground">
      <SyncIcon class="w-5 h-5 mb-1" />
      Sync
    </RouterLink>
    <button @click="toggleSettings" class="flex flex-col items-center text-xs text-muted-foreground hover:text-foreground">
      <SettingsIcon class="w-5 h-5 mb-1" />
      Settings
    </button>
  </nav>
</template>

<script setup lang="ts">
import { Home as HomeIcon, RefreshCcw as SyncIcon, Settings as SettingsIcon } from 'lucide-vue-next'

function toggleSettings() {
  // Optionally open settings modal in future
  console.log('[BottomNav] Open settings')
}
</script>
