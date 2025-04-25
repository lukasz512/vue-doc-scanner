import { createI18n } from 'vue-i18n'
import pl from './locales/pl.json'
import en from './locales/en.json'

const language = localStorage.getItem('language') || 'pl'

export const i18n = createI18n({
  legacy: false,
  locale: language,
  fallbackLocale: 'pl',
  messages: {
    pl,
    en
  }
})