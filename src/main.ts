import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { i18n } from './i18n'
import { useQueueStore } from '@/stores/useQueueStore'

import '@/assets/main.scss'

// 🆕 Import Lucide icons
import { RefreshCcw, Trash2, Settings } from 'lucide-vue-next'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(i18n)

// 🆕 Register Lucide icons globally
app.component('RefreshCcw', RefreshCcw)
app.component('Trash2', Trash2)
app.component('SettingsIcon', Settings)

app.mount('#app')

// 🌟 After mount, initialize queue auto-sync and language settings
const queueStore = useQueueStore()
setTimeout(() => {
  queueStore.autoSync()
}, 10000)

import { useLanguageStore } from '@/stores/useLanguageStore'
const languageStore = useLanguageStore()
languageStore.init()