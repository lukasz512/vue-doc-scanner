import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    current: 'en'
  }),

  actions: {
    init() {
      const saved = localStorage.getItem('language')
      this.current = saved || 'en'
    },

    setLanguage(lang: string) {
      const { locale } = useI18n({ useScope: 'global' })
      this.current = lang
      locale.value = lang
      localStorage.setItem('language', lang)
    }
  }
})