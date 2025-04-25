import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import SyncBox from './views/SyncBox.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/sync', component: SyncBox }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
