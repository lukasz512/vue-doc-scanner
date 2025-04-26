<template>
  <nav class="fixed bottom-4 left-4 right-4 z-50 flex justify-around items-center bg-background/80 backdrop-blur-md border border-border rounded-2xl p-3 shadow-lg">
    <!-- Home -->
    <RouterLink to="/" class="flex flex-col items-center hover:text-foreground text-muted-foreground transition">
      <HomeIcon class="w-5 h-5" />
    </RouterLink>

    <!-- Sync -->
    <RouterLink to="/sync" class="relative flex flex-col items-center hover:text-foreground text-muted-foreground transition">
      <RefreshCcw class="w-5 h-5" />
      <span v-if="unsyncedCount > 0" class="absolute -top-1 -right-1 text-[10px] bg-primary text-background rounded-full px-1">
        {{ unsyncedCount }}
      </span>
    </RouterLink>

    <!-- Settings -->
    <DropdownDialog
      side="top"
      align="end"
      :trigger-icon="Settings"
    >
      <div class="space-y-2">
        <button
          @click="toggleTheme"
          class="w-full text-left text-sm text-foreground hover:bg-muted px-3 py-2 rounded-md transition"
        >
          {{ isDark ? t('theme.light') : t('theme.dark') }}
        </button>

        <div class="border-t border-muted my-1"></div>

        <div class="space-y-1">
          <p class="text-xs text-muted-foreground px-2">{{ t('language') }}:</p>
          <button
            @click="() => setLanguage('pl')"
            class="w-full text-left text-sm text-foreground hover:bg-muted px-3 py-2 rounded-md transition"
          >
            {{ t('lang.pl') }}
          </button>
          <button
            @click="() => setLanguage('en')"
            class="w-full text-left text-sm text-foreground hover:bg-muted px-3 py-2 rounded-md transition"
          >
            {{ t('lang.en') }}
          </button>
        </div>
      </div>
    </DropdownDialog>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { HomeIcon, RefreshCcw, Settings } from 'lucide-vue-next'
import { useQueueStore } from '@/stores/useQueueStore'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/useLanguageStore'
import DropdownDialog from '@/components/ui/DropdownDialog.vue'

const queue = useQueueStore()
const { t } = useI18n()
const languageStore = useLanguageStore()

const unsyncedCount = computed(() =>
  queue.items.filter(item => item.status !== 'synced').length
)

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
}

function setLanguage(lang: string) {
  languageStore.setLanguage(lang)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved === 'dark'
})
</script>
