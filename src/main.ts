import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { i18n } from './i18n'

import { useQueueStore } from '@/stores/useQueueStore'
import { useToastStore } from '@/stores/useToastStore'
import { useLanguageStore } from '@/stores/useLanguageStore'

import '@/assets/main.scss'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(i18n)

app.mount('#app')

// After mount
const queueStore = useQueueStore()
const toastStore = useToastStore()
const languageStore = useLanguageStore()

// Initialize language from localStorage
languageStore.init()

// Schedule Auto Sync
if (queueStore.items.length > 0) {
  toastStore.show('⏳ Synchronizacja rozpocznie się za 10 sekund...')
  setTimeout(() => {
    queueStore.autoSync()
    toastStore.show('🔄 Synchronizacja rozpoczęta...')
  }, 10000)
}