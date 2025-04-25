import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SyncBox from '@/views/SyncBox.vue'

const router = createRouter({
  history: createWebHistory('/document-scanner-pwa/'),
  routes: [
    { path: '/', component: HomeView },
    { path: '/sync', component: SyncBox }
  ]
})

export default router