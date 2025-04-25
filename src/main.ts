import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { i18n } from './i18n'

import '@/assets/main.scss'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(i18n)

app.mount('#app')

// Initialize language after Pinia and i18n
import { useLanguageStore } from '@/stores/useLanguageStore'
const languageStore = useLanguageStore()
languageStore.init()