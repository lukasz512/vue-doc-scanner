<template>
  <div class="relative">
    <button @click="toggleOpen" class="text-muted-foreground hover:text-foreground transition">
      ⚙️
    </button>

    <div
      v-if="open"
      class="absolute right-0 mt-2 w-44 bg-background border border-muted rounded-xl shadow-lg p-2 space-y-2 z-50"
    >
      <button
        @click="toggleTheme"
        class="w-full text-left text-sm text-foreground hover:bg-muted p-2 rounded-md transition"
      >
        {{ isDark ? t('theme.light') : t('theme.dark') }}
      </button>

      <div class="border-t border-muted my-1"></div>

      <div class="space-y-1">
        <p class="text-xs text-muted-foreground px-2">{{ t('language') }}:</p>
        <button
          @click="() => setLanguage('pl')"
          class="w-full text-left text-sm text-foreground hover:bg-muted p-2 rounded-md transition"
        >
          {{ t('lang.pl') }}
        </button>
        <button
          @click="() => setLanguage('en')"
          class="w-full text-left text-sm text-foreground hover:bg-muted p-2 rounded-md transition"
        >
          {{ t('lang.en') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/useLanguageStore'

const open = ref(false)
const isDark = ref(false)
const { t } = useI18n()
const languageStore = useLanguageStore()

function toggleOpen() {
  open.value = !open.value
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    isDark.value = saved === 'dark'
    document.documentElement.classList.toggle('dark', isDark.value)
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', isDark.value)
  }
})

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
  open.value = false
}

function setLanguage(lang: string) {
  languageStore.setLanguage(lang)
  open.value = false
}
</script>