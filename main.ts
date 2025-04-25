import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.scss';

const app = createApp(App);

// Theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

app.use(router);
app.mount('#app');
