import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SyncBox from '@/views/SyncBox.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/sync',
    name: 'SyncBox',
    component: SyncBox
  }
]

const router = createRouter({
  history: createWebHistory('/document-scanner-pwa/'),
  routes
})

export default router